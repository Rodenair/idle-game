<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const visibleBots = computed(() => Math.min(store.autoClickRate, 5))

// Bots on left side vs right side
const leftBots = computed(() => Math.ceil(visibleBots.value / 2))
const rightBots = computed(() => Math.floor(visibleBots.value / 2))
</script>

<template>
  <div v-if="visibleBots > 0" class="flex items-end justify-between w-full px-2 pointer-events-none" style="height:80px">
    <!-- Left-side bots -->
    <div class="flex items-end gap-1">
      <div
        v-for="i in leftBots"
        :key="`L${i}`"
        class="animate-bot-attack-l drop-shadow-lg"
        :style="{ animationDelay: `${(i - 1) * (1000 / visibleBots)}ms`, animationDuration: '1s' }"
      >
        <svg viewBox="0 0 40 56" class="w-9 h-12" xmlns="http://www.w3.org/2000/svg">
          <!-- Bot body -->
          <ellipse cx="20" cy="54" rx="14" ry="3" fill="#000" opacity="0.2"/>
          <!-- Antenna -->
          <line x1="20" y1="5" x2="20" y2="1" stroke="#64748b" stroke-width="1.5"/>
          <circle cx="20" cy="1" r="2" fill="#06b6d4"/>
          <!-- Head -->
          <rect x="7" y="5" width="26" height="20" rx="5" fill="#1e293b"/>
          <rect x="9" y="7" width="22" height="16" rx="4" fill="#0f172a"/>
          <!-- Visor -->
          <rect x="10" y="10" width="20" height="8" rx="2" fill="#082f49"/>
          <!-- Eyes -->
          <circle cx="16" cy="14" r="3" fill="#0e7490"/>
          <circle cx="16" cy="14" r="2" fill="#06b6d4"/>
          <circle cx="16" cy="14" r="1" fill="#e0f2fe"/>
          <circle cx="24" cy="14" r="3" fill="#0e7490"/>
          <circle cx="24" cy="14" r="2" fill="#06b6d4"/>
          <circle cx="24" cy="14" r="1" fill="#e0f2fe"/>
          <!-- Mouth LED -->
          <rect x="12" y="20" width="16" height="3" rx="1.5" fill="#0f172a"/>
          <rect x="13" y="21" width="4" height="1.5" rx="0.75" fill="#06b6d4"/>
          <rect x="19" y="21" width="4" height="1.5" rx="0.75" fill="#06b6d4"/>
          <rect x="25" y="21" width="2" height="1.5" rx="0.75" fill="#0e7490"/>
          <!-- Body -->
          <rect x="9" y="26" width="22" height="18" rx="4" fill="#1e293b"/>
          <rect x="12" y="29" width="16" height="10" rx="2" fill="#0f172a"/>
          <!-- Energy core -->
          <circle cx="20" cy="34" r="3.5" fill="#0e7490"/>
          <circle cx="20" cy="34" r="2" fill="#06b6d4"/>
          <!-- Vents -->
          <rect x="12" y="40" width="5" height="2" rx="1" fill="#334155"/>
          <rect x="20" y="40" width="5" height="2" rx="1" fill="#334155"/>
          <!-- Left shoulder joint -->
          <circle cx="9" cy="27" r="3" fill="#334155"/>
          <!-- Right shoulder joint -->
          <circle cx="31" cy="27" r="3" fill="#334155"/>
          <!-- Left arm -->
          <rect x="2" y="26" width="8" height="13" rx="3" fill="#334155"/>
          <!-- Right arm (punch arm - extended) -->
          <rect x="30" y="26" width="9" height="13" rx="3" fill="#334155"/>
          <!-- Right fist -->
          <rect x="30" y="36" width="11" height="9" rx="3" fill="#475569"/>
          <!-- Left fist -->
          <rect x="1" y="36" width="9" height="9" rx="3" fill="#475569"/>
          <!-- Legs -->
          <rect x="12" y="44" width="7" height="10" rx="3" fill="#334155"/>
          <rect x="21" y="44" width="7" height="10" rx="3" fill="#334155"/>
          <!-- Feet -->
          <rect x="11" y="51" width="9" height="5" rx="2" fill="#475569"/>
          <rect x="20" y="51" width="9" height="5" rx="2" fill="#475569"/>
        </svg>
      </div>
    </div>

    <!-- Right-side bots (mirrored, attack left) -->
    <div class="flex items-end gap-1">
      <div
        v-for="i in rightBots"
        :key="`R${i}`"
        class="animate-bot-attack-r drop-shadow-lg"
        :style="{ animationDelay: `${(leftBots + i - 1) * (1000 / visibleBots)}ms`, animationDuration: '1s' }"
      >
        <svg viewBox="0 0 40 56" class="w-9 h-12" style="transform: scaleX(-1)" xmlns="http://www.w3.org/2000/svg">
          <!-- Bot body (same SVG, mirrored via CSS scaleX) -->
          <ellipse cx="20" cy="54" rx="14" ry="3" fill="#000" opacity="0.2"/>
          <line x1="20" y1="5" x2="20" y2="1" stroke="#64748b" stroke-width="1.5"/>
          <circle cx="20" cy="1" r="2" fill="#f59e0b"/>
          <rect x="7" y="5" width="26" height="20" rx="5" fill="#1e293b"/>
          <rect x="9" y="7" width="22" height="16" rx="4" fill="#0f172a"/>
          <rect x="10" y="10" width="20" height="8" rx="2" fill="#082f49"/>
          <circle cx="16" cy="14" r="3" fill="#92400e"/>
          <circle cx="16" cy="14" r="2" fill="#f59e0b"/>
          <circle cx="16" cy="14" r="1" fill="#fef9c3"/>
          <circle cx="24" cy="14" r="3" fill="#92400e"/>
          <circle cx="24" cy="14" r="2" fill="#f59e0b"/>
          <circle cx="24" cy="14" r="1" fill="#fef9c3"/>
          <rect x="12" y="20" width="16" height="3" rx="1.5" fill="#0f172a"/>
          <rect x="13" y="21" width="4" height="1.5" rx="0.75" fill="#f59e0b"/>
          <rect x="19" y="21" width="4" height="1.5" rx="0.75" fill="#f59e0b"/>
          <rect x="25" y="21" width="2" height="1.5" rx="0.75" fill="#92400e"/>
          <rect x="9" y="26" width="22" height="18" rx="4" fill="#1e293b"/>
          <rect x="12" y="29" width="16" height="10" rx="2" fill="#0f172a"/>
          <circle cx="20" cy="34" r="3.5" fill="#92400e"/>
          <circle cx="20" cy="34" r="2" fill="#f59e0b"/>
          <rect x="12" y="40" width="5" height="2" rx="1" fill="#334155"/>
          <rect x="20" y="40" width="5" height="2" rx="1" fill="#334155"/>
          <circle cx="9" cy="27" r="3" fill="#334155"/>
          <circle cx="31" cy="27" r="3" fill="#334155"/>
          <rect x="2" y="26" width="8" height="13" rx="3" fill="#334155"/>
          <rect x="30" y="26" width="9" height="13" rx="3" fill="#334155"/>
          <rect x="30" y="36" width="11" height="9" rx="3" fill="#475569"/>
          <rect x="1" y="36" width="9" height="9" rx="3" fill="#475569"/>
          <rect x="12" y="44" width="7" height="10" rx="3" fill="#334155"/>
          <rect x="21" y="44" width="7" height="10" rx="3" fill="#334155"/>
          <rect x="11" y="51" width="9" height="5" rx="2" fill="#475569"/>
          <rect x="20" y="51" width="9" height="5" rx="2" fill="#475569"/>
        </svg>
      </div>
    </div>
  </div>
</template>
