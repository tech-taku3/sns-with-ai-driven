"use client";

import { ArrowLeft, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  username?: string;
  displayName?: string;
  postsCount?: number;
}

export function ProfileHeader({ username = "tech_taku", displayName = "tech_taku", postsCount = 0 }: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/70 z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => router.back()}
            className="rounded-full p-2 hover:bg-black/[.05] dark:hover:bg-white/[.08] transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="font-bold text-xl">{displayName}</div>
            <div className="text-sm text-black/50 dark:text-white/50">{postsCount} posts</div>
          </div>
        </div>
        <button className="rounded-full p-2 hover:bg-black/[.05] dark:hover:bg-white/[.08] transition" aria-label="Search">
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
