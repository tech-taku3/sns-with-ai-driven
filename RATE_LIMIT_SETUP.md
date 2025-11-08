# レート制限の設定ガイド

## 必要な環境変数

レート制限機能を使用するには、Upstash Redisの環境変数が必要です。

```env
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_token_here
```

## Upstash Redisのセットアップ手順

### 1. Upstashアカウントの作成

1. https://upstash.com/ にアクセス
2. 「Sign up」からアカウント作成（GitHubアカウントでログイン可能）
3. 無料プラン（Free tier）で十分です

### 2. Redisデータベースの作成

1. ダッシュボードで「Create Database」をクリック
2. 設定：
   - Name: `sns-with-ai-driven-rate-limit`（任意の名前）
   - Type: **Regional**（推奨）
   - Region: 近い場所を選択（例: Tokyo, Singapore）
   - TLS: **有効のまま**
3. 「Create」をクリック

### 3. 環境変数の取得

1. 作成したデータベースをクリック
2. 「Details」タブに表示される以下をコピー：
   - **UPSTASH_REDIS_REST_URL**
   - **UPSTASH_REDIS_REST_TOKEN**

### 4. .env ファイルに追加

```bash
# .env ファイルに追加
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxxxxxxxxxxxxxxxxxxxx
```

### 5. Vercelへのデプロイ時

Vercel ダッシュボードで環境変数を設定：
1. Project Settings → Environment Variables
2. 上記2つの変数を追加
3. Production, Preview, Development すべてにチェック

## レート制限の設定内容

| 機能 | 制限 | リセット |
|------|------|---------|
| 投稿作成 | 5回/分 | 1分後 |
| いいね | 30回/分 | 1分後 |
| フォロー | 10回/分 | 1分後 |
| 画像アップロード | 10回/時 | 1時間後 |
| プロフィール更新 | 5回/時 | 1時間後 |

## コスト

- **無料枠**: 10,000リクエスト/日
- **超過料金**: $0.20 per 100K requests
- **お試しプロジェクトには十分**

## トラブルシューティング

### ビルドエラーが出る場合

```
❌ 環境変数 UPSTASH_REDIS_REST_URL が設定されていません
```

→ .env ファイルに環境変数を追加してください

### ローカル開発で動作しない場合

1. .env ファイルが正しい場所にあるか確認
2. サーバーを再起動: `npm run dev` を停止して再度起動
3. 環境変数の値が正しいか確認（スペースなし、引用符なし）

## レート制限の調整

`src/lib/rate-limit.ts` で調整可能：

```typescript
// 例: 投稿を1分に10回に変更
export const postRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"), // ← ここを変更
  analytics: true,
  prefix: "ratelimit:post",
});
```

## 監視

Upstashダッシュボードで以下を確認可能：
- リクエスト数
- レート制限の発動回数
- 使用量

