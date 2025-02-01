<script setup lang="ts">
import { storeToRefs } from "pinia";

import { useHeroStore } from "@/stores/hero";
import { useCityStore } from '@/stores/city';

const heroStore = useHeroStore();
const cityStore = useCityStore();

const { currentHero } = storeToRefs(heroStore);
const { citiesArray } = storeToRefs(cityStore);

// Close the modal by resetting `currentHero`
function closeModal() {
  heroStore.resetCurrentHero();
}

// Save changes to the hero
function saveHero() {
  heroStore.createOrUpdateHero(); // Call the store's save method
  closeModal(); // Close the modal after saving
}

// Handle Escape key to close the modal
function handleEscape(event: KeyboardEvent) {
  if (event.key === "Escape") {
    closeModal();
  }
}

// Add and remove Escape key listener based on modal visibility
import { watch } from "vue";
watch(
  () => currentHero,
  (currentHero) => {
    if (currentHero) {
      window.addEventListener("keydown", handleEscape);
    } else {
      window.removeEventListener("keydown", handleEscape);
    }
  }
);
</script>

<template>
  <div v-if="currentHero" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div @click="closeModal" class="fixed inset-0 bg-black opacity-50 w-full h-full"></div>

    <!-- Modal Box -->
    <div class="card w-96 bg-base-100 shadow-lg z-10 transform transition-transform duration-300">
      <div class="card-body">
        <h2 class="text-lg font-bold mb-4">Edit Hero</h2>
        <form class="space-y-4">
          <div>
            <label for="name" class="label">Hero Name</label>
            <input id="name" v-model="currentHero.name" type="text" placeholder="Hero Name"
              class="input input-bordered w-full" />
          </div>
          <div>
            <label for="age" class="label">Hero Age</label>
            <input id="age" v-model.number="currentHero.age" type="number" placeholder="Hero Age"
              class="input input-bordered w-full" />
          </div>
          <div>
            <label for="secret_name" class="label">Secret Name</label>
            <input id="secret_name" v-model="currentHero.secret_name" type="text" placeholder="Secret Name"
              class="input input-bordered w-full" />
          </div>
          <div>
            <label for="city" class="label">City</label>
            <select id="city" class="select" v-model="currentHero.city_id">
              <option :value="null">None</option>
              <option v-for="city in citiesArray" :key="city.id!" :value="city.id">{{ city.name }}</option>
            </select>
          </div>
        </form>
        <div class="modal-action mt-4 flex justify-end">
          <button class="btn btn-primary" @click="saveHero">Save</button>
          <button class="btn" @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  transform: scale(0.95);
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
