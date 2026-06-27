<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { formatNum } from '@/utils/format'
import type { UpgradeDef } from '@/data/upgrades'

const props = defineProps<{ upgrade: UpgradeDef }>()

const store = useGameStore()

const canAfford = computed(
  () => store.scrap >= props.upgrade.costScrap && store.parts >= props.upgrade.costParts,
)

function buy() {
  store.buyUpgrade(props.upgrade.id)
}
</script>

<template>
  <div
    class="flex flex-col gap-2 p-3 rounded-xl border transition-colors"
    :class="canAfford
      ? 'bg-slate-800 border-slate-600 hover:border-cyan-500/50'
      : 'bg-slate-800/50 border-slate-700 opacity-60'"
  >
    <div class="flex items-start gap-2">
      <span class="text-2xl shrink-0">{{ upgrade.emoji }}</span>
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-white text-sm">{{ upgrade.name }}</div>
        <div class="text-slate-400 text-xs mt-0.5">{{ upgrade.description }}</div>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2 text-xs text-slate-400">
        <span class="text-amber-400 font-semibold tabular-nums">{{ formatNum(upgrade.costScrap) }} ⚙️</span>
        <span v-if="upgrade.costParts > 0" class="text-cyan-400 font-semibold tabular-nums">
          + {{ formatNum(upgrade.costParts) }} 🔩
        </span>
      </div>
      <button
        class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all"
        :class="canAfford
          ? 'bg-cyan-600 hover:bg-cyan-500 text-white active:scale-95'
          : 'bg-slate-700 text-slate-500 cursor-not-allowed'"
        :disabled="!canAfford"
        @click="buy"
      >
        Buy
      </button>
    </div>
  </div>
</template>
