<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useSprite } from '@/composables/useSprite'

const props = defineProps<{
  monsterId: string
  hpPercent: number
  hitSignal: number
  deathSignal: number
}>()

const { currentSrc, state, playDeath } = useSprite(() => props.monsterId)

const hitFlash = ref(false)

watch(() => props.hitSignal, () => {
  hitFlash.value = true
  setTimeout(() => { hitFlash.value = false }, 120)
})

watch(() => props.deathSignal, () => {
  playDeath()
})

const damageClass = computed(() => {
  if (props.hpPercent > 75) return 'sprite-healthy'
  if (props.hpPercent > 50) return 'sprite-hurt'
  if (props.hpPercent > 25) return 'sprite-damaged'
  return 'sprite-critical'
})
</script>

<template>
  <div class="relative select-none h-full flex items-center justify-center">
    <img
      :src="currentSrc"
      :class="[
        'h-full w-auto max-w-[90vw] object-contain drop-shadow-2xl',
        hitFlash ? 'sprite-hit-flash' : '',
        state !== 'death' ? damageClass : 'sprite-dying',
      ]"
      draggable="false"
    />

  </div>
</template>

<style scoped>
img {
  image-rendering: auto;
}
.sprite-healthy  { filter: brightness(1) saturate(1); }
.sprite-hurt     { filter: brightness(0.88) saturate(0.82); }
.sprite-damaged  { filter: brightness(0.76) saturate(0.6); }
.sprite-critical {
  animation: critPulse 0.8s ease-in-out infinite alternate;
}
.sprite-dying    { filter: brightness(0.5) saturate(0.2) grayscale(0.5); }
.sprite-hit-flash { animation: hitFlash 0.12s ease-out forwards; }

@keyframes critPulse {
  from { filter: brightness(0.65) saturate(0.3); }
  to   { filter: brightness(0.95) saturate(0.65) hue-rotate(18deg); }
}
@keyframes hitFlash {
  0%   { filter: brightness(3) saturate(0.2); }
  100% { filter: brightness(1) saturate(1); }
}
</style>
