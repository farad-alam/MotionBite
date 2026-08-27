import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'MotionBite — We Build Websites That Mean Business'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#0f0f12',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Subtle glow circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'rgba(113, 46, 255, 0.08)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '200px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'rgba(113, 46, 255, 0.05)',
          }}
        />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '48px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(113, 46, 255, 0.2)',
            }}
          >
            {/* The MB mark in purple */}
            <div
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#712EFF',
                letterSpacing: '-1px',
              }}
            >
              MB
            </div>
          </div>
          <span style={{ fontSize: '32px', fontWeight: 700, color: '#f8fafc', letterSpacing: '0.5px' }}>
            Motion<span style={{ color: '#712EFF' }}>Bite</span>
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '76px',
            fontWeight: 700,
            color: '#f8fafc',
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
            maxWidth: '900px',
            marginBottom: '24px',
          }}
        >
          We Build Websites That Mean{' '}
          <span style={{ color: '#712EFF' }}>Business</span>
        </div>

        {/* Subline */}
        <div style={{ fontSize: '26px', color: '#94a3b8', maxWidth: '750px', marginBottom: '56px', lineHeight: 1.4 }}>
          Fast, professional websites for growing businesses — designed, developed, and delivered in 14 days.
        </div>

        {/* Trust bar */}
        <div style={{ display: 'flex', gap: '40px' }}>
          {['Results-Driven Design', '14-Day Delivery', 'SEO Optimized'].map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '18px',
                color: '#cbd5e1',
                fontWeight: 500,
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(113, 46, 255, 0.15)',
                  color: '#712EFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                }}
              >
                ✓
              </div>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
