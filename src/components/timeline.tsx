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
  Share2,
  X
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
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
  images?: string[];
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
    images: ["https://picsum.photos/800/600?random=1"],
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
    images: [
      "https://picsum.photos/800/600?random=2",
      "https://picsum.photos/800/600?random=3"
    ],
  },
  {
    id: "3",
    name: "React",
    handle: "@reactjs",
    content: "React 18.3 is now available! This release includes improvements to concurrent features, better error handling, and enhanced developer experience.",
    timestamp: "4h",
    comments: 234,
    retweets: 567,
    likes: 1234,
    insights: 89000,
  },
  {
    id: "4",
    name: "Tailwind CSS",
    handle: "@tailwindcss",
    content: "Tailwind CSS v4.0 alpha is here! Introducing the new engine, improved performance, and better developer experience. Try it out today!",
    timestamp: "6h",
    comments: 89,
    retweets: 234,
    likes: 567,
    insights: 67000,
    images: [
      "https://picsum.photos/800/600?random=4",
      "https://picsum.photos/800/600?random=5",
      "https://picsum.photos/800/600?random=6"
    ],
  },
  {
    id: "5",
    name: "Next.js",
    handle: "@nextjs",
    content: "Next.js 15 is now stable! Faster builds, improved performance, and new features like partial prerendering. Upgrade your projects today.",
    timestamp: "8h",
    comments: 456,
    retweets: 789,
    likes: 2345,
    insights: 156000,
    images: [
      "https://picsum.photos/800/600?random=7",
      "https://picsum.photos/800/600?random=8"
    ],
  },
  {
    id: "6",
    name: "Vercel",
    handle: "@vercel",
    content: "Deploy your AI applications with ease on Vercel. Support for all major AI frameworks and real-time streaming. Get started with our AI templates!",
    timestamp: "12h",
    comments: 123,
    retweets: 345,
    likes: 678,
    insights: 45000,
    images: [
      "https://picsum.photos/800/600?random=9",
      "https://picsum.photos/800/600?random=10",
      "https://picsum.photos/800/600?random=11",
      "https://picsum.photos/800/600?random=12"
    ],
  },
  {
    id: "7",
    name: "TypeScript",
    handle: "@typescript",
    content: "TypeScript 5.5 beta is now available! Improved performance, better error messages, and new language features. Test it out and share your feedback.",
    timestamp: "1d",
    comments: 789,
    retweets: 1234,
    likes: 3456,
    insights: 234000,
    images: [
      "https://picsum.photos/800/600?random=13",
      "https://picsum.photos/800/600?random=14"
    ],
  },
  {
    id: "8",
    name: "GitHub",
    handle: "@github",
    content: "GitHub Copilot Chat is now generally available! Get AI-powered coding assistance directly in your editor. Try it for free.",
    timestamp: "2d",
    comments: 567,
    retweets: 890,
    likes: 2345,
    insights: 189000,
    images: [
      "https://picsum.photos/800/600?random=15",
      "https://picsum.photos/800/600?random=16"
    ],
  },
  {
    id: "9",
    name: "OpenAI",
    handle: "@OpenAI",
    content: "GPT-4o mini is now available! Faster, more affordable, and more capable than ever. Start building amazing AI applications today.",
    timestamp: "3d",
    comments: 1234,
    retweets: 3456,
    likes: 8901,
    insights: 567000,
    images: [
      "https://picsum.photos/800/600?random=17",
      "https://picsum.photos/800/600?random=18",
      "https://picsum.photos/800/600?random=19"
    ],
  },
  {
    id: "10",
    name: "Microsoft",
    handle: "@Microsoft",
    content: "Microsoft Build 2024: The future of AI development is here. Join us to explore the latest tools, frameworks, and innovations.",
    timestamp: "4d",
    comments: 345,
    retweets: 678,
    likes: 1234,
    insights: 89000,
    images: [
      "https://picsum.photos/800/600?random=20",
      "https://picsum.photos/800/600?random=21",
      "https://picsum.photos/800/600?random=22",
      "https://picsum.photos/800/600?random=23"
    ],
  },
  {
    id: "11",
    name: "Apple",
    handle: "@Apple",
    content: "WWDC 2024: Get ready for the biggest developer event of the year. Discover the latest innovations in iOS, macOS, watchOS, and visionOS.",
    timestamp: "5d",
    comments: 2345,
    retweets: 4567,
    likes: 12345,
    insights: 456000,
    images: [
      "https://picsum.photos/800/600?random=24",
      "https://picsum.photos/800/600?random=25"
    ],
  },
  {
    id: "12",
    name: "Google",
    handle: "@Google",
    content: "Google I/O 2024: Explore the future of AI and Android development. New tools, frameworks, and insights for developers worldwide.",
    timestamp: "6d",
    comments: 1890,
    retweets: 3456,
    likes: 9876,
    insights: 234000,
    images: [
      "https://picsum.photos/800/600?random=26",
      "https://picsum.photos/800/600?random=27",
      "https://picsum.photos/800/600?random=28"
    ],
  },
];

// グローバル状態としてプロフィール画像を管理
let globalProfileImage = "https://picsum.photos/200?random=42";

export function setGlobalProfileImage(image: string) {
  globalProfileImage = image;
}

export function getGlobalProfileImage() {
  return globalProfileImage;
}

export function Timeline() {
  const [activeTab, setActiveTab] = useState<"for-you" | "following">("following");
  const [postContent, setPostContent] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [profileImage, setProfileImage] = useState<string>(getGlobalProfileImage());

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
    <section className="h-screen flex flex-col border-x border-black/10 dark:border-white/10">
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

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {/* Post composer */}
        <div className="px-4 py-3 flex gap-3">
          <Avatar>
            <AvatarImage src={profileImage} alt="me" />
            <AvatarFallback>me</AvatarFallback>
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
                
                {/* Post images */}
                {p.images && p.images.length > 0 && (
                  <div className="mt-3 rounded-2xl overflow-hidden">
                    <div className={`grid ${getImageGridClass(p.images.length)}`}>
                      {p.images?.map((image, index) => (
                        <div key={index} className={`relative ${getImageGridClass(p.images!.length)}`}>
                          <img 
                            src={image} 
                            alt={`Post content ${index + 1}`} 
                            className={`w-full ${getImageHeightClass(p.images!.length, index)} object-cover`}
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
      </div>
    </section>
  );
}

export default Timeline;


