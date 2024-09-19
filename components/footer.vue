<template>
  <div class="polygon-tool-card">
    <form @submit.prevent="saveArea" class="form-container">
      <input
        v-model="areaName"
        ref="areaInput"
        placeholder="Enter a name for this area"
        class="input"
      />
      <button type="submit" class="save-btn">Save</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useAreasOfInterestStore } from "@/store/areasOfInterest";

const store = useAreasOfInterestStore();
const areaName = ref("");
const isPolygonDrawn = ref(false);
const areaInput = ref(null);

const saveArea = () => {
  if (areaName.value.trim() && store.newAreaCoordinates.length > 0) {
    store.addAreaOfInterest({
      name: areaName.value.trim(),
      coordinates: store.newAreaCoordinates,
      dateCreated: new Date(),
      dateUpdated: new Date(),
      crops: [],
    });
    store.clearNewAreaCoordinates();
    areaName.value = "";
    isPolygonDrawn.value = false;
  } else {
    alert("The name cannot be blank.");
  }
};

onMounted(() => {
  if (areaInput.value) {
    areaInput.value.focus();
  }
});

watch(
  () => store.newAreaCoordinates,
  (newCoordinates) => {
    if (newCoordinates.length > 0) {
      isPolygonDrawn.value = true;
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
  padding: 20px;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 15;
}

.prompt-text {
  font-size: 18px;
  margin: 0;
}

.form-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input {
  width: 300px;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.save-btn {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #45a049;
}
</style>
