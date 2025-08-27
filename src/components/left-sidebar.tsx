"use client";

import Link from "next/link";
import { Home, Search, Bell, Mail, Rocket, Bookmark, Users, Briefcase, Star, Settings, User } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

export function LeftSidebar() {
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
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "More", href: "/more" },
  ];

  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-[275px] shrink-0 flex-col justify-between px-3 py-2">
      <div className="flex flex-col gap-2">
        <div className="px-4 py-3 text-2xl font-bold">X</div>
        {items.map(({ icon: Icon, label, href }) => (
          <Link key={label} href={href} className="rounded-full px-4 py-3 text-xl hover:bg-black/[.05] dark:hover:bg-white/[.08] transition">
            <div className="flex items-center gap-4">
              <Icon className="h-6 w-6" />
              <span className="hidden xl:inline">{label}</span>
            </div>
          </Link>
        ))}
        <Button className="mt-2 w-full hidden xl:inline-flex">Post</Button>
      </div>
      <Link href="/profile" className="flex items-center gap-3 rounded-full p-3 hover:bg-black/[.05] dark:hover:bg-white/[.08] transition">
        <Avatar>
          <AvatarImage src="/vercel.svg" alt="me" />
        </Avatar>
        <div className="hidden xl:flex flex-col text-sm">
          <span className="font-semibold">tech_taku</span>
          <span className="text-black/50 dark:text-white/50">@TechTaku3</span>
        </div>
      </Link>
    </aside>
  );
}

export default LeftSidebar;


