import { ImageResponse } from 'next/og'
import { getPost } from '@/sanity/queries'

export const runtime = 'edge'
export const alt = 'MotionBite Blog Post'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const revalidate = 86400 // Cache for 24 hours — post OG rarely changes

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return new ImageResponse(
      (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#0f0f12', display: 'flex' }} />
      ),
      { ...size }
    )
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0f0f12',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Subtle glow circles for background texture */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            right: '-50px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'rgba(113, 46, 255, 0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '100px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'rgba(113, 46, 255, 0.05)',
          }}
        />

        {/* Top: Logo + Category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 20px rgba(113, 46, 255, 0.2)',
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 800,
                  color: '#712EFF',
                  letterSpacing: '-0.5px',
                }}
              >
                MB
              </div>
            </div>
            <span style={{ fontSize: '28px', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.5px' }}>
              Motion<span style={{ color: '#712EFF' }}>Bite</span>
            </span>
          </div>

          {/* Category Badge */}
          {post.category && (
            <div
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                backgroundColor: 'rgba(113, 46, 255, 0.15)',
                color: '#a78bfa',
                fontSize: '20px',
                fontWeight: 600,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              {post.category.title}
            </div>
          )}
        </div>

        {/* Middle: Title & Excerpt */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '40px' }}>
          <div
            style={{
              fontSize: '64px',
              fontWeight: 700,
              color: '#f8fafc',
              lineHeight: 1.1,
              letterSpacing: '-1.5px',
              maxWidth: '1000px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.title}
          </div>
          
          <div
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              lineHeight: 1.4,
              maxWidth: '900px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {post.excerpt}
          </div>
        </div>

        {/* Bottom: Author & Domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            marginTop: 'auto',
            paddingTop: '60px',
          }}
        >
          {post.author ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '24px',
                  backgroundColor: 'rgba(113, 46, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#712EFF',
                  fontSize: '20px',
                  fontWeight: 700,
                  border: '2px solid rgba(113, 46, 255, 0.3)',
                }}
              >
                {post.author.firstName[0]}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '24px', fontWeight: 600, color: '#f8fafc' }}>
                  {post.author.firstName} {post.author.lastName}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '24px', fontWeight: 600, color: '#f8fafc' }}>
              MotionBite Team
            </div>
          )}

          <div style={{ width: '8px', height: '8px', borderRadius: '4px', backgroundColor: '#334155' }} />

          <div style={{ fontSize: '24px', color: '#94a3b8', fontWeight: 500 }}>
            motionbite.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
