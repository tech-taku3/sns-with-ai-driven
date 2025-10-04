"use client";

import { 
  MessageCircle,
  Repeat,
  Heart,
  BarChart3,
  Bookmark,
  Share2
} from "lucide-react";

interface PostActionsProps {
  repliesCount?: number;
  likesCount?: number;
  onReply?: () => void;
  onRetweet?: () => void;
  onLike?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onAnalytics?: () => void;
}

export function PostActions({
  repliesCount = 0,
  likesCount = 0,
  onReply,
  onRetweet,
  onLike,
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
      
      <button
        className="flex items-center gap-1 group"
        onClick={(e) => {
          e.stopPropagation();
          onLike?.();
        }}
      >
        <div className="rounded-full p-1.5 group-hover:bg-pink-500/10">
          <Heart className="h-4 w-4 group-hover:text-pink-500" />
        </div>
        <span className="text-xs group-hover:text-pink-500">{likesCount}</span>
      </button>
      
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
