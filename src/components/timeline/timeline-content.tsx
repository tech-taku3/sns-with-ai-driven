"use client";

import { useState } from "react";
import { 
  Image as ImageIcon, 
  Smile, 
  CalendarDays,
  MessageCircle,
  Repeat,
  Heart,
  BarChart3,
  Bookmark,
  Share2,
  X
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { getGlobalProfileImage } from "../timeline";
import { Post } from "@/types/post";
import { mockPosts } from "@/data/posts";

// 画像関連のユーティリティ関数
const getImageGridClass = (imageCount: number) => {
  switch (imageCount) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2 gap-1";
    case 3:
      return "grid-cols-3 gap-1";
    case 4:
      return "grid-cols-2 gap-1";
    default:
      return "grid-cols-1";
  }
};

const getImageHeightClass = (imageCount: number, index: number) => {
  if (imageCount === 1) return "h-64";
  if (imageCount === 2) return "h-48";
  if (imageCount === 3) return index === 0 ? "row-span-2 h-48" : "h-24";
  if (imageCount === 4) return "h-24";
  return "h-48";
};

// 投稿作成コンポーネント
const PostComposer = () => {
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string>(getGlobalProfileImage());

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0 && selectedImages.length < 4) {
      files.slice(0, 4 - selectedImages.length).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImages(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="px-4 py-3 flex gap-3">
      <Avatar>
        <AvatarImage src={profileImage} alt="me" />
        <AvatarFallback>me</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Input 
          placeholder="What's happening?" 
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        />
        
        {/* Image preview */}
        {selectedImages.length > 0 && (
          <div className="mt-3 rounded-2xl overflow-hidden">
            <div className={`grid ${getImageGridClass(selectedImages.length)}`}>
              {selectedImages.map((image, index) => (
                <div key={index} className={`relative ${getImageGridClass(selectedImages.length)}`}>
                  <img 
                    src={image} 
                    alt={`Preview ${index + 1}`} 
                    className={`w-full ${getImageHeightClass(selectedImages.length, index)} object-cover`}
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 rounded-full bg-black/60 text-white p-1 hover:bg-black/80 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-black/60 dark:text-white/60">
            <label className={`cursor-pointer transition-colors ${selectedImages.length >= 4 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}`}>
              <ImageIcon className="h-5 w-5" />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
                disabled={selectedImages.length >= 4}
              />
            </label>
            <Smile className="h-5 w-5" />
            <CalendarDays className="h-5 w-5" />
          </div>
          <Button size="sm">Post</Button>
        </div>
      </div>
    </div>
  );
};

// 投稿リストコンポーネント
const PostsList = () => {
  return (
    <ul>
      {mockPosts.map((p) => (
        <li key={p.id} className="px-4 py-3 flex gap-3 hover:bg-black/[.02] dark:hover:bg-white/[.03] transition cursor-pointer">
          <Avatar>
            <AvatarImage src="/vercel.svg" alt={p.name} />
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex gap-2 text-sm items-center">
              <span className="font-semibold truncate">{p.name}</span>
              <span className="text-black/50 dark:text-white/50 truncate">{p.handle}</span>
              <span className="text-black/30 dark:text-white/30">·</span>
              <span className="text-black/30 dark:text-white/30">{p.timestamp}</span>
            </div>
            <p className="mt-1 text-[15px] leading-6 whitespace-pre-wrap">{p.content}</p>
            
            {/* Post images */}
            {p.images && p.images.length > 0 && (
              <div className="mt-3 rounded-2xl overflow-hidden">
                <div className={`grid ${getImageGridClass(p.images.length)}`}>
                  {p.images?.map((image, index) => (
                    <div key={index} className={`relative ${getImageGridClass(p.images!.length)}`}>
                      <img 
                        src={image} 
                        alt={`Post content ${index + 1}`} 
                        className={`w-full ${getImageHeightClass(p.images!.length, index)} object-cover`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Engagement buttons */}
            <div className="mt-3 flex items-center justify-between max-w-md">
              <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-blue-500 hover:bg-blue-500/10 rounded-full p-2 transition-colors">
                <MessageCircle className="h-4 w-4" />
                <span>{p.comments}</span>
              </button>
              
              <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-green-500 hover:bg-green-500/10 rounded-full p-2 transition-colors">
                <Repeat className="h-4 w-4" />
                <span>{p.retweets}</span>
              </button>
              
              <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-pink-500 hover:bg-pink-500/10 rounded-full p-2 transition-colors">
                <Heart className="h-4 w-4" />
                <span>{p.likes}</span>
              </button>
              
              <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-blue-500 hover:bg-blue-500/10 rounded-full p-2 transition-colors">
                <BarChart3 className="h-4 w-4" />
                <span>{p.insights >= 1000 ? `${(p.insights / 1000).toFixed(0)}K` : p.insights.toLocaleString()}</span>
              </button>
              
              <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-blue-500 hover:bg-blue-500/10 rounded-full p-2 transition-colors">
                <Bookmark className="h-4 w-4" />
              </button>
              
              <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-blue-500 hover:bg-blue-500/10 rounded-full p-2 transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export function TimelineContent() {
  return (
    <div className="flex-1 overflow-y-auto">
      <PostComposer />
      <div className="h-2 bg-black/[.03] dark:bg-white/[.04]" />
      <PostsList />
    </div>
  );
}