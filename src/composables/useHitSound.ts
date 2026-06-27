let ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!ctx) ctx = new AudioContext()
  // Resume if suspended (required by some browsers before first user gesture)
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export function useHitSound() {
  function playHit() {
    try {
      const ac = getCtx()
      const now = ac.currentTime

      // Oscillator: square wave pitch sweep (thud impact feel)
      const osc = ac.createOscillator()
      osc.type = 'square'
      osc.frequency.setValueAtTime(180, now)
      osc.frequency.exponentialRampToValueAtTime(55, now + 0.08)

      // Gain: sharp attack, fast decay
      const gain = ac.createGain()
      gain.gain.setValueAtTime(0.35, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1)

      // Noise layer for the metallic "clang" texture
      const bufferSize = ac.sampleRate * 0.05
      const noiseBuffer = ac.createBuffer(1, bufferSize, ac.sampleRate)
      const data = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1

      const noise = ac.createBufferSource()
      noise.buffer = noiseBuffer

      const noiseGain = ac.createGain()
      noiseGain.gain.setValueAtTime(0.15, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05)

      osc.connect(gain)
      noise.connect(noiseGain)
      gain.connect(ac.destination)
      noiseGain.connect(ac.destination)

      osc.start(now)
      osc.stop(now + 0.12)
      noise.start(now)
      noise.stop(now + 0.06)
    } catch {
      // AudioContext unavailable (e.g., SSR or sandboxed) — fail silently
    }
  }

  function playCritHit() {
    try {
      const ac = getCtx()
      const now = ac.currentTime

      // Higher pitch sweep for a more dramatic impact
      const osc = ac.createOscillator()
      osc.type = 'square'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.12)

      const gain = ac.createGain()
      gain.gain.setValueAtTime(0.5, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18)

      // Heavier noise burst
      const bufferSize = ac.sampleRate * 0.08
      const noiseBuffer = ac.createBuffer(1, bufferSize, ac.sampleRate)
      const data = noiseBuffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1

      const noise = ac.createBufferSource()
      noise.buffer = noiseBuffer

      const noiseGain = ac.createGain()
      noiseGain.gain.setValueAtTime(0.25, now)
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

      // Extra high zing layer for the crit sparkle
      const zing = ac.createOscillator()
      zing.type = 'sine'
      zing.frequency.setValueAtTime(1200, now)
      zing.frequency.exponentialRampToValueAtTime(600, now + 0.15)

      const zingGain = ac.createGain()
      zingGain.gain.setValueAtTime(0.2, now)
      zingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15)

      osc.connect(gain)
      noise.connect(noiseGain)
      zing.connect(zingGain)
      gain.connect(ac.destination)
      noiseGain.connect(ac.destination)
      zingGain.connect(ac.destination)

      osc.start(now)
      osc.stop(now + 0.2)
      noise.start(now)
      noise.stop(now + 0.1)
      zing.start(now)
      zing.stop(now + 0.18)
    } catch {
      // fail silently
    }
  }

  return { playHit, playCritHit }
}
