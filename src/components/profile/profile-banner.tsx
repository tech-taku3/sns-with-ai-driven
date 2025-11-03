import Image from "next/image";

interface ProfileBannerProps {
  coverImageUrl?: string | null;
  className?: string;
}

export function ProfileBanner({ coverImageUrl, className = "" }: ProfileBannerProps) {
  return (
    <div className={`relative h-48 ${className}`}>
      {coverImageUrl ? (
        <Image
          src={coverImageUrl}
          alt="Cover image"
          fill
          sizes="600px"
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500">
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      )}
    </div>
  );
}
