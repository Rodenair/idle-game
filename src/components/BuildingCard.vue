<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { formatNum, formatRate } from '@/utils/format'
import type { BuildingDef } from '@/data/buildings'

const props = defineProps<{ building: BuildingDef }>()

const store = useGameStore()

const cost = computed(() => store.buildingCost(props.building.id))
const owned = computed(() => store.buildingCounts[props.building.id] ?? 0)
const canAfford = computed(() => store.scrap >= cost.value)

const outputLabel = computed(() => {
  const mult = store.upgradeEffects?.buildingMultipliers?.[props.building.id] ?? 1
  if (props.building.baseScrapPerSec > 0) {
    return formatRate(props.building.baseScrapPerSec * mult) + ' ⚙️/s each'
  }
  if (props.building.basePartsPerSec > 0) {
    return formatRate(props.building.basePartsPerSec * mult) + ' 🔩/s each'
  }
  return ''
})

function buy() {
  store.buyBuilding(props.building.id)
}
</script>

<template>
  <div
    class="flex items-start gap-3 p-3 rounded-xl border transition-colors"
    :class="canAfford
      ? 'bg-slate-800 border-slate-600 hover:border-amber-500/50'
      : 'bg-slate-800/50 border-slate-700 opacity-70'"
  >
    <!-- Emoji -->
    <div class="text-3xl shrink-0 w-10 text-center">{{ building.emoji }}</div>

    <!-- Info -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <span class="font-semibold text-white text-sm">{{ building.name }}</span>
        <span v-if="owned > 0" class="bg-amber-500/20 text-amber-400 text-xs font-bold px-1.5 py-0.5 rounded">
          {{ owned }}
        </span>
      </div>
      <div class="text-slate-400 text-sm mt-0.5">{{ building.description }}</div>
      <div v-if="outputLabel" class="text-slate-500 text-xs mt-1">{{ outputLabel }}</div>
    </div>

    <!-- Buy button -->
    <button
      class="shrink-0 flex flex-col items-center px-3 py-2 rounded-lg text-xs font-bold transition-colors min-w-[64px]"
      :class="canAfford
        ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 active:scale-95'
        : 'bg-slate-700 text-slate-500 cursor-not-allowed'"
      :disabled="!canAfford"
      @click.stop="buy"
    >
      <span class="text-base">⚙️</span>
      <span class="tabular-nums">{{ formatNum(cost) }}</span>
    </button>
  </div>
</template>
