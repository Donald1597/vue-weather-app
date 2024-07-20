<template>
  <footer
    :class="{
      'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-300':
        !darkModeStore.isDarkMode,
      'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-50 text-gray-800':
        darkModeStore.isDarkMode,
    }"
    class="py-4 text-center"
  >
    <p class="text-sm">&copy; 2024 Weather App. All rights reserved.</p>
    <p class="text-sm">Built by Donald1597</p>
    <p class="text-sm">
      <a
        href="https://github.com/Donald1597"
        class="text-teal-500 hover:underline dark:text-teal-400"
        target="_blank"
      >
        Check out my GitHub
      </a>
    </p>
  </footer>
</template>

<script setup>
import { useDarkModeStore } from "@/store/darkMode";
const darkModeStore = useDarkModeStore();
</script>
