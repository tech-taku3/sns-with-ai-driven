import { TimelineHeader } from "./timeline/timeline-header";
import { TimelineContent } from "./timeline/timeline-content";

export function Timeline({ userId }: { userId?: string }) {
  return (
    <section className="h-screen flex flex-col border-x border-black/10 dark:border-white/10">
      <TimelineHeader />
      <TimelineContent userId={userId} />
    </section>
  );
}

export default Timeline;


