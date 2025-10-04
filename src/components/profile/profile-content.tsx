import { PinnedPost } from "@/components/post/pinned-post";
import { PostsList } from "@/components/post/posts-list";
import type { Post as DbPost } from "@/lib/dal/posts";

interface ProfileContentProps {
  posts?: DbPost[];
  pinnedPost?: DbPost;
}

export function ProfileContent({ posts = [], pinnedPost }: ProfileContentProps) {
  return (
    <div className="pb-[56px] lg:pb-0">
      {pinnedPost && <PinnedPost post={pinnedPost} />}
      <PostsList posts={posts} />
    </div>
  );
}