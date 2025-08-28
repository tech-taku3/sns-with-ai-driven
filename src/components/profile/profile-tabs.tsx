"use client";

import { useState } from "react";

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<"posts" | "replies" | "media" | "likes">("posts");

  return (
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
  );
}
