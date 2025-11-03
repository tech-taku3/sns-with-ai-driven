"use client";

import { useActionState, useEffect, useRef } from "react";
import { useUser, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  ImageIcon, 
  SmileIcon, 
  StickerIcon, 
  ListIcon, 
  CalendarIcon, 
  MapPinIcon 
} from "lucide-react";
import { createPost, type ActionResult } from "@/lib/actions/posts";

interface NewPostInputProps {
  className?: string;
  parentId?: string;
}

type FormState = ActionResult<{ postId: string }> & {
  timestamp?: number;
};

export function NewPostInput({ className = "", parentId }: NewPostInputProps) {
  const { user, isLoaded } = useUser();
  const formRef = useRef<HTMLFormElement>(null);

  const initialState: FormState = {
    success: false,
  };

  const handleFormAction = async (
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> => {
    const content = formData.get("content") as string;
    
    const result = await createPost({
      content,
      parentId,
    });

    return {
      ...result,
      timestamp: Date.now(),
    };
  };

  const [state, formAction, isPending] = useActionState(
    handleFormAction,
    initialState
  );

  // 投稿成功時のフォームリセット
  useEffect(() => {
    if (state.success && state.timestamp) {
      formRef.current?.reset();
    }
  }, [state.success, state.timestamp]);

  return (
    <form ref={formRef} action={formAction} className={`flex gap-4 p-4 border-b ${className}`}>
      <Avatar>
        <AvatarImage 
          src={user?.imageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=guest"} 
        />
        <AvatarFallback>
          {user?.firstName?.charAt(0) || "G"}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1">
        <div className="mb-4">
          <input
            type="text"
            name="content"
            placeholder="What's happening?"
            className="w-full bg-transparent text-xl outline-none placeholder:text-gray-500"
            disabled={!user || isPending}
            required
          />
        </div>
        
        {!state.success && state.error && (
          <div className="mb-3 text-sm text-red-500">
            {state.error}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex -ml-2">
            <button 
              type="button"
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <ImageIcon className="h-5 w-5" />
            </button>
            <button 
              type="button"
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <StickerIcon className="h-5 w-5" />
            </button>
            <button 
              type="button"
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <ListIcon className="h-5 w-5" />
            </button>
            <button 
              type="button"
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <SmileIcon className="h-5 w-5" />
            </button>
            <button 
              type="button"
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <CalendarIcon className="h-5 w-5" />
            </button>
            <button 
              type="button"
              className="rounded-full p-2 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!user || isPending}
            >
              <MapPinIcon className="h-5 w-5" />
            </button>
          </div>
          
          {user ? (
            <Button 
              type="submit"
              size="sm" 
              className="rounded-full px-4 bg-primary text-primary-foreground"
              disabled={isPending}
            >
              {isPending ? "投稿中..." : "Post"}
            </Button>
          ) : (
            <SignInButton 
              mode="modal"
              fallbackRedirectUrl="/"
            >
              <Button 
                type="button"
                size="sm" 
                className="rounded-full px-4 bg-primary text-primary-foreground"
              >
                Login and Post
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </form>
  );
}

