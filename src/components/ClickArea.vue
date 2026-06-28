<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useHitSound } from '@/composables/useHitSound'
import { formatNum } from '@/utils/format'
import MonsterDisplay from './MonsterDisplay.vue'
import CompanionBots from './CompanionBots.vue'

const store = useGameStore()
const { playHit, playCritHit } = useHitSound()

interface FloatText {
  id: number
  x: number
  y: number
  value: string
  isCrit: boolean
}

const floatTexts = ref<FloatText[]>([])
let nextId = 0

function handleClick(e: PointerEvent) {
  const { damage, isCrit } = store.clickMonster()
  isCrit ? playCritHit() : playHit()

  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  floatTexts.value.push({
    id: nextId++,
    x,
    y,
    value: formatNum(damage),
    isCrit,
  })
}

function removeFloat(id: number) {
  floatTexts.value = floatTexts.value.filter((f) => f.id !== id)
}
</script>

<template>
  <div
    class="relative flex flex-col items-center select-none touch-none overflow-hidden cursor-pointer bg-cover bg-center bg-no-repeat flex-1"
    style="-webkit-tap-highlight-color: transparent; background-image: url('/bg-arena.png')"
    @pointerdown.prevent="handleClick"
  >
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-black/40 pointer-events-none" />

    <!-- Content above overlay -->
    <div class="relative z-10 flex flex-col items-center w-full h-full">
      <MonsterDisplay class="flex-1 min-h-0 w-full" />

      <!-- Companion bots row (below monster, above tap hint) -->
      <CompanionBots />

      <!-- Bottom info cluster -->
      <div class="flex flex-col items-center gap-1 mt-2 pointer-events-none">
        <div
          v-if="store.critChance > 0"
          class="flex items-center gap-1.5 text-xs text-yellow-400 drop-shadow"
        >
          <span>🎯</span>
          <span>{{ Math.round(store.critChance * 100) }}% crit · {{ store.critMultiplier }}× damage</span>
        </div>
      </div>
    </div>

    <!-- Floating damage texts -->
    <div
      v-for="ft in floatTexts"
      :key="ft.id"
      class="absolute z-20 pointer-events-none font-bold drop-shadow-lg"
      :class="ft.isCrit
        ? 'text-3xl text-yellow-300 animate-crit-float-up'
        : 'text-xl text-amber-300 animate-float-up'"
      :style="{ left: ft.x + 'px', top: ft.y + 'px', transform: 'translate(-50%, -50%)' }"
      @animationend="removeFloat(ft.id)"
    >
      {{ ft.value }}
    </div>
  </div>
</template>
