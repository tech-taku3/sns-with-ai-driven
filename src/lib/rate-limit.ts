import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// 環境変数の厳格なチェック
const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashRedisRestToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// 必須環境変数が未設定の場合は即座にエラー
if (!upstashRedisRestUrl) {
  throw new Error('❌ 環境変数 UPSTASH_REDIS_REST_URL が設定されていません');
}

if (!upstashRedisRestToken) {
  throw new Error('❌ 環境変数 UPSTASH_REDIS_REST_TOKEN が設定されていません');
}

// Redisクライアントの初期化
const redis = new Redis({
  url: upstashRedisRestUrl,
  token: upstashRedisRestToken,
});

// 投稿: 1分に5回まで
export const postRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
  prefix: "ratelimit:post",
});

// いいね: 1分に30回まで
export const likeRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, "1 m"),
  analytics: true,
  prefix: "ratelimit:like",
});

// フォロー: 1分に10回まで
export const followRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
  prefix: "ratelimit:follow",
});

// アップロード: 1時間に10回まで
export const uploadRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 h"),
  analytics: true,
  prefix: "ratelimit:upload",
});

// プロフィール更新: 1時間に5回まで
export const profileUpdateRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
  prefix: "ratelimit:profile",
});

