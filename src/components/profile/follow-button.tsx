"use client";

import { Button } from "@/components/ui/button";
import { useActionState, useOptimistic } from "react";
import { toggleFollow } from "@/lib/actions/follows";

interface FollowButtonProps {
  targetUserId: string;
  initialIsFollowing: boolean;
  initialFollowersCount: number;
}

export function FollowButton({
  targetUserId,
  initialIsFollowing,
  initialFollowersCount,
}: FollowButtonProps) {
  const [state, formAction, pending] = useActionState(toggleFollow, {
    isFollowing: initialIsFollowing,
    followersCount: initialFollowersCount,
  });

  // 楽観的UI更新
  const [optimisticFollow, setOptimisticFollow] = useOptimistic(
    {
      isFollowing: state.isFollowing ?? initialIsFollowing,
      followersCount: state.followersCount ?? initialFollowersCount,
    },
    (current, newValue: { isFollowing: boolean; followersCount: number }) => newValue
  );

  const handleSubmit = async (formData: FormData) => {
    // 即座にUIを更新（楽観的）
    setOptimisticFollow({
      isFollowing: !optimisticFollow.isFollowing,
      followersCount: optimisticFollow.isFollowing
        ? optimisticFollow.followersCount - 1
        : optimisticFollow.followersCount + 1,
    });

    // サーバーアクションを実行
    await formAction(formData);
  };

  const { isFollowing } = optimisticFollow;

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="targetUserId" value={targetUserId} />
      <Button
        type="submit"
        className={`rounded-full px-4 transition-opacity ${
          pending ? "opacity-50 cursor-not-allowed" : ""
        } ${
          isFollowing
            ? "bg-transparent border border-gray-300 dark:border-gray-700 text-black dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 hover:text-red-600 dark:hover:text-red-400"
            : "bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
        }`}
        disabled={pending}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </form>
  );
}

