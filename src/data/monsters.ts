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
    hpScaling: 1.2,
    baseScrapReward: 5,
    basePartsReward: 1,
    rewardScaling: 1.2,
  },
  {
    id: 'zombie',
    name: 'Zombie Villager',
    emoji: '🧟',
    baseHp: 40,
    hpScaling: 1.22,
    baseScrapReward: 18,
    basePartsReward: 3,
    rewardScaling: 1.22,
  },
  {
    id: 'skeleton',
    name: 'Skeleton Warrior',
    emoji: '💀',
    baseHp: 150,
    hpScaling: 1.25,
    baseScrapReward: 60,
    basePartsReward: 8,
    rewardScaling: 1.25,
  },
  {
    id: 'orc',
    name: 'Orc',
    emoji: '👹',
    baseHp: 500,
    hpScaling: 1.28,
    baseScrapReward: 200,
    basePartsReward: 20,
    rewardScaling: 1.28,
  },
  {
    id: 'minotaur',
    name: 'Minotaur',
    emoji: '🐂',
    baseHp: 1500,
    hpScaling: 1.3,
    baseScrapReward: 600,
    basePartsReward: 50,
    rewardScaling: 1.3,
  },
  {
    id: 'golem',
    name: 'Golem',
    emoji: '🗿',
    baseHp: 5000,
    hpScaling: 1.35,
    baseScrapReward: 2000,
    basePartsReward: 150,
    rewardScaling: 1.35,
  },
  {
    id: 'fallen_angel',
    name: 'Fallen Angel',
    emoji: '😈',
    baseHp: 20000,
    hpScaling: 1.4,
    baseScrapReward: 8000,
    basePartsReward: 500,
    rewardScaling: 1.4,
  },
  {
    id: 'dark_oracle',
    name: 'Dark Oracle',
    emoji: '🔮',
    baseHp: 100000,
    hpScaling: 1.5,
    baseScrapReward: 35000,
    basePartsReward: 2000,
    rewardScaling: 1.5,
  },
]
