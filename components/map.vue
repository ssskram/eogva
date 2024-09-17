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
    draw.deleteAll();

    store.areas.forEach((area) => {
      const isSelected = store.selectedArea?.name === area.name;
      const feature = {
        type: "Feature" as const,
        geometry: {
          type: "Polygon" as const,
          coordinates: [area.coordinates] as number[][][],
        },
        properties: {
          color: isSelected ? "#0000FF" : "rgba(128, 128, 128, 0.5)", // Blue for selected, grey for others
        },
      };

      draw?.add(feature);
    });

    // If an area is selected, fit map bounds to the selected polygon
    if (store.selectedArea) {
      const selectedPolygon = store.selectedArea.coordinates;
      const bounds = calculateBoundingBox(selectedPolygon);
      map?.fitBounds(bounds, { padding: 200 }); // Increased padding to avoid polygon filling the entire screen
    }
  }
};

// Calculate bounding box from polygon coordinates
const calculateBoundingBox = (
  coordinates: number[][]
): [number, number, number, number] => {
  const lats = coordinates.map((coord) => coord[1]);
  const lngs = coordinates.map((coord) => coord[0]);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  return [minLng, minLat, maxLng, maxLat];
};

watch(
  () => store.selectedArea,
  () => {
    drawPolygons();
  }
);

watch(
  () => store.areas,
  () => {
    drawPolygons();
  }
);

onMounted(async () => {
  mapboxgl.accessToken =
    "pk.eyJ1Ijoic3Nza3JhbSIsImEiOiJja3Nvd25veHEwMDVyMm5wbm92Zm5jbGp1In0.ADb1kC_9vj4D9psqDa6dqA";
  await initializeMap();
  initializeDrawingTools();
  window.addEventListener("resize", forceMapResize);
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
  }
  window.removeEventListener("resize", forceMapResize);
});

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

    map.on("draw.create", updatePolygon);
  }
};

// When a polygon is drawn, save the coordinates in the store
const updatePolygon = () => {
  if (draw) {
    const data = draw.getAll();
    if (data.features.length > 0) {
      const polygon = data.features[data.features.length - 1].geometry as any;
      const coordinates = polygon.coordinates[0];
      store.setNewAreaCoordinates(coordinates);
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
