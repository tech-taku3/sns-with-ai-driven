import { ProfileNav } from "./profile-nav";
import { ProfileBanner } from "./profile-banner";
import { ProfileActions } from "./profile-actions";
import { ProfileInfo } from "./profile-info";
import { UserAvatar } from "@/components/shared/user-avatar";

interface ProfileHeaderProps {
  user?: {
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
  };
  isOwnProfile?: boolean;
}

export function ProfileHeader({ user, isOwnProfile = false }: ProfileHeaderProps) {
  const defaultUser = {
    username: "tech_taku",
    displayName: "Tech Taku",
    profileImageUrl: undefined,
    coverImageUrl: undefined,
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
      <ProfileNav 
        displayName={profileUser.displayName}
        postsCount={profileUser.postsCount}
      />
      
      <ProfileBanner coverImageUrl={profileUser.coverImageUrl} />
      
      <div className="relative px-4 pb-0">
        {/* Profile Picture */}
        <div className="absolute -top-16 left-4">
          <UserAvatar
            profileImageUrl={profileUser.profileImageUrl}
            displayName={profileUser.displayName}
            size="lg"
            className="border-4 border-white dark:border-gray-900"
          />
        </div>

        <ProfileActions isOwnProfile={isOwnProfile} />

        <ProfileInfo user={profileUser} />
      </div>
    </div>
  );
}
