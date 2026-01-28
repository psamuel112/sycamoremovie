// stores/counter.ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment(this: { count: number }) {
      this.count++
    }
  },
  persist: true
} as any)
