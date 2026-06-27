import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { BUILDINGS } from '@/data/buildings'
import { MONSTERS } from '@/data/monsters'
import { UPGRADES, type UpgradeApplyTarget, type UpgradeUnlockState } from '@/data/upgrades'

interface SaveData {
  version: 1
  scrap: number
  parts: number
  totalScrapEarned: number
  buildingCounts: Record<string, number>
  purchasedUpgradeIds: string[]
  monsterLevel: number
  monsterCurrentHp: number
  monstersDefeated: number
}

export const useGameStore = defineStore('game', () => {
  // Resources
  const scrap = ref(0)
  const parts = ref(0)
  const totalScrapEarned = ref(0)

  // Buildings
  const buildingCounts = ref<Record<string, number>>(
    Object.fromEntries(BUILDINGS.map((b) => [b.id, 0])),
  )

  // Upgrades
  const purchasedUpgradeIds = ref<Set<string>>(new Set())

  // Monster
  const monsterLevel = ref(1)
  const monsterCurrentHp = ref(0)
  const monstersDefeated = ref(0)

  // ── Computed: upgrade effects replayed from scratch on each purchase ──────
  const upgradeEffects = computed<UpgradeApplyTarget>(() => {
    const target: UpgradeApplyTarget = {
      clickPowerMultiplier: 1,
      buildingMultipliers: Object.fromEntries(BUILDINGS.map((b) => [b.id, 1])),
      autoClickRate: 0,
      critChance: 0,
      critMultiplier: 1,
    }
    for (const id of purchasedUpgradeIds.value) {
      const def = UPGRADES.find((u) => u.id === id)
      def?.apply(target)
    }
    return target
  })

  const clickPower = computed(() => upgradeEffects.value.clickPowerMultiplier)

  const scrapPerSec = computed(() => {
    let total = 0
    for (const building of BUILDINGS) {
      if (building.baseScrapPerSec === 0) continue
      const count = buildingCounts.value[building.id] ?? 0
      const mult = upgradeEffects.value.buildingMultipliers[building.id] ?? 1
      total += building.baseScrapPerSec * count * mult
    }
    return total
  })

  const partsPerSec = computed(() => {
    let total = 0
    for (const building of BUILDINGS) {
      if (building.basePartsPerSec === 0) continue
      const count = buildingCounts.value[building.id] ?? 0
      const mult = upgradeEffects.value.buildingMultipliers[building.id] ?? 1
      total += building.basePartsPerSec * count * mult
    }
    return total
  })

  const autoClickRate = computed(() => upgradeEffects.value.autoClickRate)
  const critChance = computed(() => upgradeEffects.value.critChance)
  const critMultiplier = computed(() => upgradeEffects.value.critMultiplier)

  const activeMonsterDef = computed(() => {
    const idx = (monsterLevel.value - 1) % MONSTERS.length
    return MONSTERS[idx]
  })

  const activeMonsterMaxHp = computed(() => {
    const def = activeMonsterDef.value
    return Math.max(1, Math.floor(def.baseHp * Math.pow(def.hpScaling, monsterLevel.value - 1)))
  })

  const availableUpgrades = computed(() => {
    const unlockState: UpgradeUnlockState = {
      buildingCounts: buildingCounts.value,
      monstersDefeated: monstersDefeated.value,
      clickPower: clickPower.value,
    }
    return UPGRADES.filter(
      (u) => !purchasedUpgradeIds.value.has(u.id) && u.unlockCondition(unlockState),
    )
  })

  // ── Helper ────────────────────────────────────────────────────────────────
  function buildingCost(buildingId: string): number {
    const def = BUILDINGS.find((b) => b.id === buildingId)
    if (!def) return Infinity
    const owned = buildingCounts.value[buildingId] ?? 0
    return Math.floor(def.baseCost * Math.pow(def.costMultiplier, owned))
  }

  // ── Actions ───────────────────────────────────────────────────────────────
  function spawnMonster() {
    monsterCurrentHp.value = activeMonsterMaxHp.value
  }

  function defeatMonster() {
    const def = activeMonsterDef.value
    const lvl = monsterLevel.value
    const scrapReward = Math.max(
      1,
      Math.floor(def.baseScrapReward * Math.pow(def.rewardScaling, lvl - 1)),
    )
    const partsReward = Math.max(
      1,
      Math.floor(def.basePartsReward * Math.pow(def.rewardScaling, lvl - 1)),
    )
    addScrap(scrapReward)
    parts.value += partsReward
    monstersDefeated.value += 1
    monsterLevel.value += 1
    spawnMonster()
  }

  function clickMonster(): { damage: number; isCrit: boolean } {
    if (monsterCurrentHp.value <= 0) return { damage: 0, isCrit: false }
    const isCrit = critChance.value > 0 && Math.random() < critChance.value
    const damage = isCrit ? clickPower.value * critMultiplier.value : clickPower.value
    monsterCurrentHp.value = Math.max(0, monsterCurrentHp.value - damage)
    if (monsterCurrentHp.value <= 0) defeatMonster()
    return { damage, isCrit }
  }

  function addScrap(amount: number) {
    scrap.value += amount
    totalScrapEarned.value += amount
  }

  function buyBuilding(buildingId: string) {
    const cost = buildingCost(buildingId)
    if (scrap.value < cost) return
    scrap.value -= cost
    buildingCounts.value[buildingId] = (buildingCounts.value[buildingId] ?? 0) + 1
  }

  function buyUpgrade(upgradeId: string) {
    const def = UPGRADES.find((u) => u.id === upgradeId)
    if (!def) return
    if (purchasedUpgradeIds.value.has(upgradeId)) return
    if (scrap.value < def.costScrap || parts.value < def.costParts) return
    scrap.value -= def.costScrap
    parts.value -= def.costParts
    purchasedUpgradeIds.value.add(upgradeId)
  }

  function tick(deltaTime: number) {
    addScrap(scrapPerSec.value * deltaTime)
    parts.value += partsPerSec.value * deltaTime
  }

  // ── Save / Load ───────────────────────────────────────────────────────────
  function getSaveData(): SaveData {
    return {
      version: 1,
      scrap: scrap.value,
      parts: parts.value,
      totalScrapEarned: totalScrapEarned.value,
      buildingCounts: { ...buildingCounts.value },
      purchasedUpgradeIds: Array.from(purchasedUpgradeIds.value),
      monsterLevel: monsterLevel.value,
      monsterCurrentHp: monsterCurrentHp.value,
      monstersDefeated: monstersDefeated.value,
    }
  }

  function loadSaveData(data: SaveData) {
    scrap.value = data.scrap ?? 0
    parts.value = data.parts ?? 0
    totalScrapEarned.value = data.totalScrapEarned ?? 0
    buildingCounts.value = {
      ...Object.fromEntries(BUILDINGS.map((b) => [b.id, 0])),
      ...data.buildingCounts,
    }
    purchasedUpgradeIds.value = new Set(data.purchasedUpgradeIds ?? [])
    monsterLevel.value = data.monsterLevel ?? 1
    monsterCurrentHp.value = data.monsterCurrentHp ?? 0
    monstersDefeated.value = data.monstersDefeated ?? 0
    if (monsterCurrentHp.value <= 0) spawnMonster()
  }

  function initGame() {
    const saved = localStorage.getItem('rvm_save')
    if (saved) {
      try {
        loadSaveData(JSON.parse(saved) as SaveData)
        return
      } catch {
        // corrupted save — start fresh
      }
    }
    spawnMonster()
  }

  function resetGame() {
    localStorage.removeItem('rvm_save')
    scrap.value = 0
    parts.value = 0
    totalScrapEarned.value = 0
    buildingCounts.value = Object.fromEntries(BUILDINGS.map((b) => [b.id, 0]))
    purchasedUpgradeIds.value = new Set()
    monsterLevel.value = 1
    monstersDefeated.value = 0
    spawnMonster()
  }

  return {
    // State
    scrap,
    parts,
    totalScrapEarned,
    buildingCounts,
    purchasedUpgradeIds,
    monsterLevel,
    monsterCurrentHp,
    monstersDefeated,
    // Computed
    upgradeEffects,
    clickPower,
    scrapPerSec,
    partsPerSec,
    autoClickRate,
    critChance,
    critMultiplier,
    activeMonsterDef,
    activeMonsterMaxHp,
    availableUpgrades,
    // Methods
    buildingCost,
    clickMonster,
    buyBuilding,
    buyUpgrade,
    tick,
    getSaveData,
    initGame,
    resetGame,
    spawnMonster,
  }
})
