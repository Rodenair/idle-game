import { onMounted, onUnmounted } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const SAVE_INTERVAL_MS = 30_000

export function useSave() {
  const store = useGameStore()
  let intervalId = 0

  function save() {
    try {
      localStorage.setItem('rvm_save', JSON.stringify(store.getSaveData()))
    } catch {
      // localStorage full or unavailable — ignore
    }
  }

  function handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      save()
    }
  }

  onMounted(() => {
    intervalId = window.setInterval(save, SAVE_INTERVAL_MS)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', save)
  })

  onUnmounted(() => {
    clearInterval(intervalId)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    window.removeEventListener('beforeunload', save)
  })

  return { save }
}
