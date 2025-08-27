"use client";

import Link from "next/link";
import { Home, Search, Bell, Mail, Rocket, Bookmark, Users, Briefcase, Star, Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

export function LeftSidebar() {
  const items = [
    { icon: Home, label: "Home" },
    { icon: Search, label: "Explore" },
    { icon: Bell, label: "Notifications" },
    { icon: Mail, label: "Messages" },
    { icon: Rocket, label: "Grok" },
    { icon: Bookmark, label: "Bookmarks" },
    { icon: Briefcase, label: "Jobs" },
    { icon: Users, label: "Communities" },
    { icon: Star, label: "Premium" },
    { icon: Settings, label: "More" },
  ];

  return (
    <aside className="hidden lg:flex sticky top-0 h-screen w-[275px] shrink-0 flex-col justify-between px-3 py-2">
      <div className="flex flex-col gap-2">
        <div className="p-2 text-2xl font-bold">X</div>
        {items.map(({ icon: Icon, label }) => (
          <Link key={label} href="#" className="rounded-full px-4 py-3 text-xl hover:bg-black/[.05] dark:hover:bg-white/[.08] transition">
            <div className="flex items-center gap-4">
              <Icon className="h-6 w-6" />
              <span className="hidden xl:inline">{label}</span>
            </div>
          </Link>
        ))}
        <Button className="mt-2 w-full hidden xl:inline-flex">Post</Button>
      </div>
      <div className="flex items-center gap-3 rounded-full p-3 hover:bg-black/[.05] dark:hover:bg-white/[.08] transition">
        <Avatar>
          <AvatarImage src="/vercel.svg" alt="me" />
        </Avatar>
        <div className="hidden xl:flex flex-col text-sm">
          <span className="font-semibold">tech_taku</span>
          <span className="text-black/50 dark:text-white/50">@TechTaku3</span>
        </div>
      </div>
    </aside>
  );
}

export default LeftSidebar;


