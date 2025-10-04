import Link from "next/link";
import { PostHeader } from "@/components/shared/post-header";
import { PostActions } from "@/components/shared/post-actions";
import { PostMedia } from "@/components/shared/post-media";
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
    <div>
      {posts.map((post) => {
        const { author } = post;
        
        return (
          <article 
            key={post.id} 
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer border-b border-gray-200 dark:border-gray-800"
          >
            <Link href={`/${author.username}/status/${post.id}`}>
              <div className="flex gap-3">
                <div className="flex-1 min-w-0">
                  <PostHeader
                    author={author}
                    createdAt={post.createdAt}
                    showAvatar={false}
                    avatarSize="md"
                  />

                  <p className="text-sm leading-relaxed mb-3 whitespace-pre-wrap break-words">
                    {post.content}
                  </p>

                  {post.mediaUrl && (
                    <PostMedia mediaUrl={post.mediaUrl} />
                  )}

                  <PostActions
                    repliesCount={post._count.replies}
                    likesCount={post._count.likes}
                  />
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
