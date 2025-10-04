interface ProfileBannerProps {
  className?: string;
}

export function ProfileBanner({ className = "" }: ProfileBannerProps) {
  return (
    <div className={`relative h-48 bg-gradient-to-r from-blue-400 to-purple-500 ${className}`}>
      <div className="absolute inset-0 bg-black/20"></div>
    </div>
  );
}
