"use client";

import { 
  MessageCircle,
  Repeat,
  BarChart3,
  Bookmark,
  Share2
} from "lucide-react";
import { LikeButton } from "@/components/post/like-button";

interface PostActionsProps {
  postId: string;
  repliesCount?: number;
  likesCount?: number;
  isLiked?: boolean;
  onReply?: () => void;
  onRetweet?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onAnalytics?: () => void;
}

export function PostActions({
  postId,
  repliesCount = 0,
  likesCount = 0,
  isLiked = false,
  onReply,
  onRetweet,
  onShare,
  onBookmark,
  onAnalytics
}: PostActionsProps) {
  return (
    <div className="flex items-center justify-between max-w-md text-gray-500">
      <button
        className="flex items-center gap-1 group"
        onClick={(e) => {
          e.stopPropagation();
          onReply?.();
        }}
      >
        <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
          <MessageCircle className="h-4 w-4 group-hover:text-blue-500" />
        </div>
        <span className="text-xs group-hover:text-blue-500">{repliesCount}</span>
      </button>
      
      <button
        className="flex items-center gap-1 group"
        onClick={(e) => {
          e.stopPropagation();
          onRetweet?.();
        }}
      >
        <div className="rounded-full p-1.5 group-hover:bg-green-500/10">
          <Repeat className="h-4 w-4 group-hover:text-green-500" />
        </div>
        <span className="text-xs group-hover:text-green-500">0</span>
      </button>
      
      <LikeButton
        postId={postId}
        initialLikesCount={likesCount}
        initialIsLiked={isLiked}
      />
      
      <button
        className="flex items-center gap-1 group"
        onClick={(e) => {
          e.stopPropagation();
          onAnalytics?.();
        }}
      >
        <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
          <BarChart3 className="h-4 w-4 group-hover:text-blue-500" />
        </div>
        <span className="text-xs group-hover:text-blue-500">0</span>
      </button>
      
      <button
        className="flex items-center gap-1 group"
        onClick={(e) => {
          e.stopPropagation();
          onBookmark?.();
        }}
      >
        <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
          <Bookmark className="h-4 w-4 group-hover:text-blue-500" />
        </div>
      </button>
      
      <button
        className="flex items-center gap-1 group"
        onClick={(e) => {
          e.stopPropagation();
          onShare?.();
        }}
      >
        <div className="rounded-full p-1.5 group-hover:bg-blue-500/10">
          <Share2 className="h-4 w-4 group-hover:text-blue-500" />
        </div>
      </button>
    </div>
  );
}
