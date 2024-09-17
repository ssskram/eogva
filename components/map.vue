<template>
  <div class="map-container">
    <div ref="mapContainer" class="map-child"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUnmount, watch } from "vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useAreasOfInterestStore } from "@/store/areasOfInterest";

const mapContainer = ref<HTMLDivElement | null>(null);
let map: mapboxgl.Map | null = null;
let draw: MapboxDraw | null = null;

const store = useAreasOfInterestStore();

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

// Function to draw all polygons in the store
const drawPolygons = () => {
  if (draw && store.areas.length > 0) {
    draw.deleteAll(); // Clear previous polygons

    store.areas.forEach((area) => {
      const feature = {
        type: "Feature" as const, // Ensure the type is "Feature"
        geometry: {
          type: "Polygon" as const, // Explicitly define the type as "Polygon"
          coordinates: [area.coordinates] as number[][][], // Ensure coordinates is typed correctly
        },
        properties: {},
      };

      draw?.add(feature);
    });
  }
};

watch(
  () => store.selectedArea,
  () => {
    drawPolygons(); // Update polygons when selection changes
  }
);

watch(
  () => store.areas,
  () => {
    drawPolygons(); // Redraw polygons when new areas are added
  }
);

onMounted(async () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic3Nza3JhbSIsImEiOiJja3Nvd25veHEwMDVyMm5wbm92Zm5jbGp1In0.ADb1kC_9vj4D9psqDa6dqA";
  await initializeMap();
  initializeDrawingTools(); // Initialize drawing tools on mount
  window.addEventListener("resize", forceMapResize);
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
  window.removeEventListener("resize", forceMapResize);
});

// Initialize drawing tools
const initializeDrawingTools = () => {
  if (map && !draw) {
    draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });
    map.addControl(draw, "bottom-right");

    // Listen for polygon draw events and update store
    map.on("draw.create", updatePolygon);
  }
};

// When a polygon is drawn, save the coordinates in the store and select it
const updatePolygon = () => {
  if (draw) {
    const data = draw.getAll();
    if (data.features.length > 0) {
      const polygon = data.features[data.features.length - 1].geometry as any;
      const coordinates = polygon.coordinates[0];
      store.setNewAreaCoordinates(coordinates); // Just set the polygon coordinates
    }
  }
};
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
