<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { formatInt } from '@/utils/format'

const store = useGameStore()

const hpPercent = computed(() => {
  if (store.activeMonsterMaxHp <= 0) return 0
  return Math.max(0, Math.min(100, (store.monsterCurrentHp / store.activeMonsterMaxHp) * 100))
})

const hpBarColor = computed(() => {
  if (hpPercent.value > 60) return 'bg-green-500'
  if (hpPercent.value > 25) return 'bg-yellow-500'
  return 'bg-red-500'
})
</script>

<template>
  <div class="flex flex-col items-center gap-4 py-6">
    <!-- Monster emoji -->
    <div class="text-9xl animate-monster-bounce select-none leading-none">
      {{ store.activeMonsterDef.emoji }}
    </div>

    <!-- Name & Level -->
    <div class="flex items-center gap-2">
      <span class="text-white font-bold text-xl">{{ store.activeMonsterDef.name }}</span>
      <span class="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
        Lv {{ store.monsterLevel }}
      </span>
    </div>

    <!-- HP Bar -->
    <div class="w-64 flex flex-col gap-1">
      <div class="flex justify-between text-xs text-slate-400 tabular-nums">
        <span>{{ formatInt(store.monsterCurrentHp) }}</span>
        <span>{{ formatInt(store.activeMonsterMaxHp) }} HP</span>
      </div>
      <div class="h-3 bg-slate-700 rounded-full overflow-hidden">
        <div
          class="h-full rounded-full transition-all duration-75"
          :class="hpBarColor"
          :style="{ width: hpPercent + '%' }"
        />
      </div>
    </div>
  </div>
</template>
