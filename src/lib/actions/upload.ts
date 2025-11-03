"use server";

import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export type UploadState = {
  url?: string;
  error?: string;
};

export async function uploadImage(
  prevState: UploadState,
  formData: FormData
): Promise<UploadState> {
  try {
    // Supabaseクライアントのチェック
    if (!supabaseAdmin) {
      return { error: "Supabaseが設定されていません" };
    }

    // 認証チェック
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return { error: "認証が必要です" };
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

    // ファイル形式チェック
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return { error: "JPEG、PNG、WebP形式の画像のみアップロード可能です" };
    }

    // ファイル名を生成（重複を避けるためタイムスタンプを含める）
    const fileExt = file.name.split(".").pop();
    const fileName = `${clerkId}/${type}-${Date.now()}.${fileExt}`;

    // Supabaseにアップロード
    const { data, error } = await supabaseAdmin.storage
      .from("profiles")
      .upload(fileName, file, {
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
    return {
      error:
        error instanceof Error
          ? error.message
          : "画像のアップロードに失敗しました",
    };
  }
}

