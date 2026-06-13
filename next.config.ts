import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/free-audit',
        destination: '/free-consultation',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
