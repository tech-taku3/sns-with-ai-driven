"use client";

import { Heart } from "lucide-react";
import { useActionState } from "react";
import { toggleLike } from "@/lib/actions/likes";

interface LikeButtonProps {
  postId: string;
  initialLikesCount: number;
  initialIsLiked: boolean;
}

export function LikeButton({
  postId,
  initialLikesCount,
  initialIsLiked,
}: LikeButtonProps) {
  const [state, formAction, pending] = useActionState(toggleLike, {
    isLiked: initialIsLiked,
    likesCount: initialLikesCount,
  });

  const isLiked = state.isLiked ?? initialIsLiked;
  const likesCount = state.likesCount ?? initialLikesCount;

  return (
    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <button
        type="submit"
        className="flex items-center gap-1 group"
        disabled={pending}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`rounded-full p-1.5 group-hover:bg-pink-500/10 ${
            isLiked ? "bg-pink-500/10" : ""
          }`}
        >
          <Heart
            className={`h-4 w-4 group-hover:text-pink-500 ${
              isLiked ? "text-pink-500 fill-pink-500" : ""
            }`}
          />
        </div>
        <span
          className={`text-xs group-hover:text-pink-500 ${
            isLiked ? "text-pink-500" : ""
          }`}
        >
          {likesCount}
        </span>
      </button>
    </form>
  );
}

