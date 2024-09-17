<template>
  <div class="map-container">
    <div ref="mapContainer" class="map-child"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount } from "vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapContainer = ref<HTMLDivElement | null>(null);
let map: mapboxgl.Map | null = null;

const forceMapResize = () => {
  if (map) {
    requestAnimationFrame(() => {
      map?.resize();
    });
  }
};

const initializeMap = async () => {
  await nextTick();

  if (mapContainer.value && !map) {
    map = new mapboxgl.Map({
      container: mapContainer.value,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [-121.6555, 36.6777],
      zoom: 10,
      attributionControl: false,
    });

    map.on("load", () => {
      forceMapResize();
    });
  }
};

onMounted(async () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic3Nza3JhbSIsImEiOiJja3Nvd25veHEwMDVyMm5wbm92Zm5jbGp1In0.ADb1kC_9vj4D9psqDa6dqA";
  await initializeMap();
  window.addEventListener("resize", forceMapResize);
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
  window.removeEventListener("resize", forceMapResize);
});
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.map-child {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
