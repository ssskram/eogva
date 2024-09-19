import { defineStore } from "pinia";

export interface AreaOfInterest {
  name: string;
  coordinates: number[][];
  dateCreated: Date;
  dateUpdated: Date;
  crops: Crop[];
}

export interface Crop {
  name: string;
  values: TimeSeriesValue[];
}

export interface TimeSeriesValue {
  date: Date;
  minSupply: number;
  maxSupply: number;
}

const cropTypes = ["Iceberg", "Romaine", "Broccoli", "Celery"];

const generateTimeSeriesValues = (createdDate: Date): TimeSeriesValue[] => {
  const baseValue = Math.random() * 100;
  const dates = [
    new Date(createdDate.getTime() - 4 * 30 * 24 * 60 * 60 * 1000), // 4 months ago
    new Date(createdDate.getTime() - 3 * 30 * 24 * 60 * 60 * 1000), // 3 months ago
    new Date(createdDate.getTime() - 2 * 30 * 24 * 60 * 60 * 1000), // 2 months ago
    new Date(createdDate.getTime() - 1 * 30 * 24 * 60 * 60 * 1000), // 1 month ago
    new Date(createdDate),
  ];

  return dates.map((date, i) => {
    let minSupply = parseFloat(
      Math.max(0, baseValue + i * (Math.random() * 10 - 5)).toFixed(2)
    );

    let maxSupply = parseFloat(
      Math.max(minSupply + Math.random() * 10, 0).toFixed(2)
    );

    return { date, minSupply, maxSupply };
  });
};

const generateCrops = (createdDate: Date): Crop[] => {
  return cropTypes.map((crop) => ({
    name: crop,
    values: generateTimeSeriesValues(createdDate),
  }));
};

export const useAreasOfInterestStore = defineStore("areasOfInterest", {
  state: () => ({
    areas: [] as AreaOfInterest[],
    selectedArea: null as AreaOfInterest | null,
    newAreaCoordinates: [] as number[][],
    drawingToolActive: false,
    selectedCrop: null as Crop | null,
  }),
  actions: {
    setNewAreaCoordinates(coordinates: number[][]) {
      this.newAreaCoordinates = coordinates;
    },
    clearNewAreaCoordinates() {
      this.newAreaCoordinates = [];
    },
    toggleDrawingTool(active: boolean) {
      this.drawingToolActive = active;
    },
    addAreaOfInterest(area: AreaOfInterest) {
      const dateUpdated = new Date(
        area.dateCreated.getTime() - 5 * 24 * 60 * 60 * 1000
      );
      const withCrops = {
        ...area,
        dateUpdated,
        crops: generateCrops(area.dateCreated),
      };
      this.areas.push(withCrops);
      this.selectArea(withCrops);
    },
    selectArea(area: AreaOfInterest) {
      this.selectedArea = area;
      this.clearSelectedCrop();
    },
    clearSelectedArea() {
      this.selectedArea = null;
    },
    selectCrop(crop: Crop) {
      this.selectedCrop = crop;
    },
    clearSelectedCrop() {
      this.selectedCrop = null;
    },
    deleteArea(name: string) {
      this.areas = this.areas.filter((area) => area.name !== name);
      this.clearSelectedArea();
    },
  },
});
 