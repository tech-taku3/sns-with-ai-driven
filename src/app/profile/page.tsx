import LeftSidebar from "@/components/left-sidebar";
import RightSidebar from "@/components/right-sidebar";
import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileContent } from "@/components/profile/profile-content";
import MobileNav from "@/components/mobile-nav";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl w-full">
      <div className="flex relative">
        <LeftSidebar />
        <main className="flex-1 min-h-screen border-x border-black/10 dark:border-white/10 max-w-[600px] w-full mx-auto lg:mx-0">
          <ProfileHeader />
          <ProfileContent />
        </main>
        <RightSidebar />
      </div>
      <MobileNav className="lg:hidden" />
    </div>
  );
}