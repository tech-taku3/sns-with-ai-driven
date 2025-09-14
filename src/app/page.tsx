import { LeftSidebar } from "@/components/left-sidebar";
import { Timeline } from "@/components/timeline";
import { RightSidebar } from "@/components/right-sidebar";
import { MobileNav } from "@/components/mobile-nav";

export default function Home() {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="flex w-full lg:w-[1265px] mx-auto">
        <LeftSidebar />
        <main className="flex-1 lg:flex-none lg:w-[600px] lg:min-w-[600px] border-x border-gray-200 dark:border-gray-800">
          <Timeline />
        </main>
        <RightSidebar />
      </div>
      <MobileNav className="fixed bottom-0 left-0 right-0 lg:hidden" />
    </div>
  );
}