import LeftSidebar from "../../components/left-sidebar";
import Profile from "../../components/profile";
import RightSidebar from "../../components/right-sidebar";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-7xl w-full flex">
      <LeftSidebar />
      <main className="flex-1 max-w-[600px] w-full">
        <Profile />
      </main>
      <RightSidebar />
    </div>
  );
}
