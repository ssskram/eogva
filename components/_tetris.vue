<template>
    <div>
      <!-- Planting Data Table -->
      <table>
        <thead>
          <tr>
            <th>Planting Name</th>
            <th>Width</th>
            <th>Height</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="planting in plantings" :key="planting.id">
            <td>{{ planting.name }}</td>
            <td>{{ planting.width }}</td>
            <td>{{ planting.height }}</td>
            <td>
              <div
                :style="{ backgroundColor: planting.color, width: '20px', height: '20px' }"
              ></div>
            </td>
          </tr>
        </tbody>
      </table>
  
      <!-- Rearrange Button -->
      <button @click="rearrange">Rearrange Plantings</button>
  
      <!-- Plantings Container -->
      <div
        class="container"
        :style="{ height: containerHeight + 'px' }"
      >
        <div
          v-for="(planting, index) in arrangedPlantings"
          :key="planting.id"
          class="planting"
          :style="{
            width: planting.width + 'px',
            height: planting.height + 'px',
            backgroundColor: planting.color,
            position: 'absolute',
            left: planting.x + 'px',
            bottom: planting.y + 'px',
          }"
        ></div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const plantings = ref([
    { id: 1, name: 'Plant A', width: 50, height: 30, color: 'green' },
    { id: 2, name: 'Plant B', width: 60, height: 40, color: 'red' },
    { id: 3, name: 'Plant C', width: 30, height: 70, color: 'blue' },
    { id: 4, name: 'Plant D', width: 80, height: 20, color: 'yellow' },
    { id: 5, name: 'Plant E', width: 40, height: 50, color: 'purple' },
    { id: 6, name: 'Plant F', width: 70, height: 30, color: 'orange' },
    { id: 7, name: 'Plant G', width: 50, height: 60, color: 'teal' },
    { id: 8, name: 'Plant H', width: 60, height: 20, color: 'pink' },
    { id: 9, name: 'Plant I', width: 30, height: 40, color: 'brown' },
    { id: 10, name: 'Plant J', width: 40, height: 30, color: 'gray' },
    { id: 11, name: 'Plant K', width: 50, height: 50, color: 'cyan' },
    { id: 12, name: 'Plant L', width: 60, height: 60, color: 'magenta' },
    { id: 13, name: 'Plant M', width: 70, height: 70, color: 'lime' },
    { id: 14, name: 'Plant N', width: 80, height: 80, color: 'navy' },
    { id: 15, name: 'Plant O', width: 90, height: 90, color: 'olive' },
  ]);
  
  const containerWidth = 300;
  const containerHeight = ref(300);
  const arrangedPlantings = ref([]);
  
  const rearrange = () => {
    arrangePlantings();
  };
  
  const arrangePlantings = () => {
    // Initialize free rectangles with the entire container
    let freeRectangles = [
      { x: 0, y: 0, width: containerWidth, height: Infinity },
    ];
  
    let maxY = 0;
  
    // Shuffle plantings for a new arrangement each time
    const shuffledPlantings = plantings.value
      .slice()
      .sort(() => Math.random() - 0.5);
  
    arrangedPlantings.value = [];
  
    // Helper functions defined inside arrangePlantings
  
    const findPositionForNewNode = (width, height) => {
      let bestNode = null;
      let bestAreaFit = Infinity;
      let bestShortSideFit = Infinity;
  
      freeRectangles.forEach((freeRect) => {
        if (freeRect.width >= width && freeRect.height >= height) {
          const areaFit = freeRect.width * freeRect.height - width * height;
          const leftoverHoriz = freeRect.width - width;
          const leftoverVert = freeRect.height - height;
          const shortSideFit = Math.min(leftoverHoriz, leftoverVert);
  
          if (
            areaFit < bestAreaFit ||
            (areaFit === bestAreaFit && shortSideFit < bestShortSideFit)
          ) {
            bestNode = { x: freeRect.x, y: freeRect.y, width, height };
            bestAreaFit = areaFit;
            bestShortSideFit = shortSideFit;
          }
        }
      });
  
      return bestNode;
    };
  
    const splitFreeNode = (freeNode, usedNode) => {
      // Check if the free node and used node actually overlap
      if (
        usedNode.x >= freeNode.x + freeNode.width ||
        usedNode.x + usedNode.width <= freeNode.x ||
        usedNode.y >= freeNode.y + freeNode.height ||
        usedNode.y + usedNode.height <= freeNode.y
      ) {
        return;
      }
  
      const newFreeRectangles = [];
  
      if (usedNode.x > freeNode.x && usedNode.x < freeNode.x + freeNode.width) {
        // Left split
        newFreeRectangles.push({
          x: freeNode.x,
          y: freeNode.y,
          width: usedNode.x - freeNode.x,
          height: freeNode.height,
        });
      }
  
      if (
        usedNode.x + usedNode.width < freeNode.x + freeNode.width &&
        usedNode.x + usedNode.width > freeNode.x
      ) {
        // Right split
        newFreeRectangles.push({
          x: usedNode.x + usedNode.width,
          y: freeNode.y,
          width:
            freeNode.x + freeNode.width - (usedNode.x + usedNode.width),
          height: freeNode.height,
        });
      }
  
      if (usedNode.y > freeNode.y && usedNode.y < freeNode.y + freeNode.height) {
        // Bottom split
        newFreeRectangles.push({
          x: freeNode.x,
          y: freeNode.y,
          width: freeNode.width,
          height: usedNode.y - freeNode.y,
        });
      }
  
      if (
        usedNode.y + usedNode.height < freeNode.y + freeNode.height &&
        usedNode.y + usedNode.height > freeNode.y
      ) {
        // Top split
        newFreeRectangles.push({
          x: freeNode.x,
          y: usedNode.y + usedNode.height,
          width: freeNode.width,
          height:
            freeNode.y + freeNode.height - (usedNode.y + usedNode.height),
        });
      }
  
      freeRectangles = freeRectangles.filter((rect) => rect !== freeNode);
      freeRectangles.push(...newFreeRectangles);
    };
  
    const pruneFreeList = () => {
      for (let i = 0; i < freeRectangles.length; i++) {
        for (let j = i + 1; j < freeRectangles.length; j++) {
          if (isContainedIn(freeRectangles[i], freeRectangles[j])) {
            freeRectangles.splice(i, 1);
            i--;
            break;
          }
          if (isContainedIn(freeRectangles[j], freeRectangles[i])) {
            freeRectangles.splice(j, 1);
            j--;
            break;
          }
        }
      }
    };
  
    const isContainedIn = (a, b) => {
      return (
        a.x >= b.x &&
        a.y >= b.y &&
        a.x + a.width <= b.x + b.width &&
        a.y + a.height <= b.y + b.height
      );
    };
  
    // Place plantings using the MaxRects algorithm
    shuffledPlantings.forEach((planting) => {
      const node = findPositionForNewNode(planting.width, planting.height);
  
      if (node) {
        planting.x = node.x;
        planting.y = node.y;
        arrangedPlantings.value.push({ ...planting });
  
        maxY = Math.max(maxY, planting.y + planting.height);
  
        const rectanglesToProcess = freeRectangles.slice();
        rectanglesToProcess.forEach((freeRect) => {
          splitFreeNode(freeRect, planting);
        });
  
        pruneFreeList();
      }
      // If no suitable position is found, the planting is skipped
    });
  
    // Adjust container height
    containerHeight.value = Math.max(maxY, 300);
  };
  
  arrangePlantings();
  </script>
  
  <style scoped>
  .container {
    position: relative;
    width: 300px;
    border: 1px solid #ccc;
    margin-top: 20px;
    overflow: hidden;
  }
  
  .planting {
    box-sizing: border-box;
    border: 1px solid #000;
  }
  </style>
  