<template>
  <div class="aoi-container">
    <h2>Areas of Interest</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Date Created</th>
          <th>Date Updated</th>
          <th>Crops</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="area in areasOfInterest" :key="area.name">
          <td>{{ area.name }}</td>
          <td>{{ formatDate(area.dateCreated) }}</td>
          <td>{{ formatDate(area.dateUpdated) }}</td>
          <td>
            <ul>
              <li v-for="crop in area.crops" :key="crop.name">
                {{ crop.name }} (Min: {{ crop.minSupply }} Max:
                {{ crop.maxSupply }})
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";

const areasOfInterest = ref([
  {
    name: "Area 1",
    dateCreated: new Date(),
    dateUpdated: new Date(),
    crops: [
      { name: "Corn", minSupply: 10.5, maxSupply: 50.0 },
      { name: "Wheat", minSupply: 5.0, maxSupply: 30.0 },
    ],
  },
  {
    name: "Area 2",
    dateCreated: new Date(),
    dateUpdated: new Date(),
    crops: [
      { name: "Rice", minSupply: 15.5, maxSupply: 60.0 },
      { name: "Barley", minSupply: 8.0, maxSupply: 25.0 },
    ],
  },
]);

const formatDate = (date) => {
  return date.toLocaleDateString();
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

ul {
  list-style-type: none;
  padding-left: 0;
}

li {
  margin-bottom: 4px;
}

h2 {
  margin: 0 0 16px;
  font-weight: 400;
  color: #333;
}
</style>
