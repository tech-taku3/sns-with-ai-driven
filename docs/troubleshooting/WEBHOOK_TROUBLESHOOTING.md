# 🔧 Webhook トラブルシューティングガイド

## 🚨 問題: 新規ユーザー登録してもSupabaseにデータが作成されない

### 確認手順

#### 1. Vercelのログを確認

**手順**:
```
1. Vercel Dashboard にアクセス
   https://vercel.com/dashboard
   
2. プロジェクトを選択
   
3. 「Deployments」タブ → 最新のデプロイメントをクリック
   
4. 「Function Logs」タブを開く
   
5. 新規ユーザー登録を実行
   
6. ログを確認
```

**期待されるログ**:
```log
📥 Webhook endpoint called
✅ Webhook received: user.created
✅ User created
✅ Webhook processed successfully: user.created
```

**問題がある場合のログ**:
```log
# パターン1: Webhookが呼ばれていない
[ログに何も表示されない]

# パターン2: 署名検証失敗
❌ Webhook verification failed

# パターン3: データベース接続エラー
❌ Error creating user in database: PrismaClientInitializationError
```

---

#### 2. ClerkのWebhook設定を確認

**問題**: Preview DeploymentのURLが設定されていない

**解決策**:

```
1. Clerk Dashboard にアクセス
   https://dashboard.clerk.com
   
2. Configure → Webhooks
   
3. 既存のWebhookエンドポイントを確認
   
4. Preview DeploymentのURLを追加:
   https://your-preview-deployment-url.vercel.app/api/webhooks/clerk
   
   または、本番環境のURLを確認:
   https://your-production-url.vercel.app/api/webhooks/clerk
```

**重要**: Preview Deploymentは動的なURLなので、**各PRごとに新しいURLが生成されます**。

**推奨**: 本番環境のURLを設定し、Preview Deploymentでは本番環境のWebhookを使用する。

---

#### 3. 環境変数の確認

**Vercelで設定が必要な環境変数**:

| 環境変数名 | 説明 | 必須 |
|-----------|------|------|
| `DATABASE_URL` | Supabaseの接続文字列 | ✅ |
| `WEBHOOK_SECRET` | ClerkのWebhook署名シークレット | ✅ |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk公開キー | ✅ |
| `CLERK_SECRET_KEY` | Clerk秘密キー | ✅ |

**確認手順**:

```
1. Vercel Dashboard → プロジェクト選択
   
2. Settings → Environment Variables
   
3. 各環境（Production, Preview, Development）で設定を確認
   
4. Preview Deployment用に環境変数が設定されているか確認
```

**注意**: Preview Deploymentは**Preview環境の環境変数**を使用します。

---

#### 4. データベース接続の確認

**Prisma接続エラーの場合**:

```log
❌ Error creating user in database: PrismaClientInitializationError
Error name: PrismaClientInitializationError
Error message: Can't reach database server at `xxx.supabase.co`
```

**解決策**:

1. **DATABASE_URLの確認**:
   ```
   Supabase Dashboard
   ↓
   Settings → Database
   ↓
   Connection string → URI
   ↓
   コピーしてVercel環境変数に設定
   ```

2. **接続文字列の形式**:
   ```
   postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres?sslmode=require
   ```

3. **Supabaseの接続設定を確認**:
   - Database Settings → Connection Pooling
   - 接続方式（Direct connection / Connection Pooling）を確認

---

#### 5. Webhook署名検証の確認

**エラーログ**:
```log
❌ Webhook verification failed
```

**原因**:
- `WEBHOOK_SECRET`が設定されていない
- `WEBHOOK_SECRET`が間違っている
- ClerkのWebhook設定で署名シークレットが変更された

**解決策**:

1. **Clerkで署名シークレットを取得**:
   ```
   Clerk Dashboard
   ↓
   Configure → Webhooks
   ↓
   Endpoint を選択
   ↓
   「Signing Secret」をコピー
   ```

2. **Vercel環境変数に設定**:
   ```
   Vercel Dashboard
   ↓
   Settings → Environment Variables
   ↓
   WEBHOOK_SECRET = whsec_xxxxxxxxxxxxx
   ↓
   Preview環境にも設定
   ```

---

## 🔍 デバッグログの確認

### ログの見方

#### 正常な動作

```log
📥 Webhook endpoint called
✅ Webhook received: user.created
✅ User created
✅ Webhook processed successfully: user.created
```

#### Webhookが呼ばれていない

```log
[ログに何も表示されない]
```

**原因**:
- ClerkのWebhook設定でURLが間違っている
- Preview DeploymentのURLが設定されていない

**解決策**:
- ClerkのWebhook設定を確認
- Preview DeploymentのURLを確認して設定

---

#### 署名検証失敗

```log
📥 Webhook endpoint called
❌ Webhook verification failed
```

**原因**:
- `WEBHOOK_SECRET`が設定されていない
- `WEBHOOK_SECRET`が間違っている

**解決策**:
- Vercel環境変数で`WEBHOOK_SECRET`を確認
- Clerkで新しい署名シークレットを取得して設定

---

#### データベース接続エラー

```log
📥 Webhook endpoint called
✅ Webhook received: user.created
❌ Error creating user in database: PrismaClientInitializationError
Error name: PrismaClientInitializationError
Error message: Can't reach database server at `xxx.supabase.co`
```

**原因**:
- `DATABASE_URL`が設定されていない
- `DATABASE_URL`が間違っている
- Supabaseの接続設定が間違っている

**解決策**:
- Vercel環境変数で`DATABASE_URL`を確認
- Supabaseの接続文字列を再取得して設定

---

#### ユニーク制約違反

```log
📥 Webhook endpoint called
✅ Webhook received: user.created
❌ Error creating user in database: PrismaClientKnownRequestError
Error name: PrismaClientKnownRequestError
Error message: Unique constraint failed on the fields: (`email`)
```

**原因**:
- 同じメールアドレスのユーザーが既に存在

**解決策**:
```sql
-- Supabase SQL Editorで確認
SELECT * FROM users WHERE email = 'user@example.com';

-- 必要に応じて削除
DELETE FROM users WHERE email = 'user@example.com';
```

---

## 🎯 よくある問題と解決策

### 問題1: Preview DeploymentでWebhookが動作しない

**原因**: ClerkのWebhook設定が本番URLのみを指している

**解決策**:
1. **オプションA**: Preview DeploymentのURLをClerkに追加
   - 各PRごとにURLが変わるため、手動で設定が必要

2. **オプションB**: 本番環境のWebhookを使用（推奨）
   - Preview Deploymentでも本番環境のWebhook URLを使用
   - テスト用のデータベースを使用する場合は注意

---

### 問題2: 環境変数がPreview Deploymentに設定されていない

**原因**: Vercelの環境変数設定でPreview環境が選択されていない

**解決策**:
```
Vercel Dashboard
↓
Settings → Environment Variables
↓
各環境変数の「Environment」で以下を選択:
✅ Production
✅ Preview  ← これが重要！
✅ Development
```

---

### 問題3: Prisma Clientが生成されていない

**ビルドログで確認**:
```log
Running "vercel build"
Installing dependencies...
> prisma generate
✔ Generated Prisma Client (v6.15.0)
```

**問題がある場合**:
```log
[prisma generate のログが表示されない]
```

**解決策**:
- `package.json`の`build`スクリプトを確認:
  ```json
  "build": "prisma generate && next build --turbopack"
  ```
- `postinstall`スクリプトを確認:
  ```json
  "postinstall": "prisma generate"
  ```

---

## 📊 チェックリスト

### デプロイ前の確認

- [ ] `package.json`に`prisma generate`が含まれている
- [ ] `postinstall`スクリプトが設定されている
- [ ] Vercel環境変数が設定されている（Preview環境も含む）
- [ ] ClerkのWebhook設定が正しいURLを指している
- [ ] `DATABASE_URL`が正しく設定されている
- [ ] `WEBHOOK_SECRET`が正しく設定されている

### デプロイ後の確認

- [ ] ビルドログで`prisma generate`が実行されている
- [ ] VercelのFunction LogsでWebhookが呼ばれている
- [ ] エラーログがない
- [ ] Supabaseでユーザーデータが作成されている

---

## 🆘 それでも解決しない場合

### 1. 詳細なログを確認

VercelのFunction Logsで以下を確認:
- Webhookエンドポイントが呼ばれているか
- エラーメッセージの詳細
- 環境変数が正しく設定されているか

### 2. ローカル環境でテスト

```bash
# 1. 本番ビルドをローカルで実行
npm run build
npm run start

# 2. ngrokで公開
ngrok http 3000

# 3. ClerkのWebhook URLをngrok URLに設定
# 4. 新規ユーザー登録をテスト
# 5. ログを確認
```

### 3. サポートに連絡

以下の情報を準備:
- Vercelのビルドログ
- VercelのFunction Logs
- エラーメッセージ
- 環境変数の設定状況（機密情報は除く）

---

## 📝 まとめ

**最も一般的な原因**:
1. ✅ ClerkのWebhook設定がPreview DeploymentのURLを指していない
2. ✅ 環境変数がPreview環境に設定されていない
3. ✅ `DATABASE_URL`が正しく設定されていない

**最初に確認すべきこと**:
1. VercelのFunction LogsでWebhookが呼ばれているか
2. ClerkのWebhook設定
3. Vercel環境変数（Preview環境も含む）

