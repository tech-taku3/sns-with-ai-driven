"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { postRateLimit } from "@/lib/rate-limit";

export interface CreatePostInput {
  content: string;
  parentId?: string;
  mediaUrl?: string;
}

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * ポストを作成するServer Action
 */
export async function createPost(
  input: CreatePostInput
): Promise<ActionResult<{ postId: string }>> {
  try {
    // 認証チェック
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return {
        success: false,
        error: "認証が必要です。ログインしてください。",
      };
    }

    // レート制限チェック
    const { success: rateLimitSuccess } = await postRateLimit.limit(clerkId);
    if (!rateLimitSuccess) {
      return {
        success: false,
        error: "投稿の上限に達しました。しばらくしてからお試しください。",
      };
    }

    // バリデーション
    const trimmedContent = input.content.trim();
    if (!trimmedContent) {
      return {
        success: false,
        error: "投稿内容を入力してください。",
      };
    }

    if (trimmedContent.length > 280) {
      return {
        success: false,
        error: "投稿は280文字以内で入力してください。",
      };
    }

    // clerkIdからユーザーを取得
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      return {
        success: false,
        error: "ユーザーが見つかりません。",
      };
    }

    // 親ポストの存在確認（返信の場合）
    if (input.parentId) {
      const parentPost = await prisma.post.findUnique({
        where: { id: input.parentId },
      });

      if (!parentPost) {
        return {
          success: false,
          error: "返信先の投稿が見つかりません。",
        };
      }
    }

    // ポストを作成
    const post = await prisma.post.create({
      data: {
        content: trimmedContent,
        userId: user.id,
        parentId: input.parentId,
        mediaUrl: input.mediaUrl,
        isPublished: true,
      },
    });

    // キャッシュを再検証
    revalidatePath("/");
    if (input.parentId) {
      revalidatePath(`/status/${input.parentId}`);
    }

    return {
      success: true,
      data: { postId: post.id },
    };
  } catch (error) {
    console.error("ポスト作成エラー:", error);
    
    // 本番環境では詳細を隠す（情報漏洩防止）
    return {
      success: false,
      error: "投稿の作成に失敗しました。もう一度お試しください。",
    };
  }
}

/**
 * ポストを削除するServer Action
 */
export async function deletePost(
  postId: string
): Promise<ActionResult> {
  try {
    // 認証チェック
    const { userId: clerkId } = await auth();
    
    if (!clerkId) {
      return {
        success: false,
        error: "認証が必要です。",
      };
    }

    // clerkIdからユーザーを取得
    const user = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true },
    });

    if (!user) {
      return {
        success: false,
        error: "ユーザーが見つかりません。",
      };
    }

    // ポストの所有者確認
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { userId: true },
    });

    if (!post) {
      return {
        success: false,
        error: "投稿が見つかりません。",
      };
    }

    if (post.userId !== user.id) {
      return {
        success: false,
        error: "この投稿を削除する権限がありません。",
      };
    }

    // ポストを削除（カスケード削除で返信とlikeも削除される）
    await prisma.post.delete({
      where: { id: postId },
    });

    // キャッシュを再検証
    revalidatePath("/");

    return {
      success: true,
    };
  } catch (error) {
    console.error("ポスト削除エラー:", error);
    
    // 本番環境では詳細を隠す（情報漏洩防止）
    return {
      success: false,
      error: "投稿の削除に失敗しました。",
    };
  }
}

