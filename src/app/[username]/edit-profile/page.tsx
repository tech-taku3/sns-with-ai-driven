import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Profile } from "@/components/profile";
import { getUserByUsername } from "@/lib/dal/users";
import { getUserPostsByUsername } from "@/lib/dal/posts";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { EditProfileModal } from "@/components/profile/edit-profile-modal";

interface PageProps {
  params: { username: string };
}

export default async function EditProfilePage({ params }: PageProps) {
  const username = decodeURIComponent(params.username);

  // 認証チェック
  const { userId: clerkId } = await auth();
  if (!clerkId) {
    notFound();
  }

  let currentUserId: string | undefined;
  const currentUser = await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true, username: true },
  });
  currentUserId = currentUser?.id;

  // 自分のプロフィールでない場合はアクセス拒否
  if (!currentUser || currentUser.username !== username) {
    notFound();
  }

  const [user, posts] = await Promise.all([
    getUserByUsername(username, currentUserId),
    getUserPostsByUsername(username, currentUserId),
  ]);

  if (!user) {
    notFound();
  }

  // 自分自身のプロフィールかどうかを判定
  const isOwnProfile = currentUserId === user.id;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex w-full lg:w-[1265px] mx-auto">
        <LeftSidebar />
        <main className="flex-1 lg:flex-none lg:w-[600px] lg:min-w-[600px]">
          <Profile
            user={{
              id: user.id,
              username: user.username,
              displayName: user.displayName,
              profileImageUrl: user.profileImageUrl || undefined,
              coverImageUrl: user.coverImageUrl || undefined,
              bio: user.bio,
              followersCount: user._count.followers,
              followingCount: user._count.following,
              postsCount: user._count.posts,
              joinDate: new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              }),
              isVerified: false,
              isFollowing: user.isFollowing || false,
            }}
            posts={posts}
            isOwnProfile={isOwnProfile}
          />
        </main>
        <RightSidebar />
      </div>
      <MobileNav className="fixed bottom-0 left-0 right-0 lg:hidden" />
      <EditProfileModal
        user={{
          displayName: user.displayName,
          bio: user.bio,
          profileImageUrl: user.profileImageUrl,
          coverImageUrl: user.coverImageUrl,
        }}
      />
    </div>
  );
}

export async function generateStaticParams() {
  return [];
}

