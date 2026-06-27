export interface MonsterDef {
  id: string
  name: string
  emoji: string
  baseHp: number
  hpScaling: number
  baseScrapReward: number
  basePartsReward: number
  rewardScaling: number
}

export const MONSTERS: MonsterDef[] = [
  {
    id: 'rust_goblin',
    name: 'Rust Goblin',
    emoji: '👺',
    baseHp: 10,
    hpScaling: 1.2,
    baseScrapReward: 5,
    basePartsReward: 1,
    rewardScaling: 1.2,
  },
  {
    id: 'glitch_bot',
    name: 'Glitch Bot',
    emoji: '🤖',
    baseHp: 40,
    hpScaling: 1.22,
    baseScrapReward: 18,
    basePartsReward: 3,
    rewardScaling: 1.22,
  },
  {
    id: 'scrap_golem',
    name: 'Scrap Golem',
    emoji: '🗿',
    baseHp: 150,
    hpScaling: 1.25,
    baseScrapReward: 60,
    basePartsReward: 8,
    rewardScaling: 1.25,
  },
  {
    id: 'iron_troll',
    name: 'Iron Troll',
    emoji: '👹',
    baseHp: 500,
    hpScaling: 1.28,
    baseScrapReward: 200,
    basePartsReward: 20,
    rewardScaling: 1.28,
  },
  {
    id: 'plasma_wraith',
    name: 'Plasma Wraith',
    emoji: '👻',
    baseHp: 1500,
    hpScaling: 1.3,
    baseScrapReward: 600,
    basePartsReward: 50,
    rewardScaling: 1.3,
  },
  {
    id: 'chrome_drake',
    name: 'Chrome Drake',
    emoji: '🐉',
    baseHp: 5000,
    hpScaling: 1.35,
    baseScrapReward: 2000,
    basePartsReward: 150,
    rewardScaling: 1.35,
  },
  {
    id: 'void_titan',
    name: 'Void Titan',
    emoji: '👾',
    baseHp: 20000,
    hpScaling: 1.4,
    baseScrapReward: 8000,
    basePartsReward: 500,
    rewardScaling: 1.4,
  },
  {
    id: 'omega_overlord',
    name: 'Omega Overlord',
    emoji: '💀',
    baseHp: 100000,
    hpScaling: 1.5,
    baseScrapReward: 35000,
    basePartsReward: 2000,
    rewardScaling: 1.5,
  },
]
