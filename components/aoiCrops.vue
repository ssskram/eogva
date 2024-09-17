<template>
  <div class="crops-container" v-if="selectedArea">
    <h2>Crops for {{ selectedArea.name }}</h2>
    <ul>
      <li v-for="crop in selectedArea.crops" :key="crop.name">
        {{ crop.name }} (Min: {{ crop.minSupply }} Max: {{ crop.maxSupply }})
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAreasOfInterestStore } from "@/store/areasOfInterest";

const store = useAreasOfInterestStore();
const selectedArea = computed(() => store.selectedArea); // Get the selected area from the store
</script>

<style scoped>
.crops-container {
  position: fixed;
  top: 80px;
  right: 20px;
  width: 280px;
  background-color: rgba(240, 240, 240, 0.9);
  color: #333;
  padding: 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 10;
  height: auto;
  overflow-y: auto;
}

h2 {
  margin: 0 0 16px;
  font-weight: 400;
  color: #333;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 8px;
}
</style>
