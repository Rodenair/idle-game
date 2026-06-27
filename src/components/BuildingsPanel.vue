<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { formatRate } from '@/utils/format'
import { BUILDINGS } from '@/data/buildings'
import BuildingCard from './BuildingCard.vue'

const store = useGameStore()
const totalSPS = computed(() => formatRate(store.scrapPerSec))
const totalPPS = computed(() => formatRate(store.partsPerSec))
</script>

<template>
  <div class="flex flex-col gap-2 p-3">
    <!-- Summary row -->
    <div class="flex items-center justify-between px-1 pb-1 border-b border-slate-700">
      <div class="text-xs text-slate-400">
        Total: <span class="text-amber-400 font-semibold tabular-nums">{{ totalSPS }}</span> ⚙️/s
      </div>
      <div v-if="store.partsPerSec > 0" class="text-xs text-slate-400">
        <span class="text-cyan-400 font-semibold tabular-nums">{{ totalPPS }}</span> 🔩/s
      </div>
    </div>

    <BuildingCard
      v-for="building in BUILDINGS"
      :key="building.id"
      :building="building"
    />
  </div>
</template>
