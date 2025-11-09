"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { likeRateLimit } from "@/lib/rate-limit";

export type State = {
  message?: string;
  error?: string;
  isLiked?: boolean;
  likesCount?: number;
};

export async function toggleLike(
  prevState: State,
  formData: FormData
): Promise<State> {
  try {
    const postId = formData.get("postId") as string;

    if (!postId) {
      return { error: "投稿IDが必要です" };
    }

    // 認証チェック
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return { error: "認証が必要です" };
    }

    // レート制限チェック
    const { success: rateLimitSuccess } = await likeRateLimit.limit(clerkId);
    if (!rateLimitSuccess) {
      return { error: "いいねの上限に達しました。しばらくしてからお試しください。" };
    }

    // ユーザー情報の取得
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return { error: "ユーザーが見つかりません" };
    }

    // 既存のいいねを確認
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: postId,
        },
      },
    });

    let isLiked: boolean;

    if (existingLike) {
      // いいねを削除
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId: user.id,
            postId: postId,
          },
        },
      });
      isLiked = false;
    } else {
      // いいねを追加
      await prisma.like.create({
        data: {
          userId: user.id,
          postId: postId,
        },
      });
      isLiked = true;
    }

    // いいね数を取得
    const likesCount = await prisma.like.count({
      where: { postId: postId },
    });

    // キャッシュの再検証
    revalidatePath("/");

    return {
      message: isLiked ? "いいねしました" : "いいねを取り消しました",
      isLiked,
      likesCount,
    };
  } catch (error) {
    console.error("いいね切り替えエラー:", error);
    
    // 本番環境では詳細を隠す（情報漏洩防止）
    if (process.env.NODE_ENV === 'production') {
      return { error: "いいねの処理に失敗しました" };
    }
    
    return {
      error:
        error instanceof Error
          ? error.message
          : "いいねの処理に失敗しました",
    };
  }
}

