<template>
  <div class="aoi-container">
    <div class="header-row">
      <h2>Areas of Interest</h2>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date Created</th>
          <th>Date Updated</th>
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
</template>

<script setup>
import { useAreasOfInterestStore } from "@/store/areasOfInterest";

const store = useAreasOfInterestStore();
const areas = store.areas;

const formatDate = (date) => {
  return date.toLocaleDateString();
};

const selectArea = (area) => {
  store.selectArea(area); // Mark the area as selected in the store
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

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  background-color: #e0f7fa; /* Highlight the selected row */
}
</style>
