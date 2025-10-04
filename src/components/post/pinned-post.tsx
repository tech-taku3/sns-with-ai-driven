import Link from "next/link";
import { PostHeader } from "@/components/shared/post-header";
import { PostActions } from "@/components/shared/post-actions";
import { PostMedia } from "@/components/shared/post-media";
import type { Post as DbPost } from "@/lib/dal/posts";

interface PinnedPostProps {
  post: DbPost;
}

export function PinnedPost({ post }: PinnedPostProps) {
  const { author } = post;
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="px-4 py-2 text-sm text-gray-500 flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
        Pinned
      </div>
      
      <article className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
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
    </div>
  );
}
