<template>
  <div id="app" :class="{ dark: darkModeStore.isDarkMode }">
    <WeatherComponent />
  </div>
</template>

<script setup>
import WeatherComponent from "@/components/WeatherComponent.vue";
import { useDarkModeStore } from "@/store/darkMode";

const darkModeStore = useDarkModeStore();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
