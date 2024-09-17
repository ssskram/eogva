import { defineStore } from "pinia";

export interface AreaOfInterest {
  name: string;
  coordinates: number[][];
  dateCreated: Date;
  dateUpdated: Date;
  crops: { name: string; minSupply: number; maxSupply: number }[];
}

export const useAreasOfInterestStore = defineStore("areasOfInterest", {
  state: () => ({
    areas: [] as AreaOfInterest[],
    selectedArea: null as AreaOfInterest | null,
    newAreaCoordinates: [] as number[][], // For holding the coordinates of the new polygon
  }),
  actions: {
    setNewAreaCoordinates(coordinates: number[][]) {
      this.newAreaCoordinates = coordinates; // Set the new polygon coordinates
    },
    clearNewAreaCoordinates() {
      this.newAreaCoordinates = []; // Clear after saving
    },
    addAreaOfInterest(area: AreaOfInterest) {
      this.areas.push(area); // Add the new area with a name and coordinates
    },
    selectArea(area: AreaOfInterest) {
      this.selectedArea = area;
    },
    clearSelectedArea() {
      this.selectedArea = null;
    },
  },
});
