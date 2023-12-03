import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        main: 'rgb(var(--color-main) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        description: 'rgb(var(--color-description) / <alpha-value>)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        fadeIn: 'fadeIn 1s forwards',
        zoomIn: 'zoomIn 1s forwards',
        draw: 'draw 5s forwards',
        moveLeft: 'moveLeft 15s linear infinite',
      },
      keyframes: {
        moveLeft: {
          from: {
            transform: 'translateX(0)',
          },
          to: {
            transform: 'translateX(-100vw)',
          },
        },
        fadeIn: {
          to: {
            opacity: '1',
          },
        },
        zoomIn: {
          to: {
            transform: 'scale(1)',
          },
        },
        draw: {
          to: {
            strokeDashoffset: '0',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), 
    require('@tailwindcss/container-queries')
  ],
}
export default config
