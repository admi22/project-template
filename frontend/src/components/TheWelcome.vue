<script setup lang="ts">
import { useHeroStore } from "@/stores/hero";

const heroStore = useHeroStore();
</script>

<template>
  <div class="text-3xl font-bold">Hello there</div>
  <button @click="heroStore.fetchHeroes" class="btn btn-primary"> FetchHeroes </button>
</template>
