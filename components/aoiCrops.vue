<template>
  <div class="crops-container" v-if="selectedArea">
    <h2>{{ selectedArea.name }}</h2>
    <table>
      <thead>
        <tr>
          <th>Crop Name</th>
          <th>Min Supply</th>
          <th>Max Supply</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crop in selectedArea.crops" :key="crop.name">
          <td>{{ crop.name }}</td>
          <td>{{ crop.minSupply }}</td>
          <td>{{ crop.maxSupply }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAreasOfInterestStore } from "@/store/areasOfInterest";

const store = useAreasOfInterestStore();
const selectedArea = computed(() => store.selectedArea);
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

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-weight: 300;
}

th {
  color: #666;
}
</style>
