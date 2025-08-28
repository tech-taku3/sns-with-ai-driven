import { Calendar, MapPin, Link as LinkIcon, Camera } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export function ProfileHeader() {
  return (
    <>
      {/* Header with back button */}
      <div className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-background/70 z-10">
        <div className="flex items-center gap-6 px-4 py-3">
          <button className="rounded-full p-2 hover:bg-black/[.05] dark:hover:bg-white/[.08] transition">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
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
                <AvatarImage src="https://picsum.photos/200?random=42" alt="tech_taku" />
                <AvatarFallback>tech_taku</AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors">
                <Camera className="h-4 w-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
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
    </>
  );
}
