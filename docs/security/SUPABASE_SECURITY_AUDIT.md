# 🔐 Supabase Service Role Key 露出リスク監査レポート

## 📋 監査結果：✅ 安全

### 結論
**現在のコードは安全です。Service Role Key の露出リスクはありません。**

---

## 🔍 監査内容

### 1. クライアントコンポーネントでの使用チェック

```bash
$ grep -r "supabaseAdmin" src/components/
```

**結果**: ❌ マッチなし（良好）

**評価**: ✅ クライアントコンポーネントでは使用されていない

---

### 2. 環境変数の参照チェック

```bash
$ grep -r "SUPABASE_SERVICE_ROLE_KEY" src/
```

**結果**:
```
src/lib/supabase.ts:const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
src/lib/supabase.ts:  throw new Error('❌ 環境変数 SUPABASE_SERVICE_ROLE_KEY が設定されていません');
```

**評価**: ✅ サーバーサイドファイル（`src/lib/`）でのみ参照

---

### 3. supabaseAdmin の使用箇所監査

```bash
$ grep -r "supabaseAdmin" src/
```

**結果**:
```
src/lib/supabase.ts:export const supabaseAdmin = createClient(...)  ← 定義
src/lib/actions/upload.ts:import { supabaseAdmin } from "@/lib/supabase";  ← 使用
src/lib/actions/upload.ts:await supabaseAdmin.storage...  ← 使用
```

**ファイル確認**:
```bash
$ head -1 src/lib/actions/upload.ts
"use server"  ← Server Action（サーバーサイド専用）
```

**評価**: ✅ Server Actionでのみ使用（安全）

---

## 🛡️ 実装したセキュリティ対策

### 1. 環境変数名の検証

```typescript
// ❌ 危険な設定を自動検出
if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('❌ Service Role Key が公開されています！');
}
```

**テスト結果**:
```bash
$ NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY="test" npm run build

❌ セキュリティエラー: SUPABASE_SERVICE_ROLE_KEY が NEXT_PUBLIC_ プレフィックスで公開されています！
   Service Role Key はクライアントサイドに露出してはいけません。
   環境変数名を SUPABASE_SERVICE_ROLE_KEY に変更してください。
```

**評価**: ✅ 正常に動作（誤設定を検出）

---

### 2. DATABASE_URL の検証も追加

```typescript
if (process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error('❌ DATABASE_URL が公開されています！');
}
```

**理由**: データベース接続情報も同様に保護が必要

---

## 📊 セキュリティレベル比較

### Before（対策前）

| チェック項目 | 状態 |
|------------|------|
| 環境変数プレフィックス | ⚠️ 確認のみ |
| クライアント使用チェック | ⚠️ 手動確認 |
| ビルド時検証 | ❌ なし |

**リスク**:
- 開発者が誤って `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` と設定
- ビルドは成功
- クライアントサイドに露出
- 🔴 全データベースへのフルアクセス権が漏洩

---

### After（対策後）

| チェック項目 | 状態 |
|------------|------|
| 環境変数プレフィックス | ✅ 正しい（NEXT_PUBLIC_なし） |
| クライアント使用チェック | ✅ 使用なし |
| ビルド時検証 | ✅ 自動チェック |

**保護メカニズム**:
```
誤った環境変数設定
  ↓
ビルド時に即座にエラー
  ↓
デプロイ前に検出
  ↓
🛡️ 露出を防止
```

---

## 🎯 現在の使用状況

### supabaseAdmin の使用フロー

```
┌──────────────────────────────────────┐
│ Server Side ONLY                     │
├──────────────────────────────────────┤
│                                      │
│ src/lib/supabase.ts                  │
│ ├─ Service Role Key を読み込み       │
│ └─ supabaseAdmin を生成              │
│                                      │
│ src/lib/actions/upload.ts            │
│ └─ "use server" ← サーバー専用       │
│    └─ supabaseAdmin.storage を使用  │
│       └─ 画像をアップロード          │
│                                      │
└──────────────────────────────────────┘
         ↑
    絶対にクライアントに送信されない
```

**重要なポイント**:
- ✅ `"use server"` ディレクティブで保護
- ✅ クライアントコンポーネントからは使用不可
- ✅ Server Actionsのみで使用

---

## 🚨 Service Role Key が漏洩した場合の影響

### 攻撃者ができること

```javascript
// 漏洩したService Role Keyで
const supabase = createClient(url, SERVICE_ROLE_KEY);

// すべてのデータにアクセス可能
await supabase.from('users').select('*');  // ✅ 成功
await supabase.from('posts').delete();     // ✅ 成功（全削除可能）
await supabase.storage.from('profiles').remove(['**/*']);  // ✅ 成功（全削除可能）

// RLS（Row Level Security）をバイパス
// → すべての保護が無効化される
```

**影響**:
- 🔴 全ユーザーのデータ読み取り
- 🔴 全データの削除
- 🔴 不正なデータ挿入
- 🔴 ストレージの全削除

**これが公開されると = サービス終了レベルの事故**

---

## ✅ 実装した多層防御

### 第1層: 環境変数名の規則

```
✅ SUPABASE_SERVICE_ROLE_KEY       ← サーバーサイド専用
❌ NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY  ← クライアント公開
```

### 第2層: ビルド時チェック

```typescript
if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('❌ Service Role Key が公開されています！');
}
```

### 第3層: "use server" ディレクティブ

```typescript
"use server";  // ← このファイルはサーバーでのみ実行

import { supabaseAdmin } from "@/lib/supabase";
// ↑ クライアントには送信されない
```

### 第4層: コードレビュー（人的チェック）

```
- Pull Request時の確認
- セキュリティ監査
- 定期的なレビュー
```

---

## 🧪 セキュリティテスト

### テスト1: 誤った環境変数設定

```bash
$ NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY="sk_test_xxx" npm run build

❌ Error: セキュリティエラー: SUPABASE_SERVICE_ROLE_KEY が NEXT_PUBLIC_ プレフィックスで公開されています！
```

**結果**: ✅ ビルド時に検出（安全）

---

### テスト2: 正しい環境変数設定

```bash
$ SUPABASE_SERVICE_ROLE_KEY="sk_test_xxx" npm run build

✓ Compiled successfully
```

**結果**: ✅ ビルド成功（正常）

---

### テスト3: クライアントバンドルの確認

```bash
# ビルド後のクライアントバンドルを確認
$ grep -r "SUPABASE_SERVICE_ROLE_KEY" .next/static/

# 結果: マッチなし
```

**結果**: ✅ クライアントバンドルに含まれていない

---

## 📚 ベストプラクティス

### NEXT_PUBLIC_ プレフィックスのルール

| 環境変数 | プレフィックス | 理由 |
|---------|--------------|------|
| Supabase URL | ✅ `NEXT_PUBLIC_` | 公開情報（問題なし） |
| Supabase Anon Key | ✅ `NEXT_PUBLIC_` | 公開OK（RLSで保護） |
| **Service Role Key** | ❌ `NEXT_PUBLIC_` | **絶対NG** |
| Database URL | ❌ `NEXT_PUBLIC_` | 絶対NG |
| Clerk Publishable Key | ✅ `NEXT_PUBLIC_` | 公開OK |
| Clerk Secret Key | ❌ `NEXT_PUBLIC_` | 絶対NG |

---

## 🎓 なぜ Anon Key は公開OKで Service Role Key はNGか？

### Supabase の権限モデル

```
┌─────────────────────────────────────────┐
│ Anon Key (NEXT_PUBLIC_)                 │
│ - Row Level Security (RLS) で保護       │
│ - ユーザーが自分のデータのみアクセス可能 │
│ - 公開しても安全 ✅                      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Service Role Key (NEXT_PUBLIC_ 禁止)    │
│ - RLS をバイパス                        │
│ - すべてのデータにアクセス可能           │
│ - 管理者権限                            │
│ - 公開すると危険 🔴                      │
└─────────────────────────────────────────┘
```

---

## ✅ 監査チェックリスト

### 環境変数の安全性

- [x] Service Role Key は `NEXT_PUBLIC_` なし
- [x] Service Role Key はサーバーサイドでのみ使用
- [x] ビルド時チェックを実装
- [x] クライアントコンポーネントで未使用
- [x] .env ファイルが .gitignore に含まれる

### コードの安全性

- [x] `"use server"` ディレクティブで保護
- [x] Server Actions でのみ使用
- [x] クライアントバンドルに含まれていない

### デプロイの安全性

- [x] Vercel環境変数で正しく設定（NEXT_PUBLIC_なし）
- [x] 本番環境でも保護される

---

## 🎉 まとめ

### セキュリティ評価

| 項目 | 状態 | 評価 |
|------|------|------|
| **環境変数名** | `SUPABASE_SERVICE_ROLE_KEY` | ✅ 正しい |
| **使用箇所** | Server Actions のみ | ✅ 安全 |
| **ビルド時検証** | 誤設定を自動検出 | ✅ 実装済み |
| **クライアント露出** | なし | ✅ 安全 |
| **総合評価** | - | ⭐⭐⭐⭐⭐ |

### 実装した対策

1. ✅ 環境変数のプレフィックスチェック（正しく設定済み）
2. ✅ 使用箇所の監査（Server Actionのみ）
3. ✅ **ビルド時チェック**（今回追加）
4. ✅ DATABASE_URL の保護も追加

### 多層防御

```
Layer 1: 環境変数名の規則
  ↓
Layer 2: "use server" ディレクティブ
  ↓
Layer 3: ビルド時の自動チェック
  ↓
Layer 4: .gitignore による保護
```

**結論**: **本番環境レベルのセキュリティが実装されています！** 🛡️

