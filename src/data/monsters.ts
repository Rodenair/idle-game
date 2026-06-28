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
    id: 'goblin',
    name: 'Goblin',
    emoji: '👺',
    baseHp: 10,
    hpScaling: 1.15,
    baseScrapReward: 25,
    basePartsReward: 2,
    rewardScaling: 1.15,
  },
  {
    id: 'zombie',
    name: 'Zombie Villager',
    emoji: '🧟',
    baseHp: 25,
    hpScaling: 1.18,
    baseScrapReward: 55,
    basePartsReward: 5,
    rewardScaling: 1.18,
  },
  {
    id: 'skeleton',
    name: 'Skeleton Warrior',
    emoji: '💀',
    baseHp: 75,
    hpScaling: 1.20,
    baseScrapReward: 130,
    basePartsReward: 12,
    rewardScaling: 1.20,
  },
  {
    id: 'orc',
    name: 'Orc',
    emoji: '👹',
    baseHp: 250,
    hpScaling: 1.22,
    baseScrapReward: 350,
    basePartsReward: 28,
    rewardScaling: 1.22,
  },
  {
    id: 'minotaur',
    name: 'Minotaur',
    emoji: '🐂',
    baseHp: 800,
    hpScaling: 1.25,
    baseScrapReward: 900,
    basePartsReward: 70,
    rewardScaling: 1.25,
  },
  {
    id: 'golem',
    name: 'Golem',
    emoji: '🗿',
    baseHp: 3000,
    hpScaling: 1.28,
    baseScrapReward: 3000,
    basePartsReward: 200,
    rewardScaling: 1.28,
  },
  {
    id: 'fallen_angel',
    name: 'Fallen Angel',
    emoji: '😈',
    baseHp: 12000,
    hpScaling: 1.32,
    baseScrapReward: 12000,
    basePartsReward: 650,
    rewardScaling: 1.32,
  },
  {
    id: 'dark_oracle',
    name: 'Dark Oracle',
    emoji: '🔮',
    baseHp: 60000,
    hpScaling: 1.42,
    baseScrapReward: 50000,
    basePartsReward: 2500,
    rewardScaling: 1.42,
  },
]
