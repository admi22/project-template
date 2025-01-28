import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { City } from "@/types/types";

export const useCityStore = defineStore("city", () => {
    // State
    const cities = ref(new Map<number, City>()); // The Map for storing cities by ID

    // Computed: Derive an array of cities from the map
    const citiesArray = computed(() => Array.from(cities.value.values()));

    // Actions
    async function fetchCities() {
        try {
            const response: City[] = await fetch(`${import.meta.env.VITE_API_URL}/cities`).then((res) => res.json());

            // Populate the map
            cities.value.clear();
            response.forEach((city) => {
                cities.value.set(city.id!, city);
            });

            return response;
        } catch (error) {
            console.error("Failed to fetch cities:", error);
            return [];
        }
    }

    function updateCity(city: City) {
        // Update the city in the map
        cities.value.set(city.id!, city);
    }

    function getCity(id: number | null | undefined) {
        if (!id) return null;
        return cities.value.get(id) || null;
    }

    function deleteCity(id: number) {
        // Delete the city from the map
        cities.value.delete(id);
    }

    return {
        cities, // The Map for efficient lookups
        citiesArray, // Computed array of cities for iteration
        fetchCities,
        updateCity,
        getCity,
        deleteCity,
    };
});
