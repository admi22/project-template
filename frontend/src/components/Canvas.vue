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

const CITY_WIDTH = 100
const CITY_HEIGHT = 200
const HERO_WIDTH = 50
const HERO_HEIGHT = 50


const canvas = ref<HTMLCanvasElement | null>(null)
let app: PixiApp | null = null

const pixiCities = new Map<number, PixiCity>()
const pixiHeroes = new Map<number, PixiHero>()

// watch for changes in heroesArray
watch(heroesArray, (newHeroesArray) => {
    console.log('heroesArray changed', newHeroesArray)

    newHeroesArray.forEach((hero) => {
        const pixiHero = getOrCreatePixiHero(hero.id!)

        // make sure hero is in the correct city
        const pixiCity = getOrCreatePixiCity(hero.city_id!)
        pixiCity.addChild(pixiHero)
        pixiCity.applyLayout()

  })
})

// watch for changes in citiesArray
watch(citiesArray, (newCitiesArray) => {
    console.log('citiesArray changed', newCitiesArray)

    newCitiesArray.forEach((city, index) => {
        const pixiCity = getOrCreatePixiCity(city.id!)

        city.hero_ids.forEach((heroId, heroIndex) => {
            const pixiHero = getOrCreatePixiHero(heroId)
        })
    })

    console.log('app', app)
})

function getOrCreatePixiCity(cityId: number) {
    let pixiCity = pixiCities.get(cityId)
    if (!pixiCity) {
        pixiCity = new PixiCity(CITY_WIDTH, CITY_HEIGHT)
        pixiCities.set(cityId, pixiCity)
        app?.addContainer(pixiCity)
    }
    return pixiCity
}

function getOrCreatePixiHero(heroId: number) {
    let pixiHero = pixiHeroes.get(heroId)
    if (!pixiHero) {
        pixiHero = new PixiHero(HERO_WIDTH, HERO_HEIGHT)
        pixiHeroes.set(heroId, pixiHero)
    }
    return pixiHero
}

function init() {
    console.log('init')

    // initiate pixi app
    app = new PixiApp(canvas.value as HTMLCanvasElement, 400, 400, 0xeeeeee)
}

onMounted(() => {
    init()
})
</script>

<template>
    <div class="w-full h-full relative">
        <canvas class="w-full h-full" ref="canvas" @contextmenu.prevent></canvas>
    </div>
</template>

<style scoped></style>
