"use client";

import { useState } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  ImageIcon, 
  SmileIcon, 
  StickerIcon, 
  ListIcon, 
  CalendarIcon, 
  MapPinIcon 
} from "lucide-react";

interface CreatePostProps {
  className?: string;
  onSubmit?: (content: string) => void;
}

export function CreatePost({ className = "", onSubmit }: CreatePostProps) {
  const { user, isLoaded } = useUser();
  const [content, setContent] = useState("");

  const handlePost = () => {
    if (user && content.trim()) {
      onSubmit?.(content);
      setContent("");
    }
  };

  return (
    <div className={`flex gap-4 p-4 border-b ${className}`}>
      <Avatar>
        <AvatarImage 
          src={user?.imageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=guest"} 
        />
        <AvatarFallback>
          {user?.firstName?.charAt(0) || "G"}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="mb-4">
          <input
            type="text"
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-xl outline-none placeholder:text-gray-500"
            disabled={!user}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex -ml-2">
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user}
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user}
            >
              <StickerIcon className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user}
            >
              <ListIcon className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user}
            >
              <SmileIcon className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user}
            >
              <CalendarIcon className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user}
            >
              <MapPinIcon className="h-5 w-5" />
            </button>
          </div>
          
          {user ? (
            <Button 
              size="sm" 
              className="rounded-full px-4 bg-primary text-primary-foreground"
              onClick={handlePost}
              disabled={!content.trim()}
            >
              Post
            </Button>
          ) : (
            <SignInButton 
              mode="modal"
              fallbackRedirectUrl="/"
            >
              <Button 
                size="sm" 
                className="rounded-full px-4 bg-primary text-primary-foreground"
              >
                Login and Post
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
