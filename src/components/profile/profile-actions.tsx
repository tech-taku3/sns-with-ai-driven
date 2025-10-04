"use client";

import { MoreHorizontal, MessageCircle, Share } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileActionsProps {
  onMoreClick?: () => void;
  onMessageClick?: () => void;
  onShareClick?: () => void;
  onSubscribeClick?: () => void;
  className?: string;
}

export function ProfileActions({
  onMoreClick,
  onMessageClick,
  onShareClick,
  onSubscribeClick,
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
      
      <Button 
        className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        onClick={onSubscribeClick}
      >
        Subscribe
      </Button>
    </div>
  );
}
