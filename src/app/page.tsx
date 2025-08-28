import LeftSidebar from "../components/left-sidebar";
import Timeline from "../components/timeline";
import RightSidebar from "../components/right-sidebar";
import MobileNav from "../components/mobile-nav";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl w-full">
      <div className="flex relative">
        <LeftSidebar />
        <main className="flex-1 min-h-screen border-x border-black/10 dark:border-white/10 max-w-[600px] w-full mx-auto lg:mx-0">
          <Timeline />
        </main>
        <RightSidebar />
      </div>
      <MobileNav className="lg:hidden" />
    </div>
  );
}