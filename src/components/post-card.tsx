"use client"

import { Post } from '@/lib/dal/posts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { HeartIcon, MessageCircleIcon, RepeatIcon, ShareIcon, MoreHorizontalIcon } from 'lucide-react'
import { formatDistance } from 'date-fns/formatDistance'
import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const { author } = post
  
  return (
    <article className="p-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] cursor-pointer">
      <Link href={`/${author.username}/status/${post.id}`}>
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={author.profileImageUrl ?? undefined} />
            <AvatarFallback>{author.displayName[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
            <Link 
              href={`/${author.username}`}
              className="font-semibold hover:underline truncate"
              onClick={(e) => e.stopPropagation()}
            >
              {author.displayName}
            </Link>
            <span className="text-gray-500">@{author.username}</span>
            <span className="text-gray-500">·</span>
            <time className="text-gray-500">
              {formatDistance(post.createdAt, new Date(), { addSuffix: true })}
            </time>
            <button className="ml-auto rounded-full p-2 hover:bg-primary/10">
              <MoreHorizontalIcon className="h-5 w-5" />
            </button>
            </div>
          
          <p className="mt-2 whitespace-pre-wrap break-words">{post.content}</p>
          
          {post.mediaUrl && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <Image
                src={post.mediaUrl}
                alt="Post media"
                width={500}
                height={300}
                className="w-full object-cover"
              />
            </div>
          )}
          
          <div className="mt-3 flex justify-between max-w-md text-gray-500">
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
                <ShareIcon className="h-5 w-5 group-hover:text-blue-500" />
              </div>
            </button>
          </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
