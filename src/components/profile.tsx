import { ProfileHeader } from "./profile/profile-header";
import { ProfileTabs } from "./profile/profile-tabs";
import { ProfileContent } from "./profile/profile-content";
import type { Post } from "@/lib/dal/posts";

interface ProfileProps {
  user?: {
    id?: string;
    username: string;
    displayName: string;
    profileImageUrl?: string | null | undefined;
    coverImageUrl?: string | null | undefined;
    bio?: string | null;
    followersCount?: number;
    followingCount?: number;
    postsCount?: number;
    joinDate?: string;
    isVerified?: boolean;
    isFollowing?: boolean;
  };
  posts?: Post[];
  isOwnProfile?: boolean;
}

export function Profile({ user, posts, isOwnProfile = false }: ProfileProps) {
  return (
    <section className="min-h-screen border-x border-gray-200 dark:border-gray-800">
      <ProfileHeader user={user} isOwnProfile={isOwnProfile} />
      <ProfileTabs />
      <ProfileContent posts={posts} />
    </section>
  );
}

export default Profile;
