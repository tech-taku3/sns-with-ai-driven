"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";
import { uploadRateLimit } from "@/lib/rate-limit";

export type UploadState = {
  url?: string;
  error?: string;
};

export async function uploadImage(
  prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  try {
    // 認証チェック
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return { error: "認証が必要です" };
    }

    // レート制限チェック
    const { success: rateLimitSuccess } = await uploadRateLimit.limit(clerkId);
    if (!rateLimitSuccess) {
      return { error: "アップロードの上限に達しました。しばらくしてからお試しください。" };
    }

    const file = formData.get("file") as File;
    const type = formData.get("type") as string; // "profile" or "cover"

    if (!file || file.size === 0) {
      return { error: "ファイルを選択してください" };
    }

    // ファイルサイズチェック（5MB以下）
    if (file.size > 5 * 1024 * 1024) {
      return { error: "ファイルサイズは5MB以下にしてください" };
    }

    // ファイル形式チェック（MIME type）
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return { error: "JPEG、PNG、WebP形式の画像のみアップロード可能です" };
    }

    // マジックナンバー検証（ファイルの実際の内容を確認）
    const buffer = await file.arrayBuffer();
    const bytes = new Uint8Array(buffer).slice(0, 12); // 先頭12バイトを取得

    const isValidImage = 
      // JPEG: FF D8 FF
      (bytes[0] === 0xFF && bytes[1] === 0xD8 && bytes[2] === 0xFF) ||
      // PNG: 89 50 4E 47 0D 0A 1A 0A
      (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4E && bytes[3] === 0x47) ||
      // WebP: 52 49 46 46 ... 57 45 42 50
      (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46 &&
       bytes[8] === 0x57 && bytes[9] === 0x45 && bytes[10] === 0x42 && bytes[11] === 0x50);

    if (!isValidImage) {
      return { error: "無効な画像ファイルです。ファイルが破損しているか、画像形式が正しくありません。" };
    }

    // ファイルをBufferに戻す（アップロード用）
    const fileForUpload = new File([buffer], file.name, { type: file.type });

    // ファイル名を生成（重複を避けるためタイムスタンプを含める）
    const fileExt = file.name.split(".").pop();
    const fileName = `${clerkId}/${type}-${Date.now()}.${fileExt}`;

    // Supabaseにアップロード
    const { data, error } = await supabaseAdmin.storage
      .from("profiles")
      .upload(fileName, fileForUpload, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      return { error: "画像のアップロードに失敗しました" };
    }

    // 公開URLを取得
    const { data: urlData } = supabaseAdmin.storage
      .from("profiles")
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl };
  } catch (error) {
    console.error("画像アップロードエラー:", error);
    
    // 本番環境では詳細を隠す（情報漏洩防止）
    if (process.env.NODE_ENV === 'production') {
      return { error: "画像のアップロードに失敗しました" };
    }
    
    return {
      error:
        error instanceof Error
          ? error.message
          : "画像のアップロードに失敗しました",
    };
  }
}

