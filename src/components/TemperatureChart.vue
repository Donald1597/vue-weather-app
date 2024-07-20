<template>
  <section class="mb-12 mt-8">
    <div
      class="bg-gray-700 text-lg text-gray-200 p-4 rounded-full shadow-lg mb-4 dark:bg-gray-300 dark:text-gray-800"
    >
      Temperature Overview
    </div>
    <div
      class="p-4 bg-gray-800 dark:bg-gray-200 rounded-lg shadow-md max-w-4xl mx-auto"
    >
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </section>
</template>

<script setup>
import { defineProps, computed } from "vue";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  PointElement,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  PointElement
);

const props = defineProps({
  hourlyForecast: {
    type: Array,
    required: true,
  },
  dailyForecast: {
    type: Array,
    required: true,
  },
});

const chartData = computed(() => {
  const labels = props.hourlyForecast.map((forecast) => forecast.time);
  const temperatures = props.hourlyForecast.map(
    (forecast) => forecast.temp_max
  );

  return {
    labels,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
        borderColor: "#4ade80",
        backgroundColor: "rgba(74, 222, 128, 0.2)",
        fill: true,
        tension: 0.4, // Add smooth curves
        pointRadius: 5, // Size of points
        pointHoverRadius: 7, // Size of points on hover
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleColor: "#fff",
      bodyColor: "#fff",
      borderColor: "#4ade80",
      borderWidth: 1,
      cornerRadius: 4,
      padding: 10,
      callbacks: {
        title: function (context) {
          return `Time: ${context[0].label}`;
        },
        label: function (context) {
          return `Temperature: ${context.raw} °C`;
        },
        footer: function (context) {
          return `Additional info: ${context.length} data points`;
        },
      },
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Time",
      },
    },
    y: {
      title: {
        display: true,
        text: "Temperature (°C)",
      },
      ticks: {
        stepSize: 1,
      },
    },
  },
};
</script>
