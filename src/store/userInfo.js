import { defineStore } from 'pinia';

export default defineStore('userInfo', {
  state: () => ({ data: null }),
  actions: {
    setData(data) {
      this.data = data;
    },
  },
});
