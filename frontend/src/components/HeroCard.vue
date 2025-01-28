// HeroCard.vue
<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { HeroPublic } from "@/types/hero";

const props = defineProps({
    hero: {
        type: Object as () => HeroPublic,
        required: true,
    },
});
</script>

<template>
    <div class="card w-96 bg-base-100 card-sm shadow-sm">
        <div class="card-body">
            <div class="flex justify-between">
                <h2 class="card-title">{{ hero.name }}</h2>
                <div class="justify-end card-actions">
                    <button class="btn btn-xs btn-error btn-outline">
                        <Icon icon="fluent:delete-32-regular" class="w-4 h-4" />
                    </button>
                    <button class="btn btn-xs btn-neutral btn-outline">
                        <Icon icon="fluent:edit-16-regular" class="w-4 h-4" />
                    </button>
                </div>
            </div>
            <p>Age: {{ hero.age }}</p>
        </div>
    </div>
</template>
