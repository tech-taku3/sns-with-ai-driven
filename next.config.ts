/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'api.dicebear.com',  // アバター画像用のドメインも追加
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',  // すべてのSupabaseプロジェクトに対応
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig