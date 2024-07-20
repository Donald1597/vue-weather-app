import { defineStore } from "pinia";

export const useDarkModeStore = defineStore("darkMode", {
  state: () => ({
    isDarkMode: false,
  }),
  actions: {
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      document.documentElement.classList.toggle("dark", this.isDarkMode);
    },
  },
});
