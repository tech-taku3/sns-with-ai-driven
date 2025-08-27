"use client";

import { Image as ImageIcon, Smile, CalendarDays } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Post {
  id: string;
  name: string;
  handle: string;
  content: string;
  likes: number;
}

const mockPosts: Post[] = [
  {
    id: "1",
    name: "Mario | 個人開発",
    handle: "@xmarioapps",
    content:
      "So many banana apps. People work so fast, they can't even wait for tomorrow",
    likes: 1800,
  },
  {
    id: "2",
    name: "SKGHEALTH",
    handle: "@SKGOfficial3",
    content:
      "Neck and back pain from too much screen time? Meet your new go-to.",
    likes: 430,
  },
];

export function Timeline() {
  return (
    <section className="min-h-screen border-x border-black/10 dark:border-white/10">
      <div className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/70 z-10">
        <div className="px-4 py-3 text-xl font-bold">For you</div>
        <div className="h-px bg-black/10 dark:bg-white/10" />
      </div>

      <div className="px-4 py-3 flex gap-3">
        <Avatar>
          <AvatarImage src="/vercel.svg" alt="me" />
        </Avatar>
        <div className="flex-1">
          <Input placeholder="What's happening?" />
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-black/60 dark:text-white/60">
              <ImageIcon className="h-5 w-5" />
              <Smile className="h-5 w-5" />
              <CalendarDays className="h-5 w-5" />
            </div>
            <Button size="sm">Post</Button>
          </div>
        </div>
      </div>
      <div className="h-2 bg-black/[.03] dark:bg-white/[.04]" />

      <ul>
        {mockPosts.map((p) => (
          <li key={p.id} className="px-4 py-3 flex gap-3 hover:bg-black/[.02] dark:hover:bg-white/[.03] transition">
            <Avatar>
              <AvatarImage src="/vercel.svg" alt={p.name} />
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 text-sm">
                <span className="font-semibold truncate">{p.name}</span>
                <span className="text-black/50 dark:text-white/50 truncate">{p.handle}</span>
              </div>
              <p className="mt-1 text-[15px] leading-6 whitespace-pre-wrap">{p.content}</p>
              <div className="mt-2 text-sm text-black/60 dark:text-white/60">❤ {p.likes.toLocaleString()}</div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Timeline;


