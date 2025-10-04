"use client";

import { useState } from "react";

export function ProfileTabs() {
  const [activeTab, setActiveTab] = useState<"posts" | "replies" | "subs" | "highlights" | "media">("posts");

  return (
    <div className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex">
        {[
          { key: "posts", label: "Posts" },
          { key: "replies", label: "Replies" },
          { key: "subs", label: "Subs" },
          { key: "highlights", label: "Highlights" },
          { key: "media", label: "Media" }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key as typeof activeTab)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors relative hover:bg-gray-100 dark:hover:bg-gray-800 ${
              activeTab === key
                ? "text-black dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {label}
            {activeTab === key && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
