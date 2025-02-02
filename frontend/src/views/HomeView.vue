<script setup lang="ts">
import { onMounted } from 'vue';

import HeroListing from "@/components/HeroListing.vue";
import CityListing from '@/components/CityListing.vue';
import Canvas from '@/components/Canvas.vue';

import { useHeroStore } from "@/stores/hero";
import { useCityStore } from '@/stores/city';

const heroStore = useHeroStore();
const cityStore = useCityStore();

onMounted(() => {
  heroStore.loadHeroes();
  cityStore.loadCities();
});
</script>

<template>
  <main class="container mx-auto pt-8 flex gap-4">
    <HeroListing />
    <div class="divider divider-horizontal h-20 w-20"></div>
    <CityListing />
    <div class="divider divider-horizontal h-20 w-20"></div>
    <Canvas />

  </main>
</template>
