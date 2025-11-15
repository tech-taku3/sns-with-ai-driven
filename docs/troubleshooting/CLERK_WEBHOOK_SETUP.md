# 🔧 Clerk Webhook設定ガイド

## 🚨 現在の問題

Vercelのログに`/api/webhooks/clerk`へのPOSTリクエストが記録されていません。
→ **ClerkがWebhookを送信していない可能性が高い**

---

## ✅ Clerk Webhook設定の確認手順

### ステップ1: Clerk DashboardでWebhook設定を確認

```
1. https://dashboard.clerk.com にアクセス
   
2. 左メニューから「Configure」→「Webhooks」を選択
   
3. 既存のWebhookエンドポイントを確認
```

### ステップ2: Preview DeploymentのURLを確認

**Vercel Dashboardで確認**:
```
1. Vercel Dashboard → プロジェクト選択
   
2. 「Deployments」タブ
   
3. Preview Deployment（fix/prisma-generate-production-build）を選択
   
4. URLをコピー:
   https://sns-with-ai-driven-git-fix-prisma-generate-production-build-xxx.vercel.app
```

### ステップ3: ClerkにWebhookエンドポイントを追加/更新

**方法A: 既存のWebhookを更新**

```
1. Clerk Dashboard → Configure → Webhooks
   
2. 既存のエンドポイントをクリック
   
3. 「Endpoint URL」を更新:
   https://sns-with-ai-driven-git-fix-prisma-generate-production-build-xxx.vercel.app/api/webhooks/clerk
   
4. 「Signing Secret」をコピー（後でVercel環境変数に設定）
   
5. 「Save」をクリック
```

**方法B: 新しいWebhookエンドポイントを追加**

```
1. Clerk Dashboard → Configure → Webhooks
   
2. 「Create Endpoint」をクリック
   
3. 「Endpoint URL」を入力:
   https://sns-with-ai-driven-git-fix-prisma-generate-production-build-xxx.vercel.app/api/webhooks/clerk
   
4. 「Events」で以下を選択:
   ✅ user.created
   ✅ user.updated
   ✅ user.deleted
   
5. 「Create」をクリック
   
6. 「Signing Secret」をコピー（後でVercel環境変数に設定）
```

---

## 🔑 環境変数の設定

### Vercel環境変数に`WEBHOOK_SECRET`を設定

```
1. Vercel Dashboard → プロジェクト選択
   
2. Settings → Environment Variables
   
3. 「Add New」をクリック
   
4. 以下を入力:
   Key: WEBHOOK_SECRET
   Value: whsec_xxxxxxxxxxxxx（Clerkからコピーした値）
   
5. 「Environment」で以下を選択:
   ✅ Production
   ✅ Preview  ← 重要！
   ✅ Development
   
6. 「Save」をクリック
```

---

## 🧪 テスト方法

### 1. Webhookのテスト送信（Clerk Dashboard）

```
1. Clerk Dashboard → Configure → Webhooks
   
2. エンドポイントを選択
   
3. 「Send test event」をクリック
   
4. 「user.created」を選択
   
5. 「Send」をクリック
```

### 2. Vercelログで確認

```
1. Vercel Dashboard → Deployments → 最新のデプロイメント
   
2. 「Function Logs」タブを開く
   
3. 以下のログが表示されることを確認:
   📥 Webhook endpoint called
   ✅ Webhook received: user.created
   ✅ User created
   ✅ Webhook processed successfully: user.created
```

### 3. 実際のユーザー登録でテスト

```
1. Preview DeploymentのURLにアクセス
   
2. 新規アカウントを作成
   
3. VercelログでWebhookが呼ばれているか確認
   
4. Supabaseでユーザーデータが作成されているか確認
```

---

## ⚠️ 注意事項

### Preview DeploymentのURLは動的

**問題**: 各PRごとに新しいURLが生成される

**解決策**:
1. **オプションA**: 各PRごとにClerkのWebhook URLを更新（手動）
2. **オプションB**: 本番環境のWebhook URLを使用（推奨）
   - Preview Deploymentでも本番環境のWebhook URLを使用
   - テスト用のデータベースを使用する場合は注意

### 本番環境のWebhook URLを使用する場合

```
1. 本番環境のURLを確認:
   https://your-production-url.vercel.app/api/webhooks/clerk
   
2. ClerkのWebhook設定で本番URLを使用
   
3. Preview Deploymentでも同じWebhook URLを使用
   
4. データベースは本番環境と同じものを使用
```

---

## 🔍 トラブルシューティング

### 問題1: Webhookが送信されない

**確認事項**:
- [ ] ClerkのWebhook設定でURLが正しいか
- [ ] Preview DeploymentのURLが正しいか
- [ ] Webhookイベント（user.created）が有効になっているか
- [ ] Clerk Dashboardで「Send test event」を実行してテスト

### 問題2: 署名検証エラー

**エラーログ**:
```log
❌ Webhook verification failed
```

**解決策**:
- Vercel環境変数で`WEBHOOK_SECRET`が正しく設定されているか確認
- Clerkの「Signing Secret」と一致しているか確認
- Preview環境にも環境変数が設定されているか確認

### 問題3: データベース接続エラー

**エラーログ**:
```log
❌ Error creating user in database: PrismaClientInitializationError
```

**解決策**:
- Vercel環境変数で`DATABASE_URL`が正しく設定されているか確認
- Preview環境にも環境変数が設定されているか確認

---

## 📊 チェックリスト

### Clerk設定
- [ ] Webhookエンドポイントが作成されている
- [ ] エンドポイントURLが正しい（Preview DeploymentのURL）
- [ ] イベント（user.created, user.updated, user.deleted）が有効
- [ ] Signing Secretをコピーした

### Vercel設定
- [ ] `WEBHOOK_SECRET`環境変数が設定されている
- [ ] `DATABASE_URL`環境変数が設定されている
- [ ] Preview環境にも環境変数が設定されている
- [ ] 環境変数の「Environment」でPreviewが選択されている

### テスト
- [ ] Clerk Dashboardで「Send test event」を実行
- [ ] VercelログでWebhookが呼ばれていることを確認
- [ ] 実際のユーザー登録でテスト
- [ ] Supabaseでユーザーデータが作成されていることを確認

---

## 🎯 次のステップ

1. **Clerk DashboardでWebhook設定を確認**
   - Preview DeploymentのURLが設定されているか
   - イベント（user.created）が有効になっているか

2. **Clerk Dashboardで「Send test event」を実行**
   - VercelログでWebhookが呼ばれているか確認

3. **Vercel環境変数を確認**
   - `WEBHOOK_SECRET`が設定されているか
   - Preview環境にも設定されているか

4. **実際のユーザー登録でテスト**
   - VercelログでWebhookが呼ばれているか確認
   - Supabaseでユーザーデータが作成されているか確認

