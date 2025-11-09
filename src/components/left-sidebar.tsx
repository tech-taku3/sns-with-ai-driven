"use client";

import Link from "next/link";
import { Home, Search, Bell, Mail, Rocket, Bookmark, Users, Briefcase, Star, Settings, User } from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

export function LeftSidebar() {
  const { user } = useUser();
  
  const items = [
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
      href: user?.username 
        ? `/${user.username}` 
        : "/profile" 
    },
    { icon: Settings, label: "More", href: "/more" },
  ];

  return (
    <header className="hidden md:flex w-[68px] lg:w-[275px] shrink-0">
      <div className="fixed flex flex-col h-screen overflow-auto scrollbar-none w-[68px] lg:w-[275px]">
        <div className="flex flex-col">
          <Link href="/" className="flex w-[52px] h-[52px] items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full mx-auto lg:mx-0">
            <span className="text-2xl font-bold">X</span>
          </Link>
          <nav className="flex flex-col gap-1 mt-0.5">
            {items.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center justify-center lg:justify-start w-fit px-3 py-3 text-xl rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors mx-auto lg:mx-0"
              >
                <div className="flex items-center gap-5 text-[20px]">
                  <Icon className="h-[26px] w-[26px] shrink-0" />
                  <span className="hidden lg:inline pr-4">{label}</span>
                </div>
              </Link>
            ))}
          </nav>
          <Button className="mt-4 w-[52px] h-[52px] lg:w-[90%] lg:h-[52px] rounded-full text-[17px] mx-auto lg:mx-0 p-0 lg:p-4" size="lg">
            <span className="hidden lg:inline">Post</span>
            <span className="lg:hidden text-2xl">+</span>
          </Button>
        </div>
        <div className="flex-1 min-h-[8px]" />
        <div>
          {user ? (
            <div className="flex items-center justify-center lg:justify-start gap-3 p-3 m-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10",
                    userButtonPopoverCard: "shadow-lg border border-gray-200",
                    userButtonPopoverActions: "p-2",
                    userButtonPopoverActionButton: "hover:bg-gray-100 rounded-lg",
                    userButtonPopoverFooter: "hidden"
                  }
                }}
                userProfileMode="modal"
                afterSignOutUrl="/"
              />
              <div className="hidden lg:flex flex-col text-[15px] flex-1">
                <span className="font-bold leading-5">
                  {user.firstName && user.lastName 
                    ? `${user.firstName} ${user.lastName}` 
                    : user.username || "User"
                  }
                </span>
                <span className="text-gray-500">
                  @{user.username || user.emailAddresses[0]?.emailAddress.split('@')[0] || "user"}
                </span>
              </div>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="flex items-center justify-center lg:justify-start gap-3 p-3 m-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=guest" alt="guest" />
                <AvatarFallback>G</AvatarFallback>
              </Avatar>
              <div className="hidden lg:flex flex-col text-[15px]">
                <span className="font-bold leading-5">ゲスト</span>
                <span className="text-gray-500">ログインしてください</span>
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}