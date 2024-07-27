<template>
  <div
    :class="{ dark: darkModeStore.isDarkMode }"
    class="mx-auto p-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 dark:from-gray-200 dark:via-gray-100 dark:to-gray-50 min-h-screen flex flex-col"
  >
    <HeaderComponent @search-city="searchByCity" />

    <main class="flex-grow text-center md:mt-32 mt-52">
      <div v-if="error" class="text-red-500">
        {{ error }}
      </div>

      <!-- weather info -->
      <WeatherInfo
        v-if="!loading && weatherData"
        :weatherData="weatherData"
        :iconUrl="iconUrl"
        :temperature="temperature"
        :formatText="formatText"
      />
      <!-- end weather info -->

      <!-- Loader -->
      <div v-else class="flex items-center justify-center min-h-screen">
        <div
          class="w-16 h-16 border-4 border-t-4 border-gray-300 border-t-teal-500 rounded-full animate-spin"
        ></div>
      </div>
      <!-- end Loader -->

      <div
        v-if="!loading && weatherData"
        class="my-8 h-2 bg-teal-500 rounded-lg dark:bg-teal-400"
      ></div>

      <!-- Forecast list -->
      <ForecastList
        v-if="weatherData"
        :hourlyForecast="hourlyForecast"
        :dailyForecast="dailyForecast"
        :formatText="formatText"
      />
      <!-- end Forecast list -->

      <!-- Temperature chat -->
      <TemperatureChart
        v-if="weatherData"
        :hourlyForecast="hourlyForecast"
        :dailyForecast="dailyForecast"
      />
      <!-- end Temperature chat -->
    </main>
  </div>
  <!-- Footer Component -->
  <FooterComponent />
</template>

<script setup>
import TemperatureChart from "@/components/TemperatureChart.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import WeatherInfo from "@/components/WeatherInfo.vue";
import ForecastList from "@/components/ForecastList.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import { useWeather } from "@/composables/useWeather";

const {
  weatherData,
  hourlyForecast,
  dailyForecast,
  loading,
  error,
  formatText,
  temperature,
  iconUrl,
  searchByCity,
  darkModeStore,
} = useWeather();
</script>
