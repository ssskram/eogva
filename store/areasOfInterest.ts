import { defineStore } from "pinia";

export interface Crop {
  name: string;
  minSupply: number;
  maxSupply: number;
}

export interface AreaOfInterest {
  name: string;
  coordinates: number[][];
  dateCreated: Date;
  dateUpdated: Date;
  crops: Crop[];
}

export const useAreasOfInterestStore = defineStore("areasOfInterest", {
  state: () => ({
    areas: [] as AreaOfInterest[],
    selectedArea: null as AreaOfInterest | null,
    newAreaCoordinates: [] as number[][],
    isEditing: false,
  }),
  actions: {
    setNewAreaCoordinates(coordinates: number[][]) {
      this.newAreaCoordinates = coordinates;
    },
    clearNewAreaCoordinates() {
      this.newAreaCoordinates = [];
    },
    addAreaOfInterest(area: AreaOfInterest) {
      area.crops = this.generateCrops();
      this.areas.push(area);
    },
    deleteArea(name: string) {
      this.areas = this.areas.filter((area) => area.name !== name);
      if (this.selectedArea?.name === name) {
        this.clearSelectedArea();
      }
    },
    modifyArea(area: AreaOfInterest) {
      this.selectedArea = area;
      this.newAreaCoordinates = area.coordinates;
      this.isEditing = true;
    },
    selectArea(area: AreaOfInterest) {
      this.selectedArea = area;
      this.isEditing = false;
    },
    clearSelectedArea() {
      this.selectedArea = null;
      this.isEditing = false;
    },
    generateCrops(): Crop[] {
      const cropNames = [
        "Iceberg",
        "Romaine",
        "Broccoli",
        "Cauliflower",
        "Celery",
        "Hemp",
      ];
      return cropNames.map((name) => ({
        name,
        minSupply: parseFloat((Math.random() * 10).toFixed(2)),
        maxSupply: parseFloat((Math.random() * 100).toFixed(2)),
      }));
    },
  },
});
