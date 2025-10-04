import { PostsList } from "@/components/post/posts-list";
import type { Post as DbPost } from "@/lib/dal/posts";

interface ProfileContentProps {
  posts?: DbPost[];
}

export function ProfileContent({ posts = [] }: ProfileContentProps) {
  return (
    <div className="pb-[56px] lg:pb-0">
      <PostsList posts={posts} />
    </div>
  );
}