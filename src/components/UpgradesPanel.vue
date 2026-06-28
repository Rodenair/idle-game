<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { UPGRADES } from '@/data/upgrades'
import UpgradeCard from './UpgradeCard.vue'

const store = useGameStore()

const purchasedUpgrades = computed(() =>
  UPGRADES.filter(u => store.purchasedUpgradeIds.has(u.id))
)

const availableUpgrades = computed(() => store.availableUpgrades)

const hasAnything = computed(() =>
  purchasedUpgrades.value.length > 0 || availableUpgrades.value.length > 0
)
</script>

<template>
  <div class="flex flex-col gap-2 p-3">
    <!-- Empty state: nothing purchased and nothing unlocked -->
    <div v-if="!hasAnything" class="flex flex-col items-center justify-center py-16 gap-3 text-slate-500">
      <div class="text-5xl">🔒</div>
      <div class="text-sm text-center">
        Defeat monsters and buy buildings<br />to unlock upgrades!
      </div>
    </div>

    <!-- Available (unpurchased) upgrades -->
    <template v-if="availableUpgrades.length > 0">
      <div class="text-xs font-bold text-slate-400 uppercase tracking-wide px-1">
        Available
      </div>
      <UpgradeCard
        v-for="upgrade in availableUpgrades"
        :key="upgrade.id"
        :upgrade="upgrade"
        :purchased="false"
      />
    </template>

    <!-- Purchased upgrades section -->
    <template v-if="purchasedUpgrades.length > 0">
      <div class="text-xs font-bold text-slate-500 uppercase tracking-wide px-1 mt-2">
        Owned ({{ purchasedUpgrades.length }})
      </div>
      <UpgradeCard
        v-for="upgrade in purchasedUpgrades"
        :key="upgrade.id"
        :upgrade="upgrade"
        :purchased="true"
      />
    </template>
  </div>
</template>
