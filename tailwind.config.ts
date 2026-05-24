import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#F7F3EC',
        gold: '#9A7940',
        'gold-dark': '#7D6230',
        ink: '#1A1A18',
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        'ultra': '0.35em',
      },
    },
  },
  plugins: [],
}

export default config
