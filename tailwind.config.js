/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}

