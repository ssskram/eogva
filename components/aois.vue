<template>
  <div class="aoi-container">
    <header class="header">
      <h3>Areas of Interest</h3>
    </header>
    <div class="aois-table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="area in areas"
            :key="area.name"
            @click="selectArea(area)"
            :class="{ selected: isSelected(area) }"
            class="clickable-row"
          >
            <td>{{ area.name }}</td>
            <td>{{ formatDate(area.dateCreated) }}</td>
            <td>{{ formatDate(area.dateUpdated) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useAreasOfInterestStore } from "@/store/areasOfInterest";

const store = useAreasOfInterestStore();
const areas = store.areas;

const formatDate = (date) => {
  return date.toLocaleDateString();
};

const selectArea = (area) => {
  store.selectArea(area);
};

const isSelected = (area) => {
  return store.selectedArea?.name === area.name;
};
</script>

<style scoped>
.aoi-container {
  position: fixed;
  top: 80px;
  left: 20px;
  width: 350px;
  background-color: rgba(240, 240, 240, 0.9);
  color: #333;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 10;
  height: auto;
  overflow-y: auto;
}

.aois-table {
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

.clickable-row {
  cursor: pointer;
}

.selected {
  background-color: #e0f7fa;
}
</style>
