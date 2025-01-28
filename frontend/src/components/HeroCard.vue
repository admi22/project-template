<script setup lang="ts">
import { Icon } from '@iconify/vue';
import type { Hero } from "@/types/types";
import { storeToRefs } from "pinia";

import { useCityStore } from "@/stores/city";

const cityStore = useCityStore();
const { cities, citiesArray } = storeToRefs(cityStore); // Destructure reactive properties
const { getCity } = cityStore;

const props = defineProps({
    hero: {
        type: Object as () => Hero,
        required: true,
    },
});
</script>

<template>
    <div class="card w-full bg-base-100 card-sm shadow-sm">
        <div class="card-body">
            <div class="flex justify-between">
                <h2 class="card-title">{{ hero.name }}</h2>
                <div class="justify-end card-actions">
                    <button @click="$emit('deleteHero')" class="btn btn-xs btn-error btn-outline">
                        <Icon icon="fluent:delete-32-regular" class="w-4 h-4" />
                    </button>
                    <button @click="$emit('editHero')" class="btn btn-xs btn-neutral btn-outline">
                        <Icon icon="fluent:edit-16-regular" class="w-4 h-4" />
                    </button>
                </div>
            </div>
            <p>Age: {{ hero.age }}</p>
            <p>City: {{ getCity(hero.city_id)?.name }}</p>
        </div>
    </div>
</template>
