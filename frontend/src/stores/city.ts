import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { fetchFromApi } from "@/utils/api";
import type { City } from "@/types/types";

export const useCityStore = defineStore("city", () => {
    // 🔹 STATE
    const cities = ref(new Map<number, City>()); // The Map for storing cities by ID

    // 🔹 COMPUTED
    const citiesArray = computed(() => Array.from(cities.value.values()));

    // 🔹 STATE MUTATION FUNCTIONS (PURE)
    function getCity(id: number | null | undefined) {
        return id ? cities.value.get(id) || null : null;
    }

    // 🔹 API CALLS (CRUD)
    async function loadCities() {
        try {
            const response: City[] = await fetchFromApi(`${import.meta.env.VITE_API_URL}/cities`);
            cities.value = new Map(response.map(city => [city.id!, city])); // More efficient assignment
            return response;
        } catch {
            return [];
        }
    }

    async function loadCity(id: number) {
        try {
            const response: City = await fetchFromApi(`${import.meta.env.VITE_API_URL}/cities/${id}`);

            // Update the store with the new city
            cities.value.set(response.id!, response);
            return response;
        } catch {
            return null;
        }
    }

    async function createOrUpdateCity(city: City) {
        try {
            const isUpdating = !!city.id;
            const endpoint = `${import.meta.env.VITE_API_URL}/cities` + (isUpdating ? `/${city.id}` : "");
            const method = isUpdating ? "PATCH" : "POST";

            const cityData = await fetchFromApi(endpoint, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(city),
            });

            // Update the store with the new city
            cities.value.set(cityData.id!, cityData);

        } catch (error) {
            console.error("Failed to save city:", error);
        }
    }

    async function removeCity(id: number) {
        try {
            await fetchFromApi(`${import.meta.env.VITE_API_URL}/cities/${id}`, { method: "DELETE" });
            removeCity(id); // Remove from store
        } catch (error) {
            console.error("Failed to delete city:", error);
        }
    }

    // 🔹 RETURNED STORE API
    return {
        cities,
        citiesArray,
        getCity,
        loadCities,
        loadCity,
        createOrUpdateCity,
        removeCity,
    };
});
