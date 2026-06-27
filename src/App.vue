<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useGameLoop } from '@/composables/useGameLoop'
import { useSave } from '@/composables/useSave'
import GameHeader from '@/components/GameHeader.vue'
import ClickArea from '@/components/ClickArea.vue'
import BuildingsPanel from '@/components/BuildingsPanel.vue'
import UpgradesPanel from '@/components/UpgradesPanel.vue'

type Tab = 'fight' | 'build' | 'upgrade'

const activeTab = ref<Tab>('fight')

const tabs: { id: Tab; emoji: string; label: string }[] = [
  { id: 'fight',   emoji: '⚔️',  label: 'Fight' },
  { id: 'build',   emoji: '🏭',  label: 'Build' },
  { id: 'upgrade', emoji: '⬆️', label: 'Upgrade' },
]

const store = useGameStore()
useGameLoop()
const { save } = useSave()

onMounted(() => {
  store.initGame()
})

function confirmReset() {
  if (confirm('Reset all progress? This cannot be undone.')) {
    store.resetGame()
    save()
  }
}
</script>

<template>
  <div class="flex flex-col h-full bg-slate-900 text-white max-w-lg mx-auto">
    <!-- Fixed top header -->
    <GameHeader />

    <!-- Scrollable content -->
    <main class="flex-1 overflow-y-auto overscroll-contain">
      <ClickArea v-if="activeTab === 'fight'" />
      <BuildingsPanel v-if="activeTab === 'build'" />
      <UpgradesPanel v-if="activeTab === 'upgrade'" />
    </main>

    <!-- Fixed bottom tab bar -->
    <nav class="flex shrink-0 border-t border-slate-700 bg-slate-800">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="flex-1 flex flex-col items-center justify-center py-2.5 gap-0.5 text-xs font-medium transition-colors active:bg-slate-700/50"
        :class="activeTab === tab.id
          ? 'text-amber-400 border-t-2 border-amber-400 -mt-px'
          : 'text-slate-400 hover:text-slate-200'"
        @click="activeTab = tab.id"
      >
        <span class="text-lg leading-none">{{ tab.emoji }}</span>
        <span>{{ tab.label }}</span>
      </button>
    </nav>

    <!-- Hidden reset button (long-press debug) -->
    <button
      class="absolute bottom-20 right-3 text-slate-700 text-xs"
      @dblclick="confirmReset"
      title="Double-click to reset"
    >
      ⚙
    </button>
  </div>
</template>
