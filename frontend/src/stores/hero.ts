import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { fetchFromApi } from "@/utils/api";
import type { Hero } from "@/types/types";
import { useCityStore } from "@/stores/city";

export const useHeroStore = defineStore("hero", () => {
  // 🔹 STATE
  const heroes = ref(new Map<number, Hero>());
  const currentHero = ref<Hero | null>(null);
  const hoveredHeroId = ref<number | null>(null);

  // 🔹 COMPUTED
  const heroesArray = computed(() => Array.from(heroes.value.values()));

  // 🔹 STATE MUTATION FUNCTIONS (PURE)
  function getHero(id: number | null | undefined) {
    return id ? heroes.value.get(id) || null : null;
  }
  
  function initializeHero() {
    currentHero.value = { id: null, name: "", secret_name: "", age: null };
  }

  function editHero(hero: Hero) {
    currentHero.value = { ...hero };
  }

  function resetCurrentHero() {
    currentHero.value = null;
  }

  function setHoveredHeroId(id: number | null) {
    hoveredHeroId.value = id;
  }

  // 🔹 API CALLS (CRUD)
  async function loadHeroes() {
    try {
      const response: Hero[] = await fetchFromApi(`${import.meta.env.VITE_API_URL}/heroes`);
      heroes.value = new Map(response.map(hero => [hero.id!, hero]));
      return response;
    } catch {
      return [];
    }
  }

  async function createOrUpdateHero() {
    if (!currentHero.value) return;
  
    const cityStore = useCityStore();
    const previousCityId = currentHero.value.id ? heroes.value.get(currentHero.value.id)?.city_id : null;
  
    try {
      const isUpdating = !!currentHero.value.id;
      const endpoint = `${import.meta.env.VITE_API_URL}/heroes` + (isUpdating ? `/${currentHero.value.id}` : "");
      const method = isUpdating ? "PATCH" : "POST";
  
      // Save hero to API
      const heroData = await fetchFromApi(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentHero.value),
      });
  
      // Update hero store
      heroes.value.set(heroData.id, heroData);
  
      // Parallelize city updates if necessary
      if (previousCityId !== heroData.city_id) {
        const cityUpdates = [];
        if (previousCityId) cityUpdates.push(cityStore.loadCity(previousCityId));
        if (heroData.city_id) cityUpdates.push(cityStore.loadCity(heroData.city_id));
  
        await Promise.all(cityUpdates); // Execute both calls in parallel
      }
    } catch (error) {
      console.error("Failed to save hero:", error);
    }
  
    resetCurrentHero();
  }
  

  async function removeHero(id: number) {
    const cityStore = useCityStore();
    const hero = heroes.value.get(id);
    const cityId = hero?.city_id || null;

    try {
      await fetchFromApi(`${import.meta.env.VITE_API_URL}/heroes/${id}`, { method: "DELETE" });
      heroes.value.delete(id);

      if (cityId) {
        await cityStore.loadCity(cityId);
      }
    } catch (error) {
      console.error("Failed to delete hero:", error);
    }
  }

  return {
    heroes,
    heroesArray,
    currentHero,
    hoveredHeroId,
    loadHeroes,
    createOrUpdateHero,
    removeHero,
    getHero,
    resetCurrentHero,
    editHero,
    initializeHero,
    setHoveredHeroId,
  };
});
