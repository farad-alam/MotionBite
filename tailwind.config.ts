import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          primary:  '#7D40FF',
          dark:     '#712EFF',
          gradient: '#9766FF',
          deep:     '#5F00E0',
          mid:      '#592DB5',
          light:    '#C6CFFF',
          glow:     'rgba(125,64,255,0.25)',
        },
        dark: {
          base:   '#0A0A0A',
          card:   '#111111',
          border: 'rgba(125,64,255,0.15)',
        },
        light: {
          bg:   '#FAFAFA',
          card: '#FFFFFF',
          border: '#D4D4D4',
        },
        text: {
          primary: '#FAFAFA',
          muted:   '#737373',
          inverse: '#000000',
          charcoal: '#333333',
        },
        state: {
          error:   '#E05252',
          success: '#12693D',
          warning: '#F0A500',
        },
      },
      borderRadius: {
        sm:   '3px',
        md:   '8px',
        lg:   '16px',
        xl:   '24px',
        full: '9999px',
      },
      fontFamily: {
        heading: ['var(--font-red-hat)', 'sans-serif'],
        body:    ['var(--font-outfit)', 'sans-serif'],
        serif:   ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      boxShadow: {
        'sm-dark':  'rgba(15, 23, 42, 0.06) 0px 1px 4px 0px',
        'md-dark':  'rgba(15, 23, 42, 0.08) 0px 4px 16px -2px',
        'btn-inset': 'rgba(255, 255, 255, 0.72) 0px 2px 3px 0px inset',
      },
    },
  },
  plugins: [],
}

export default config
