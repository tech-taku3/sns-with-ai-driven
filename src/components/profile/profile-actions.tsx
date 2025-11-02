"use client";

import { MoreHorizontal, MessageCircle, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileActionsProps {
  isOwnProfile?: boolean;
  onMoreClick?: () => void;
  onMessageClick?: () => void;
  onShareClick?: () => void;
  onSubscribeClick?: () => void;
  onEditProfileClick?: () => void;
  className?: string;
}

export function ProfileActions({
  isOwnProfile = false,
  onMoreClick,
  onMessageClick,
  onShareClick,
  onSubscribeClick,
  onEditProfileClick,
  className = ""
}: ProfileActionsProps) {
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
        <Button 
          className="bg-transparent border border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={onEditProfileClick}
        >
          Edit Profile
        </Button>
      ) : (
        <Button 
          className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          onClick={onSubscribeClick}
        >
          Subscribe
        </Button>
      )}
    </div>
  );
}
