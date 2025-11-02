"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type UpdateProfileState = {
  message?: string;
  error?: string;
};

export async function updateProfile(
  prevState: UpdateProfileState,
  formData: FormData
): Promise<UpdateProfileState> {
  try {
    const displayName = formData.get("displayName") as string;
    const bio = formData.get("bio") as string;

    if (!displayName?.trim()) {
      return { error: "名前を入力してください" };
    }

    // 認証チェック
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return { error: "認証が必要です" };
    }

    // ユーザー情報の取得
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });

    if (!user) {
      return { error: "ユーザーが見つかりません" };
    }

    // プロフィールを更新
    await prisma.user.update({
      where: { id: user.id },
      data: {
        displayName: displayName.trim(),
        bio: bio.trim() || null,
      },
    });

    // キャッシュの再検証
    revalidatePath(`/${user.username}`);

    return { message: "プロフィールを更新しました" };
  } catch (error) {
    console.error("プロフィール更新エラー:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "プロフィールの更新に失敗しました",
    };
  }
}

