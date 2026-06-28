<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
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
  <div class="flex flex-col items-center w-full h-full">
    <!-- Sprite fills all available vertical space -->
    <div class="flex-1 min-h-0 flex items-center justify-center w-full">
      <MonsterSprite
        :monster-id="store.activeMonsterDef.id"
        :hp-percent="hpPercent"
        :hit-signal="store.hitSignal"
        :death-signal="store.deathSignal"
      />
    </div>

    <!-- Name & Level -->
    <div class="flex items-center gap-2 pt-2">
      <span class="text-white font-bold text-2xl drop-shadow">{{ store.activeMonsterDef.name }}</span>
      <span class="bg-purple-600 text-white text-sm font-bold px-2.5 py-0.5 rounded-full shadow-lg">
        Lv {{ store.monsterLevel }}
      </span>
    </div>

    <!-- HP Bar -->
    <div class="w-full px-5 pt-2 pb-3">
      <div class="h-4 bg-slate-700/80 rounded-full overflow-hidden border border-slate-600/50">
        <div
          class="h-full rounded-full transition-all duration-75"
          :class="[hpBarColor, hpBarGlow]"
          :style="{ width: hpPercent + '%' }"
        />
      </div>
    </div>
  </div>
</template>
