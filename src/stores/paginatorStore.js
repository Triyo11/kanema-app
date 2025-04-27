import { defineStore } from "pinia";

export const usePaginatorStore = defineStore("paginator", {
  state: () => ({
    currentPage: 0,
  }),
  actions: {
    setCurrentPage(page) {
      this.currentPage = page;
    },
  },
});
