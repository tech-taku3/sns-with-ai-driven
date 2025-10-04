import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  profileImageUrl?: string | null;
  displayName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function UserAvatar({ 
  profileImageUrl, 
  displayName, 
  size = "md",
  className = ""
}: UserAvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10", 
    lg: "w-32 h-32"
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl"
  };

  return (
    <Avatar className={`${sizeClasses[size]} ${className}`}>
      <AvatarImage src={profileImageUrl ?? undefined} />
      <AvatarFallback className={textSizeClasses[size]}>
        {displayName[0]}
      </AvatarFallback>
    </Avatar>
  );
}
