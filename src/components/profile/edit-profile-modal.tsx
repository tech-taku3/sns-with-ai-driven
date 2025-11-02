"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useEffect } from "react";

interface EditProfileModalProps {
  user?: {
    displayName: string;
    bio?: string | null;
    profileImageUrl?: string | null;
    coverImageUrl?: string | null;
  };
}

export function EditProfileModal({ user }: EditProfileModalProps) {
  const router = useRouter();

  // ESCキーでモーダルを閉じる
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [router]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => router.back()}
      />

      {/* モーダルコンテンツ */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl m-4">
        {/* ヘッダー */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => router.back()}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold">Edit Profile</h2>
          </div>
          <Button
            size="sm"
            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-full px-4"
          >
            Save
          </Button>
        </div>

        {/* コンテンツ */}
        <div className="p-6">
          {/* カバー画像 */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Cover Image</label>
            <div className="relative h-48 rounded-lg overflow-hidden">
              {user?.coverImageUrl ? (
                <img 
                  src={user.coverImageUrl} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-full">
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="secondary" size="sm">
                  Change Cover
                </Button>
              </div>
            </div>
          </div>

          {/* プロフィール画像 */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Profile Image</label>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {user?.profileImageUrl && (
                  <img 
                    src={user.profileImageUrl} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <Button variant="secondary" size="sm">
                Change Photo
              </Button>
            </div>
          </div>

          {/* 名前 */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              defaultValue={user?.displayName || ""}
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Tell us about yourself"
              defaultValue={user?.bio || ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

