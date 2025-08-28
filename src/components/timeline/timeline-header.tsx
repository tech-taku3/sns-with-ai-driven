"use client";

import { useState } from "react";

export function TimelineHeader() {
  const [activeTab, setActiveTab] = useState<"for-you" | "following">("following");

  return (
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
  );
}
