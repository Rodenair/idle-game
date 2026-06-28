<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { formatNum } from '@/utils/format'
import type { UpgradeDef } from '@/data/upgrades'

const props = defineProps<{ upgrade: UpgradeDef; purchased: boolean }>()

const store = useGameStore()

const canAfford = computed(
  () => store.scrap >= props.upgrade.costScrap && store.parts >= props.upgrade.costParts,
)

function buy() {
  store.buyUpgrade(props.upgrade.id)
}
</script>

<template>
  <!-- Purchased state -->
  <div
    v-if="purchased"
    class="flex items-start gap-2 p-3 rounded-xl border border-green-800/40 bg-slate-800/30"
  >
    <span class="text-2xl shrink-0 opacity-60">{{ upgrade.emoji }}</span>
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <span class="font-semibold text-slate-400 text-sm">{{ upgrade.name }}</span>
        <span class="text-xs bg-green-900/50 text-green-400 font-bold px-2 py-0.5 rounded-full border border-green-700/40">
          ✓ Owned
        </span>
      </div>
      <div class="text-slate-600 text-xs mt-0.5">{{ upgrade.description }}</div>
    </div>
  </div>

  <!-- Available (not yet purchased) state -->
  <div
    v-else
    class="flex flex-col gap-2 p-3 rounded-xl border transition-colors"
    :class="canAfford
      ? 'bg-slate-800 border-slate-600 hover:border-cyan-500/50 animate-upgrade-glow'
      : 'bg-slate-800/50 border-slate-700 opacity-60'"
  >
    <div class="flex items-start gap-2">
      <span class="text-2xl shrink-0">{{ upgrade.emoji }}</span>
      <div class="flex-1 min-w-0">
        <div class="font-semibold text-white text-sm">{{ upgrade.name }}</div>
        <div class="text-slate-400 text-sm mt-0.5">{{ upgrade.description }}</div>
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
