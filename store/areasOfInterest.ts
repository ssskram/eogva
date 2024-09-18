import { defineStore } from "pinia";

export interface AreaOfInterest {
  name: string;
  coordinates: number[][];
  dateCreated: Date;
  dateUpdated: Date;
  crops: { name: string; minSupply: number; maxSupply: number }[];
}

const cropTypes = [
  "Iceberg",
  "Romaine",
  "Broccoli",
  "Cauliflower",
  "Celery",
  "Hemp",
];

const generateSupplyValues = () => {
  const minSupply = parseFloat((Math.random() * 100).toFixed(2));
  const maxSupply = parseFloat((minSupply + Math.random() * 100).toFixed(2));
  return { minSupply, maxSupply };
};

const generateCrops = () => {
  return cropTypes.map((crop) => ({
    name: crop,
    ...generateSupplyValues(),
  }));
};

export const useAreasOfInterestStore = defineStore("areasOfInterest", {
  state: () => ({
    areas: [] as AreaOfInterest[],
    selectedArea: null as AreaOfInterest | null,
    newAreaCoordinates: [] as number[][],
  }),
  actions: {
    setNewAreaCoordinates(coordinates: number[][]) {
      this.newAreaCoordinates = coordinates;
    },
    clearNewAreaCoordinates() {
      this.newAreaCoordinates = [];
    },
    addAreaOfInterest(area: AreaOfInterest) {
      const withCrops = {
        ...area,
        crops: generateCrops(),
      };
      this.areas.push(withCrops);
      this.selectArea(withCrops);
    },
    selectArea(area: AreaOfInterest) {
      this.selectedArea = area;
    },
    clearSelectedArea() {
      this.selectedArea = null;
    },
  },
});
