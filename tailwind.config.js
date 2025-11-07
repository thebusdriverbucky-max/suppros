/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#B6FEE5',
          100: '#98FCCD',
          200: '#7AFAB4',
          300: '#5CF39B',
          400: '#3EDB82',
          500: '#2BBF6A',
          600: '#25A55B',
          700: '#1F8A4C',
          800: '#1A7A44',
          900: '#155A3A',
        },
        secondary: {
          50: '#F0FCF5',
          100: '#DFF8EB',
          200: '#C5F1DA',
          300: '#ABEBCA',
          400: '#91E4B9',
          500: '#A5E8C1',
          600: '#97D5AE',
          700: '#88C29B',
          800: '#79AF88',
          900: '#6A9C75',
        },
        neutral: {
          white: '#FFFFFF',
          light: '#F5F7FA',
          ui: '#E5E7EB',
          dark: '#1F2937',
          medium: '#4B5563',
        },
        alert: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#0EA5E9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

