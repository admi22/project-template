import { ref } from "vue";
import { defineStore } from "pinia";
import type { Hero } from "@/types/hero";

export const useHeroStore = defineStore("hero", () => {
  // State
  const heroes = ref<Hero[]>([]);
  const currentHero = ref<Hero | null>(null); // For both creation and editing

  // Actions
  async function fetchHeroes() {
    try {
      const response: Hero[] = await fetch(`${import.meta.env.VITE_API_URL}/heroes`).then((res) =>
        res.json()
      );
      heroes.value = response;
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
        console.log("response", response);
        const index = heroes.value.findIndex((h) => h.id === response.id);
        heroes.value.splice(index, 1, response); // Replace the hero in the array
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
        heroes.value = [...heroes.value, response]; // Add new hero to a new array
      } catch (error) {
        console.error("Failed to create hero:", error);
      }
    }

    resetCurrentHero();
  }



  async function deleteHero(id: number) {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/heroes/${id}`, { method: "DELETE" });
      heroes.value = heroes.value.filter((hero) => hero.id !== id);
    } catch (error) {
      console.error("Failed to delete hero:", error);
    }
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
    heroes,
    currentHero,
    fetchHeroes,
    saveHero,
    deleteHero,
    resetCurrentHero,
    selectHeroForEdit,
    createNewHero,
  };
});