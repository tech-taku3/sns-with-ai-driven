export interface Post {
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
