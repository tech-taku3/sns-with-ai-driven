import { PostCard } from "@/components/post-card";
import type { Post as DbPost } from "@/lib/dal/posts";

interface PostsListProps {
  posts: DbPost[];
}

export function PostsList({ posts }: PostsListProps) {
  if (posts.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No posts yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col divide-y">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
