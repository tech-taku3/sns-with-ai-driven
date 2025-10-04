/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'api.dicebear.com'  // アバター画像用のドメインも追加
    ],
  },
}

module.exports = nextConfig