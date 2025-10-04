-- 投稿とリプライの確認
SELECT 
  p.id,
  LEFT(p.content, 50) as content_preview,
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
  p.created_at ASC
LIMIT 20;
