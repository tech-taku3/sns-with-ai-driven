import { ProfileHeader } from "./profile/profile-header";
import { ProfileTabs } from "./profile/profile-tabs";
import { ProfileContent } from "./profile/profile-content";
import type { Post } from "@/lib/dal/posts";

interface ProfileProps {
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
  posts?: Post[];
  pinnedPost?: Post;
}

export function Profile({ user, posts, pinnedPost }: ProfileProps) {
  return (
    <section className="min-h-screen border-x border-gray-200 dark:border-gray-800">
      <ProfileHeader user={user} />
      <ProfileTabs />
      <ProfileContent posts={posts} pinnedPost={pinnedPost} />
    </section>
  );
}

export default Profile;
