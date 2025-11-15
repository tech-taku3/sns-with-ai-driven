# 📊 ユーザー登録からSupabase保存までの完全フロー

## 🎯 全体フロー図

```
┌─────────────────────────────────────────────────────────────────┐
│                   1. ユーザーがUIでサインアップ                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  2. Clerkのサインアップフォーム表示（/sign-in）                 │
│     - ClerkProviderが提供するUIコンポーネント                    │
│     - メールアドレス、パスワードなどを入力                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  3. Clerkバックエンドでユーザー作成                              │
│     - Clerkのデータベースにユーザー情報を保存                    │
│     - ユーザーID、メールアドレス、プロフィール情報など           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  4. ClerkがWebhookイベントを発火                                │
│     - user.created イベントが発生                               │
│     - Clerkが設定されたWebhookエンドポイントにHTTP POST送信     │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  5. アプリケーションがWebhookを受信                             │
│     - /api/webhooks/clerk エンドポイントが呼ばれる              │
│     - 署名検証、イベントタイプ確認                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  6. Prismaを使ってSupabaseにデータ保存                          │
│     - Prisma ClientがPostgreSQLに接続                            │
│     - usersテーブルにユーザー情報をINSERT                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  7. 完了                                                         │
│     - Supabaseにユーザーデータが保存される                       │
│     - アプリケーションでユーザー情報を使用可能                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📝 詳細なステップ解説

### ステップ1: ユーザーがUIでサインアップを開始

**場所**: ブラウザ（クライアントサイド）

**処理**:
```
1. ユーザーがアプリにアクセス
   https://your-app.vercel.app/

2. 未ログイン状態の場合、Clerkが自動的に認証を要求
   - middleware.ts で保護されたルートにアクセスした場合
   - または、明示的に /sign-in にアクセス

3. ClerkProviderが提供するサインアップUIが表示される
   - layout.tsx で <ClerkProvider> がラップしている
   - ClerkのUIコンポーネントが自動的に表示される
```

**関連コード**:
```typescript:src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
```

```typescript:src/middleware.ts
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()  // 未ログイン時は自動的に /sign-in にリダイレクト
  }
})
```

---

### ステップ2: Clerkのサインアップフォーム表示

**場所**: Clerkのサーバー（Clerk Dashboardで設定）

**処理**:
```
1. Clerkがサインアップフォームを提供
   - メールアドレス入力
   - パスワード入力
   - ユーザー名入力（オプション）
   - その他のプロフィール情報

2. ユーザーが情報を入力して「Sign Up」ボタンをクリック

3. フォームデータがClerkのバックエンドに送信される
   - HTTPS POST リクエスト
   - ClerkのAPIエンドポイントに送信
```

**重要**: この時点では**まだアプリケーションのコードは実行されていません**。
Clerkが完全に管理しているUIとバックエンド処理です。

---

### ステップ3: Clerkバックエンドでユーザー作成

**場所**: Clerkのサーバー（Clerkのインフラ）

**処理**:
```
1. Clerkがユーザー情報を受け取る
   - メールアドレス
   - パスワード（ハッシュ化）
   - ユーザー名
   - その他のプロフィール情報

2. Clerkがユーザーアカウントを作成
   - Clerkのデータベースに保存
   - ユーザーID（例: user_2xxx）を生成
   - セッショントークンを発行

3. ユーザーがログイン状態になる
   - ブラウザにセッションCookieが設定される
   - アプリケーションにリダイレクトされる
```

**重要**: この時点では**まだSupabaseにはデータが保存されていません**。
Clerkのデータベースにのみ保存されています。

---

### ステップ4: ClerkがWebhookイベントを発火

**場所**: Clerkのサーバー（Clerkのインフラ）

**処理**:
```
1. ユーザー作成が完了すると、Clerkがイベントを発火
   - イベントタイプ: user.created
   - イベントデータ: ユーザーID、メールアドレス、プロフィール情報など

2. Clerkが設定されたWebhookエンドポイントにHTTP POSTリクエストを送信
   - URL: https://your-app.vercel.app/api/webhooks/clerk
   - メソッド: POST
   - ヘッダー:
     - Content-Type: application/json
     - svix-id: イベントID
     - svix-timestamp: タイムスタンプ
     - svix-signature: 署名（WEBHOOK_SECRETで検証）
   - ボディ: JSON形式のイベントデータ
```

**Webhookペイロードの例**:
```json
{
  "type": "user.created",
  "data": {
    "id": "user_2xxx",
    "email_addresses": [
      {
        "id": "idn_xxx",
        "email_address": "user@example.com"
      }
    ],
    "primary_email_address_id": "idn_xxx",
    "first_name": "John",
    "last_name": "Doe",
    "username": "johndoe",
    "image_url": "https://img.clerk.com/..."
  }
}
```

**重要**: このWebhookは**非同期**で送信されます。
ユーザーがログインした直後ではなく、数秒後になる可能性があります。

---

### ステップ5: アプリケーションがWebhookを受信

**場所**: Vercel（Next.js API Route）

**処理**:
```
1. HTTP POST リクエストが /api/webhooks/clerk に到達
   - Next.jsのAPI Routeハンドラーが呼ばれる
   - route.ts の POST 関数が実行される

2. ログ出力（デバッグ用）
   console.log('📥 Webhook endpoint called')

3. 環境変数のチェック
   - WEBHOOK_SECRET が設定されているか
   - DATABASE_URL が設定されているか

4. Webhook署名の検証
   - verifyWebhook(req) が実行される
   - Clerkの公式ライブラリが自動的に署名を検証
   - WEBHOOK_SECRET を使用して署名を確認
   - 署名が正しければ、イベントデータを取得
   - 署名が間違っていれば、エラーを返す（401 Unauthorized）

5. イベントタイプの確認
   - evt.type を確認（例: 'user.created'）
   - ホワイトリスト検証: ['user.created', 'user.updated', 'user.deleted']
   - 未知のイベントタイプの場合は、200 OKを返して処理をスキップ

6. ログ出力
   console.log('✅ Webhook received: user.created')
```

**関連コード**:
```typescript:src/app/api/webhooks/clerk/route.ts
export async function POST(req: NextRequest) {
  console.log('📥 Webhook endpoint called')
  
  try {
    // 署名検証（Clerkの公式ライブラリが自動検証）
    const evt = await verifyWebhook(req)
    
    const { id } = evt.data
    const eventType = evt.type
    
    // イベントタイプのホワイトリスト検証
    const validEvents = ['user.created', 'user.updated', 'user.deleted']
    if (!validEvents.includes(eventType)) {
      return new Response('Event type not handled', { status: 200 })
    }
    
    console.log(`✅ Webhook received: ${eventType}`)
    
    // ... 次のステップへ
  }
}
```

---

### ステップ6: イベントタイプに応じた処理

**場所**: Vercel（Next.js API Route）

**処理（user.created イベントの場合）**:
```
1. イベントデータから必要な情報を抽出
   - userId: ClerkのユーザーID
   - email: メールアドレス
   - username: ユーザー名
   - displayName: 表示名
   - profileImageUrl: プロフィール画像URL

2. メールアドレスの取得
   - primary_email_address_id からプライマリメールを取得
   - プライマリメールがない場合は、最初のメールアドレスを使用
   - メールアドレスがない場合（テストイベント）は、プレースホルダーを使用

3. データベースへの保存準備
   - Prisma Clientを使用してSupabaseに接続
   - usersテーブルにINSERTするデータを準備
```

**関連コード**:
```typescript:src/app/api/webhooks/clerk/route.ts
if (eventType === 'user.created') {
  const { 
    id: userId, 
    email_addresses, 
    primary_email_address_id,
    first_name, 
    last_name, 
    username, 
    image_url 
  } = evt.data

  // プライマリメールアドレスを取得
  const primaryEmail = email_addresses?.find(
    (email) => email.id === primary_email_address_id
  )
  const email = primaryEmail?.email_address || email_addresses?.[0]?.email_address

  // ... 次のステップへ
}
```

---

### ステップ7: Prismaを使ってSupabaseにデータ保存

**場所**: Vercel → Supabase（PostgreSQL）

**処理**:
```
1. Prisma Clientの初期化
   - lib/prisma.ts から prisma インスタンスを取得
   - DATABASE_URL 環境変数を使用してPostgreSQLに接続

2. データベースへのINSERT
   - prisma.user.create() を実行
   - usersテーブルに以下のデータを保存:
     - clerkId: ClerkのユーザーID（例: user_2xxx）
     - email: メールアドレス
     - username: ユーザー名（メールアドレスの@より前の部分をデフォルト）
     - displayName: 表示名（first_name + last_name）
     - profileImageUrl: プロフィール画像URL

3. 成功時のログ出力
   console.log('✅ User created')

4. エラーハンドリング
   - データベース接続エラーの場合
   - ユニーク制約違反（同じメールアドレスが既に存在）の場合
   - その他のエラーの場合
```

**関連コード**:
```typescript:src/app/api/webhooks/clerk/route.ts
try {
  const user = await prisma.user.create({
    data: {
      clerkId: userId,
      email: email,
      username: username || email.split('@')[0],
      displayName: `${first_name || ''} ${last_name || ''}`.trim() || username || email.split('@')[0],
      profileImageUrl: image_url,
    }
  })

  console.log('✅ User created')
} catch (error) {
  console.error('❌ Error creating user in database:', error)
  return new Response('Failed to create user', { status: 500 })
}
```

**Prisma Clientの接続**:
```typescript:src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

export const prisma = globalForPrisma.prisma ?? new PrismaClient()
```

**データベース接続文字列**:
```
DATABASE_URL=postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?sslmode=require
```

---

### ステップ8: 完了とレスポンス

**場所**: Vercel（Next.js API Route）

**処理**:
```
1. 成功レスポンスを返す
   - HTTP 200 OK
   - ボディ: 'Webhook processed successfully'

2. ログ出力
   console.log('✅ Webhook processed successfully: user.created')

3. Clerkに成功を通知
   - ClerkはWebhookのレスポンスを確認
   - 200 OK の場合は成功とみなす
   - エラーの場合は、Clerkがリトライを試みる可能性がある
```

**関連コード**:
```typescript:src/app/api/webhooks/clerk/route.ts
console.log(`✅ Webhook processed successfully: ${eventType}`)
return new Response('Webhook processed successfully', { status: 200 })
```

---

## 🔄 データフローの詳細図

```
┌──────────────┐
│  ブラウザ     │
│  (Client)    │
└──────┬───────┘
       │ 1. サインアップフォーム送信
       ↓
┌──────────────┐
│   Clerk      │
│  (Backend)   │
└──────┬───────┘
       │ 2. ユーザー作成
       │    (Clerk DBに保存)
       │
       │ 3. Webhook送信
       │    (HTTP POST)
       ↓
┌──────────────┐
│   Vercel     │
│  (Next.js)   │
│ /api/webhooks│
│   /clerk     │
└──────┬───────┘
       │ 4. 署名検証
       │ 5. イベント処理
       │ 6. Prisma Client
       ↓
┌──────────────┐
│   Supabase   │
│ (PostgreSQL) │
│  users table │
└──────────────┘
```

---

## 🔑 重要なポイント

### 1. 非同期処理

**Webhookは非同期で送信されます**:
- ユーザーがログインした直後ではなく、数秒後になる可能性がある
- ユーザーは既にログイン状態になっているが、Supabaseにはまだデータが保存されていない状態になる可能性がある

**対策**:
- アプリケーション側で、Supabaseにユーザーデータが存在しない場合の処理を実装
- 例: ユーザーデータが存在しない場合は、ローディング状態を表示

---

### 2. エラーハンドリング

**Webhook処理が失敗した場合**:
- Clerkはリトライを試みる可能性がある
- ただし、リトライの回数や間隔はClerkの設定による

**データベース接続エラーの場合**:
- Prisma Clientがエラーを返す
- Webhookは500エラーを返す
- Clerkがリトライを試みる

**ユニーク制約違反の場合**:
- 同じメールアドレスのユーザーが既に存在する
- Prismaがエラーを返す
- Webhookは500エラーを返す

---

### 3. セキュリティ

**Webhook署名検証**:
- `verifyWebhook(req)` が自動的に署名を検証
- `WEBHOOK_SECRET` 環境変数を使用
- 署名が正しくない場合は、401 Unauthorizedを返す

**イベントタイプのホワイトリスト**:
- 許可されたイベントタイプのみ処理
- 未知のイベントタイプの場合は、200 OKを返して処理をスキップ

---

### 4. データの整合性

**ClerkとSupabaseの同期**:
- Clerkのユーザー情報が変更された場合、`user.updated`イベントが送信される
- ユーザーが削除された場合、`user.deleted`イベントが送信される
- これらのイベントも同様に処理される

---

## 🧪 デバッグ方法

### 1. Webhookが呼ばれているか確認

**VercelのFunction Logsで確認**:
```log
📥 Webhook endpoint called
✅ Webhook received: user.created
✅ User created
✅ Webhook processed successfully: user.created
```

### 2. データベース接続エラーの確認

**エラーログ**:
```log
❌ Error creating user in database: PrismaClientInitializationError
Error name: PrismaClientInitializationError
Error message: Can't reach database server at `xxx.supabase.co`
```

### 3. ユニーク制約違反の確認

**エラーログ**:
```log
❌ Error creating user in database: PrismaClientKnownRequestError
Error name: PrismaClientKnownRequestError
Error message: Unique constraint failed on the fields: (`email`)
```

---

## 📊 タイムライン

```
時刻     | イベント
---------|----------------------------------------
T+0s     | ユーザーがサインアップフォームを送信
T+0.5s   | Clerkがユーザーアカウントを作成
T+1s     | ユーザーがログイン状態になる
T+2s     | ClerkがWebhookを送信（非同期）
T+2.1s   | アプリケーションがWebhookを受信
T+2.2s   | 署名検証、イベントタイプ確認
T+2.3s   | Prisma ClientがSupabaseに接続
T+2.4s   | usersテーブルにINSERT
T+2.5s   | 成功レスポンスを返す
```

**注意**: 実際のタイミングは環境によって異なります。

---

## 🎯 まとめ

1. **ユーザーがUIでサインアップ** → Clerkのフォームを使用
2. **Clerkがユーザーを作成** → Clerkのデータベースに保存
3. **ClerkがWebhookを送信** → アプリケーションのエンドポイントにPOST
4. **アプリケーションがWebhookを受信** → 署名検証、イベント処理
5. **PrismaがSupabaseに保存** → PostgreSQLのusersテーブルにINSERT
6. **完了** → ユーザーデータがSupabaseに保存される

**重要なポイント**:
- Webhookは非同期で送信される
- 署名検証が重要（セキュリティ）
- エラーハンドリングが必要
- データの整合性を保つために、user.updated、user.deletedも処理する

