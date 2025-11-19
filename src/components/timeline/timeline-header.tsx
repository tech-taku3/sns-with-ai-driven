"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Home, Search, Bell, Mail, Rocket, Bookmark, Users, Briefcase, Star, Settings, User, LogOut } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import type { FollowStats } from "@/lib/dal/users";

interface TimelineHeaderProps {
  followStats?: FollowStats | null;
}

export function TimelineHeader({ followStats }: TimelineHeaderProps) {
  const [activeTab, setActiveTab] = useState<"for-you" | "following">("for-you");
  const { user } = useUser();

  const navigationItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Explore", href: "/explore" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Mail, label: "Messages", href: "/messages" },
    { icon: Rocket, label: "Grok", href: "/grok" },
    { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
    { icon: Briefcase, label: "Jobs", href: "/jobs" },
    { icon: Users, label: "Communities", href: "/communities" },
    { icon: Star, label: "Premium", href: "/premium" },
    { 
      icon: User, 
      label: "Profile", 
      href: user?.username ? `/${user.username}` : "/sign-in"
    },
    { icon: Settings, label: "More", href: "/more" },
  ];

  return (
    <div className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/70 z-10">
      {/* ヘッダー上部 */}
      <div className="grid grid-cols-3 items-center px-4 py-3">
        {/* モバイルのみ表示するプロフィールアイコン */}
        <div className="justify-self-start">
          <Sheet>
            <SheetTrigger asChild>
              <button className="lg:hidden rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage src={user?.imageUrl} alt={user?.username || "User"} />
                  <AvatarFallback>
                    {user?.firstName?.[0] || user?.username?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </button>
            </SheetTrigger>
          <SheetContent side="left" className="p-0 w-[280px]">
            <SheetHeader className="p-4 text-left">
              <SheetTitle>Account info</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col h-full pb-8">
              <div className="p-4 -mt-12">
                {user ? (
                  <Link
                    href={`/${user.username}`}
                    className="flex items-center gap-3 mb-4"
                  >
                  <Avatar>
                      <AvatarImage src={user.imageUrl} alt={user.username || "User"} />
                    <AvatarFallback>
                        {user.firstName?.[0] || user.username?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">
                        {user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}` 
                          : user.username || "User"}
                    </span>
                    <span className="text-black/50 dark:text-white/50">
                        @{user.username || user.emailAddresses[0]?.emailAddress.split("@")[0] || "user"}
                    </span>
                  </div>
                  </Link>
                ) : (
                  <SignInButton mode="modal" fallbackRedirectUrl="/">
                    <button
                      type="button"
                      className="flex items-center gap-3 mb-4 w-full text-left"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      onMouseDown={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Avatar>
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=guest" alt="guest" />
                        <AvatarFallback>G</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold">ゲスト</span>
                        <span className="text-black/50 dark:text-white/50">ログインしてください</span>
                </div>
                    </button>
                  </SignInButton>
                )}
                {user && (
                <Link 
                    href={`/${user.username}`}
                  className="flex gap-4 text-sm mb-6 hover:underline"
                >
                  <div>
                    <span className="font-semibold">{followStats?.followingCount ?? 0}</span>
                    <span className="text-black/50 dark:text-white/50 ml-1">Following</span>
                  </div>
                  <div>
                    <span className="font-semibold">{followStats?.followersCount ?? 0}</span>
                    <span className="text-black/50 dark:text-white/50 ml-1">Followers</span>
                  </div>
                </Link>
                )}
              </div>
              <nav className="flex-1">
                {navigationItems.map(({ icon: Icon, label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex items-center gap-4 px-6 py-3 hover:bg-black/[.05] dark:hover:bg-white/[.08] transition"
                  >
                    <Icon className="h-6 w-6" />
                    <span>{label}</span>
                  </Link>
                ))}

                {user && (
                  <SignOutButton redirectUrl="/">
                    <button
                      type="button"
                      className="w-full flex items-center gap-4 px-6 py-3 text-red-600 dark:text-red-400 hover:bg-black/[.05] dark:hover:bg-white/[.08] transition"
                    >
                      <LogOut className="h-6 w-6" />
                      <span>Log out</span>
                    </button>
                  </SignOutButton>
                )}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        </div>
        {/* 中央のXロゴ */}
        <div className="justify-self-center">
          <div className="w-8 h-8 relative">
            <Image
              src="/x-logo.svg"
              alt="X Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        {/* 右側の空のスペース（バランス用） */}
        <div className="justify-self-end">
          <div className="w-10 h-10" />
        </div>
      </div>

      {/* タブ */}
      <div className="flex">
        <button
          onClick={() => setActiveTab("for-you")}
          className={cn(
            "flex-1 relative px-4 py-4 text-[15px] font-medium transition-colors hover:bg-black/[.05] dark:hover:bg-white/[.08]",
            activeTab === "for-you" && "font-bold"
          )}
        >
          For you
          {activeTab === "for-you" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-14 h-1 bg-[#1d9bf0] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("following")}
          className={cn(
            "flex-1 relative px-4 py-4 text-[15px] font-medium transition-colors hover:bg-black/[.05] dark:hover:bg-white/[.08]",
            activeTab === "following" && "font-bold"
          )}
        >
          Following
          {activeTab === "following" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-14 h-1 bg-[#1d9bf0] rounded-full" />
          )}
        </button>
      </div>
      <div className="h-px bg-black/10 dark:bg-white/10" />
    </div>
  );
}