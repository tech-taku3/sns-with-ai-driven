# 🔐 Clerk インスタンス設定ガイド

## 📋 概要

Clerkでは、**DevelopmentインスタンスとProductionインスタンスを分けるか、同じインスタンスを使い続けるか**を選択できます。

---

## 🤔 どちらを選ぶべきか？

### 同じインスタンスを使い続ける場合（推奨：小規模プロジェクト）

**メリット**:
- ✅ 設定が簡単
- ✅ 管理が容易
- ✅ 開発と本番で同じユーザーデータを共有できる（テストしやすい）

**デメリット**:
- ❌ 開発中のテストユーザーが本番環境にも存在する
- ❌ 開発中の設定変更が本番環境に影響する可能性

**推奨されるケース**:
- 個人プロジェクト
- 小規模なスタートアップ
- プロトタイプ段階

---

### 別々のインスタンスを作成する場合（推奨：本格運用）

**メリット**:
- ✅ 開発と本番を完全に分離できる
- ✅ 本番環境のセキュリティを高められる
- ✅ 開発中の設定変更が本番環境に影響しない

**デメリット**:
- ❌ 設定が複雑になる
- ❌ 管理が煩雑になる
- ❌ 環境変数の切り替えが必要

**推奨されるケース**:
- 本格的な本番運用
- 企業向けアプリケーション
- 複数人で開発しているプロジェクト

---

## 🔧 設定方法

### オプション1: 同じインスタンスを使い続ける（現在の設定）

**現在の状態**:
- Developmentインスタンスを使用
- 同じAPIキーを開発と本番で使用

**環境変数の設定**:

#### ローカル環境（.env.local）
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[YOUR_PUBLISHABLE_KEY]
CLERK_SECRET_KEY=sk_test_[YOUR_SECRET_KEY]
WEBHOOK_SECRET=whsec_[YOUR_WEBHOOK_SECRET]
```

#### Vercel環境変数
```
Production環境:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[YOUR_PUBLISHABLE_KEY]
CLERK_SECRET_KEY=sk_test_[YOUR_SECRET_KEY]
WEBHOOK_SECRET=whsec_[YOUR_WEBHOOK_SECRET]

Preview環境:
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[YOUR_PUBLISHABLE_KEY]
CLERK_SECRET_KEY=sk_test_[YOUR_SECRET_KEY]
WEBHOOK_SECRET=whsec_[YOUR_WEBHOOK_SECRET]
```

**注意点**:
- 開発と本番で同じユーザーデータベースを共有する
- 開発中のテストユーザーが本番環境にも存在する
- Webhook URLは環境ごとに設定が必要

---

### オプション2: Productionインスタンスを作成する（本格運用）

**手順**:

#### ステップ1: Productionインスタンスを作成

```
1. Clerk Dashboard にアクセス
   https://dashboard.clerk.com

2. 右上の「Create Application」をクリック

3. アプリケーション名を入力（例: "SNS App Production"）

4. 「Create」をクリック

5. インスタンスタイプを選択:
   - Development（開発用）
   - Production（本番用）← これを選択
```

#### ステップ2: ProductionインスタンスのAPIキーを取得

```
1. Productionインスタンスを選択

2. 「API Keys」タブを開く

3. 以下のキーをコピー:
   - Publishable Key（pk_live_...）
   - Secret Key（sk_live_...）
```

**重要**: ProductionインスタンスのAPIキーは `pk_live_` と `sk_live_` で始まります。

#### ステップ3: ProductionインスタンスのWebhookを設定

```
1. Productionインスタンスを選択

2. 「Webhooks」タブを開く

3. 「Create Endpoint」をクリック

4. エンドポイントURLを入力:
   https://your-production-url.vercel.app/api/webhooks/clerk

5. イベントを選択:
   ✅ user.created
   ✅ user.updated
   ✅ user.deleted

6. 「Create」をクリック

7. 「Signing Secret」をコピー（whsec_...）
```

#### ステップ4: Vercel環境変数を更新

**Production環境のみ更新**:

```
Vercel Dashboard
↓
Settings → Environment Variables
↓
Production環境の環境変数を更新:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_[YOUR_PUBLISHABLE_KEY]
CLERK_SECRET_KEY=sk_live_[YOUR_SECRET_KEY]
WEBHOOK_SECRET=whsec_[YOUR_WEBHOOK_SECRET]（Productionインスタンスのもの）
```

**Preview環境とDevelopment環境は変更しない**:
- Preview環境: Developmentインスタンスのキーを使用
- Development環境: Developmentインスタンスのキーを使用

---

## 📊 環境変数の管理

### 推奨構成（Productionインスタンスを使用する場合）

| 環境 | Clerkインスタンス | APIキープレフィックス | 用途 |
|------|------------------|---------------------|------|
| **ローカル開発** | Development | `pk_test_` / `sk_test_` | 開発・テスト |
| **Preview Deployment** | Development | `pk_test_` / `sk_test_` | PRのテスト |
| **Production** | Production | `pk_live_` / `sk_live_` | 本番運用 |

### 環境変数の設定例

#### ローカル環境（.env.local）
```env
# Developmentインスタンス（開発用）
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[YOUR_PUBLISHABLE_KEY]
CLERK_SECRET_KEY=sk_test_[YOUR_SECRET_KEY]
WEBHOOK_SECRET=whsec_[YOUR_WEBHOOK_SECRET]
```

#### Vercel環境変数

**Production環境**:
```env
# Productionインスタンス（本番用）
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_[YOUR_PUBLISHABLE_KEY]
CLERK_SECRET_KEY=sk_live_[YOUR_SECRET_KEY]
WEBHOOK_SECRET=whsec_[YOUR_WEBHOOK_SECRET]（Productionインスタンスのもの）
```

**Preview環境**:
```env
# Developmentインスタンス（開発用）
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[YOUR_PUBLISHABLE_KEY]
CLERK_SECRET_KEY=sk_test_[YOUR_SECRET_KEY]
WEBHOOK_SECRET=whsec_[YOUR_WEBHOOK_SECRET]（Developmentインスタンスのもの）
```

**Development環境**:
```env
# Developmentインスタンス（開発用）
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[YOUR_PUBLISHABLE_KEY]
CLERK_SECRET_KEY=sk_test_[YOUR_SECRET_KEY]
WEBHOOK_SECRET=whsec_[YOUR_WEBHOOK_SECRET]（Developmentインスタンスのもの）
```

---

## ⚠️ 重要な注意事項

### 1. APIキーのプレフィックス

**Developmentインスタンス**:
- `pk_test_...` / `sk_test_...`
- テスト用のキー

**Productionインスタンス**:
- `pk_live_...` / `sk_live_...`
- 本番用のキー

**混在させない**:
- ❌ Production環境で `pk_test_` を使用
- ❌ Development環境で `pk_live_` を使用

---

### 2. Webhook Secret

**重要**: 各インスタンスごとに異なるWebhook Secretが生成されます。

- DevelopmentインスタンスのWebhook Secret → Development環境で使用
- ProductionインスタンスのWebhook Secret → Production環境で使用

**混在させると**:
- Webhook署名検証が失敗する
- 401 Unauthorizedエラーが発生する

---

### 3. ユーザーデータの分離

**同じインスタンスを使用する場合**:
- 開発と本番で同じユーザーデータベースを共有
- 開発中のテストユーザーが本番環境にも存在

**別々のインスタンスを使用する場合**:
- 開発と本番で完全に分離
- 開発中のテストユーザーは本番環境に存在しない

---

## 🎯 推奨事項

### 現在のプロジェクト（お試し段階）

**推奨**: **同じインスタンス（Development）を使い続ける**

**理由**:
- 設定が簡単
- 管理が容易
- プロトタイプ段階では十分

**必要な作業**:
- 環境変数をVercelに設定（既に完了している可能性）
- Webhook URLを設定（Preview DeploymentのURLも含む）

---

### 本格運用を開始する場合

**推奨**: **Productionインスタンスを作成する**

**理由**:
- セキュリティを高められる
- 開発と本番を分離できる
- 本番環境の安定性を確保できる

**必要な作業**:
1. Productionインスタンスを作成
2. ProductionインスタンスのAPIキーを取得
3. ProductionインスタンスのWebhookを設定
4. VercelのProduction環境変数を更新
5. Preview環境とDevelopment環境は変更しない

---

## 🔍 現在の設定を確認する方法

### 1. 環境変数の確認

**Vercel Dashboard**:
```
Settings → Environment Variables
↓
各環境（Production, Preview, Development）の環境変数を確認
```

**確認ポイント**:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` のプレフィックス
  - `pk_test_` → Developmentインスタンス
  - `pk_live_` → Productionインスタンス

---

### 2. Clerk Dashboardで確認

```
1. Clerk Dashboard にアクセス
   https://dashboard.clerk.com

2. 左上のインスタンス名を確認
   - "Development" → Developmentインスタンス
   - "Production" → Productionインスタンス

3. インスタンスを切り替えて確認
```

---

## 📝 まとめ

### 質問への回答

**Q: Clerkのインスタンスはdevelopmentではなく、productionインスタンスを作成し、Env Variablesを置き換えていく必要がありますか？**

**A: 必ずしも必要ではありません。状況に応じて選択してください。**

**現在のプロジェクト（お試し段階）の場合**:
- ✅ **同じインスタンス（Development）を使い続けることを推奨**
- ✅ 環境変数の置き換えは不要
- ✅ 設定が簡単で管理が容易

**本格運用を開始する場合**:
- ✅ **Productionインスタンスを作成することを推奨**
- ✅ Production環境の環境変数のみ置き換え
- ✅ Preview環境とDevelopment環境は変更しない

---

## 🚀 次のステップ

### 同じインスタンスを使い続ける場合

1. Vercel環境変数を確認
2. Webhook URLを設定（Preview DeploymentのURLも含む）
3. 動作確認

### Productionインスタンスを作成する場合

1. Productionインスタンスを作成
2. ProductionインスタンスのAPIキーを取得
3. ProductionインスタンスのWebhookを設定
4. VercelのProduction環境変数のみ更新
5. 動作確認

---

## 📚 参考リンク

- [Clerk Documentation: Environments](https://clerk.com/docs/deployments/overview)
- [Clerk Documentation: API Keys](https://clerk.com/docs/backend-requests/making-requests)
- [Clerk Documentation: Webhooks](https://clerk.com/docs/integrations/webhooks/overview)

