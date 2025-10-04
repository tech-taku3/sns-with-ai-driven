// プロフィールページ用のモックデータの型定義
export interface Post {
  id: string;
  name: string;
  handle: string;
  timestamp: string;
  content: string;
  images?: string[];
  comments: number;
  retweets: number;
  likes: number;
  insights: number;
}
