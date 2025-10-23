"use client";

import { useState, useTransition } from "react";
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
import { createPost } from "@/lib/actions/posts";

interface NewPostInputProps {
  className?: string;
  parentId?: string;
}

export function NewPostInput({ className = "", parentId }: NewPostInputProps) {
  const { user, isLoaded } = useUser();
  const [content, setContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handlePost = async () => {
    if (!user || !content.trim()) {
      return;
    }

    setError(null);

    startTransition(async () => {
      const result = await createPost({
        content,
        parentId,
      });

      if (result.success) {
        setContent("");
      } else {
        setError(result.error || "投稿に失敗しました。");
      }
    });
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
            disabled={!user || isPending}
          />
        </div>
        
        {error && (
          <div className="mb-3 text-sm text-red-500">
            {error}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex -ml-2">
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <StickerIcon className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <ListIcon className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <SmileIcon className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <CalendarIcon className="h-5 w-5" />
            </button>
            <button 
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <MapPinIcon className="h-5 w-5" />
            </button>
          </div>
          
          {user ? (
            <Button 
              size="sm" 
              className="rounded-full px-4 bg-primary text-primary-foreground"
              onClick={handlePost}
              disabled={!content.trim() || isPending}
            >
              {isPending ? "投稿中..." : "Post"}
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

