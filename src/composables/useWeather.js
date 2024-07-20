import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { DateTime } from "luxon";
import { useDarkModeStore } from "@/store/darkMode";

export function useWeather() {
  const apikey = ref(import.meta.env.VITE_WEATHER_API_KEY);
  const weatherData = ref(null);
  const hourlyForecast = ref([]);
  const dailyForecast = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const darkModeStore = useDarkModeStore();

  const temperature = computed(() =>
    weatherData.value ? Math.floor(weatherData.value.main.temp - 273) : null
  );

  const iconUrl = computed(() =>
    weatherData.value
      ? `http://api.openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
      : null
  );

  const fetchWeatherData = async (url) => {
    try {
      loading.value = true;
      error.value = null;
      const { data } = await axios.get(url);
      weatherData.value = data;
      await fetchForecast(data.name);
    } catch (err) {
      error.value = "Failed to fetch weather data.";
      console.error("Error fetching weather data:", err);
    } finally {
      loading.value = false;
    }
  };

  const fetchForecast = async (city) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey.value}`;
    try {
      const { data } = await axios.get(url);
      updateForecasts(data);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const updateForecasts = (forecast) => {
    updateHourlyForecast(forecast);
    updateDailyForecast(forecast);
  };

  const updateHourlyForecast = (forecast) => {
    const timezone = DateTime.local().zoneName;
    const now = DateTime.now().toMillis() / 1000; // Current time in seconds
    hourlyForecast.value = forecast.list
      .filter((item) => item.dt >= now) // Filter out past times
      .slice(0, 9)
      .map((item) => ({
        time: DateTime.fromSeconds(item.dt)
          .setZone(timezone)
          .toLocaleString(DateTime.TIME_SIMPLE),
        temp_max: Math.floor(item.main.temp_max - 273), // Convert from Kelvin to Celsius
        temp_min: Math.floor(item.main.temp_min - 273), // Convert from Kelvin to Celsius
        description: formatText(item.weather[0].description),
      }));
  };

  const updateDailyForecast = (forecast) => {
    const timezone = DateTime.local().zoneName;
    const now = DateTime.now().startOf("day"); // Start of current day
    dailyForecast.value = forecast.list
      .filter((_, i) => i % 8 === 0) // Filter out one forecast per day
      .filter((item) => DateTime.fromSeconds(item.dt).startOf("day") >= now) // Only include future days
      .slice(0, 9)
      .map((item) => ({
        date: DateTime.fromSeconds(item.dt)
          .setZone(timezone)
          .toLocaleString(DateTime.DATE_FULL),
        temp_max: Math.floor(item.main.temp_max - 273), // Convert from Kelvin to Celsius
        temp_min: Math.floor(item.main.temp_min - 273), // Convert from Kelvin to Celsius
        description: formatText(item.weather[0].description),
      }));
  };

  const searchByCity = async (cityName) => {
    if (!cityName) return;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey.value}`;
    await fetchWeatherData(url);
  };

  const formatText = (text) => text.charAt(0).toUpperCase() + text.slice(1);

  const fetchCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey.value}`;
        await fetchWeatherData(url);
      });
    }
  };

  onMounted(() => {
    fetchCurrentLocationWeather();
  });

  return {
    apikey,
    weatherData,
    hourlyForecast,
    dailyForecast,
    loading,
    error,
    fetchWeatherData,
    formatText,
    temperature,
    iconUrl,
    searchByCity,
    darkModeStore,
  };
}
