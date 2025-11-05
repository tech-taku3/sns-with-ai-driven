import { createClient } from '@supabase/supabase-js';

// 環境変数の厳格なチェック
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// 必須環境変数が未設定の場合は即座にエラー
if (!supabaseUrl) {
  throw new Error('❌ 環境変数 NEXT_PUBLIC_SUPABASE_URL が設定されていません');
}

if (!supabaseServiceKey) {
  throw new Error('❌ 環境変数 SUPABASE_SERVICE_ROLE_KEY が設定されていません');
}

if (!supabaseAnonKey) {
  throw new Error('❌ 環境変数 NEXT_PUBLIC_SUPABASE_ANON_KEY が設定されていません');
}

// Server-side client with service role key for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Client-side client for user operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
