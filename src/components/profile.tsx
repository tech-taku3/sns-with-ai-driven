"use client";

import { useState } from "react";
import { 
  ArrowLeft,
  Calendar,
  MapPin,
  Link as LinkIcon,
  MessageCircle,
  Repeat,
  Heart,
  BarChart3,
  Bookmark,
  Share2
} from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
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

const profilePosts: Post[] = [
  {
    id: "1",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "Next.js + shadcn/ui でSNSアプリを作成中。TypeScriptとTailwindCSSを使ったモダンな開発体験が素晴らしい！",
    timestamp: "2h",
    comments: 5,
    retweets: 12,
    likes: 34,
    insights: 8900,
  },
  {
    id: "2",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "AI駆動の開発ツールの進歩が凄まじい。CursorとGitHub Copilotを組み合わせると、コードの品質と開発速度が格段に向上する。",
    timestamp: "1d",
    comments: 8,
    retweets: 23,
    likes: 67,
    insights: 15600,
  },
];

export function Profile() {
  const [activeTab, setActiveTab] = useState<"posts" | "replies" | "media" | "likes">("posts");

  return (
    <section className="min-h-screen border-x border-black/10 dark:border-white/10">
      {/* Header with back button */}
      <div className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/70 z-10">
        <div className="flex items-center gap-6 px-4 py-3">
          <button className="rounded-full p-2 hover:bg-black/[.05] dark:hover:bg-white/[.08] transition">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="font-bold text-lg">tech_taku</div>
            <div className="text-sm text-black/60 dark:text-white/60">3,456 posts</div>
          </div>
        </div>
        <div className="h-px bg-black/10 dark:bg-white/10" />
      </div>

      {/* Profile header */}
      <div className="relative">
        {/* Cover image */}
        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
        
        {/* Profile info */}
        <div className="px-4 pb-4">
          {/* Avatar */}
          <div className="relative -mt-16 mb-4">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src="/vercel.svg" alt="tech_taku" />
            </Avatar>
          </div>
          
          {/* Follow button */}
          <div className="flex justify-end mb-4">
            <Button variant="outline" className="font-bold">
              Follow
            </Button>
          </div>
          
          {/* Profile details */}
          <div className="mb-4">
            <h1 className="text-xl font-bold mb-1">tech_taku</h1>
            <p className="text-black/60 dark:text-white/60 mb-3">@TechTaku3</p>
            <p className="mb-3">フルスタックエンジニア。Next.js、TypeScript、AI技術が好き。新しい技術の探求と実践を楽しんでいます。</p>
            
            {/* Profile metadata */}
            <div className="flex flex-wrap gap-4 text-sm text-black/60 dark:text-white/60 mb-3">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Tokyo, Japan</span>
              </div>
              <div className="flex items-center gap-1">
                <LinkIcon className="h-4 w-4" />
                <span className="text-blue-500 hover:underline cursor-pointer">github.com/tech-taku3</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Joined June 2023</span>
              </div>
            </div>
            
            {/* Following/Followers */}
            <div className="flex gap-4 text-sm">
              <div className="hover:underline cursor-pointer">
                <span className="font-semibold">1,234</span> <span className="text-black/60 dark:text-white/60">Following</span>
              </div>
              <div className="hover:underline cursor-pointer">
                <span className="font-semibold">5,678</span> <span className="text-black/60 dark:text-white/60">Followers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile tabs */}
      <div className="border-b border-black/10 dark:border-white/10">
        <div className="flex">
          {[
            { key: "posts", label: "Posts" },
            { key: "replies", label: "Replies" },
            { key: "media", label: "Media" },
            { key: "likes", label: "Likes" }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as typeof activeTab)}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === key
                  ? "text-foreground"
                  : "text-black/60 dark:text-white/60 hover:bg-black/[.05] dark:hover:bg-white/[.08]"
              }`}
            >
              {label}
              {activeTab === key && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-blue-500" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Posts */}
      <ul>
        {profilePosts.map((p) => (
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

export default Profile;
