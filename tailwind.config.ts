import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        green: {
          primary: '#00C896',
          deep:    '#00A878',
          light:   '#B8FFE8',
          glow:    'rgba(0,200,150,0.25)',
        },
        dark: {
          base:   '#0A0F0D',
          card:   '#111813',
          border: 'rgba(0,200,150,0.15)',
        },
        light: {
          bg:   '#F4FAF7',
          card: '#FFFFFF',
        },
        text: {
          primary: '#F0F5F2',
          muted:   '#8A9E94',
          inverse: '#0A0F0D',
        },
        state: {
          error:   '#E05252',
          success: '#00C896',
          warning: '#F0A500',
        },
      },
      borderRadius: {
        sm:   '4px',
        md:   '8px',
        lg:   '16px',
        xl:   '24px',
        full: '9999px',
      },
      fontFamily: {
        heading: ['var(--font-oswald)', 'sans-serif'],
        body:    ['var(--font-dm-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
