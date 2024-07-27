import { create } from "zustand";

export const useCoordinates = create((set) => ({
  coordinates: [],
  setCoordinates: (coordinates) => set({ coordinates }),

  initializeCoordinates: () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        set({ coordinates: [latitude, longitude] });
      },
      (error) => {
        console.error("Error getting location: ", error);
      }
    );
  },
}));
