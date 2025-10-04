import Image from "next/image";

interface PostMediaProps {
  mediaUrl: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function PostMedia({
  mediaUrl,
  alt = "Post media",
  width = 400,
  height = 200,
  className = ""
}: PostMediaProps) {
  return (
    <div className={`mt-2 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 ${className}`}>
      <Image
        src={mediaUrl}
        alt={alt}
        width={width}
        height={height}
        className="w-full object-cover"
      />
    </div>
  );
}
