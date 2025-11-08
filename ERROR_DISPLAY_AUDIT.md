# 🔍 Server Actions エラー表示の監査レポート

## 📋 全Server Actionsの一覧

### 1. 投稿機能 (`src/lib/actions/posts.ts`)

#### ✅ createPost
- **使用場所**: `src/components/timeline/new-post-input.tsx`
- **エラー表示**: **✅ 実装済み**
```tsx
// Line 86-90
{!state.success && state.error && (
  <div className="mb-3 text-sm text-red-500">
    {state.error}
  </div>
)}
```
- **エラーメッセージ例**:
  - "認証が必要です。ログインしてください。"
  - "投稿の上限に達しました。しばらくしてからお試しください。" (レート制限)
  - "投稿内容を入力してください。"
  - "投稿は280文字以内で入力してください。"

#### ⚠️ deletePost
- **使用場所**: **未実装**
- **エラー表示**: **該当なし**
- **備考**: 投稿削除機能自体が実装されていない

---

### 2. いいね機能 (`src/lib/actions/likes.ts`)

#### ✅ toggleLike
- **使用場所**: `src/components/post/like-button.tsx`
- **エラー表示**: **✅ 今回追加**
```tsx
// Line 79-83
{state.error && (
  <div className="absolute top-full left-0 mt-1 px-2 py-1 bg-red-500 text-white text-xs rounded whitespace-nowrap z-10 shadow-lg">
    {state.error}
  </div>
)}
```
- **エラーメッセージ例**:
  - "認証が必要です"
  - "いいねの上限に達しました。しばらくしてからお試しください。" (レート制限)
  - "ユーザーが見つかりません"

---

### 3. フォロー機能 (`src/lib/actions/follows.ts`)

#### ✅ toggleFollow
- **使用場所**: `src/components/profile/follow-button.tsx`
- **エラー表示**: **✅ 今回追加**
```tsx
// Line 65-69
{state.error && (
  <div className="absolute top-full left-0 mt-2 px-3 py-2 bg-red-500 text-white text-sm rounded shadow-lg whitespace-nowrap z-10">
    {state.error}
  </div>
)}
```
- **エラーメッセージ例**:
  - "認証が必要です"
  - "フォローの上限に達しました。しばらくしてからお試しください。" (レート制限)
  - "ユーザーIDが必要です"
  - "自分自身をフォローすることはできません"
  - "フォロー対象のユーザーが見つかりません"

---

### 4. アップロード機能 (`src/lib/actions/upload.ts`)

#### ✅ uploadImage
- **使用場所**: `src/components/profile/edit-profile-modal.tsx`
- **エラー表示**: **⚠️ 部分的に実装**

**問題点**:
- `uploadImage`は`useActionState`を使用**していない**
- 直接`async`関数として呼び出している
- エラーは`alert()`で表示

```tsx
// Line 60-62 (edit-profile-modal.tsx)
if (result.url) {
  setCoverPreview(result.url);
} else if (result.error) {
  alert(result.error);  // ← alert使用（改善の余地あり）
}
```

**エラーメッセージ例**:
  - "認証が必要です"
  - "アップロードの上限に達しました。しばらくしてからお試しください。" (レート制限)
  - "ファイルを選択してください"
  - "ファイルサイズは5MB以下にしてください"
  - "JPEG、PNG、WebP形式の画像のみアップロード可能です"

---

### 5. プロフィール更新 (`src/lib/actions/users.ts`)

#### ✅ updateProfile
- **使用場所**: `src/components/profile/edit-profile-modal.tsx`
- **エラー表示**: **✅ 実装済み**
```tsx
// Line 137-144
{state.error && (
  <div className="px-6 pt-4">
    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm">
      {state.error}
    </div>
  </div>
)}
```
- **エラーメッセージ例**:
  - "認証が必要です"
  - "プロフィール更新の上限に達しました。しばらくしてからお試しください。" (レート制限)
  - "名前を入力してください"
  - "ユーザーが見つかりません"

---

## 📊 エラー表示の実装状況まとめ

| Server Action | 使用箇所 | エラー表示 | 実装方法 | 状態 |
|--------------|---------|----------|---------|------|
| `createPost` | new-post-input.tsx | ✅ あり | useActionState | ✅ 良好 |
| `deletePost` | - | - | 未実装 | ⚪ 該当なし |
| `toggleLike` | like-button.tsx | ✅ あり | useActionState | ✅ 良好 |
| `toggleFollow` | follow-button.tsx | ✅ あり | useActionState | ✅ 良好 |
| `uploadImage` | edit-profile-modal.tsx | ⚠️ alert | 直接呼び出し | ⚠️ 改善推奨 |
| `updateProfile` | edit-profile-modal.tsx | ✅ あり | useActionState | ✅ 良好 |

---

## 🎯 重要な発見

### ✅ 正しく実装されているパターン

```tsx
// useActionState を使用
const [state, formAction, pending] = useActionState(serverAction, initialState);

// エラー表示
{state.error && (
  <div className="...エラースタイル...">
    {state.error}
  </div>
)}
```

**このパターンを使用**:
- createPost ✅
- toggleLike ✅
- toggleFollow ✅
- updateProfile ✅

---

### ⚠️ 改善が必要なパターン

```tsx
// 直接呼び出し（useActionStateを使用していない）
const result = await uploadImage({}, formData);

// alertで表示（UX的に良くない）
if (result.error) {
  alert(result.error);  // ← 古い方法
}
```

**このパターンを使用**:
- uploadImage ⚠️

---

## 🛠️ 改善提案

### 1. uploadImageのエラー表示を改善

#### 現在の問題

```tsx
// edit-profile-modal.tsx
const result = await uploadImage({}, formData);
if (result.error) {
  alert(result.error);  // ❌ ブラウザのalert（古い）
}
```

**問題点**:
- `alert()`はUXが悪い
- デザインが統一されていない
- モーダルの外に表示される
- モバイルでの体験が悪い

#### 改善案

```tsx
// 状態管理を追加
const [uploadError, setUploadError] = useState<string | null>(null);

// エラーハンドリング
const result = await uploadImage({}, formData);
if (result.error) {
  setUploadError(result.error);  // ✅ 状態に保存
  setTimeout(() => setUploadError(null), 5000);  // 5秒後に消す
}

// 表示
{uploadError && (
  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
    {uploadError}
  </div>
)}
```

---

## 📝 エラー表示のベストプラクティス

### ✅ 推奨される実装

#### 1. useActionState を使用

```tsx
const [state, formAction, pending] = useActionState(serverAction, {});
```

**メリット**:
- エラーが自動的に`state.error`に格納される
- ペンディング状態も管理される
- Next.jsの推奨パターン

#### 2. 適切なエラー表示

```tsx
{state.error && (
  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
    {state.error}
  </div>
)}
```

**特徴**:
- ユーザーフレンドリー
- デザインが統一
- アクセシビリティ対応

#### 3. エラーの配置

| コンポーネント種別 | 配置場所 | 例 |
|------------------|---------|-----|
| フォーム | フォーム内上部 | new-post-input.tsx |
| モーダル | ヘッダー下 | edit-profile-modal.tsx |
| ボタン | ボタン直下（absolute） | like-button.tsx |

---

## ❌ 避けるべき実装

### 1. alert() の使用

```tsx
// ❌ 悪い例
if (error) {
  alert(error);
}
```

**理由**:
- デザインが古い
- カスタマイズ不可
- モバイル対応が悪い
- アクセシビリティが低い

### 2. console.error() のみ

```tsx
// ❌ 悪い例
if (error) {
  console.error(error);  // ユーザーには見えない
}
```

**理由**:
- エンドユーザーには見えない
- デバッグ専用

### 3. エラー表示なし

```tsx
// ❌ 最悪の例
const result = await action();
// エラーハンドリングなし
```

**理由**:
- ユーザーが何が起きたか分からない
- 混乱を招く

---

## 🎯 次のステップ

### 優先度: 高

- [ ] `uploadImage`のエラー表示を改善（alert → 適切なUI）

### 優先度: 中

- [ ] 全てのエラーメッセージのデザイン統一
- [ ] エラーの自動消去機能追加（5秒後など）

### 優先度: 低

- [ ] エラーメッセージの多言語対応
- [ ] エラーログの収集（Sentry等）

---

## ✅ チェックリスト

### Server Actions

- [x] createPost のエラー表示確認
- [x] toggleLike のエラー表示確認
- [x] toggleFollow のエラー表示確認
- [x] updateProfile のエラー表示確認
- [x] uploadImage のエラー表示確認（改善が必要）

### エラー表示の品質

- [x] useActionState を使用している
- [x] ユーザーフレンドリーなメッセージ
- [x] 適切なデザイン（色、配置）
- [ ] 自動消去機能（オプション）
- [ ] アニメーション（オプション）

---

## 🎉 結論

### 現状の評価

**総合評価**: ⭐⭐⭐⭐☆ (4/5)

**良い点**:
- ✅ ほとんどのServer Actionsでエラー表示が実装されている
- ✅ useActionStateの適切な使用
- ✅ レート制限のエラーも表示される

**改善点**:
- ⚠️ uploadImageのalert使用（優先度: 高）
- ⚠️ エラー表示のデザイン統一（優先度: 中）

### ユーザーへの回答

> **質問**: "レート制限だけではなく、actionsで出されるreturn errorは、表示先を設定していないですか？"

**回答**: 
その通りです！Server Actionsの`error`は、**各コンポーネントで表示処理を実装しないと表示されません**。

**現状**:
- ✅ ほとんどは実装済み（createPost, toggleLike, toggleFollow, updateProfile）
- ⚠️ uploadImageのみalertを使用（改善が必要）

**重要な原則**:
```tsx
// Server Actionでエラーを返しても...
return { error: "エラーメッセージ" };

// クライアント側で表示処理が必要！
{state.error && <div>{state.error}</div>}
```

これが実装されていないと、エラーは発生しているのに**ユーザーには見えない**状態になります。

