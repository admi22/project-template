import { ref, computed } from "vue";
import { defineStore } from "pinia";
import type { paths } from "@/types/api-types"

export const useHeroStore = defineStore("hero", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  async function fetchHeroes() {
    try {
      const response: paths["/heroes/"]["get"]["responses"]["200"] = await fetch(`${import.meta.env.VITE_API_URL}/heroes`).then((res) => res.json());
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  return { count, doubleCount, increment, fetchHeroes };
});
