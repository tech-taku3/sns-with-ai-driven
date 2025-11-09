"use client";

import { MoreHorizontal, MessageCircle, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FollowButton } from "./follow-button";

interface ProfileActionsProps {
  isOwnProfile?: boolean;
  targetUserId?: string;
  isFollowing?: boolean;
  followersCount?: number;
  onMoreClick?: () => void;
  onMessageClick?: () => void;
  onShareClick?: () => void;
  className?: string;
}

export function ProfileActions({
  isOwnProfile = false,
  targetUserId,
  isFollowing = false,
  followersCount = 0,
  onMoreClick,
  onMessageClick,
  onShareClick,
  className = ""
}: ProfileActionsProps) {
  const params = useParams();
  const username = params.username as string;
  return (
    <div className={`flex justify-end gap-2 pt-4 ${className}`}>
      <button 
        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        onClick={onMoreClick}
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>
      
      <button 
        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        onClick={onMessageClick}
      >
        <MessageCircle className="h-5 w-5" />
      </button>
      
      <button 
        className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        onClick={onShareClick}
      >
        <Share className="h-5 w-5" />
      </button>
      
      {isOwnProfile ? (
        <Link href={`/${username}/edit-profile`}>
          <Button 
            className="bg-transparent border border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Edit Profile
          </Button>
        </Link>
      ) : targetUserId ? (
        <FollowButton
          targetUserId={targetUserId}
          initialIsFollowing={isFollowing}
          initialFollowersCount={followersCount}
        />
      ) : null}
    </div>
  );
}
