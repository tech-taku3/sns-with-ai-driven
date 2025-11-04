import { EditProfileModal } from "@/components/profile/edit-profile-modal";
import { getUserByUsername } from "@/lib/dal/users";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: { username: string };
}

export default async function EditProfileInterceptingRoute({ params }: PageProps) {
  const { username: rawUsername } = await params;
  const username = decodeURIComponent(rawUsername);

  // 認証チェック
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    notFound();
  }

  const currentUser = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true, username: true },
  });

  // 自分のプロフィールでない場合はアクセス拒否
  if (!currentUser || currentUser.username !== username) {
    notFound();
  }

  const user = await getUserByUsername(username);

  if (!user) {
    notFound();
  }

  return (
    <EditProfileModal
      user={{
        displayName: user.displayName,
        bio: user.bio,
        profileImageUrl: user.profileImageUrl,
        coverImageUrl: user.coverImageUrl,
      }}
    />
  );
}
