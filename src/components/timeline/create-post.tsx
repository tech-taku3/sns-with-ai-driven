"use client";

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
  return (
    <div className={`flex gap-4 p-4 border-b ${className}`}>
      <Avatar>
        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=current-user" />
        <AvatarFallback>Me</AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="mb-4">
          <input
            type="text"
            placeholder="What's happening?"
            className="w-full bg-transparent text-xl outline-none placeholder:text-gray-500"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex -ml-2">
            <button className="rounded-full p-2 hover:bg-primary/10">
              <ImageIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-primary/10">
              <StickerIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-primary/10">
              <ListIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-primary/10">
              <SmileIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-primary/10">
              <CalendarIcon className="h-5 w-5" />
            </button>
            <button className="rounded-full p-2 hover:bg-primary/10">
              <MapPinIcon className="h-5 w-5" />
            </button>
          </div>
          
          <Button 
            size="sm" 
            className="rounded-full px-4 bg-primary text-primary-foreground"
            onClick={() => onSubmit?.("")}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
