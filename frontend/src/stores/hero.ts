import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { Hero } from "@/types/types";

export const useHeroStore = defineStore("hero", () => {
  // State
  const heroes = ref(new Map<number, Hero>()); // The Map for storing heroes by ID
  const currentHero = ref<Hero | null>(null); // For both creation and editing

  // Computed: Derive an array of heroes from the map
  const heroesArray = computed(() => Array.from(heroes.value.values()));

  // Actions
  async function fetchHeroes() {
    try {
      const response: Hero[] = await fetch(`${import.meta.env.VITE_API_URL}/heroes`).then((res) =>
        res.json()
      );

      // Populate the map
      heroes.value.clear();
      response.forEach((hero) => {
        heroes.value.set(hero.id!, hero); // Assuming hero.id is always present
      });

      return response;
    } catch (error) {
      console.error("Failed to fetch heroes:", error);
      return [];
    }
  }

  async function saveHero() {
    if (!currentHero.value) return;

    if (currentHero.value.id) {
      // Update existing hero
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/heroes/${currentHero.value.id}`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(currentHero.value),
          }
        ).then((res) => res.json());

        // Update the hero in the map
        heroes.value.set(response.id, response);
      } catch (error) {
        console.error("Failed to update hero:", error);
      }
    } else {
      // Create new hero
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/heroes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentHero.value),
        }).then((res) => res.json());

        // Add the new hero to the map
        heroes.value.set(response.id, response);
      } catch (error) {
        console.error("Failed to create hero:", error);
      }
    }

    resetCurrentHero();
  }

  async function deleteHero(id: number) {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/heroes/${id}`, { method: "DELETE" });

      // Remove the hero from the map
      heroes.value.delete(id);
    } catch (error) {
      console.error("Failed to delete hero:", error);
    }
  }

  function getHero(id: number | null | undefined) {
    if (!id) return null;
    return heroes.value.get(id) || null;
  }

  function resetCurrentHero() {
    currentHero.value = null;
  }

  function selectHeroForEdit(hero: Hero) {
    console.log("selectHeroForEdit", hero);
    currentHero.value = { ...hero }; // Clone the hero for editing
  }

  function createNewHero() {
    // Create a new hero with default values
    currentHero.value = {
      id: null, // No ID yet since it's a new hero
      name: "",
      secret_name: "",
      age: null,
    };
  }

  return {
    heroes, // The Map for efficient lookups
    heroesArray, // Computed array of heroes for iteration
    currentHero,
    fetchHeroes,
    saveHero,
    deleteHero,
    getHero,
    resetCurrentHero,
    selectHeroForEdit,
    createNewHero,
  };
});
