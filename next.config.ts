import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog/what-makes-restaurant-website-work',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'motion-bite.vercel.app' }],
        destination: 'https://www.motionbite.com/:path*',
        permanent: true,
      },
      {
        // WP3 5.4: the Arabic home page document uses the reserved slug "home".
        source: '/ar/home',
        destination: '/ar',
        permanent: true,
      },
      {
        source: '/free-audit',
        destination: '/free-consultation',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
