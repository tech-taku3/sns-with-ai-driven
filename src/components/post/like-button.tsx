"use client";

import { Heart } from "lucide-react";
import { useActionState, useOptimistic } from "react";
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

  // 楽観的UI更新
  const [optimisticLike, setOptimisticLike] = useOptimistic(
    {
      isLiked: state.isLiked ?? initialIsLiked,
      likesCount: state.likesCount ?? initialLikesCount,
    },
    (current, newValue: { isLiked: boolean; likesCount: number }) => newValue
  );

  const handleSubmit = async (formData: FormData) => {
    // 即座にUIを更新（楽観的）
    setOptimisticLike({
      isLiked: !optimisticLike.isLiked,
      likesCount: optimisticLike.isLiked
        ? optimisticLike.likesCount - 1
        : optimisticLike.likesCount + 1,
    });

    // サーバーアクションを実行
    await formAction(formData);
  };

  const { isLiked, likesCount } = optimisticLike;

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="postId" value={postId} />
      <button
        type="submit"
        className={`flex items-center gap-1 group transition-opacity ${
          pending ? "opacity-50 cursor-not-allowed" : ""
        }`}
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

