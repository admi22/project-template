<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue';
import { useHeroStore } from "@/stores/hero";

import HeroCard from "@/components/HeroCard.vue";
import HeroModal from "@/components/HeroModal.vue";

const heroStore = useHeroStore();

onMounted(() => {
  heroStore.fetchHeroes();
});
</script>

<template>
  <div class="w-[300px]">
    <div class="flex justify-between mb-4">
      <h1 class="text-2xl font-bold">Heroes</h1>
      <button @click="heroStore.createNewHero" class="btn btn-xs btn-neutral">
        <Icon icon="fluent:add-12-filled" class="w-4 h-4" />
        <span>New Hero</span>
      </button>
    </div>
    <div class="flex flex-col gap-4">
      <HeroCard v-for="hero in heroStore.heroes" :key="hero.id!" :hero="hero"
        @editHero="heroStore.selectHeroForEdit(hero)" @deleteHero="heroStore.deleteHero(hero.id!)" />
    </div>
  </div>

  <!-- HeroModal only shows when there is a hero being edited/created -->
  <HeroModal />
</template>
