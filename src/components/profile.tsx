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
  Share2,
  Image as ImageIcon,
  Smile,
  X,
  Camera,
  CalendarDays
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { setGlobalProfileImage } from "./timeline";

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
  images?: string[];
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
    images: ["https://picsum.photos/400/300?random=101"],
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
    images: ["https://picsum.photos/400/300?random=102", "https://picsum.photos/400/300?random=103"],
  },
  {
    id: "3",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "TypeScriptの型安全性が開発効率を劇的に向上させる。特に大規模プロジェクトでは必須の技術だと実感している。",
    timestamp: "2d",
    comments: 12,
    retweets: 45,
    likes: 123,
    insights: 23400,
  },
  {
    id: "4",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "TailwindCSSのユーティリティファーストアプローチが気に入っている。デザインシステムと組み合わせると最高の開発体験が得られる。",
    timestamp: "3d",
    comments: 6,
    retweets: 18,
    likes: 56,
    insights: 12300,
    images: ["https://picsum.photos/400/300?random=104", "https://picsum.photos/400/300?random=105", "https://picsum.photos/400/300?random=106"],
  },
  {
    id: "5",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "React Server Componentsの概念が理解できてきた。クライアントサイドのバンドルサイズを削減できるのは大きなメリットだ。",
    timestamp: "4d",
    comments: 9,
    retweets: 31,
    likes: 78,
    insights: 18700,
  },
  {
    id: "6",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "GitHub ActionsでCI/CDパイプラインを構築中。自動テストとデプロイの自動化が開発フローを大幅に改善している。",
    timestamp: "5d",
    comments: 15,
    retweets: 52,
    likes: 145,
    insights: 28900,
    images: ["https://picsum.photos/400/300?random=107", "https://picsum.photos/400/300?random=108", "https://picsum.photos/400/300?random=109", "https://picsum.photos/400/300?random=110"],
  },
  {
    id: "7",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "Vercelでのデプロイ体験が最高。GitHubと連携してプルリクエストごとにプレビューデプロイができるのは革命的。",
    timestamp: "6d",
    comments: 7,
    retweets: 28,
    likes: 89,
    insights: 16700,
  },
  {
    id: "8",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "shadcn/uiのコンポーネント設計思想が素晴らしい。カスタマイズ性と再利用性のバランスが完璧だ。",
    timestamp: "1w",
    comments: 11,
    retweets: 39,
    likes: 112,
    insights: 22300,
    images: ["https://picsum.photos/400/300?random=111"],
  },
  {
    id: "9",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "Zodでスキーマバリデーションを実装した。型安全性とランタイムバリデーションを両立できるのが最高。",
    timestamp: "1w",
    comments: 13,
    retweets: 47,
    likes: 134,
    insights: 25600,
  },
  {
    id: "10",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "PrismaとTypeScriptの組み合わせが強力すぎる。データベーススキーマから型定義を自動生成してくれるのは革命的。",
    timestamp: "1w",
    comments: 8,
    retweets: 25,
    likes: 67,
    insights: 14500,
    images: ["https://picsum.photos/400/300?random=112", "https://picsum.photos/400/300?random=113"],
  },
  {
    id: "11",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "Next.js 14のApp RouterとServer Actionsを活用したフォーム処理が驚くほどシンプルになった。",
    timestamp: "2w",
    comments: 16,
    retweets: 58,
    likes: 178,
    insights: 31200,
  },
  {
    id: "12",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "React Query（TanStack Query）でサーバー状態管理を実装。キャッシュ戦略とUI状態の同期が美しく解決される。",
    timestamp: "2w",
    comments: 14,
    retweets: 41,
    likes: 156,
    insights: 27800,
  },
  {
    id: "13",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "Docker Composeで開発環境を統一化した。チーム全体の開発効率が格段に向上している。",
    timestamp: "3w",
    comments: 10,
    retweets: 33,
    likes: 98,
    insights: 18900,
    images: ["https://picsum.photos/400/300?random=114", "https://picsum.photos/400/300?random=115", "https://picsum.photos/400/300?random=116"],
  },
  {
    id: "14",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "Jest + Testing Libraryでユニットテストとコンポーネントテストを充実させている。品質向上に直結している。",
    timestamp: "3w",
    comments: 12,
    retweets: 36,
    likes: 87,
    insights: 16700,
  },
  {
    id: "15",
    name: "tech_taku",
    handle: "@TechTaku3",
    content: "Storybookでコンポーネントドキュメントを整備中。開発者体験とデザイナーとの連携が大幅に改善された。",
    timestamp: "4w",
    comments: 9,
    retweets: 29,
    likes: 73,
    insights: 14300,
    images: ["https://picsum.photos/400/300?random=117", "https://picsum.photos/400/300?random=118", "https://picsum.photos/400/300?random=119", "https://picsum.photos/400/300?random=120"],
  },
];

export function Profile() {
  const [activeTab, setActiveTab] = useState<"posts" | "replies" | "media" | "likes">("posts");
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string>("https://picsum.photos/200?random=42");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0 && selectedImages.length < 4) {
      files.slice(0, 4 - selectedImages.length).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImages(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleProfileImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = e.target?.result as string;
        setProfileImage(newImage);
        setGlobalProfileImage(newImage);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const getImageGridClass = (imageCount: number) => {
    switch (imageCount) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2 gap-1";
      case 3:
        return "grid-cols-3 gap-1";
      case 4:
        return "grid-cols-2 gap-1";
      default:
        return "grid-cols-1";
    }
  };

  const getImageHeightClass = (imageCount: number, index: number) => {
    if (imageCount === 1) return "h-64";
    if (imageCount === 2) return "h-48";
    if (imageCount === 3) return index === 0 ? "row-span-2 h-48" : "h-24";
    if (imageCount === 4) return "h-24";
    return "h-48";
  };

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
            <div className="relative inline-block">
              <Avatar className="h-32 w-32 border-4 border-background">
                <AvatarImage src={profileImage} alt="tech_taku" />
                <AvatarFallback>tech_taku</AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
                <Camera className="h-4 w-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfileImageUpload}
                  className="hidden"
                />
              </label>
            </div>
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

      {/* Post composer */}
      <div className="px-4 py-3 flex gap-3">
        <Avatar>
          <AvatarImage src={profileImage} alt="tech_taku" />
          <AvatarFallback>tech_taku</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Input 
            placeholder="What's happening?" 
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
          />
          
          {/* Image preview */}
          {selectedImages.length > 0 && (
            <div className="mt-3 rounded-2xl overflow-hidden">
              <div className={`grid ${getImageGridClass(selectedImages.length)}`}>
                {selectedImages.map((image, index) => (
                  <div key={index} className={`relative ${getImageGridClass(selectedImages.length)}`}>
                    <img 
                      src={image} 
                      alt={`Preview ${index + 1}`} 
                      className={`w-full ${getImageHeightClass(selectedImages.length, index)} object-cover`}
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 rounded-full bg-black/60 text-white p-1 hover:bg-black/80 transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-black/60 dark:text-white/60">
              <label className={`cursor-pointer transition-colors ${selectedImages.length >= 4 ? 'opacity-50 cursor-not-allowed' : 'hover:text-blue-500'}`}>
                <ImageIcon className="h-5 w-5" />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={selectedImages.length >= 4}
                />
              </label>
              <Smile className="h-5 w-5" />
              <CalendarDays className="h-5 w-5" />
            </div>
            <Button size="sm">Post</Button>
          </div>
        </div>
      </div>
      <div className="h-2 bg-black/[.03] dark:bg-white/[.04]" />

      {/* Posts */}
      <ul>
        {profilePosts.map((p) => (
          <li key={p.id} className="px-4 py-3 flex gap-3 hover:bg-black/[.02] dark:hover:bg-white/[.03] transition cursor-pointer">
            <Avatar>
              <AvatarImage src={profileImage} alt={p.name} />
              <AvatarFallback>tech_taku</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex gap-2 text-sm items-center">
                <span className="font-semibold truncate">{p.name}</span>
                <span className="text-black/50 dark:text-white/50 truncate">{p.handle}</span>
                <span className="text-black/30 dark:text-white/30">·</span>
                <span className="text-black/30 dark:text-white/30">{p.timestamp}</span>
              </div>
              <p className="mt-1 text-[15px] leading-6 whitespace-pre-wrap">{p.content}</p>
              
              {/* Images */}
              {p.images && p.images.length > 0 && (
                <div className="mt-3 rounded-2xl overflow-hidden">
                  <div className={`grid ${getImageGridClass(p.images.length)}`}>
                    {p.images.map((image, index) => (
                      <div key={index} className={`relative ${p.images && getImageGridClass(p.images.length)}`}>
                        <img 
                          src={image} 
                          alt={`Post image ${index + 1}`} 
                          className={`w-full ${p.images && getImageHeightClass(p.images.length, index)} object-cover`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
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
