"use client";

import { ArrowLeft, MoreHorizontal, MessageCircle, Share } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  user?: {
    username: string;
    displayName: string;
    profileImageUrl?: string | null | undefined;
    bio?: string | null;
    followersCount?: number;
    followingCount?: number;
    postsCount?: number;
    joinDate?: string;
    isVerified?: boolean;
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const router = useRouter();
  
  const defaultUser = {
    username: "tech_taku",
    displayName: "Tech Taku",
    profileImageUrl: undefined,
    bio: "個人開発者 | AI・Web技術について発信中 | 元シリコンバレーCTO",
    followersCount: 19100,
    followingCount: 495,
    postsCount: 7090,
    joinDate: "August 2021",
    isVerified: true
  };
  
  const profileUser = user || defaultUser;

  return (
    <div>
      {/* Header with back button */}
      <div className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/70 z-10 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => router.back()}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="font-bold text-xl">{profileUser.displayName}</div>
              <div className="text-sm text-gray-500">{profileUser.postsCount?.toLocaleString()} posts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Profile Info Section */}
      <div className="relative px-4 pb-0">
        {/* Profile Picture */}
        <div className="absolute -top-16 left-4">
          <Avatar className="w-32 h-32 border-4 border-white dark:border-gray-900">
            <AvatarImage src={profileUser.profileImageUrl || undefined} />
            <AvatarFallback className="text-2xl">{profileUser.displayName[0]}</AvatarFallback>
          </Avatar>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4">
          <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <MoreHorizontal className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <MessageCircle className="h-5 w-5" />
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
            <Share className="h-5 w-5" />
          </button>
          <Button className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
            Subscribe
          </Button>
        </div>

        {/* User Information */}
        <div className="mt-16">
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-xl font-bold">{profileUser.displayName}</h1>
            {profileUser.isVerified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          
          <div className="text-gray-500 mb-3">@{profileUser.username}</div>
          
          {profileUser.bio && (
            <div className="text-sm leading-relaxed mb-3 whitespace-pre-wrap">
              {profileUser.bio}
            </div>
          )}
          
          <div className="text-sm text-gray-500 mb-3">
            Joined {profileUser.joinDate}
          </div>
          
          <div className="flex gap-4 text-sm">
            <div className="flex gap-1">
              <span className="font-semibold">{profileUser.followingCount?.toLocaleString()}</span>
              <span className="text-gray-500">Following</span>
            </div>
            <div className="flex gap-1">
              <span className="font-semibold">{profileUser.followersCount?.toLocaleString()}</span>
              <span className="text-gray-500">Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
