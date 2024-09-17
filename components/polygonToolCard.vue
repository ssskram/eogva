<template>
  <div class="polygon-tool-card" v-if="!isPolygonDrawn">
    <p>👉 Use the polygon tool to create a new area of interest 👉</p>
  </div>
  <div class="polygon-tool-card" v-else>
    <input v-model="areaName" placeholder="Name for area" class="input" />
    <button @click="saveArea" class="save-btn">Save</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useAreasOfInterestStore } from "@/store/areasOfInterest";

const store = useAreasOfInterestStore();
const areaName = ref(""); // Holds the name for the new AoI
const isPolygonDrawn = ref(false); // Tracks if a polygon has been drawn

const saveArea = () => {
  if (areaName.value.trim() && store.newAreaCoordinates.length > 0) {
    store.addAreaOfInterest({
      name: areaName.value.trim(),
      coordinates: store.newAreaCoordinates,
      dateCreated: new Date(),
      dateUpdated: new Date(),
      crops: [], // Default empty crops for the new area
    });
    store.clearNewAreaCoordinates(); // Clear coordinates after saving
    areaName.value = ""; // Clear input after saving
    isPolygonDrawn.value = false; // Reset UI after saving
  }
};

// Watch for polygon being drawn and show input form
watch(
  () => store.newAreaCoordinates,
  (newCoordinates) => {
    if (newCoordinates.length > 0) {
      isPolygonDrawn.value = true; // Show input and save button when polygon is drawn
    }
  }
);
</script>

<style scoped>
.polygon-tool-card {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.95);
  padding: 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 15;
}

.polygon-tool-card p {
  margin: 0;
  font-size: 14px;
}

.input {
  width: 200px;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.save-btn {
  padding: 8px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #45a049;
}
</style>
