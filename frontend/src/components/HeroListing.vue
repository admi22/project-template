<script setup lang="ts">
import { onMounted } from 'vue';
import { useHeroStore } from "@/stores/hero";

import HeroCard from "@/components/HeroCard.vue";

const heroStore = useHeroStore();

onMounted(() => {
  heroStore.fetchHeroes();
});
</script>

<template>
  <h1 class="text-2xl font-bold mb-4">Heroes</h1>
  <div class="flex flex-col gap-4">
    <HeroCard v-for="hero in heroStore.heroes" :key="hero.id" :hero="hero" />
  </div>
</template>
