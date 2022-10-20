import { defineStore } from "pinia";

export const useNavbar = defineStore("navbar", {
  state: () => ({
    actualPath: "",
  }),
  actions: {
    setLocalStorage() {
      window.localStorage.setItem(
        `actualPath`,
        JSON.stringify(this.actualPath)
      );
    },
    getLocalStorage() {
      this.actualPath = JSON.parse(window.localStorage.getItem(`actualPath`));
    },
  },
});
