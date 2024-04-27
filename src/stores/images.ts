import { defineStore } from "pinia";

export const  useImagesStore = defineStore({
id: 'images',


state: () => ({ count: 0, name: 'Иван' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },



})


