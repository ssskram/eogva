<template>
  <div class="graph-container" v-if="selectedCrop">
    <header class="header">
      <h3>{{ selectedArea?.name }} {{ selectedCrop?.name }}</h3>
    </header>
    <canvas ref="cropChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed, nextTick } from "vue";
import {
  Chart,
  Filler,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
import { useAreasOfInterestStore } from "@/store/areasOfInterest";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Filler,
  Title,
  CategoryScale
);

const store = useAreasOfInterestStore();
const chart = ref(null);
const cropChart = ref(null);

const selectedArea = computed(() => store.selectedArea);
const selectedCrop = computed(() => store.selectedCrop);

const createChart = (cropData) => {
  nextTick(() => {
    if (!cropChart.value) {
      return;
    }

    const ctx = cropChart.value.getContext("2d");

    if (chart.value) {
      chart.value.destroy();
    }

    chart.value = new Chart(ctx, {
      type: "line",
      data: {
        labels: cropData.map((d) => d.date.toLocaleDateString()),
        datasets: [
          {
            label: "Min Supply",
            data: cropData.map((d) => d.minSupply),
            borderColor: "rgba(75, 192, 192, .6)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
          {
            label: "Max Supply",
            data: cropData.map((d) => d.maxSupply),
            borderColor: "rgba(255, 99, 132, .6)",
            backgroundColor: "rgba(255, 99, 132, 0.1)",
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: Math.max(...cropData.map((d) => d.maxSupply)) + 20,
          },
        },
      },
    });
  });
};

watch(selectedCrop, (newCrop) => {
  if (newCrop) {
    createChart(newCrop.values);
  }
});

onMounted(() => {
  if (selectedCrop.value) {
    createChart(selectedCrop.value.values);
  }
});
</script>

<style scoped>
.graph-container {
  position: fixed;
  right: 20px;
  width: 350px;
  background-color: rgba(240, 240, 240, 0.9);
  color: #333;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 10;
  height: auto;
  overflow-y: auto;
  margin-top: 370px;
}

canvas {
  max-width: 100%;
  padding: 0 15px 15px 15px;
}

.header {
  background-color: rgba(0, 0, 0, 0.8);
  color: #f5f5dc;
  padding: 5px 20px;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 10px;
}
</style>
