import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './app.vue',
    './app/pages/**/*.{vue,ts,js}',
    './app/components/**/*.{vue,ts,js}',
    './app/layouts/**/*.{vue,ts,js}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
