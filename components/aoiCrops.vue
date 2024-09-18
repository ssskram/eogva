<template>
  <div class="crops-container" v-if="selectedArea">
    <header class="header">
      <h3>{{ selectedArea.name }}</h3>
    </header>
    <div class="crops-table">
      <table>
        <thead>
          <tr>
            <th>Crop</th>
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
  width: 350px;
  background-color: rgba(240, 240, 240, 0.9);
  color: #333;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 10;
  height: auto;
  overflow-y: auto;
}

.crops-table {
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
