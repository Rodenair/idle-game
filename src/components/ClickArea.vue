<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useHitSound } from '@/composables/useHitSound'
import { formatNum } from '@/utils/format'
import MonsterDisplay from './MonsterDisplay.vue'

const store = useGameStore()
const { playHit } = useHitSound()

interface FloatText {
  id: number
  x: number
  y: number
  value: string
}

const floatTexts = ref<FloatText[]>([])
let nextId = 0

function handleClick(e: PointerEvent) {
  store.clickMonster()
  playHit()

  // Spawn floating +N text at click position
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const id = nextId++
  floatTexts.value.push({
    id,
    x,
    y,
    value: '+' + formatNum(store.clickPower),
  })
}

function removeFloat(id: number) {
  floatTexts.value = floatTexts.value.filter((f) => f.id !== id)
}
</script>

<template>
  <div
    class="relative flex flex-col items-center select-none touch-none overflow-hidden cursor-pointer bg-cover bg-center bg-no-repeat min-h-full"
    style="-webkit-tap-highlight-color: transparent; background-image: url('/bg-arena.svg')"
    @pointerdown.prevent="handleClick"
  >
    <!-- Dark overlay so text stays readable over the background -->
    <div class="absolute inset-0 bg-slate-900/55 pointer-events-none" />

    <!-- All content above the overlay -->
    <div class="relative z-10 flex flex-col items-center w-full">
      <MonsterDisplay />

      <!-- Tap hint -->
      <div class="text-slate-400 text-sm mt-2 pointer-events-none drop-shadow">
        Tap to attack!
      </div>

      <!-- Click power info -->
      <div class="mt-3 flex items-center gap-1.5 text-sm text-slate-300 pointer-events-none drop-shadow">
        <span>⚔️</span>
        <span class="tabular-nums text-amber-400 font-semibold">{{ formatNum(store.clickPower) }}</span>
        <span>damage per tap</span>
      </div>
    </div>

    <!-- Floating damage texts (above overlay too) -->
    <div
      v-for="ft in floatTexts"
      :key="ft.id"
      class="absolute z-20 pointer-events-none font-bold text-xl text-amber-300 animate-float-up drop-shadow-lg"
      :style="{ left: ft.x + 'px', top: ft.y + 'px', transform: 'translate(-50%, -50%)' }"
      @animationend="removeFloat(ft.id)"
    >
      {{ ft.value }}
    </div>
  </div>
</template>
