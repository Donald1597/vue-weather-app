<template>
  <section>
    <div v-if="hourlyForecast.length" class="mb-12">
      <div
        class="bg-gray-700 text-lg text-gray-200 p-4 rounded-full shadow-lg mb-4 dark:bg-gray-300 dark:text-gray-800"
      >
        Upcoming Forecast
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(forecast, index) in hourlyForecast"
          :key="index"
          class="bg-gray-800 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 dark:bg-gray-200 dark:text-gray-800"
        >
          <p class="text-xl text-teal-400 mb-2 dark:text-teal-500">
            {{ forecast.time }}
          </p>
          <p class="text-xl mb-2">{{ forecast.temp_max }} °C</p>
          <p class="text-xl mb-2">{{ forecast.temp_min }} °C</p>
          <p class="text-gray-400 dark:text-gray-600">
            {{ formatText(forecast.description) }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="dailyForecast.length">
      <div
        class="bg-gray-700 text-lg text-gray-200 p-4 rounded-full shadow-lg mb-4 dark:bg-gray-300 dark:text-gray-800"
      >
        Next Days Forecast
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(forecast, index) in dailyForecast"
          :key="index"
          class="bg-gray-800 p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105 dark:bg-gray-200 dark:text-gray-800"
        >
          <p class="text-xl text-teal-400 mb-2 dark:text-teal-500">
            {{ forecast.date }}
          </p>
          <p class="text-xl mb-2">{{ forecast.temp_max }} °C</p>
          <p class="text-xl mb-2">{{ forecast.temp_min }} °C</p>
          <p class="text-gray-400 dark:text-gray-600">
            {{ formatText(forecast.description) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  hourlyForecast: {
    type: Array,
    default: () => [],
  },
  dailyForecast: {
    type: Array,
    default: () => [],
  },

  formatText: {
    type: Function,
    required: true,
  },
});
</script>
