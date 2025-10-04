"use client";

import { MoreHorizontal } from "lucide-react";
import { formatDistance } from "date-fns/formatDistance";
import { useRouter } from "next/navigation";
import { UserAvatar } from "./user-avatar";

interface PostHeaderProps {
  author: {
    username: string;
    displayName: string;
    profileImageUrl?: string | null;
  };
  createdAt: Date;
  showAvatar?: boolean;
  avatarSize?: "sm" | "md" | "lg";
  onMoreClick?: () => void;
}

export function PostHeader({
  author,
  createdAt,
  showAvatar = true,
  avatarSize = "md",
  onMoreClick
}: PostHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 mb-1">
      {showAvatar && (
        <UserAvatar
          profileImageUrl={author.profileImageUrl}
          displayName={author.displayName}
          size={avatarSize}
        />
      )}
      
      <div className="flex-1 min-w-0">
        <span 
          className="font-semibold hover:underline truncate cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/${author.username}`);
          }}
        >
          {author.displayName}
        </span>
        <span className="text-gray-500 text-sm ml-2">@{author.username}</span>
        <span className="text-gray-500 ml-1">·</span>
        <time className="text-gray-500 text-sm ml-1">
          {formatDistance(createdAt, new Date(), { addSuffix: true })}
        </time>
      </div>
      
      <button
        className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
        onClick={(e) => {
          e.stopPropagation();
          onMoreClick?.();
        }}
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}
