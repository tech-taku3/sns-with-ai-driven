"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { followRateLimit } from "@/lib/rate-limit";

export type FollowState = {
  message?: string;
  error?: string;
  isFollowing?: boolean;
  followersCount?: number;
};

export async function toggleFollow(
  prevState: FollowState,
  formData: FormData
): Promise<FollowState> {
  try {
    const targetUserId = formData.get("targetUserId") as string;

    if (!targetUserId) {
      return { error: "ユーザーIDが必要です" };
    }

    // 認証チェック
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return { error: "認証が必要です" };
    }

    // レート制限チェック
    const { success: rateLimitSuccess } = await followRateLimit.limit(clerkId);
    if (!rateLimitSuccess) {
      return { error: "フォローの上限に達しました。しばらくしてからお試しください。" };
    }

    // 現在のユーザー情報の取得
    const currentUser = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!currentUser) {
      return { error: "ユーザーが見つかりません" };
    }

    // 自分自身をフォローしようとしていないかチェック
    if (currentUser.id === targetUserId) {
      return { error: "自分自身をフォローすることはできません" };
    }

    // 対象ユーザーの存在確認
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: { id: true, username: true },
    });

    if (!targetUser) {
      return { error: "フォロー対象のユーザーが見つかりません" };
    }

    // 既存のフォローを確認
    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUser.id,
          followingId: targetUserId,
        },
      },
    });

    let isFollowing: boolean;

    if (existingFollow) {
      // フォローを削除（アンフォロー）
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: currentUser.id,
            followingId: targetUserId,
          },
        },
      });
      isFollowing = false;
    } else {
      // フォローを追加
      await prisma.follow.create({
        data: {
          followerId: currentUser.id,
          followingId: targetUserId,
        },
      });
      isFollowing = true;
    }

    // フォロワー数を取得
    const followersCount = await prisma.follow.count({
      where: { followingId: targetUserId },
    });

    // キャッシュの再検証
    revalidatePath(`/${targetUser.username}`);

    return {
      message: isFollowing ? "フォローしました" : "フォローを解除しました",
      isFollowing,
      followersCount,
    };
  } catch (error) {
    console.error("フォロー切り替えエラー:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "フォローの処理に失敗しました",
    };
  }
}

