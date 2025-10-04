-- 現在の投稿データを確認
SELECT p.id, p.content, u.username, u.display_name, p.created_at 
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE p.is_published = true 
ORDER BY p.created_at DESC 
LIMIT 10;

-- リプライ用のサンプルデータを作成
-- まず、リプライ用のユーザーを追加（既存のユーザーがある場合はスキップ）
INSERT INTO users (id, email, password_hash, username, display_name, bio, profile_image_url, created_at, updated_at)
VALUES 
  ('user-reply-1', 'reply1@example.com', 'hashed_password', 'reply_user_1', 'リプライユーザー1', 'リプライ専門ユーザーです', 'https://api.dicebear.com/7.x/avataaars/svg?seed=reply1', NOW(), NOW()),
  ('user-reply-2', 'reply2@example.com', 'hashed_password', 'reply_user_2', 'リプライユーザー2', 'コメント大好き', 'https://api.dicebear.com/7.x/avataaars/svg?seed=reply2', NOW(), NOW()),
  ('user-reply-3', 'reply3@example.com', 'hashed_password', 'reply_user_3', 'リプライユーザー3', '議論好きです', 'https://api.dicebear.com/7.x/avataaars/svg?seed=reply3', NOW(), NOW()),
  ('user-reply-4', 'reply4@example.com', 'hashed_password', 'reply_user_4', 'リプライユーザー4', 'いつもコメントしてます', 'https://api.dicebear.com/7.x/avataaars/svg?seed=reply4', NOW(), NOW()),
  ('user-reply-5', 'reply5@example.com', 'hashed_password', 'reply_user_5', 'リプライユーザー5', '議論に参加します', 'https://api.dicebear.com/7.x/avataaars/svg?seed=reply5', NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- 既存の投稿にリプライを追加
-- パターン1: リプライなしの投稿（既存の投稿をそのまま維持）
-- パターン2: 1つのリプライがある投稿
-- パターン3: 複数のリプライがある投稿

-- 最初の投稿に1つのリプライを追加
INSERT INTO posts (id, content, user_id, is_published, parent_id, created_at, updated_at)
SELECT 
  'reply-1-' || p.id,
  'これは興味深い投稿ですね！私も同じ意見です。',
  'user-reply-1',
  true,
  p.id,
  p.created_at + INTERVAL '1 hour',
  NOW()
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE p.is_published = true 
ORDER BY p.created_at DESC 
LIMIT 1;

-- 2番目の投稿に複数のリプライを追加
INSERT INTO posts (id, content, user_id, is_published, parent_id, created_at, updated_at)
SELECT 
  'reply-2-' || p.id || '-1',
  '完全に同意します！この問題は重要ですね。',
  'user-reply-2',
  true,
  p.id,
  p.created_at + INTERVAL '30 minutes',
  NOW()
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE p.is_published = true 
ORDER BY p.created_at DESC 
LIMIT 1 OFFSET 1;

INSERT INTO posts (id, content, user_id, is_published, parent_id, created_at, updated_at)
SELECT 
  'reply-2-' || p.id || '-2',
  'でも、別の視点から考えると...',
  'user-reply-3',
  true,
  p.id,
  p.created_at + INTERVAL '1 hour',
  NOW()
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE p.is_published = true 
ORDER BY p.created_at DESC 
LIMIT 1 OFFSET 1;

INSERT INTO posts (id, content, user_id, is_published, parent_id, created_at, updated_at)
SELECT 
  'reply-2-' || p.id || '-3',
  '#議論 #重要 この話題についてもっと詳しく知りたいです！',
  'user-reply-4',
  true,
  p.id,
  p.created_at + INTERVAL '2 hours',
  NOW()
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE p.is_published = true 
ORDER BY p.created_at DESC 
LIMIT 1 OFFSET 1;

-- 3番目の投稿に複数のリプライを追加（より多くのリプライ）
INSERT INTO posts (id, content, user_id, is_published, parent_id, created_at, updated_at)
SELECT 
  'reply-3-' || p.id || '-1',
  '素晴らしい投稿です！',
  'user-reply-1',
  true,
  p.id,
  p.created_at + INTERVAL '15 minutes',
  NOW()
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE p.is_published = true 
ORDER BY p.created_at DESC 
LIMIT 1 OFFSET 2;

INSERT INTO posts (id, content, user_id, is_published, parent_id, created_at, updated_at)
SELECT 
  'reply-3-' || p.id || '-2',
  '私も同じ経験があります。',
  'user-reply-2',
  true,
  p.id,
  p.created_at + INTERVAL '45 minutes',
  NOW()
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE p.is_published = true 
ORDER BY p.created_at DESC 
LIMIT 1 OFFSET 2;

INSERT INTO posts (id, content, user_id, is_published, parent_id, created_at, updated_at)
SELECT 
  'reply-3-' || p.id || '-3',
  '興味深い視点ですね。',
  'user-reply-3',
  true,
  p.id,
  p.created_at + INTERVAL '1 hour 15 minutes',
  NOW()
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE p.is_published = true 
ORDER BY p.created_at DESC 
LIMIT 1 OFFSET 2;

INSERT INTO posts (id, content, user_id, is_published, parent_id, created_at, updated_at)
SELECT 
  'reply-3-' || p.id || '-4',
  'この問題についてもっと議論したいです。',
  'user-reply-4',
  true,
  p.id,
  p.created_at + INTERVAL '2 hours',
  NOW()
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE p.is_published = true 
ORDER BY p.created_at DESC 
LIMIT 1 OFFSET 2;

INSERT INTO posts (id, content, user_id, is_published, parent_id, created_at, updated_at)
SELECT 
  'reply-3-' || p.id || '-5',
  'ありがとうございます！とても参考になりました。',
  'user-reply-5',
  true,
  p.id,
  p.created_at + INTERVAL '3 hours',
  NOW()
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE p.is_published = true 
ORDER BY p.created_at DESC 
LIMIT 1 OFFSET 2;

-- 結果を確認
SELECT 
  p.id,
  p.content,
  u.username,
  u.display_name,
  p.parent_id,
  p.created_at,
  CASE 
    WHEN p.parent_id IS NULL THEN 'メイン投稿'
    ELSE 'リプライ'
  END as post_type
FROM posts p 
JOIN users u ON p.user_id = u.id 
WHERE p.is_published = true 
ORDER BY 
  CASE WHEN p.parent_id IS NULL THEN p.created_at ELSE (SELECT created_at FROM posts parent WHERE parent.id = p.parent_id) END DESC,
  p.created_at ASC;
