import { onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'

export function useGameLoop() {
  const store = useGameStore()
  let rafId = 0
  let lastTime = 0
  let autoClickAccum = 0

  function loop(timestamp: number) {
    if (lastTime === 0) {
      lastTime = timestamp
      rafId = requestAnimationFrame(loop)
      return
    }

    const deltaMs = timestamp - lastTime
    lastTime = timestamp

    // Cap at 100ms to avoid huge resource jumps after tab switch
    const deltaTime = Math.min(deltaMs / 1000, 0.1)

    store.tick(deltaTime)

    if (store.autoClickRate > 0) {
      autoClickAccum += store.autoClickRate * deltaTime
      while (autoClickAccum >= 1) {
        store.autoClickMonster()
        autoClickAccum -= 1
      }
    }

    rafId = requestAnimationFrame(loop)
  }

  onMounted(() => {
    rafId = requestAnimationFrame(loop)
  })

  onUnmounted(() => {
    cancelAnimationFrame(rafId)
    lastTime = 0
    autoClickAccum = 0
  })
}
