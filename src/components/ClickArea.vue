<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { formatNum } from '@/utils/format'
import MonsterDisplay from './MonsterDisplay.vue'

const store = useGameStore()

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
    class="relative flex flex-col items-center select-none touch-none overflow-hidden cursor-pointer"
    style="-webkit-tap-highlight-color: transparent"
    @pointerdown.prevent="handleClick"
  >
    <MonsterDisplay />

    <!-- Tap hint -->
    <div class="text-slate-500 text-sm mt-2 pointer-events-none">
      Tap to attack!
    </div>

    <!-- Click power info -->
    <div class="mt-3 flex items-center gap-1.5 text-sm text-slate-400 pointer-events-none">
      <span>⚔️</span>
      <span class="tabular-nums text-amber-400 font-semibold">{{ formatNum(store.clickPower) }}</span>
      <span>damage per tap</span>
    </div>

    <!-- Floating damage texts -->
    <div
      v-for="ft in floatTexts"
      :key="ft.id"
      class="absolute pointer-events-none font-bold text-xl text-amber-300 animate-float-up"
      :style="{ left: ft.x + 'px', top: ft.y + 'px', transform: 'translate(-50%, -50%)' }"
      @animationend="removeFloat(ft.id)"
    >
      {{ ft.value }}
    </div>
  </div>
</template>
