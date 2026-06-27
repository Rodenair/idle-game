let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// ── Sound A: Heavy Thud ───────────────────────────────────────────────────
// Square wave pitch drop + noise burst. Blunt punch feel.
function playThud(ac: AudioContext) {
  const now = ac.currentTime

  const osc = ac.createOscillator()
  osc.type = 'square'
  osc.frequency.setValueAtTime(160, now)
  osc.frequency.exponentialRampToValueAtTime(45, now + 0.09)

  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.32, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13)

  const noiseLen = Math.floor(ac.sampleRate * 0.05)
  const noiseBuf = ac.createBuffer(1, noiseLen, ac.sampleRate)
  const nd = noiseBuf.getChannelData(0)
  for (let i = 0; i < noiseLen; i++) nd[i] = Math.random() * 2 - 1

  const noise = ac.createBufferSource()
  noise.buffer = noiseBuf

  const noiseGain = ac.createGain()
  noiseGain.gain.setValueAtTime(0.14, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

  osc.connect(gain).connect(ac.destination)
  noise.connect(noiseGain).connect(ac.destination)

  osc.start(now); osc.stop(now + 0.15)
  noise.start(now); noise.stop(now + 0.07)
}

// ── Sound B: Metal Clang ──────────────────────────────────────────────────
// Triangle wave ring with slower decay. Hitting steel armor feel.
function playClang(ac: AudioContext) {
  const now = ac.currentTime

  const osc = ac.createOscillator()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(440, now)
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.18)

  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.28, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

  // Second partial slightly detuned for metallic shimmer
  const osc2 = ac.createOscillator()
  osc2.type = 'triangle'
  osc2.frequency.setValueAtTime(466, now)
  osc2.frequency.exponentialRampToValueAtTime(117, now + 0.18)

  const gain2 = ac.createGain()
  gain2.gain.setValueAtTime(0.12, now)
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

  osc.connect(gain).connect(ac.destination)
  osc2.connect(gain2).connect(ac.destination)

  osc.start(now); osc.stop(now + 0.25)
  osc2.start(now); osc2.stop(now + 0.22)
}

// ── Sound C: Slash ────────────────────────────────────────────────────────
// Fast sawtooth sweep + band-passed noise. Blade swipe feel.
function playSlash(ac: AudioContext) {
  const now = ac.currentTime

  const osc = ac.createOscillator()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(900, now)
  osc.frequency.exponentialRampToValueAtTime(250, now + 0.05)

  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.22, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

  // Band-passed noise for air-cutting texture
  const noiseLen = Math.floor(ac.sampleRate * 0.07)
  const noiseBuf = ac.createBuffer(1, noiseLen, ac.sampleRate)
  const nd = noiseBuf.getChannelData(0)
  for (let i = 0; i < noiseLen; i++) nd[i] = Math.random() * 2 - 1

  const noise = ac.createBufferSource()
  noise.buffer = noiseBuf

  const filter = ac.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 2200
  filter.Q.value = 1.5

  const noiseGain = ac.createGain()
  noiseGain.gain.setValueAtTime(0.3, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.07)

  osc.connect(gain).connect(ac.destination)
  noise.connect(filter).connect(noiseGain).connect(ac.destination)

  osc.start(now); osc.stop(now + 0.1)
  noise.start(now); noise.stop(now + 0.08)
}

// ── Crit: Explosive Impact ────────────────────────────────────────────────
// Three simultaneous layers (bass + mid + shimmer) + heavy noise.
// Unmistakably louder and richer than any normal hit.
function playCritSound(ac: AudioContext) {
  const now = ac.currentTime

  // Bass impact
  const bass = ac.createOscillator()
  bass.type = 'sawtooth'
  bass.frequency.setValueAtTime(280, now)
  bass.frequency.exponentialRampToValueAtTime(60, now + 0.15)
  const bassGain = ac.createGain()
  bassGain.gain.setValueAtTime(0.55, now)
  bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22)

  // Mid crunch
  const mid = ac.createOscillator()
  mid.type = 'square'
  mid.frequency.setValueAtTime(500, now)
  mid.frequency.exponentialRampToValueAtTime(120, now + 0.1)
  const midGain = ac.createGain()
  midGain.gain.setValueAtTime(0.30, now)
  midGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

  // High shimmer tail
  const shimmer = ac.createOscillator()
  shimmer.type = 'sine'
  shimmer.frequency.setValueAtTime(1800, now)
  shimmer.frequency.exponentialRampToValueAtTime(900, now + 0.2)
  const shimmerGain = ac.createGain()
  shimmerGain.gain.setValueAtTime(0.18, now)
  shimmerGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)

  // Heavy noise burst
  const noiseLen = Math.floor(ac.sampleRate * 0.1)
  const noiseBuf = ac.createBuffer(1, noiseLen, ac.sampleRate)
  const nd = noiseBuf.getChannelData(0)
  for (let i = 0; i < noiseLen; i++) nd[i] = Math.random() * 2 - 1
  const noise = ac.createBufferSource()
  noise.buffer = noiseBuf
  const noiseGain = ac.createGain()
  noiseGain.gain.setValueAtTime(0.30, now)
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

  bass.connect(bassGain).connect(ac.destination)
  mid.connect(midGain).connect(ac.destination)
  shimmer.connect(shimmerGain).connect(ac.destination)
  noise.connect(noiseGain).connect(ac.destination)

  bass.start(now); bass.stop(now + 0.25)
  mid.start(now); mid.stop(now + 0.18)
  shimmer.start(now); shimmer.stop(now + 0.3)
  noise.start(now); noise.stop(now + 0.12)
}

const hitSounds = [playThud, playClang, playSlash]
let lastHit = -1

export function useHitSound() {
  function playHit() {
    try {
      const ac = getCtx()
      // Pick a different sound than the last one played
      let idx: number
      do { idx = Math.floor(Math.random() * hitSounds.length) } while (idx === lastHit && hitSounds.length > 1)
      lastHit = idx
      hitSounds[idx](ac)
    } catch {
      // fail silently
    }
  }

  function playCritHit() {
    try {
      playCritSound(getCtx())
    } catch {
      // fail silently
    }
  }

  return { playHit, playCritHit }
}
