"use client"

import { Post } from '@/lib/dal/posts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { HeartIcon, MessageCircleIcon, RepeatIcon, ShareIcon, MoreHorizontalIcon, BookmarkIcon, BarChart3Icon, ArrowLeft } from 'lucide-react'
import { formatDistance } from 'date-fns/formatDistance'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface PostDetailProps {
  post: Post
  replies: Post[]
}

export function PostDetail({ post, replies }: PostDetailProps) {
  const { author } = post
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px'
    }
  }

  const handleBackClick = () => {
    router.back()
  }

  useEffect(() => {
    adjustTextareaHeight()
  }, [])
  
  return (
    <div className="min-h-screen">
      {/* ヘッダー */}
      <div className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/70 z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center px-4 py-3">
          <button 
            onClick={handleBackClick}
            className="mr-6 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Post</h1>
        </div>
      </div>

      {/* メイン投稿 */}
      <article className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={author.profileImageUrl ?? undefined} />
            <AvatarFallback>{author.displayName[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Link 
                href={`/${author.username}`}
                className="font-bold text-lg hover:underline truncate"
              >
                {author.displayName}
              </Link>
              <span className="text-gray-500 text-sm">@{author.username}</span>
              <span className="text-gray-500">·</span>
              <time className="text-gray-500 text-sm">
                {formatDistance(post.createdAt, new Date(), { addSuffix: true })}
              </time>
              <button className="ml-auto rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                <MoreHorizontalIcon className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-lg leading-relaxed mb-4 whitespace-pre-wrap break-words">{post.content}</p>
            
            {post.mediaUrl && (
              <div className="mt-4 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image
                  src={post.mediaUrl}
                  alt="Post media"
                  width={500}
                  height={300}
                  className="w-full object-cover"
                />
              </div>
            )}
            
            {/* エンゲージメントメトリクス */}
            <div className="mt-4 flex items-center justify-between max-w-md text-gray-500">
              <button className="flex items-center gap-2 group">
                <div className="rounded-full p-2 group-hover:bg-blue-500/10">
                  <MessageCircleIcon className="h-5 w-5 group-hover:text-blue-500" />
                </div>
                <span className="text-sm group-hover:text-blue-500">{post._count.replies || 0}</span>
              </button>
              <button className="flex items-center gap-2 group">
                <div className="rounded-full p-2 group-hover:bg-green-500/10">
                  <RepeatIcon className="h-5 w-5 group-hover:text-green-500" />
                </div>
                <span className="text-sm group-hover:text-green-500">0</span>
              </button>
              <button className="flex items-center gap-2 group">
                <div className="rounded-full p-2 group-hover:bg-pink-500/10">
                  <HeartIcon className="h-5 w-5 group-hover:text-pink-500" />
                </div>
                <span className="text-sm group-hover:text-pink-500">{post._count.likes || 0}</span>
              </button>
              <button className="flex items-center gap-2 group">
                <div className="rounded-full p-2 group-hover:bg-blue-500/10">
                  <BarChart3Icon className="h-5 w-5 group-hover:text-blue-500" />
                </div>
                <span className="text-sm group-hover:text-blue-500">0</span>
              </button>
              <button className="flex items-center gap-2 group">
                <div className="rounded-full p-2 group-hover:bg-blue-500/10">
                  <BookmarkIcon className="h-5 w-5 group-hover:text-blue-500" />
                </div>
              </button>
              <button className="flex items-center gap-2 group">
                <div className="rounded-full p-2 group-hover:bg-blue-500/10">
                  <ShareIcon className="h-5 w-5 group-hover:text-blue-500" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* リプライ作成フォーム */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-3 items-end">
          <Avatar className="w-10 h-10">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=current-user" />
            <AvatarFallback>Me</AvatarFallback>
          </Avatar>
          <div className="flex-1 flex items-end gap-3">
            <textarea
              ref={textareaRef}
              placeholder="Post your reply"
              className="flex-1 bg-transparent text-base outline-none placeholder:text-gray-500 resize-none min-h-[40px] max-h-[120px] overflow-hidden"
              rows={1}
              onInput={adjustTextareaHeight}
            />
            <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition font-semibold whitespace-nowrap">
              Reply
            </button>
          </div>
        </div>
      </div>

      {/* リプライ一覧 */}
      {replies.length > 0 && (
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
          {replies.map((reply) => (
            <ReplyCard key={reply.id} reply={reply} />
          ))}
        </div>
      )}
    </div>
  )
}

// リプライ専用のカードコンポーネント
function ReplyCard({ reply }: { reply: Post }) {
  const { author } = reply
  
  return (
    <article className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
      <Link href={`/${author.username}/status/${reply.id}`}>
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={author.profileImageUrl ?? undefined} />
            <AvatarFallback>{author.displayName[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span 
                className="font-semibold hover:underline truncate cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  window.location.href = `/${author.username}`
                }}
              >
                {author.displayName}
              </span>
              <span className="text-gray-500 text-sm">@{author.username}</span>
              <span className="text-gray-500">·</span>
              <time className="text-gray-500 text-sm">
                {formatDistance(reply.createdAt, new Date(), { addSuffix: true })}
              </time>
              <button 
                className="ml-auto rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreHorizontalIcon className="h-4 w-4" />
              </button>
            </div>
            
            <p className="text-sm leading-relaxed mb-3 whitespace-pre-wrap break-words">{reply.content}</p>
            
            {reply.mediaUrl && (
              <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <Image
                  src={reply.mediaUrl}
                  alt="Reply media"
                  width={400}
                  height={200}
                  className="w-full object-cover"
                />
              </div>
            )}
            
            <div className="flex items-center justify-between max-w-md text-gray-500">
              <button 
                className="flex items-center gap-1 group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
                  <MessageCircleIcon className="h-4 w-4 group-hover:text-blue-500" />
                </div>
              </button>
              <button 
                className="flex items-center gap-1 group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-full p-1.5 group-hover:bg-green-500/10">
                  <RepeatIcon className="h-4 w-4 group-hover:text-green-500" />
                </div>
                <span className="text-xs group-hover:text-green-500">0</span>
              </button>
              <button 
                className="flex items-center gap-1 group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-full p-1.5 group-hover:bg-pink-500/10">
                  <HeartIcon className="h-4 w-4 group-hover:text-pink-500" />
                </div>
                <span className="text-xs group-hover:text-pink-500">{reply._count.likes}</span>
              </button>
              <button 
                className="flex items-center gap-1 group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
                  <BarChart3Icon className="h-4 w-4 group-hover:text-blue-500" />
                </div>
                <span className="text-xs group-hover:text-blue-500">0</span>
              </button>
              <button 
                className="flex items-center gap-1 group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
                  <BookmarkIcon className="h-4 w-4 group-hover:text-blue-500" />
                </div>
              </button>
              <button 
                className="flex items-center gap-1 group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
                  <ShareIcon className="h-4 w-4 group-hover:text-blue-500" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
