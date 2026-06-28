<script setup lang="ts">
import { computed, watch, ref } from 'vue'

const props = defineProps<{
  monsterId: string
  hpPercent: number
  hitSignal: number
}>()

const isHit = ref(false)
let hitTimer: ReturnType<typeof setTimeout> | null = null

watch(() => props.hitSignal, () => {
  if (hitTimer) clearTimeout(hitTimer)
  isHit.value = true
  hitTimer = setTimeout(() => { isHit.value = false }, 180)
})

const stage = computed(() => {
  if (props.hpPercent > 75) return 0
  if (props.hpPercent > 50) return 1
  if (props.hpPercent > 25) return 2
  return 3
})
</script>

<template>
  <div class="relative select-none" :class="{ 'animate-monster-shake': isHit }">
    <svg
      viewBox="0 0 100 120"
      class="w-40 h-48 drop-shadow-2xl"
      :class="[
        stage === 0 ? 'sprite-healthy' : '',
        stage === 1 ? 'sprite-hurt' : '',
        stage === 2 ? 'sprite-damaged' : '',
        stage === 3 ? 'sprite-critical' : '',
        isHit ? 'sprite-hit' : '',
      ]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- ═══ RUST GOBLIN ═══ -->
      <g v-if="monsterId === 'rust_goblin'">
        <ellipse cx="50" cy="117" rx="28" ry="5" fill="#000" opacity="0.2"/>
        <polygon points="24,62 13,22 37,52" fill="#15803d"/>
        <polygon points="76,62 87,22 63,52" fill="#15803d"/>
        <polygon points="24,59 18,28 35,50" fill="#bbf7d0" opacity="0.25"/>
        <polygon points="76,59 82,28 65,50" fill="#bbf7d0" opacity="0.25"/>
        <ellipse cx="50" cy="56" rx="28" ry="28" fill="#4ade80"/>
        <ellipse cx="38" cy="50" rx="8" ry="9" fill="#052e16"/>
        <ellipse cx="62" cy="50" rx="8" ry="9" fill="#052e16"/>
        <ellipse cx="38" cy="50" rx="5.5" ry="6.5" fill="#ef4444"/>
        <ellipse cx="62" cy="50" rx="5.5" ry="6.5" fill="#ef4444"/>
        <circle cx="39" cy="47" r="2" fill="#fca5a5" opacity="0.7"/>
        <circle cx="63" cy="47" r="2" fill="#fca5a5" opacity="0.7"/>
        <ellipse cx="50" cy="61" rx="5" ry="3" fill="#16a34a"/>
        <path d="M37 69 Q50 78 63 69" fill="#052e16"/>
        <rect x="41" y="68" width="5" height="7" rx="1.5" fill="#f0fdf4"/>
        <rect x="48" y="68" width="5" height="8" rx="1.5" fill="#f0fdf4"/>
        <rect x="55" y="68" width="5" height="7" rx="1.5" fill="#f0fdf4"/>
        <ellipse cx="50" cy="97" rx="24" ry="26" fill="#22c55e"/>
        <ellipse cx="23" cy="93" rx="8" ry="13" transform="rotate(-20 23 93)" fill="#4ade80"/>
        <ellipse cx="77" cy="93" rx="8" ry="13" transform="rotate(20 77 93)" fill="#4ade80"/>
        <path d="M13 102 L8 110 M15 108 L9 114 M17 113 L12 119" stroke="#15803d" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M87 102 L92 110 M85 108 L91 114 M83 113 L88 119" stroke="#15803d" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <rect x="38" y="114" width="11" height="10" rx="4" fill="#15803d"/>
        <rect x="51" y="114" width="11" height="10" rx="4" fill="#15803d"/>
        <ellipse cx="44" cy="91" rx="6" ry="5" fill="#78350f" opacity="0.5"/>
        <ellipse cx="62" cy="101" rx="5" ry="4" fill="#78350f" opacity="0.5"/>
        <circle cx="54" cy="83" r="3" fill="#78350f" opacity="0.45"/>
      </g>

      <!-- ═══ GLITCH BOT ═══ -->
      <g v-if="monsterId === 'glitch_bot'">
        <ellipse cx="50" cy="117" rx="26" ry="5" fill="#000" opacity="0.25"/>
        <line x1="50" y1="8" x2="50" y2="2" stroke="#64748b" stroke-width="2.5"/>
        <circle cx="50" cy="1" r="3" fill="#06b6d4"/>
        <rect x="20" y="8" width="60" height="46" rx="7" fill="#1e293b"/>
        <rect x="22" y="10" width="56" height="42" rx="6" fill="none" stroke="#475569" stroke-width="1"/>
        <rect x="26" y="17" width="48" height="22" rx="4" fill="#082f49"/>
        <ellipse cx="39" cy="28" rx="8" ry="7" fill="#0e7490"/>
        <ellipse cx="39" cy="28" rx="5.5" ry="5" fill="#06b6d4"/>
        <circle cx="39" cy="28" r="2.5" fill="#e0f2fe"/>
        <ellipse cx="61" cy="28" rx="8" ry="7" fill="#0e7490"/>
        <ellipse cx="61" cy="28" rx="5.5" ry="5" fill="#06b6d4"/>
        <circle cx="61" cy="28" r="2.5" fill="#e0f2fe"/>
        <line x1="26" y1="23" x2="36" y2="23" stroke="#38bdf8" stroke-width="1" opacity="0.5"/>
        <line x1="64" y1="32" x2="74" y2="32" stroke="#38bdf8" stroke-width="1" opacity="0.5"/>
        <rect x="28" y="44" width="44" height="8" rx="2.5" fill="#0f172a"/>
        <rect x="32" y="45" width="6" height="6" rx="1" fill="#1e293b"/>
        <rect x="42" y="45" width="6" height="6" rx="1" fill="#1e293b"/>
        <rect x="52" y="45" width="6" height="6" rx="1" fill="#1e293b"/>
        <rect x="62" y="45" width="6" height="6" rx="1" fill="#1e293b"/>
        <rect x="22" y="56" width="56" height="46" rx="7" fill="#1e293b"/>
        <rect x="27" y="62" width="46" height="28" rx="5" fill="#0f172a"/>
        <circle cx="50" cy="76" r="8" fill="#082f49"/>
        <circle cx="50" cy="76" r="5.5" fill="#0e7490"/>
        <circle cx="50" cy="76" r="3" fill="#06b6d4"/>
        <rect x="29" y="93" width="8" height="4" rx="1.5" fill="#334155"/>
        <rect x="41" y="93" width="8" height="4" rx="1.5" fill="#334155"/>
        <rect x="53" y="93" width="8" height="4" rx="1.5" fill="#334155"/>
        <circle cx="22" cy="59" r="5" fill="#475569"/>
        <circle cx="78" cy="59" r="5" fill="#475569"/>
        <rect x="7" y="58" width="16" height="32" rx="5" fill="#334155"/>
        <rect x="77" y="58" width="16" height="32" rx="5" fill="#334155"/>
        <line x1="10" y1="68" x2="22" y2="68" stroke="#475569" stroke-width="1.5"/>
        <line x1="78" y1="68" x2="90" y2="68" stroke="#475569" stroke-width="1.5"/>
        <rect x="6" y="87" width="18" height="13" rx="4" fill="#475569"/>
        <rect x="76" y="87" width="18" height="13" rx="4" fill="#475569"/>
        <rect x="31" y="102" width="15" height="18" rx="4" fill="#334155"/>
        <rect x="54" y="102" width="15" height="18" rx="4" fill="#334155"/>
        <rect x="29" y="114" width="17" height="6" rx="2" fill="#475569"/>
        <rect x="52" y="114" width="17" height="6" rx="2" fill="#475569"/>
      </g>

      <!-- ═══ SCRAP GOLEM ═══ -->
      <g v-if="monsterId === 'scrap_golem'">
        <ellipse cx="50" cy="117" rx="35" ry="5" fill="#000" opacity="0.3"/>
        <ellipse cx="50" cy="85" rx="37" ry="36" fill="#57534e"/>
        <ellipse cx="50" cy="47" rx="30" ry="27" fill="#78716c"/>
        <ellipse cx="50" cy="45" rx="26" ry="23" fill="#57534e"/>
        <circle cx="36" cy="50" r="7" fill="#78716c"/>
        <circle cx="66" cy="46" r="6" fill="#78716c"/>
        <circle cx="42" cy="75" r="9" fill="#78716c"/>
        <circle cx="63" cy="79" r="8" fill="#78716c"/>
        <circle cx="36" cy="94" r="7" fill="#78716c"/>
        <circle cx="64" cy="96" r="7" fill="#78716c"/>
        <rect x="28" y="58" width="12" height="4" rx="1" fill="#94a3b8" transform="rotate(-25 34 60)"/>
        <rect x="58" y="52" width="10" height="3" rx="1" fill="#94a3b8" transform="rotate(15 63 53)"/>
        <rect x="40" y="84" width="14" height="4" rx="1" fill="#94a3b8" transform="rotate(5 47 86)"/>
        <rect x="20" y="86" width="9" height="3" rx="1" fill="#64748b" transform="rotate(-40 24 87)"/>
        <rect x="64" y="91" width="10" height="3" rx="1" fill="#64748b" transform="rotate(20 69 92)"/>
        <ellipse cx="38" cy="41" rx="8" ry="9" fill="#1c1917"/>
        <ellipse cx="62" cy="41" rx="8" ry="9" fill="#1c1917"/>
        <ellipse cx="38" cy="41" rx="5.5" ry="6.5" fill="#fbbf24"/>
        <ellipse cx="62" cy="41" rx="5.5" ry="6.5" fill="#fbbf24"/>
        <ellipse cx="38" cy="39" rx="2.5" ry="3" fill="#fef9c3"/>
        <ellipse cx="62" cy="39" rx="2.5" ry="3" fill="#fef9c3"/>
        <path d="M34 57 L37 61 L40 58 L43 62 L46 58 L49 62 L52 58 L55 61 L58 57 L61 61 L64 57" stroke="#1c1917" stroke-width="2" fill="none" stroke-linecap="round"/>
        <ellipse cx="12" cy="87" rx="14" ry="20" fill="#57534e"/>
        <ellipse cx="88" cy="87" rx="14" ry="20" fill="#57534e"/>
        <circle cx="10" cy="82" r="5" fill="#78716c"/>
        <circle cx="90" cy="83" r="5" fill="#78716c"/>
        <rect x="4" y="90" width="9" height="3" rx="1" fill="#94a3b8" transform="rotate(-30 8 91)"/>
        <rect x="85" y="86" width="9" height="3" rx="1" fill="#94a3b8" transform="rotate(30 89 87)"/>
        <ellipse cx="39" cy="111" rx="13" ry="9" fill="#44403c"/>
        <ellipse cx="61" cy="111" rx="13" ry="9" fill="#44403c"/>
      </g>

      <!-- ═══ IRON TROLL ═══ -->
      <g v-if="monsterId === 'iron_troll'">
        <ellipse cx="50" cy="117" rx="31" ry="5" fill="#000" opacity="0.3"/>
        <ellipse cx="50" cy="32" rx="25" ry="24" fill="#374151"/>
        <rect x="28" y="20" width="44" height="24" rx="6" fill="#1f2937"/>
        <ellipse cx="38" cy="30" rx="7" ry="5.5" fill="#7f1d1d"/>
        <ellipse cx="62" cy="30" rx="7" ry="5.5" fill="#7f1d1d"/>
        <ellipse cx="38" cy="30" rx="4.5" ry="3.5" fill="#f97316"/>
        <ellipse cx="62" cy="30" rx="4.5" ry="3.5" fill="#f97316"/>
        <circle cx="39" cy="28" r="1.5" fill="#fed7aa" opacity="0.6"/>
        <circle cx="63" cy="28" r="1.5" fill="#fed7aa" opacity="0.6"/>
        <polygon points="37,10 33,2 41,8" fill="#6b7280"/>
        <polygon points="50,8 46,1 54,1" fill="#6b7280"/>
        <polygon points="63,10 59,8 67,2" fill="#6b7280"/>
        <rect x="30" y="44" width="40" height="12" rx="4" fill="#374151"/>
        <path d="M36 48 L40 53 L44 48 L48 54 L52 48 L56 53 L60 48 L64 48" stroke="#0f172a" stroke-width="2" fill="#0f172a" stroke-linecap="round"/>
        <rect x="18" y="56" width="64" height="50" rx="8" fill="#374151"/>
        <rect x="25" y="62" width="50" height="36" rx="6" fill="#1f2937"/>
        <polygon points="50,68 45,80 55,80" fill="#dc2626"/>
        <circle cx="50" cy="71" r="4" fill="#991b1b"/>
        <ellipse cx="13" cy="60" rx="12" ry="10" fill="#4b5563"/>
        <ellipse cx="87" cy="60" rx="12" ry="10" fill="#4b5563"/>
        <polygon points="7,53 3,46 11,50" fill="#9ca3af"/>
        <polygon points="93,53 97,46 89,50" fill="#9ca3af"/>
        <rect x="5" y="60" width="14" height="34" rx="5" fill="#374151"/>
        <rect x="81" y="60" width="14" height="34" rx="5" fill="#374151"/>
        <rect x="4" y="91" width="17" height="13" rx="4" fill="#4b5563"/>
        <rect x="79" y="91" width="17" height="13" rx="4" fill="#4b5563"/>
        <circle cx="8" cy="94" r="1.5" fill="#6b7280"/>
        <circle cx="12" cy="94" r="1.5" fill="#6b7280"/>
        <circle cx="84" cy="94" r="1.5" fill="#6b7280"/>
        <circle cx="88" cy="94" r="1.5" fill="#6b7280"/>
        <rect x="27" y="106" width="18" height="16" rx="5" fill="#374151"/>
        <rect x="55" y="106" width="18" height="16" rx="5" fill="#374151"/>
        <rect x="25" y="116" width="22" height="6" rx="3" fill="#4b5563"/>
        <rect x="53" y="116" width="22" height="6" rx="3" fill="#4b5563"/>
      </g>

      <!-- ═══ PLASMA WRAITH ═══ -->
      <g v-if="monsterId === 'plasma_wraith'">
        <ellipse cx="50" cy="117" rx="20" ry="4" fill="#7c3aed" opacity="0.3"/>
        <ellipse cx="50" cy="55" rx="32" ry="42" fill="#6d28d9" opacity="0.9"/>
        <ellipse cx="50" cy="40" rx="28" ry="32" fill="#7c3aed"/>
        <ellipse cx="50" cy="30" rx="22" ry="26" fill="#8b5cf6"/>
        <path d="M18 80 Q22 95 26 110 Q28 118 32 117" stroke="#6d28d9" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.7"/>
        <path d="M40 85 Q38 100 36 115 Q35 119 37 119" stroke="#7c3aed" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.7"/>
        <path d="M50 88 Q50 103 50 117" stroke="#8b5cf6" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.6"/>
        <path d="M60 85 Q62 100 64 115 Q65 119 63 119" stroke="#7c3aed" stroke-width="6" fill="none" stroke-linecap="round" opacity="0.7"/>
        <path d="M82 80 Q78 95 74 110 Q72 118 68 117" stroke="#6d28d9" stroke-width="8" fill="none" stroke-linecap="round" opacity="0.7"/>
        <ellipse cx="50" cy="28" rx="24" ry="22" fill="none" stroke="#c084fc" stroke-width="1.5" opacity="0.5"/>
        <ellipse cx="37" cy="28" rx="9" ry="10" fill="#2e1065"/>
        <ellipse cx="63" cy="28" rx="9" ry="10" fill="#2e1065"/>
        <ellipse cx="37" cy="28" rx="6.5" ry="7.5" fill="#e879f9"/>
        <ellipse cx="63" cy="28" rx="6.5" ry="7.5" fill="#e879f9"/>
        <ellipse cx="37" cy="26" rx="3" ry="3.5" fill="#fdf4ff"/>
        <ellipse cx="63" cy="26" rx="3" ry="3.5" fill="#fdf4ff"/>
        <path d="M38 44 Q50 52 62 44" stroke="#581c87" stroke-width="2" fill="none" stroke-linecap="round"/>
        <circle cx="42" cy="46" r="1.5" fill="#c084fc" opacity="0.8"/>
        <circle cx="50" cy="49" r="1.5" fill="#c084fc" opacity="0.8"/>
        <circle cx="58" cy="46" r="1.5" fill="#c084fc" opacity="0.8"/>
        <ellipse cx="50" cy="60" rx="18" ry="8" fill="#7c3aed" opacity="0.4"/>
        <circle cx="30" cy="55" r="4" fill="#a855f7" opacity="0.4"/>
        <circle cx="70" cy="58" r="5" fill="#a855f7" opacity="0.4"/>
        <circle cx="25" cy="68" r="3" fill="#c084fc" opacity="0.3"/>
        <circle cx="75" cy="64" r="3.5" fill="#c084fc" opacity="0.3"/>
      </g>

      <!-- ═══ CHROME DRAKE ═══ -->
      <g v-if="monsterId === 'chrome_drake'">
        <ellipse cx="50" cy="117" rx="30" ry="5" fill="#000" opacity="0.25"/>
        <polygon points="5,40 25,60 15,80" fill="#94a3b8" opacity="0.7"/>
        <polygon points="95,40 75,60 85,80" fill="#94a3b8" opacity="0.7"/>
        <polygon points="2,45 20,58 12,72" fill="#cbd5e1" opacity="0.5"/>
        <polygon points="98,45 80,58 88,72" fill="#cbd5e1" opacity="0.5"/>
        <ellipse cx="50" cy="80" rx="28" ry="36" fill="#64748b"/>
        <ellipse cx="50" cy="78" rx="24" ry="32" fill="#94a3b8"/>
        <path d="M30 70 L22 90 L26 88 L24 105 L30 100 L28 115" stroke="#64748b" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M70 70 L78 90 L74 88 L76 105 L70 100 L72 115" stroke="#64748b" stroke-width="6" fill="none" stroke-linecap="round"/>
        <ellipse cx="50" cy="40" rx="22" ry="26" fill="#64748b"/>
        <ellipse cx="50" cy="38" rx="18" ry="22" fill="#94a3b8"/>
        <path d="M36 16 L34 8 L38 14 L40 6 L44 14 L48 8 L50 16" fill="#64748b"/>
        <path d="M64 16 L66 8 L62 14 L60 6 L56 14 L52 8 L50 16" fill="#64748b"/>
        <ellipse cx="38" cy="34" rx="7" ry="7" fill="#1e293b"/>
        <ellipse cx="62" cy="34" rx="7" ry="7" fill="#1e293b"/>
        <ellipse cx="38" cy="34" rx="5" ry="5" fill="#f59e0b"/>
        <ellipse cx="62" cy="34" rx="5" ry="5" fill="#f59e0b"/>
        <circle cx="39" cy="32" r="2" fill="#fef3c7"/>
        <circle cx="63" cy="32" r="2" fill="#fef3c7"/>
        <path d="M40 50 L45 56 L50 52 L55 56 L60 50" stroke="#1e293b" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M42 55 L42 62 M47 57 L47 63 M53 57 L53 63 M58 55 L58 62" stroke="#e2e8f0" stroke-width="1.5" stroke-linecap="round"/>
        <rect x="36" y="64" width="6" height="3" rx="1" fill="#cbd5e1" opacity="0.6"/>
        <rect x="48" y="64" width="6" height="3" rx="1" fill="#cbd5e1" opacity="0.6"/>
        <rect x="60" y="64" width="6" height="3" rx="1" fill="#cbd5e1" opacity="0.6"/>
        <rect x="36" y="78" width="6" height="3" rx="1" fill="#cbd5e1" opacity="0.6"/>
        <rect x="48" y="78" width="6" height="3" rx="1" fill="#cbd5e1" opacity="0.6"/>
        <rect x="60" y="78" width="6" height="3" rx="1" fill="#cbd5e1" opacity="0.6"/>
        <path d="M50 52 Q65 50 72 44" stroke="#f59e0b" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.7"/>
      </g>

      <!-- ═══ VOID TITAN ═══ -->
      <g v-if="monsterId === 'void_titan'">
        <ellipse cx="50" cy="117" rx="32" ry="5" fill="#000" opacity="0.4"/>
        <ellipse cx="50" cy="85" rx="30" ry="35" fill="#0f172a"/>
        <ellipse cx="50" cy="83" rx="26" ry="31" fill="#1e1b4b"/>
        <path d="M5 70 Q14 75 20 85 Q14 90 5 92" stroke="#4c1d95" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/>
        <path d="M95 70 Q86 75 80 85 Q86 90 95 92" stroke="#4c1d95" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.8"/>
        <path d="M8 55 Q18 63 22 78" stroke="#6d28d9" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>
        <path d="M92 55 Q82 63 78 78" stroke="#6d28d9" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.6"/>
        <ellipse cx="50" cy="40" rx="26" ry="30" fill="#0f172a"/>
        <ellipse cx="50" cy="38" rx="22" ry="26" fill="#1e1b4b"/>
        <ellipse cx="50" cy="36" rx="18" ry="22" fill="#2e1065"/>
        <path d="M32 12 L28 2 L36 10" fill="#4c1d95"/>
        <path d="M44 8 L41 0 L47 0" fill="#4c1d95"/>
        <path d="M56 8 L53 0 L59 0" fill="#6d28d9"/>
        <path d="M68 12 L64 10 L72 2" fill="#4c1d95"/>
        <ellipse cx="37" cy="34" rx="9" ry="9" fill="#0f172a"/>
        <ellipse cx="63" cy="34" rx="9" ry="9" fill="#0f172a"/>
        <ellipse cx="37" cy="34" rx="6.5" ry="6.5" fill="#6d28d9"/>
        <ellipse cx="63" cy="34" rx="6.5" ry="6.5" fill="#6d28d9"/>
        <ellipse cx="37" cy="34" rx="4" ry="4" fill="#f0abfc"/>
        <ellipse cx="63" cy="34" rx="4" ry="4" fill="#f0abfc"/>
        <circle cx="37" cy="32" r="1.5" fill="#fdf4ff"/>
        <circle cx="63" cy="32" r="1.5" fill="#fdf4ff"/>
        <path d="M38 50 Q50 60 62 50" stroke="#4c1d95" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="42" cy="52" r="1.5" fill="#7c3aed" opacity="0.7"/>
        <circle cx="50" cy="56" r="1.5" fill="#7c3aed" opacity="0.7"/>
        <circle cx="58" cy="52" r="1.5" fill="#7c3aed" opacity="0.7"/>
        <ellipse cx="50" cy="62" rx="8" ry="4" fill="#4c1d95" opacity="0.5"/>
        <circle cx="32" cy="80" r="4" fill="#4c1d95" opacity="0.6"/>
        <circle cx="68" cy="76" r="4" fill="#4c1d95" opacity="0.6"/>
        <circle cx="26" cy="90" r="3" fill="#6d28d9" opacity="0.4"/>
        <circle cx="74" cy="86" r="3" fill="#6d28d9" opacity="0.4"/>
      </g>

      <!-- ═══ OMEGA OVERLORD ═══ -->
      <g v-if="monsterId === 'omega_overlord'">
        <ellipse cx="50" cy="117" rx="28" ry="5" fill="#000" opacity="0.3"/>
        <circle cx="50" cy="10" r="8" fill="#f59e0b" opacity="0.3"/>
        <circle cx="50" cy="10" r="5" fill="#f59e0b" opacity="0.6"/>
        <circle cx="50" cy="10" r="3" fill="#fef08a"/>
        <line x1="50" y1="18" x2="50" y2="26" stroke="#f59e0b" stroke-width="2"/>
        <ellipse cx="28" cy="10" rx="5" ry="3" fill="#fef08a" opacity="0.7"/>
        <ellipse cx="72" cy="10" rx="5" ry="3" fill="#fef08a" opacity="0.7"/>
        <line x1="33" y1="10" x2="40" y2="26" stroke="#f59e0b" stroke-width="1.5" opacity="0.6"/>
        <line x1="67" y1="10" x2="60" y2="26" stroke="#f59e0b" stroke-width="1.5" opacity="0.6"/>
        <ellipse cx="50" cy="58" rx="32" ry="36" fill="#1c1917"/>
        <ellipse cx="50" cy="55" rx="29" ry="32" fill="#292524"/>
        <ellipse cx="50" cy="42" rx="26" ry="28" fill="#1c1917"/>
        <ellipse cx="50" cy="40" rx="23" ry="25" fill="#292524"/>
        <ellipse cx="38" cy="36" rx="9" ry="11" fill="#0c0a09"/>
        <ellipse cx="62" cy="36" rx="9" ry="11" fill="#0c0a09"/>
        <ellipse cx="38" cy="36" rx="6.5" ry="8" fill="#ef4444"/>
        <ellipse cx="62" cy="36" rx="6.5" ry="8" fill="#ef4444"/>
        <circle cx="38" cy="34" r="2.5" fill="#fca5a5"/>
        <circle cx="62" cy="34" r="2.5" fill="#fca5a5"/>
        <path d="M26 55 Q30 60 35 55" stroke="#1c1917" stroke-width="3" fill="none"/>
        <path d="M65 55 Q70 60 74 55" stroke="#1c1917" stroke-width="3" fill="none"/>
        <path d="M36 55 L40 48 M44 53 L48 46 M52 53 L56 46 M60 55 L64 48" stroke="#e7e5e4" stroke-width="2" stroke-linecap="round"/>
        <path d="M36 62 Q50 72 64 62 Q64 78 50 80 Q36 78 36 62Z" fill="#0c0a09"/>
        <rect x="36" y="62" width="8" height="10" rx="1" fill="#e7e5e4"/>
        <rect x="46" y="62" width="8" height="12" rx="1" fill="#e7e5e4"/>
        <rect x="56" y="62" width="8" height="10" rx="1" fill="#e7e5e4"/>
        <ellipse cx="50" cy="95" rx="25" ry="22" fill="#1c1917"/>
        <ellipse cx="24" cy="88" rx="10" ry="16" transform="rotate(-15 24 88)" fill="#292524"/>
        <ellipse cx="76" cy="88" rx="10" ry="16" transform="rotate(15 76 88)" fill="#292524"/>
        <path d="M12 90 L8 100 M14 98 L10 107 M16 105 L13 114" stroke="#44403c" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <path d="M88 90 L92 100 M86 98 L90 107 M84 105 L87 114" stroke="#44403c" stroke-width="2.5" stroke-linecap="round" fill="none"/>
        <rect x="37" y="108" width="12" height="14" rx="4" fill="#1c1917"/>
        <rect x="51" y="108" width="12" height="14" rx="4" fill="#1c1917"/>
        <ellipse cx="50" cy="25" rx="14" ry="6" fill="#6b21a8" opacity="0.5"/>
      </g>

      <!-- ═══ UNIVERSAL DAMAGE OVERLAYS ═══ -->
      <g v-if="stage >= 1" opacity="0.6">
        <line x1="35" y1="25" x2="40" y2="45" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
        <line x1="62" y1="30" x2="58" y2="52" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.35"/>
      </g>
      <g v-if="stage >= 2" opacity="0.7">
        <path d="M28 50 L33 68 L27 80" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.45"/>
        <path d="M68 47 L63 65 L70 78" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.45"/>
        <line x1="45" y1="62" x2="50" y2="85" stroke="#fff" stroke-width="1.5" stroke-linecap="round" opacity="0.4"/>
      </g>
      <g v-if="stage >= 3" opacity="0.8">
        <path d="M24 38 L30 58 L22 70 L32 85" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55"/>
        <path d="M72 42 L66 62 L74 74 L62 88" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.55"/>
        <line x1="40" y1="35" x2="44" y2="58" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
        <line x1="58" y1="38" x2="54" y2="60" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity="0.4"/>
        <ellipse cx="50" cy="65" rx="22" ry="12" fill="#ef4444" opacity="0.08"/>
      </g>
    </svg>

    <!-- critical HP pulse ring -->
    <div
      v-if="stage >= 3"
      class="absolute inset-0 rounded-full pointer-events-none"
      style="animation: critRing 0.8s ease-out infinite; border: 2px solid #ef4444; opacity: 0;"
    />
  </div>
</template>

<style scoped>
svg {
  transition: filter 0.18s ease;
}
.sprite-healthy  { filter: brightness(1) saturate(1); }
.sprite-hurt     { filter: brightness(0.88) saturate(0.82); }
.sprite-damaged  { filter: brightness(0.76) saturate(0.6); }
.sprite-critical {
  animation: critPulse 0.8s ease-in-out infinite alternate;
}
.sprite-hit {
  filter: brightness(4) saturate(0.1) !important;
  transition: filter 0s !important;
}

@keyframes critPulse {
  from { filter: brightness(0.65) saturate(0.3); }
  to   { filter: brightness(0.95) saturate(0.65) hue-rotate(18deg); }
}
@keyframes critRing {
  0%   { opacity: 0.8; transform: scale(0.8); }
  100% { opacity: 0; transform: scale(1.5); }
}
</style>
