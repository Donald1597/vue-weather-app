<template>
  <header
    class="fixed top-0 left-0 w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 dark:from-gray-200 dark:via-gray-100 dark:to-gray-50 p-4 z-50"
  >
    <div class="flex justify-between items-center mb-8">
      <h1
        class="text-4xl sm:text-5xl md:text-6xl text-teal-300 font-bold transition-transform transform hover:scale-110 dark:text-teal-500"
      >
        Weather App
      </h1>
      <div class="flex items-center space-x-4">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="p-3 border rounded-lg bg-gray-800 text-gray-200 placeholder-gray-400 dark:bg-gray-200 dark:text-gray-800 dark:placeholder-gray-600 dark:border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg dark:focus:ring-teal-300 w-full sm:w-4/5 md:w-3/5"
        />
        <button
          @click.prevent="searchByCity"
          aria-label="Search for weather"
          class="bg-teal-500 text-white rounded-lg px-4 py-2 sm:px-6 sm:py-3 hover:bg-teal-400 transition-transform transform hover:scale-105 dark:bg-teal-400 dark:hover:bg-teal-300"
        >
          Search
        </button>
        <div class="flex items-center ml-2 sm:ml-4">
          <input
            type="checkbox"
            id="theme-toggle"
            class="hidden"
            :checked="darkModeStore.isDarkMode"
            @change="toggleDarkMode"
          />
          <label for="theme-toggle" class="flex items-center cursor-pointer">
            <div class="relative flex items-center">
              <div
                class="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full shadow-inner transition-colors duration-300"
              >
                <div
                  class="dot absolute left-1 top-1 bg-teal-500 dark:bg-teal-300 w-7 h-7 rounded-full transition-transform duration-300"
                  :class="{ 'translate-x-8': darkModeStore.isDarkMode }"
                ></div>
              </div>
              <i
                class="fa-solid fa-sun absolute right-2 top-1 text-yellow-400 dark:text-yellow-300 text-lg transition-opacity duration-300"
                :class="{
                  'opacity-100': darkModeStore.isDarkMode,
                  'opacity-0': !darkModeStore.isDarkMode,
                }"
              ></i>
              <i
                class="fa-solid fa-moon absolute left-2 top-1 text-gray-600 dark:text-gray-300 text-lg transition-opacity duration-300"
                :class="{
                  'opacity-0': darkModeStore.isDarkMode,
                  'opacity-100': !darkModeStore.isDarkMode,
                }"
              ></i>
            </div>
          </label>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useDarkModeStore } from "@/store/darkMode";

const emit = defineEmits(["search-city"]);

const darkModeStore = useDarkModeStore();

const city = ref("");

const searchByCity = () => {
  emit("search-city", city.value);
};

const toggleDarkMode = () => {
  darkModeStore.toggleDarkMode();
};
</script>
