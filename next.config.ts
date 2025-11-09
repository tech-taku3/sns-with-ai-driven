/** @type {import('next').NextConfig} */

// ビルド時セキュリティチェック: Service Role Key の露出防止
if (process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error(
    '❌ セキュリティエラー: SUPABASE_SERVICE_ROLE_KEY が NEXT_PUBLIC_ プレフィックスで公開されています！\n' +
    '   Service Role Key はクライアントサイドに露出してはいけません。\n' +
    '   環境変数名を SUPABASE_SERVICE_ROLE_KEY に変更してください。'
  );
}

if (process.env.NEXT_PUBLIC_DATABASE_URL) {
  throw new Error(
    '❌ セキュリティエラー: DATABASE_URL が NEXT_PUBLIC_ プレフィックスで公開されています！\n' +
    '   データベース接続情報はクライアントサイドに露出してはいけません。'
  );
}

const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'api.dicebear.com',  // アバター画像用のドメインも追加
      'img.clerk.com',     // Clerk プロフィール画像
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',  // すべてのSupabaseプロジェクトに対応
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',  // Clerk OAuth画像
      },
    ],
  },
  
  // セキュリティヘッダーの設定
  async headers() {
    return [
      {
        // すべてのルートに適用
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            // お試しプロジェクト向け: 1年間、サブドメイン含む
            // 本格運用時は max-age を増やし、preload を追加可能
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig