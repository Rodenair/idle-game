import { ref, computed, onUnmounted, watch } from 'vue'
import { getSpriteUrl, SPRITE_CONFIGS } from '@/data/spriteConfig'

type AnimState = 'idle' | 'attack' | 'death'

const IDLE_MS = 100    // 10 fps
const ATTACK_MS = 70   // ~14 fps — plays 4 frames then returns to idle
const DEATH_MS = 80    // ~12 fps

const ATTACK_FRAMES_TO_PLAY = 4

export function useSprite(monsterId: () => string) {
  const id = computed(monsterId)
  const state = ref<AnimState>('idle')
  const frame = ref(0)
  // Locked to the dying monster's ID so the next monster doesn't show death frames
  const frozenId = ref<string | null>(null)

  const activeId = computed(() => frozenId.value ?? id.value)
  const currentSrc = computed(() => getSpriteUrl(activeId.value, state.value, frame.value))

  let timerId: ReturnType<typeof setInterval> | null = null

  function clearAnim() {
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
  }

  function startIdle() {
    clearAnim()
    frozenId.value = null
    state.value = 'idle'
    frame.value = 0
    const frames = SPRITE_CONFIGS[id.value]?.idleFrames ?? 18
    timerId = setInterval(() => {
      frame.value = (frame.value + 1) % frames
    }, IDLE_MS)
  }

  function playAttack() {
    if (state.value === 'death') return
    clearAnim()
    state.value = 'attack'
    frame.value = 0
    timerId = setInterval(() => {
      frame.value++
      if (frame.value >= ATTACK_FRAMES_TO_PLAY) {
        startIdle()
      }
    }, ATTACK_MS)
  }

  function playDeath() {
    clearAnim()
    frozenId.value = id.value  // lock to the dying monster before ID can change
    state.value = 'death'
    frame.value = 0
    const frames = SPRITE_CONFIGS[frozenId.value]?.deathFrames ?? 15
    timerId = setInterval(() => {
      frame.value++
      if (frame.value >= frames) {
        clearAnim()
        frame.value = frames - 1
        startIdle()
      }
    }, DEATH_MS)
  }

  // When monster ID changes, restart idle unless death is playing
  watch(id, () => {
    if (state.value !== 'death') {
      startIdle()
    }
  })

  startIdle()
  onUnmounted(clearAnim)

  return { currentSrc, state, startIdle, playAttack, playDeath }
}
