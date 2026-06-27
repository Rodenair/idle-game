<script setup lang="ts">
import { useGameStore } from '@/stores/gameStore'
import UpgradeCard from './UpgradeCard.vue'

const store = useGameStore()
</script>

<template>
  <div class="flex flex-col gap-2 p-3">
    <div v-if="store.availableUpgrades.length === 0" class="flex flex-col items-center justify-center py-16 gap-3 text-slate-500">
      <div class="text-5xl">🔒</div>
      <div class="text-sm text-center">
        Defeat monsters and buy buildings<br />to unlock upgrades!
      </div>
    </div>

    <UpgradeCard
      v-for="upgrade in store.availableUpgrades"
      :key="upgrade.id"
      :upgrade="upgrade"
    />
  </div>
</template>
