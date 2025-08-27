"use client";

import { useState } from "react";
import { 
  Image as ImageIcon, 
  Smile, 
  CalendarDays,
  MessageCircle,
  Repeat,
  Heart,
  BarChart3,
  Bookmark,
  Share2
} from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface Post {
  id: string;
  name: string;
  handle: string;
  content: string;
  timestamp: string;
  comments: number;
  retweets: number;
  likes: number;
  insights: number;
}

const mockPosts: Post[] = [
  {
    id: "1",
    name: "日本経済新聞 電子版(日経電子版)",
    handle: "@nikkei",
    content: "【民泊OKマンション、札幌に続々】大和ハウス、観光や食で「第2の家」に熱(無料記事)",
    timestamp: "56m",
    comments: 3,
    retweets: 23,
    likes: 23,
    insights: 32000,
  },
  {
    id: "2",
    name: "X Developers",
    handle: "@XDevelopers",
    content: "Calling all developers! Innovate with our real-time and historical data on the X API. Get started with Pro",
    timestamp: "2h",
    comments: 15,
    retweets: 45,
    likes: 89,
    insights: 125000,
  },
];

export function Timeline() {
  const [activeTab, setActiveTab] = useState<"for-you" | "following">("following");

  return (
    <section className="min-h-screen border-x border-black/10 dark:border-white/10">
      {/* Header with tabs */}
      <div className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/70 z-10">
        <div className="flex">
          <button
            onClick={() => setActiveTab("for-you")}
            className={`flex-1 px-4 py-3 text-lg font-medium transition-colors ${
              activeTab === "for-you"
                ? "text-foreground"
                : "text-black/60 dark:text-white/60 hover:bg-black/[.05] dark:hover:bg-white/[.08]"
            }`}
          >
            For you
          </button>
          <button
            onClick={() => setActiveTab("following")}
            className={`flex-1 px-4 py-3 text-lg font-medium transition-colors relative ${
              activeTab === "following"
                ? "text-foreground"
                : "text-black/60 dark:text-white/60 hover:bg-black/[.05] dark:hover:bg-white/[.08]"
            }`}
          >
            Following
            {activeTab === "following" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-blue-500" />
            )}
          </button>
        </div>
        <div className="h-px bg-black/10 dark:bg-white/10" />
      </div>

      {/* Post composer */}
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

      {/* Posts list */}
      <ul>
        {mockPosts.map((p) => (
          <li key={p.id} className="px-4 py-3 flex gap-3 hover:bg-black/[.02] dark:hover:bg-white/[.03] transition cursor-pointer">
            <Avatar>
              <AvatarImage src="/vercel.svg" alt={p.name} />
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 text-sm items-center">
                <span className="font-semibold truncate">{p.name}</span>
                <span className="text-black/50 dark:text-white/50 truncate">{p.handle}</span>
                <span className="text-black/30 dark:text-white/30">·</span>
                <span className="text-black/30 dark:text-white/30">{p.timestamp}</span>
              </div>
              <p className="mt-1 text-[15px] leading-6 whitespace-pre-wrap">{p.content}</p>
              
              {/* Engagement buttons */}
              <div className="mt-3 flex items-center justify-between max-w-md">
                <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-blue-500 hover:bg-blue-500/10 rounded-full p-2 transition-colors">
                  <MessageCircle className="h-4 w-4" />
                  <span>{p.comments}</span>
                </button>
                
                <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-green-500 hover:bg-green-500/10 rounded-full p-2 transition-colors">
                  <Repeat className="h-4 w-4" />
                  <span>{p.retweets}</span>
                </button>
                
                <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-pink-500 hover:bg-pink-500/10 rounded-full p-2 transition-colors">
                  <Heart className="h-4 w-4" />
                  <span>{p.likes}</span>
                </button>
                
                <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-blue-500 hover:bg-blue-500/10 rounded-full p-2 transition-colors">
                  <BarChart3 className="h-4 w-4" />
                  <span>{p.insights >= 1000 ? `${(p.insights / 1000).toFixed(0)}K` : p.insights.toLocaleString()}</span>
                </button>
                
                <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-blue-500 hover:bg-blue-500/10 rounded-full p-2 transition-colors">
                  <Bookmark className="h-4 w-4" />
                </button>
                
                <button className="flex items-center gap-2 text-sm text-black/60 dark:text-white/60 hover:text-blue-500 hover:bg-blue-500/10 rounded-full p-2 transition-colors">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Timeline;


