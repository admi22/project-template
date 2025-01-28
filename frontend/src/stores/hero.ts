import { ref } from "vue";
import { defineStore } from "pinia";
import type { paths } from "@/types/api-types";
import type { HeroPublic } from "@/types/hero";

export const useHeroStore = defineStore("hero", () => {
  const heroes = ref<HeroPublic[]>([]);

  async function fetchHeroes() {
    try {
      // Ensure the response is typed correctly
      const response: HeroPublic[] = await fetch(
        `${import.meta.env.VITE_API_URL}/heroes`
      ).then((res) => res.json());

      console.log(response);
      heroes.value = response;
      return response;
    } catch (error) {
      console.error("Failed to fetch heroes:", error);
      return [];
    }
  }

  return { heroes, fetchHeroes };
});
