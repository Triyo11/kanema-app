import { defineStore } from "pinia";

export const useDialogSearchStore = defineStore("dialogSearch", {
  state: () => ({
    isDialogSearchAiOpen: false,
    isDialogSearchOpen: false,
    searchedResults: [],
  }),
  actions: {
    openDialogAi() {
      this.isDialogSearchAiOpen = true;
    },
    closeDialogAi() {
      this.isDialogSearchAiOpen = false;
    },
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
