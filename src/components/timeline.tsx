import { TimelineHeader } from "./timeline/timeline-header";
import { TimelineContent } from "./timeline/timeline-content";
import type { FollowStats } from "@/lib/dal/users";

export function Timeline({ 
  userId, 
  followStats 
}: { 
  userId?: string;
  followStats?: FollowStats | null;
}) {
  return (
    <section className="h-screen flex flex-col border-x border-black/10 dark:border-white/10">
      <TimelineHeader followStats={followStats} />
      <TimelineContent userId={userId} />
    </section>
  );
}

export default Timeline;


