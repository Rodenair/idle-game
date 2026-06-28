<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { BUILDINGS } from '@/data/buildings'

const store = useGameStore()

const totalBuildings = computed(() =>
  BUILDINGS.reduce((s, b) => s + (store.buildingCounts[b.id] ?? 0), 0)
)
</script>

<template>
  <div class="mx-3 mb-3 rounded-xl overflow-hidden border border-slate-700 bg-slate-900">
    <!-- Map header -->
    <div class="flex items-center justify-between px-3 py-2 bg-slate-800 border-b border-slate-700">
      <span class="text-xs font-bold text-slate-300 tracking-wide uppercase">Base Facility</span>
      <span class="text-xs text-slate-500 tabular-nums">{{ totalBuildings }} structure{{ totalBuildings !== 1 ? 's' : '' }}</span>
    </div>

    <!-- Empty state -->
    <div v-if="totalBuildings === 0" class="flex flex-col items-center justify-center py-8 gap-2 text-slate-600">
      <svg viewBox="0 0 60 60" class="w-14 h-14 opacity-30" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="30" width="40" height="25" rx="4" fill="currentColor"/>
        <rect x="20" y="20" width="20" height="35" rx="3" fill="currentColor" opacity="0.7"/>
        <rect x="27" y="10" width="6" height="15" rx="2" fill="currentColor" opacity="0.5"/>
      </svg>
      <span class="text-xs">Buy buildings to build your base</span>
    </div>

    <!-- Map grid -->
    <div v-else class="relative p-3" style="background: radial-gradient(ellipse at 50% 100%, #1e293b 0%, #0f172a 70%)">
      <!-- Ground grid lines -->
      <svg class="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mapgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#94a3b8" stroke-width="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mapgrid)"/>
      </svg>

      <div class="relative grid grid-cols-3 gap-3 z-10">
        <div
          v-for="building in BUILDINGS"
          :key="building.id"
          class="flex flex-col items-center gap-1.5"
          :class="(store.buildingCounts[building.id] ?? 0) === 0 ? 'opacity-20' : ''"
        >
          <!-- Building sprite SVG -->
          <div class="relative">
            <!-- Scrap Heap -->
            <svg v-if="building.id === 'scrap_heap'" viewBox="0 0 56 48" class="w-16 h-14 drop-shadow-md animate-map-building" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="28" cy="44" rx="22" ry="5" fill="#000" opacity="0.25"/>
              <ellipse cx="28" cy="32" rx="20" ry="14" fill="#44403c"/>
              <ellipse cx="28" cy="30" rx="16" ry="11" fill="#57534e"/>
              <rect x="14" y="22" width="10" height="4" rx="1" fill="#94a3b8" transform="rotate(-25 19 24)"/>
              <rect x="30" y="24" width="8" height="3" rx="1" fill="#64748b" transform="rotate(15 34 25)"/>
              <rect x="22" y="19" width="6" height="2.5" rx="1" fill="#78716c" transform="rotate(-10 25 20)"/>
              <circle cx="18" cy="28" r="4" fill="#6b7280" opacity="0.6"/>
              <circle cx="36" cy="26" r="3.5" fill="#6b7280" opacity="0.6"/>
              <circle cx="28" cy="24" r="3" fill="#9ca3af" opacity="0.4"/>
              <rect x="20" y="28" width="6" height="2" rx="1" fill="#94a3b8" transform="rotate(5 23 29)"/>
              <rect x="32" y="30" width="5" height="2" rx="1" fill="#78716c" transform="rotate(-20 34 31)"/>
            </svg>

            <!-- Robot Factory -->
            <svg v-else-if="building.id === 'robot_factory'" viewBox="0 0 56 52" class="w-16 h-14 drop-shadow-md animate-map-building" style="animation-delay:0.4s" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="28" cy="49" rx="22" ry="4" fill="#000" opacity="0.25"/>
              <!-- Chimneys -->
              <rect x="12" y="12" width="8" height="24" rx="2" fill="#374151"/>
              <rect x="36" y="8" width="8" height="28" rx="2" fill="#374151"/>
              <!-- Smoke puffs -->
              <circle cx="16" cy="10" r="4" fill="#6b7280" opacity="0.5"/>
              <circle cx="14" cy="7" r="3" fill="#9ca3af" opacity="0.3"/>
              <circle cx="40" cy="6" r="4" fill="#6b7280" opacity="0.5"/>
              <circle cx="42" cy="3" r="3" fill="#9ca3af" opacity="0.3"/>
              <!-- Main building -->
              <rect x="8" y="28" width="40" height="22" rx="3" fill="#1e293b"/>
              <rect x="10" y="30" width="36" height="18" rx="2" fill="#0f172a"/>
              <!-- Windows -->
              <rect x="13" y="33" width="8" height="7" rx="1.5" fill="#082f49"/>
              <rect x="14" y="34" width="6" height="5" rx="1" fill="#06b6d4" opacity="0.7"/>
              <rect x="35" y="33" width="8" height="7" rx="1.5" fill="#082f49"/>
              <rect x="36" y="34" width="6" height="5" rx="1" fill="#06b6d4" opacity="0.7"/>
              <!-- Door -->
              <rect x="24" y="37" width="8" height="11" rx="1.5" fill="#082f49"/>
              <circle cx="30" cy="42" r="1" fill="#06b6d4" opacity="0.6"/>
              <!-- Roof detail -->
              <rect x="8" y="26" width="40" height="4" rx="2" fill="#334155"/>
            </svg>

            <!-- Research Lab -->
            <svg v-else-if="building.id === 'research_lab'" viewBox="0 0 56 52" class="w-16 h-14 drop-shadow-md animate-map-building" style="animation-delay:0.8s" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="28" cy="49" rx="22" ry="4" fill="#000" opacity="0.25"/>
              <!-- Antenna -->
              <line x1="28" y1="8" x2="28" y2="2" stroke="#94a3b8" stroke-width="1.5"/>
              <circle cx="28" cy="2" r="2" fill="#06b6d4"/>
              <line x1="22" y1="5" x2="28" y2="8" stroke="#64748b" stroke-width="1"/>
              <line x1="34" y1="5" x2="28" y2="8" stroke="#64748b" stroke-width="1"/>
              <!-- Dome top -->
              <ellipse cx="28" cy="24" rx="18" ry="16" fill="#1e3a5f"/>
              <ellipse cx="28" cy="22" rx="15" ry="13" fill="#1e40af"/>
              <ellipse cx="28" cy="20" rx="11" ry="9" fill="#1d4ed8" opacity="0.8"/>
              <!-- Dome shine -->
              <ellipse cx="24" cy="17" rx="5" ry="3" fill="#93c5fd" opacity="0.3"/>
              <!-- Base ring -->
              <rect x="10" y="36" width="36" height="14" rx="3" fill="#1e293b"/>
              <rect x="12" y="38" width="32" height="10" rx="2" fill="#0f172a"/>
              <!-- Base windows -->
              <rect x="14" y="40" width="6" height="6" rx="1" fill="#082f49"/>
              <rect x="15" y="41" width="4" height="4" rx="0.5" fill="#38bdf8" opacity="0.5"/>
              <rect x="36" y="40" width="6" height="6" rx="1" fill="#082f49"/>
              <rect x="37" y="41" width="4" height="4" rx="0.5" fill="#38bdf8" opacity="0.5"/>
              <!-- Door -->
              <rect x="25" y="42" width="6" height="8" rx="1" fill="#082f49"/>
            </svg>

            <!-- Monster Trap -->
            <svg v-else-if="building.id === 'monster_trap'" viewBox="0 0 56 52" class="w-16 h-14 drop-shadow-md animate-map-building" style="animation-delay:1.2s" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="28" cy="49" rx="20" ry="4" fill="#000" opacity="0.25"/>
              <!-- Cage base -->
              <rect x="10" y="30" width="36" height="20" rx="3" fill="#292524"/>
              <!-- Cage bars vertical -->
              <line x1="16" y1="30" x2="16" y2="50" stroke="#78716c" stroke-width="2.5"/>
              <line x1="22" y1="30" x2="22" y2="50" stroke="#78716c" stroke-width="2.5"/>
              <line x1="28" y1="30" x2="28" y2="50" stroke="#78716c" stroke-width="2.5"/>
              <line x1="34" y1="30" x2="34" y2="50" stroke="#78716c" stroke-width="2.5"/>
              <line x1="40" y1="30" x2="40" y2="50" stroke="#78716c" stroke-width="2.5"/>
              <!-- Cage bars horizontal -->
              <line x1="10" y1="36" x2="46" y2="36" stroke="#57534e" stroke-width="1.5"/>
              <line x1="10" y1="42" x2="46" y2="42" stroke="#57534e" stroke-width="1.5"/>
              <!-- Cage border -->
              <rect x="10" y="30" width="36" height="20" rx="3" fill="none" stroke="#92400e" stroke-width="2"/>
              <!-- Top frame / lid -->
              <rect x="8" y="26" width="40" height="6" rx="2" fill="#78350f"/>
              <!-- Spike teeth on lid -->
              <polygon points="12,26 15,18 18,26" fill="#92400e"/>
              <polygon points="20,26 23,18 26,26" fill="#92400e"/>
              <polygon points="28,26 31,18 34,26" fill="#92400e"/>
              <polygon points="36,26 39,18 42,26" fill="#92400e"/>
              <!-- Warning light -->
              <circle cx="28" cy="14" r="5" fill="#fef08a" opacity="0.4"/>
              <circle cx="28" cy="14" r="3" fill="#f59e0b"/>
              <!-- Captured monster eyes glowing in cage -->
              <circle cx="24" cy="40" r="2" fill="#ef4444" opacity="0.7"/>
              <circle cx="32" cy="40" r="2" fill="#ef4444" opacity="0.7"/>
            </svg>

            <!-- Mega Forge -->
            <svg v-else-if="building.id === 'mega_forge'" viewBox="0 0 56 52" class="w-16 h-14 drop-shadow-md animate-map-building" style="animation-delay:1.6s" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="28" cy="49" rx="24" ry="4" fill="#000" opacity="0.3"/>
              <!-- Main forge body -->
              <rect x="6" y="20" width="44" height="30" rx="4" fill="#1c1917"/>
              <rect x="8" y="22" width="40" height="26" rx="3" fill="#292524"/>
              <!-- Forge mouth / opening -->
              <rect x="14" y="30" width="28" height="16" rx="3" fill="#0c0a09"/>
              <!-- Fire glow inside -->
              <ellipse cx="28" cy="46" rx="12" ry="5" fill="#f97316" opacity="0.6"/>
              <ellipse cx="28" cy="43" rx="8" ry="5" fill="#fbbf24" opacity="0.5"/>
              <ellipse cx="28" cy="40" rx="5" ry="4" fill="#fef08a" opacity="0.4"/>
              <!-- Fire tongues -->
              <path d="M22 38 Q24 30 26 36 Q27 28 28 35 Q29 28 30 36 Q32 30 34 38" fill="#f97316" opacity="0.7"/>
              <!-- Chimneys -->
              <rect x="10" y="8" width="7" height="14" rx="2" fill="#292524"/>
              <rect x="39" y="6" width="7" height="16" rx="2" fill="#292524"/>
              <!-- Smoke puffs (amber/orange for forge) -->
              <circle cx="13" cy="6" r="4" fill="#f97316" opacity="0.35"/>
              <circle cx="11" cy="3" r="3" fill="#fbbf24" opacity="0.2"/>
              <circle cx="42" cy="4" r="4" fill="#f97316" opacity="0.35"/>
              <circle cx="44" cy="1" r="3" fill="#fbbf24" opacity="0.2"/>
              <!-- Side panels -->
              <rect x="8" y="22" width="5" height="8" rx="1" fill="#44403c"/>
              <rect x="43" y="22" width="5" height="8" rx="1" fill="#44403c"/>
              <!-- Bolts -->
              <circle cx="11" cy="24" r="1.5" fill="#78716c"/>
              <circle cx="11" cy="28" r="1.5" fill="#78716c"/>
              <circle cx="45" cy="24" r="1.5" fill="#78716c"/>
              <circle cx="45" cy="28" r="1.5" fill="#78716c"/>
            </svg>

            <!-- Count badge -->
            <div
              v-if="(store.buildingCounts[building.id] ?? 0) > 0"
              class="absolute -top-1 -right-1 bg-amber-500 text-slate-900 text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none shadow"
            >
              {{ store.buildingCounts[building.id] }}
            </div>
          </div>

          <!-- Building name -->
          <span class="text-xs text-slate-400 text-center leading-tight font-medium">{{ building.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
