export interface UpgradeUnlockState {
  buildingCounts: Record<string, number>
  monstersDefeated: number
  clickPower: number
}

export interface UpgradeApplyTarget {
  clickPowerMultiplier: number
  buildingMultipliers: Record<string, number>
  autoClickRate: number
  critChance: number
  critMultiplier: number
}

export interface UpgradeDef {
  id: string
  name: string
  emoji: string
  description: string
  costScrap: number
  costParts: number
  unlockCondition: (state: UpgradeUnlockState) => boolean
  apply: (target: UpgradeApplyTarget) => void
}

export const UPGRADES: UpgradeDef[] = [
  {
    id: 'click_2x',
    name: 'Reinforced Claws',
    emoji: '🦾',
    description: 'Your robots hit twice as hard. Click power ×2.',
    costScrap: 50,
    costParts: 0,
    unlockCondition: (s) => s.monstersDefeated >= 1,
    apply: (t) => { t.clickPowerMultiplier *= 2 },
  },
  {
    id: 'click_5x',
    name: 'Plasma Fists',
    emoji: '⚡',
    description: 'Supercharged strikes. Click power ×5.',
    costScrap: 500,
    costParts: 5,
    unlockCondition: (s) => s.monstersDefeated >= 10,
    apply: (t) => { t.clickPowerMultiplier *= 5 },
  },
  {
    id: 'click_10x',
    name: 'Nuclear Strike',
    emoji: '☢️',
    description: 'Devastating nuclear blows. Click power ×10.',
    costScrap: 5000,
    costParts: 25,
    unlockCondition: (s) => s.monstersDefeated >= 50,
    apply: (t) => { t.clickPowerMultiplier *= 10 },
  },
  {
    id: 'click_25x',
    name: 'Singularity Punch',
    emoji: '🌀',
    description: 'Reality-bending attack. Click power ×25.',
    costScrap: 50000,
    costParts: 200,
    unlockCondition: (s) => s.monstersDefeated >= 200,
    apply: (t) => { t.clickPowerMultiplier *= 25 },
  },
  {
    id: 'scrap_heap_2x',
    name: 'Better Dumpsters',
    emoji: '♻️',
    description: 'Scrap Heaps produce 2× Scrap Metal.',
    costScrap: 200,
    costParts: 0,
    unlockCondition: (s) => (s.buildingCounts['scrap_heap'] ?? 0) >= 5,
    apply: (t) => { t.buildingMultipliers['scrap_heap'] = (t.buildingMultipliers['scrap_heap'] ?? 1) * 2 },
  },
  {
    id: 'robot_factory_2x',
    name: 'Assembly Overhaul',
    emoji: '⚙️',
    description: 'Robot Factories produce 2× Scrap Metal.',
    costScrap: 1000,
    costParts: 0,
    unlockCondition: (s) => (s.buildingCounts['robot_factory'] ?? 0) >= 5,
    apply: (t) => { t.buildingMultipliers['robot_factory'] = (t.buildingMultipliers['robot_factory'] ?? 1) * 2 },
  },
  {
    id: 'research_lab_2x',
    name: 'Advanced Research',
    emoji: '🧬',
    description: 'Research Labs produce 2× Scrap Metal.',
    costScrap: 5000,
    costParts: 10,
    unlockCondition: (s) => (s.buildingCounts['research_lab'] ?? 0) >= 5,
    apply: (t) => { t.buildingMultipliers['research_lab'] = (t.buildingMultipliers['research_lab'] ?? 1) * 2 },
  },
  {
    id: 'monster_trap_2x',
    name: 'Improved Traps',
    emoji: '🎯',
    description: 'Monster Traps generate 2× Robot Parts.',
    costScrap: 3000,
    costParts: 15,
    unlockCondition: (s) => (s.buildingCounts['monster_trap'] ?? 0) >= 3,
    apply: (t) => { t.buildingMultipliers['monster_trap'] = (t.buildingMultipliers['monster_trap'] ?? 1) * 2 },
  },
  {
    id: 'mega_forge_2x',
    name: 'Infernal Furnace',
    emoji: '🔥',
    description: 'Mega Forges produce 2× Scrap Metal.',
    costScrap: 50000,
    costParts: 50,
    unlockCondition: (s) => (s.buildingCounts['mega_forge'] ?? 0) >= 3,
    apply: (t) => { t.buildingMultipliers['mega_forge'] = (t.buildingMultipliers['mega_forge'] ?? 1) * 2 },
  },
  {
    id: 'auto_clicker',
    name: 'Auto-Bot',
    emoji: '🦿',
    description: 'A robot clicks for you once per second.',
    costScrap: 250,
    costParts: 10,
    unlockCondition: (s) => s.monstersDefeated >= 5,
    apply: (t) => { t.autoClickRate += 1 },
  },
  {
    id: 'auto_clicker_5x',
    name: 'Bot Army',
    emoji: '🪖',
    description: 'Five robots click simultaneously. Auto-click ×5/s.',
    costScrap: 2500,
    costParts: 50,
    unlockCondition: (s) => s.monstersDefeated >= 25,
    apply: (t) => { t.autoClickRate += 4 },
  },
  {
    id: 'crit_1',
    name: 'Precision Strike',
    emoji: '🎯',
    description: '10% chance to deal 2× damage on each tap.',
    costScrap: 750,
    costParts: 8,
    unlockCondition: (s) => s.monstersDefeated >= 15,
    apply: (t) => {
      t.critChance += 0.10
      t.critMultiplier = Math.max(t.critMultiplier, 2)
    },
  },
  {
    id: 'crit_2',
    name: 'Critical Matrix',
    emoji: '💥',
    description: 'Crit chance rises to 25% and crit damage to 3×.',
    costScrap: 8000,
    costParts: 60,
    unlockCondition: (s) => s.monstersDefeated >= 60,
    apply: (t) => {
      t.critChance += 0.15
      t.critMultiplier = Math.max(t.critMultiplier, 3)
    },
  },
  {
    id: 'all_2x',
    name: 'Synchronized Systems',
    emoji: '🌐',
    description: 'All production doubled. Every building produces 2×.',
    costScrap: 100000,
    costParts: 500,
    unlockCondition: (s) => s.monstersDefeated >= 100,
    apply: (t) => {
      for (const key of Object.keys(t.buildingMultipliers)) {
        t.buildingMultipliers[key] = (t.buildingMultipliers[key] ?? 1) * 2
      }
    },
  },
]
