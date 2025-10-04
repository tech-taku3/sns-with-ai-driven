"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileNavProps {
  displayName: string;
  postsCount?: number;
  onBackClick?: () => void;
  className?: string;
}

export function ProfileNav({
  displayName,
  postsCount,
  onBackClick,
  className = ""
}: ProfileNavProps) {
  const router = useRouter();

  return (
    <div className={`sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/70 z-10 border-b border-gray-200 dark:border-gray-800 ${className}`}>
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBackClick || (() => router.back())}
            className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="font-bold text-xl">{displayName}</div>
            <div className="text-sm text-gray-500">{postsCount?.toLocaleString()} posts</div>
          </div>
        </div>
      </div>
    </div>
  );
}
