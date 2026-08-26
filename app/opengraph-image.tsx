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
          backgroundColor: '#0A0F0D',
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
            background: 'rgba(0, 200, 150, 0.06)',
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
            background: 'rgba(0, 200, 150, 0.04)',
          }}
        />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '48px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '10px',
              backgroundColor: '#00C896',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              color: '#0A0F0D',
            }}
          >
            MB
          </div>
          <span style={{ fontSize: '28px', fontWeight: 600, color: '#F0F5F2', letterSpacing: '0.5px' }}>
            Motion<span style={{ color: '#00C896' }}>Bite</span>
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#F0F5F2',
            lineHeight: 1.05,
            letterSpacing: '-1px',
            maxWidth: '900px',
            marginBottom: '24px',
          }}
        >
          We Build Websites That Mean{' '}
          <span style={{ color: '#00C896' }}>Business</span>
        </div>

        {/* Subline */}
        <div style={{ fontSize: '24px', color: '#8A9E94', maxWidth: '700px', marginBottom: '48px', lineHeight: 1.4 }}>
          Fast, professional websites for businesses — delivered in 14 days.
        </div>

        {/* Trust bar */}
        <div style={{ display: 'flex', gap: '32px' }}>
          {['50+ Websites Launched', '14-Day Delivery', '100% Satisfaction'].map((item) => (
            <div
              key={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '16px',
                color: '#8A9E94',
              }}
            >
              <span style={{ color: '#00C896', fontSize: '14px' }}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
