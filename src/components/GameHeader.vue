<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { formatNum, formatRate } from '@/utils/format'

const store = useGameStore()

const scrapDisplay = computed(() => formatNum(Math.floor(store.scrap)))
const partsDisplay = computed(() => formatNum(Math.floor(store.parts)))
const spsDisplay = computed(() => formatRate(store.scrapPerSec))
const ppsDisplay = computed(() => formatRate(store.partsPerSec))
</script>

<template>
  <header class="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700 shrink-0">
    <div class="flex flex-col">
      <div class="flex items-center gap-1.5">
        <span class="text-lg">⚙️</span>
        <span class="text-amber-400 font-bold text-lg tabular-nums">{{ scrapDisplay }}</span>
      </div>
      <div class="text-xs text-slate-400 pl-7 tabular-nums">+{{ spsDisplay }}/s</div>
    </div>

    <div class="text-center">
      <div class="text-slate-500 text-xs font-semibold tracking-widest uppercase">Robots vs</div>
      <div class="text-slate-300 text-xs font-semibold tracking-widest uppercase">Monsters</div>
    </div>

    <div class="flex flex-col items-end">
      <div class="flex items-center gap-1.5">
        <span class="text-cyan-400 font-bold text-lg tabular-nums">{{ partsDisplay }}</span>
        <span class="text-lg">🔩</span>
      </div>
      <div class="text-xs text-slate-400 pr-7 tabular-nums">+{{ ppsDisplay }}/s</div>
    </div>
  </header>
</template>
