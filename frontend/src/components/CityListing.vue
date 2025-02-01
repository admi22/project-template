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
const { getHero } = heroStore;
const { citiesArray } = storeToRefs(cityStore);
</script>

<template>
    <div class="w-[300px]">
        <div class="flex justify-between mb-4">
            <h1 class="text-2xl font-bold">Cities</h1>
        </div>
        <ul v-for="city in citiesArray" :key="city.id!" class="mb-2">
            <span class="font-bold mr-2">{{ city.name }}</span>
            <div class="badge badge-neutral badge-xs">{{ city.hero_ids.length }}</div>

            <li v-for="heroId of city.hero_ids">
                --- {{ getHero(heroId)!.name }}
            </li>
        </ul>

    </div>
</template>
