<template>
  <div class="app-container">
    <header class="header">
      <h2>
        <span class="brand">GVA</span>
        <span class="product">Earth Observation</span>
      </h2>
      <div class="user-info">
        <button class="logout-btn">Logout</button>
      </div>
    </header>

    <MapComponent />
    
    <!-- Conditionally render aois.vue based on areas in the store -->
    <AreasOfInterest v-if="hasAreas" />

    <!-- Always render PolygonToolCard at the bottom center -->
    <PolygonToolCard />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAreasOfInterestStore } from "@/store/areasOfInterest"; // Pinia store
import MapComponent from "./components/map.vue";
import AreasOfInterest from "./components/aois.vue";
import PolygonToolCard from "./components/polygonToolCard.vue"; // New card component

// Access the store
const store = useAreasOfInterestStore();

// Computed property to determine if there are areas in the store
const hasAreas = computed(() => store.areas.length > 0);
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  color: #f5f5dc;
  text-align: left;
  padding-left: 20px;
  padding-right: 10px;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Roboto", sans-serif;
}

.brand {
  font-weight: 100;
  margin-right: 10px;
}

.product {
  font-weight: 700;
}

.user-info {
  display: flex;
  align-items: center;
}

.logout-btn {
  background-color: transparent;
  border: 1px solid #f5f5dc;
  color: #f5f5dc;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 40px;
  font-family: "Roboto", sans-serif;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.app-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

h1 {
  margin: 0;
}
</style>
