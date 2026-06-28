<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { formatInt } from '@/utils/format'
import MonsterSprite from './MonsterSprite.vue'

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

const hpBarGlow = computed(() => {
  if (hpPercent.value > 60) return 'shadow-[0_0_6px_1px_rgba(34,197,94,0.5)]'
  if (hpPercent.value > 25) return 'shadow-[0_0_6px_1px_rgba(234,179,8,0.5)]'
  return 'shadow-[0_0_8px_2px_rgba(239,68,68,0.6)]'
})
</script>

<template>
  <div class="flex flex-col items-center gap-3 py-4">
    <!-- Monster sprite -->
    <MonsterSprite
      :monster-id="store.activeMonsterDef.id"
      :hp-percent="hpPercent"
      :hit-signal="store.hitSignal"
    />

    <!-- Name & Level -->
    <div class="flex items-center gap-2">
      <span class="text-white font-bold text-xl drop-shadow">{{ store.activeMonsterDef.name }}</span>
      <span class="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
        Lv {{ store.monsterLevel }}
      </span>
    </div>

    <!-- HP Bar -->
    <div class="w-64 flex flex-col gap-1">
      <div class="flex justify-between text-xs text-slate-400 tabular-nums">
        <span class="font-semibold" :class="hpPercent <= 25 ? 'text-red-400 animate-pulse' : ''">
          {{ formatInt(store.monsterCurrentHp) }}
        </span>
        <span>{{ formatInt(store.activeMonsterMaxHp) }} HP</span>
      </div>
      <div class="h-3.5 bg-slate-700/80 rounded-full overflow-hidden border border-slate-600/50">
        <div
          class="h-full rounded-full transition-all duration-75"
          :class="[hpBarColor, hpBarGlow]"
          :style="{ width: hpPercent + '%' }"
        />
      </div>
      <!-- HP percentage label at critical -->
      <div v-if="hpPercent <= 25" class="text-center text-xs text-red-400 font-bold animate-pulse">
        CRITICAL — {{ Math.round(hpPercent) }}%
      </div>
    </div>
  </div>
</template>
