"use client";

import { 
  MessageCircle,
  Repeat,
  Heart,
  BarChart3,
  Bookmark,
  Share2,
  MoreHorizontal
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { formatDistance } from "date-fns/formatDistance";
import Link from "next/link";
import Image from "next/image";
import type { Post as DbPost } from "@/lib/dal/posts";

// ピン留め投稿コンポーネント
const PinnedPost = ({ post }: { post: DbPost }) => {
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
            <Avatar className="w-10 h-10">
              <AvatarImage src={author.profileImageUrl ?? undefined} />
              <AvatarFallback>{author.displayName[0]}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold truncate">{author.displayName}</span>
                <span className="text-gray-500 text-sm">@{author.username}</span>
                <span className="text-gray-500">·</span>
                <time className="text-gray-500 text-sm">
                  {formatDistance(post.createdAt, new Date(), { addSuffix: true })}
                </time>
                <button
                  className="ml-auto rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm leading-relaxed mb-3 whitespace-pre-wrap break-words">{post.content}</p>

              {post.mediaUrl && (
                <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                  <Image
                    src={post.mediaUrl}
                    alt="Post media"
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
                    <MessageCircle className="h-4 w-4 group-hover:text-blue-500" />
                  </div>
                  <span className="text-xs group-hover:text-blue-500">{post._count.replies || 0}</span>
                </button>
                <button
                  className="flex items-center gap-1 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="rounded-full p-1.5 group-hover:bg-green-500/10">
                    <Repeat className="h-4 w-4 group-hover:text-green-500" />
                  </div>
                  <span className="text-xs group-hover:text-green-500">0</span>
                </button>
                <button
                  className="flex items-center gap-1 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="rounded-full p-1.5 group-hover:bg-pink-500/10">
                    <Heart className="h-4 w-4 group-hover:text-pink-500" />
                  </div>
                  <span className="text-xs group-hover:text-pink-500">{post._count.likes || 0}</span>
                </button>
                <button
                  className="flex items-center gap-1 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
                    <BarChart3 className="h-4 w-4 group-hover:text-blue-500" />
                  </div>
                  <span className="text-xs group-hover:text-blue-500">0</span>
                </button>
                <button
                  className="flex items-center gap-1 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
                    <Bookmark className="h-4 w-4 group-hover:text-blue-500" />
                  </div>
                </button>
                <button
                  className="flex items-center gap-1 group"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
                    <Share2 className="h-4 w-4 group-hover:text-blue-500" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
};

// 投稿リストコンポーネント
interface PostsListProps {
  posts: DbPost[];
}

const PostsList = ({ posts }: PostsListProps) => {
  return (
    <div>
      {posts.map((post) => {
        const { author } = post;
        
        return (
          <article key={post.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer border-b border-gray-200 dark:border-gray-800">
            <Link href={`/${author.username}/status/${post.id}`}>
              <div className="flex gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={author.profileImageUrl ?? undefined} />
                  <AvatarFallback>{author.displayName[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold truncate">{author.displayName}</span>
                    <span className="text-gray-500 text-sm">@{author.username}</span>
                    <span className="text-gray-500">·</span>
                    <time className="text-gray-500 text-sm">
                      {formatDistance(post.createdAt, new Date(), { addSuffix: true })}
                    </time>
                    <button
                      className="ml-auto rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <p className="text-sm leading-relaxed mb-3 whitespace-pre-wrap break-words">{post.content}</p>

                  {post.mediaUrl && (
                    <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                      <Image
                        src={post.mediaUrl}
                        alt="Post media"
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
                        <MessageCircle className="h-4 w-4 group-hover:text-blue-500" />
                      </div>
                      <span className="text-xs group-hover:text-blue-500">{post._count.replies || 0}</span>
                    </button>
                    <button
                      className="flex items-center gap-1 group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="rounded-full p-1.5 group-hover:bg-green-500/10">
                        <Repeat className="h-4 w-4 group-hover:text-green-500" />
                      </div>
                      <span className="text-xs group-hover:text-green-500">0</span>
                    </button>
                    <button
                      className="flex items-center gap-1 group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="rounded-full p-1.5 group-hover:bg-pink-500/10">
                        <Heart className="h-4 w-4 group-hover:text-pink-500" />
                      </div>
                      <span className="text-xs group-hover:text-pink-500">{post._count.likes || 0}</span>
                    </button>
                    <button
                      className="flex items-center gap-1 group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
                        <BarChart3 className="h-4 w-4 group-hover:text-blue-500" />
                      </div>
                      <span className="text-xs group-hover:text-blue-500">0</span>
                    </button>
                    <button
                      className="flex items-center gap-1 group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
                        <Bookmark className="h-4 w-4 group-hover:text-blue-500" />
                      </div>
                    </button>
                    <button
                      className="flex items-center gap-1 group"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
                        <Share2 className="h-4 w-4 group-hover:text-blue-500" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
};

interface ProfileContentProps {
  posts?: DbPost[];
  pinnedPost?: DbPost;
}

export function ProfileContent({ posts = [], pinnedPost }: ProfileContentProps) {
  return (
    <div className="pb-[56px] lg:pb-0">
      {pinnedPost && <PinnedPost post={pinnedPost} />}
      {posts.length > 0 ? (
        <PostsList posts={posts} />
      ) : (
        <div className="p-8 text-center text-gray-500">
          <p>No posts yet</p>
        </div>
      )}
    </div>
  );
}