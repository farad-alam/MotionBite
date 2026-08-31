import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'
export const revalidate = 604800 // Cache for 7 days — icon never changes

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '6px',
          backgroundColor: '#00C896',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: 700,
          color: '#0A0F0D',
          fontFamily: 'sans-serif',
        }}
      >
        MB
      </div>
    ),
    { ...size }
  )
}
