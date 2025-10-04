interface ProfileInfoProps {
  user: {
    username: string;
    displayName: string;
    profileImageUrl?: string | null;
    bio?: string | null;
    followersCount?: number;
    followingCount?: number;
    joinDate?: string;
    isVerified?: boolean;
  };
  className?: string;
}

export function ProfileInfo({ user, className = "" }: ProfileInfoProps) {
  return (
    <div className={`mt-16 ${className}`}>
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-xl font-bold">{user.displayName}</h1>
        {user.isVerified && (
          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      
      <div className="text-gray-500 mb-3">@{user.username}</div>
      
      {user.bio && (
        <div className="text-sm leading-relaxed mb-3 whitespace-pre-wrap">
          {user.bio}
        </div>
      )}
      
      <div className="text-sm text-gray-500 mb-3">
        Joined {user.joinDate}
      </div>
      
      <div className="flex gap-4 text-sm">
        <div className="flex gap-1">
          <span className="font-semibold">{user.followingCount?.toLocaleString()}</span>
          <span className="text-gray-500">Following</span>
        </div>
        <div className="flex gap-1">
          <span className="font-semibold">{user.followersCount?.toLocaleString()}</span>
          <span className="text-gray-500">Followers</span>
        </div>
      </div>
    </div>
  );
}
