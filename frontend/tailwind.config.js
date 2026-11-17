/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4D3E',      // Deep Evergreen
          dark: '#0E382B',         // Forest Night
          deep: '#003629',
          light: '#8ABDA9',
          container: '#1B4D3E',
          fixed: '#BAEED9',
          'fixed-dim': '#9ED1BD',
        },
        secondary: {
          DEFAULT: '#84CC16',      // Vital Lime
          dark: '#457000',
          light: '#ACF847',
          sprout: '#A3E635',
          container: '#ACF847',
          'fixed-dim': '#91DB2A',
        },
        tertiary: {
          DEFAULT: '#D97706',      // Warm Ochre / Brass Amber
          dark: '#6B3700',
          fixed: '#FFDCC3',
          'fixed-dim': '#FFB77D',
        },
        neutral: {
          DEFAULT: '#1E293B',      // Slate
          dark: '#0F172A',         // Deep Ink
          muted: '#475569',
          hairline: 'rgba(30, 41, 59, 0.12)',
        },
        surface: {
          canvas: '#FAF8F5',       // Heritage Warm Ivory
          card: '#FFFFFF',         // Pure Crisp Sheet
          subtle: '#F4EFEA',       // Pressed Paper Tint
          dim: '#CFDAF2',
          border: 'rgba(30, 41, 59, 0.12)',
          'border-strong': 'rgba(30, 41, 59, 0.25)',
        },
        error: {
          DEFAULT: '#BA1A1A',
          container: '#FFDAD6',
        }
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'tactile': '2px 2px 0px #0E382B',
        'tactile-sm': '1px 1px 0px #0E382B',
        'tactile-active': '0px 0px 0px #0E382B',
        'tactile-lime': '2px 2px 0px #457000',
        'tactile-ochre': '2px 2px 0px #6B3700',
        'tactile-neutral': '2px 2px 0px #1E293B',
      },
      borderRadius: {
        DEFAULT: '4px',
        sm: '2px',
        md: '6px',
        lg: '8px',
        xl: '12px',
      }
    },
  },
  plugins: [],
}
