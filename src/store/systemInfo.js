import { defineStore } from 'pinia';

export default defineStore('systemInfo', {
  state: () => ({ data: null }),
  actions: {
    setData(data) {
      this.data = data;
    }
  }
});
