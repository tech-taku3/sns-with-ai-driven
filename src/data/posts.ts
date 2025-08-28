import { Post } from "@/types/post";

// タイムラインのモックデータ
export const mockPosts: Post[] = [
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
  }
];

// プロフィールページのモックデータ
export const profilePosts: Post[] = [
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
  }
];
