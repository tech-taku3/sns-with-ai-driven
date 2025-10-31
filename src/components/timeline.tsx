import { TimelineHeader } from "./timeline/timeline-header";
import { TimelineContent } from "./timeline/timeline-content";

// グローバル状態としてプロフィール画像を管理
let globalProfileImage = "https://picsum.photos/200?random=42";
export function setGlobalProfileImage(image: string) { globalProfileImage = image; }
export function getGlobalProfileImage() { return globalProfileImage; }

export function Timeline({ userId }: { userId?: string }) {
  return (
    <section className="h-screen flex flex-col border-x border-black/10 dark:border-white/10">
      <TimelineHeader />
      <TimelineContent userId={userId} />
    </section>
  );
}

export default Timeline;


