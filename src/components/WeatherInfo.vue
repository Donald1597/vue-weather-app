<template>
  <div
    v-if="!loading && weatherData"
    class="mb-12 p-8 bg-gray-800 rounded-3xl shadow-2xl border border-gray-700 dark:bg-gray-100 dark:border-gray-300"
  >
    <h2 class="text-4xl mb-4 text-teal-300 font-semibold dark:text-teal-500">
      {{ weatherData.name }}, {{ weatherData.sys.country }}
    </h2>
    <div class="flex flex-col items-center mb-4">
      <img
        v-if="iconUrl"
        :src="iconUrl"
        alt="Weather Icon"
        class="w-32 h-32 rounded-full bg-gray-700 shadow-lg dark:bg-gray-300"
      />
      <p
        v-if="temperature"
        class="text-6xl mt-4 text-teal-300 dark:text-teal-500"
      >
        {{ temperature }} °C
      </p>
    </div>
    <span
      class="inline-block bg-gray-700 text-teal-400 p-3 rounded-full text-lg font-semibold shadow-md dark:bg-gray-300 dark:text-teal-500"
    >
      {{ formatText(weatherData.weather[0].description) }}
    </span>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  weatherData: {
    type: Object,
    required: true,
  },
  iconUrl: {
    type: String,
    default: null,
  },
  temperature: {
    type: Number,
    default: null,
  },
  formatText: {
    type: Function,
    required: true,
  },
  loading: {
    type: Boolean,
  },
});
</script>
