import { defineStore } from "pinia";

export const useDialogSearchStore = defineStore("dialogSearch", {
  state: () => ({
    isDialogSearchOpen: false,
    searchedResults: [],
  }),
  actions: {
    openDialog() {
      this.isDialogSearchOpen = true;
    },
    closeDialog() {
      this.isDialogSearchOpen = false;
    },
    setSearchedResults(results) {
      this.searchedResults = results;
    },
    clearSearchedResults() {
      this.searchedResults = [];
    },
  },
});
