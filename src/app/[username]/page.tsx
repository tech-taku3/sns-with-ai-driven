import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { Profile } from "@/components/profile";
import { getUserByUsername } from "@/lib/dal/users";
import { getUserPostsByUsername } from "@/lib/dal/posts";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: { username: string }
}

export default async function UserProfilePage({ params }: PageProps) {
  const username = decodeURIComponent(params.username)
  
  // 現在のユーザーIDを取得
  const { userId: clerkId } = await auth();
  let currentUserId: string | undefined;
  if (clerkId) {
    const currentUser = await prisma.user.findUnique({
      where: { clerkId },
      select: { id: true }
    });
    currentUserId = currentUser?.id;
  }
  
  const [user, posts] = await Promise.all([
    getUserByUsername(username, currentUserId),
    getUserPostsByUsername(username, currentUserId)
  ])

  if (!user) {
    return (
      <div className="flex justify-center min-h-screen">
        <div className="flex w-full lg:w-[1265px] mx-auto">
          <LeftSidebar />
          <main className="flex-1 lg:flex-none lg:w-[600px] lg:min-w-[600px] border-x border-gray-200 dark:border-gray-800">
            <div className="min-w-0 p-8">
              <h1 className="text-2xl font-bold">User not found</h1>
              <p className="text-black/60 dark:text-white/60">@{username} は存在しません。</p>
            </div>
          </main>
          <RightSidebar />
        </div>
        <MobileNav className="fixed bottom-0 left-0 right-0 lg:hidden" />
      </div>
    )
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
              joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              isVerified: false,
              isFollowing: user.isFollowing || false
            }}
            posts={posts}
            isOwnProfile={isOwnProfile}
          />
        </main>
        <RightSidebar />
      </div>
      <MobileNav className="fixed bottom-0 left-0 right-0 lg:hidden" />
    </div>
  )
}

export async function generateStaticParams() {
  return []
}


