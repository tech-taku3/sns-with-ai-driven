"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { X, Camera } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/users";
import { uploadImage } from "@/lib/actions/upload";

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
  const coverInputRef = useRef<HTMLInputElement>(null);
  const profileInputRef = useRef<HTMLInputElement>(null);

  const [state, formAction, pending] = useActionState(updateProfile, {});
  const [coverPreview, setCoverPreview] = useState<string | null>(user?.coverImageUrl || null);
  const [profilePreview, setProfilePreview] = useState<string | null>(user?.profileImageUrl || null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingProfile, setUploadingProfile] = useState(false);

  // 成功時にモーダルを閉じる
  useEffect(() => {
    if (state.message) {
      router.back();
    }
  }, [state.message, router]);

  const handleCoverChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // プレビュー表示
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // アップロード
    setUploadingCover(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "cover");
    
    const result = await uploadImage({}, formData);
    setUploadingCover(false);

    if (result.url) {
      setCoverPreview(result.url);
    } else if (result.error) {
      alert(result.error);
    }
  };

  const handleProfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // プレビュー表示
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // アップロード
    setUploadingProfile(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "profile");
    
    const result = await uploadImage({}, formData);
    setUploadingProfile(false);

    if (result.url) {
      setProfilePreview(result.url);
    } else if (result.error) {
      alert(result.error);
    }
  };

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
      <form action={formAction} className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl m-4">
        {/* ヘッダー */}
        <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-bold">Edit Profile</h2>
          </div>
          <Button
            type="submit"
            size="sm"
            className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-full px-4"
            disabled={pending}
          >
            {pending ? "保存中..." : "Save"}
          </Button>
        </div>

        {/* エラーメッセージ */}
        {state.error && (
          <div className="px-6 pt-4">
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
              {state.error}
            </div>
          </div>
        )}

        {/* コンテンツ */}
        <div className="p-6">
          {/* Hidden inputs for image URLs */}
          <input type="hidden" name="profileImageUrl" value={profilePreview || ""} />
          <input type="hidden" name="coverImageUrl" value={coverPreview || ""} />

          {/* カバー画像 */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Cover Image</label>
            <div className="relative h-48 rounded-lg overflow-hidden group cursor-pointer" onClick={() => coverInputRef.current?.click()}>
              {coverPreview ? (
                <img 
                  src={coverPreview} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-full">
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 bg-black/60 text-white px-4 py-2 rounded-full">
                  <Camera className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {uploadingCover ? "アップロード中..." : "Change Cover"}
                  </span>
                </div>
              </div>
            </div>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={handleCoverChange}
              disabled={uploadingCover || pending}
            />
          </div>

          {/* プロフィール画像 */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Profile Image</label>
            <div className="flex items-center gap-4">
              <div 
                className="relative w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden group cursor-pointer"
                onClick={() => profileInputRef.current?.click()}
              >
                {profilePreview ? (
                  <img 
                    src={profilePreview} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 dark:bg-gray-600" />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button 
                  type="button"
                  variant="secondary" 
                  size="sm"
                  onClick={() => profileInputRef.current?.click()}
                  disabled={uploadingProfile || pending}
                >
                  {uploadingProfile ? "アップロード中..." : "Change Photo"}
                </Button>
                <p className="text-xs text-gray-500">JPEG, PNG, WebP (最大5MB)</p>
              </div>
            </div>
            <input
              ref={profileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={handleProfileChange}
              disabled={uploadingProfile || pending}
            />
          </div>

          {/* 名前 */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="displayName"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Your name"
              defaultValue={user?.displayName || ""}
              required
              disabled={pending}
            />
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              name="bio"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Tell us about yourself"
              defaultValue={user?.bio || ""}
              disabled={pending}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

