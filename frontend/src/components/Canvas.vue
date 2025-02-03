<script setup lang="ts">
import { PixiApp } from '@/pixi/PixiApp';
import { onMounted, watch, ref } from 'vue'
import { storeToRefs } from "pinia";
import { useHeroStore } from "@/stores/hero";
import { useCityStore } from '@/stores/city'
import { PixiCity } from '@/pixi/PixiCity';
import { PixiHero } from '@/pixi/PixiHero';

const heroStore = useHeroStore();
const { heroesArray, hoveredHeroId } = storeToRefs(heroStore);
const { getHero, initializeHero, editHero, removeHero, setHoveredHeroId } = heroStore;

const cityStore = useCityStore()
const { citiesArray, cities } = storeToRefs(cityStore)
const { getCity } = cityStore

const HERO_WIDTH = 50
const HERO_HEIGHT = 50


const canvas = ref<HTMLCanvasElement | null>(null)
let app: PixiApp | null = null

const pixiCities = new Map<number, PixiCity>()
const pixiHeroes = new Map<number, PixiHero>()

// watch for changes in heroesArray
watch(heroesArray, (newHeroesArray) => {
    console.log('heroesArray changed', newHeroesArray)
    update()
})

// watch for changes in citiesArray
watch(citiesArray, (newCitiesArray) => {
    console.log('citiesArray changed', newCitiesArray)
    update()
})

// watch for changes in hoveredHeroId
watch(hoveredHeroId, (newHoveredHeroId, oldHoveredHeroId) => {
    if (oldHoveredHeroId) {
        const oldPixiHero = pixiHeroes.get(oldHoveredHeroId)
        oldPixiHero?.updateHighlightedDisplay(false)
    }
    if (newHoveredHeroId) {
        const newPixiHero = pixiHeroes.get(newHoveredHeroId)
        newPixiHero?.updateHighlightedDisplay(true)
    }
})

function update() {
    citiesArray.value.forEach((city) => {
        const pixiCity = getOrCreatePixiCity(city.id!)
    })

    heroesArray.value.forEach((hero) => {
        const pixiHero = getOrCreatePixiHero(hero.id!)

        // make sure hero is in the correct city
        const pixiCity = getOrCreatePixiCity(hero.city_id!)
        pixiCity.addHero(pixiHero)
    })
}

function getOrCreatePixiCity(cityId: number) {
    const city = getCity(cityId)
    let pixiCity = pixiCities.get(cityId)
    if (!pixiCity) {
        pixiCity = new PixiCity(city!)
        pixiCities.set(cityId, pixiCity)
        app?.addContainer(pixiCity)
    }
    return pixiCity
}

function getOrCreatePixiHero(heroId: number) {
    let pixiHero = pixiHeroes.get(heroId)
    let hero = getHero(heroId)
    if (!pixiHero) {
        pixiHero = new PixiHero(hero!, setHoveredHeroId)
        pixiHeroes.set(heroId, pixiHero)
    }
    return pixiHero
}

function init() {
    console.log('init')

    // initiate pixi app
    app = new PixiApp(canvas.value as HTMLCanvasElement, 400, 400, 0xe4e4e7)
}

onMounted(() => {
    init()
    update()
})

function debug() {
    app?.debugSceneGraphRecursive(app.root, 0)
}
</script>

<template>
    <div class="w-full h-full relative">
        <canvas class="w-full h-full" ref="canvas" @contextmenu.prevent></canvas>
        <button @click="debug" class="btn btn-content btn-outline">Log Pixi Scene Graph</button>
    </div>
</template>

<style scoped></style>
