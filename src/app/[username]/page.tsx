import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileContent } from "@/components/profile/profile-content";
import { getUserByUsername } from "@/lib/api/users";
import { getUserPostsByUsername } from "@/lib/api/posts";

interface PageProps {
  params: { username: string }
}

export default async function UserProfilePage({ params }: PageProps) {
  const username = decodeURIComponent(params.username)
  const [user, posts] = await Promise.all([
    getUserByUsername(username),
    getUserPostsByUsername(username)
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

  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex w-full lg:w-[1265px] mx-auto">
        <LeftSidebar />
        <main className="flex-1 lg:flex-none lg:w-[600px] lg:min-w-[600px] border-x border-gray-200 dark:border-gray-800">
          <div className="min-w-0">
            <ProfileHeader displayName={user.displayName} username={user.username} postsCount={user._count.posts} />
            <ProfileContent posts={posts} />
          </div>
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


