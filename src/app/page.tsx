import { LeftSidebar } from "@/components/left-sidebar";
import { Timeline } from "@/components/timeline";
import { RightSidebar } from "@/components/right-sidebar";
import { MobileNav } from "@/components/mobile-nav";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserFollowStats } from "@/lib/dal/users";

export default async function Home() {
  const { userId: clerkId } = await auth()
  
  const user = clerkId ? await prisma.user.findUnique({
    where: { clerkId },
    select: { id: true }
  }) : null
  const userId = user?.id
  
  const followStats = clerkId ? await getCurrentUserFollowStats(clerkId) : null

  return (
    <div className="flex justify-center min-h-screen w-full overflow-x-hidden">
      <div className="flex w-full max-w-[1265px] mx-auto overflow-x-hidden">
        <LeftSidebar />
        <main className="flex-1 lg:flex-none lg:w-[600px] lg:min-w-[600px] border-x md:border-l-0 border-gray-200 dark:border-gray-800 w-full max-w-full overflow-x-hidden">
          <Timeline userId={userId} followStats={followStats} />
        </main>
        <RightSidebar />
      </div>
      <MobileNav className="fixed bottom-0 left-0 right-0 md:hidden" />
    </div>
  );
}