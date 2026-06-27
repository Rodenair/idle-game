<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useHitSound } from '@/composables/useHitSound'
import { formatNum } from '@/utils/format'
import MonsterDisplay from './MonsterDisplay.vue'

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
    value: (isCrit ? '💥 ' : '+') + formatNum(damage),
    isCrit,
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

      <!-- Crit stats (only shown after Precision Strike upgrade) -->
      <div
        v-if="store.critChance > 0"
        class="mt-1 flex items-center gap-1.5 text-xs text-yellow-400 pointer-events-none drop-shadow"
      >
        <span>🎯</span>
        <span>{{ Math.round(store.critChance * 100) }}% crit · {{ store.critMultiplier }}× damage</span>
      </div>
    </div>

    <!-- Floating damage texts (above overlay too) -->
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
