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
const { heroesArray, hoveredHeroId } = storeToRefs(heroStore);
const { getHero, setHoveredHeroId } = heroStore;
const { citiesArray } = storeToRefs(cityStore);
</script>

<template>
    <div class="w-[400px]">
        <div class="flex justify-between mb-4">
            <h1 class="text-2xl font-bold">Cities</h1>
        </div>
        <div class="flex gap-8">

            <div v-for="city in citiesArray" :key="city.id!" class="mb-2 w-full">
                <div class="mb-2">
                    <span class="font-bold mr-2">{{ city.name }}</span>
                    <div class="badge badge-neutral badge-xs">{{ city.hero_ids.length }}</div>
                </div>

                <div class="flex flex-col gap-1">
                    <div v-for="heroId of city.hero_ids"
                        class="bg-base-100 p-1 px-2 rounded-lg shadow-sm transition-all duration-100"
                        @mouseenter="setHoveredHeroId(heroId)" @mouseleave="setHoveredHeroId(null)"
                        :class="{ 'font-bold': heroId === hoveredHeroId }">
                        {{ getHero(heroId)!.name }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
