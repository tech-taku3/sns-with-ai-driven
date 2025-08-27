import LeftSidebar from "../components/left-sidebar";
import Timeline from "../components/timeline";
import RightSidebar from "../components/right-sidebar";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl w-full flex">
      <LeftSidebar />
      <main className="flex-1 max-w-[600px] w-full">
        <Timeline />
      </main>
      <RightSidebar />
    </div>
  );
}
