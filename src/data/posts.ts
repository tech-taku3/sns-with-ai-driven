import { Post } from "@/types/post";

// プロフィールページ用のモックデータ
export const profilePosts: Post[] = [
  {
    id: "1",
    name: "Bob Smith",
    handle: "@bobsmith",
    timestamp: "16 days ago",
    content: "Captured this amazing moment in the city. #Photography",
    images: ["https://images.unsplash.com/photo-1449824913935-59a10b8d2000"],
    comments: 24,
    retweets: 5,
    likes: 99,
    insights: 1200
  },
  {
    id: "2",
    name: "Bob Smith",
    handle: "@bobsmith",
    timestamp: "20 days ago",
    content: "Just got my new camera! Can't wait to start shooting with it. 📸",
    comments: 15,
    retweets: 3,
    likes: 76,
    insights: 800
  },
  {
    id: "3",
    name: "Bob Smith",
    handle: "@bobsmith",
    timestamp: "25 days ago",
    content: "Beautiful sunset at Central Park today!",
    images: [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
      "https://images.unsplash.com/photo-1472120435266-53107fd0c44a"
    ],
    comments: 32,
    retweets: 8,
    likes: 145,
    insights: 2100
  }
];
