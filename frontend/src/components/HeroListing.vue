<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue';
import { storeToRefs } from "pinia";

import HeroCard from "@/components/HeroCard.vue";
import HeroModal from "@/components/HeroModal.vue";

import { useHeroStore } from "@/stores/hero";
import { useCityStore } from '@/stores/city';

const heroStore = useHeroStore();
const cityStore = useCityStore();
const { heroesArray } = storeToRefs(heroStore);
const { createNewHero, selectHeroForEdit, deleteHero } = heroStore;

onMounted(() => {
  heroStore.fetchHeroes();
  cityStore.fetchCities();
});
</script>

<template>
  <div class="w-[300px]">
    <div class="flex justify-between mb-4">
      <h1 class="text-2xl font-bold">Heroes</h1>
      <button @click="createNewHero" class="btn btn-xs btn-neutral">
        <Icon icon="fluent:add-12-filled" class="w-4 h-4" />
        <span>New Hero</span>
      </button>
    </div>
    <div class="flex flex-col gap-4">
      <HeroCard v-for="hero in heroesArray" :key="hero.id!" :hero="hero"
        @editHero="selectHeroForEdit(hero)" @deleteHero="deleteHero(hero.id!)" />
    </div>
  </div>

  <!-- HeroModal only shows when there is a hero being edited/created -->
  <HeroModal />
</template>
