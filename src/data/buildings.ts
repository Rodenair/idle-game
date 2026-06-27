export interface BuildingDef {
  id: string
  name: string
  emoji: string
  description: string
  baseCost: number
  costMultiplier: number
  baseScrapPerSec: number
  basePartsPerSec: number
}

export const BUILDINGS: BuildingDef[] = [
  {
    id: 'scrap_heap',
    name: 'Scrap Heap',
    emoji: '🗑️',
    description: 'A pile of junk that slowly drips Scrap Metal.',
    baseCost: 10,
    costMultiplier: 1.15,
    baseScrapPerSec: 0.1,
    basePartsPerSec: 0,
  },
  {
    id: 'robot_factory',
    name: 'Robot Factory',
    emoji: '🏭',
    description: 'Assembles robots that mine Scrap Metal.',
    baseCost: 100,
    costMultiplier: 1.15,
    baseScrapPerSec: 0.5,
    basePartsPerSec: 0,
  },
  {
    id: 'research_lab',
    name: 'Research Lab',
    emoji: '🔬',
    description: 'Studies monster weaknesses. High output of Scrap Metal.',
    baseCost: 500,
    costMultiplier: 1.15,
    baseScrapPerSec: 2.0,
    basePartsPerSec: 0,
  },
  {
    id: 'monster_trap',
    name: 'Monster Trap',
    emoji: '🪤',
    description: 'Captures wandering monsters and harvests their parts.',
    baseCost: 2000,
    costMultiplier: 1.15,
    baseScrapPerSec: 0,
    basePartsPerSec: 0.05,
  },
  {
    id: 'mega_forge',
    name: 'Mega Forge',
    emoji: '⚒️',
    description: 'Transforms raw metal into a flood of Scrap Metal.',
    baseCost: 10000,
    costMultiplier: 1.15,
    baseScrapPerSec: 20.0,
    basePartsPerSec: 0,
  },
]
