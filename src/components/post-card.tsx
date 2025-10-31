import Link from 'next/link'
import { Post } from '@/lib/dal/posts'
import { UserAvatar } from '@/components/shared/user-avatar'
import { PostHeader } from '@/components/shared/post-header'
import { PostMedia } from '@/components/shared/post-media'
import { PostActions } from '@/components/shared/post-actions'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { author } = post
  
  return (
    <article className="p-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] cursor-pointer">
      <Link href={`/${author.username}/status/${post.id}`}>
        <div className="flex gap-4">
          <UserAvatar
            profileImageUrl={author.profileImageUrl}
            displayName={author.displayName}
            size="md"
          />
          
          <div className="flex-1 min-w-0">
            <PostHeader
              author={author}
              createdAt={post.createdAt}
              showAvatar={false}
              avatarSize="md"
            />
          
            <p className="mt-2 whitespace-pre-wrap break-words">{post.content}</p>
            
            {post.mediaUrl && (
              <PostMedia 
                mediaUrl={post.mediaUrl}
                width={500}
                height={300}
                className="mt-3 rounded-2xl border-gray-100 dark:border-gray-800"
              />
            )}
            
            <div className="mt-3">
              <PostActions
                postId={post.id}
                repliesCount={post._count.replies}
                likesCount={post._count.likes}
                isLiked={post.isLiked || false}
              />
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
