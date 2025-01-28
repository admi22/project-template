import { ref } from "vue";
import { defineStore } from "pinia";
import type { City } from "@/types/types";

export const useCityStore = defineStore("city", () => {
    // State
    const cities = ref<City[]>([]);

    // Actions
    async function fetchCities() {
        try {
            const response: City[] = await fetch(`${import.meta.env.VITE_API_URL}/cities`).then((res) => res.json());
            cities.value = response;
            return response;
        } catch (error) {
            console.error("Failed to fetch cities:", error);
            return [];
        }
    }

    return {
        cities,
        fetchCities
    }
})