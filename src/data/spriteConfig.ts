export interface SpriteConfig {
  charName: string
  idleFrames: number
  attackFrames: number
  deathFrames: number
}

export const SPRITE_CONFIGS: Record<string, SpriteConfig> = {
  goblin:       { charName: 'Goblin',          idleFrames: 18, attackFrames: 12, deathFrames: 15 },
  zombie:       { charName: 'Zombie_Villager',  idleFrames: 18, attackFrames: 12, deathFrames: 15 },
  skeleton:     { charName: 'Skeleton_Warrior', idleFrames: 18, attackFrames: 12, deathFrames: 15 },
  orc:          { charName: 'Orc',              idleFrames: 18, attackFrames: 12, deathFrames: 15 },
  minotaur:     { charName: 'Minotaur',         idleFrames: 18, attackFrames: 12, deathFrames: 15 },
  golem:        { charName: 'Golem',            idleFrames: 18, attackFrames: 12, deathFrames: 15 },
  fallen_angel: { charName: 'Fallen_Angels',    idleFrames: 18, attackFrames: 12, deathFrames: 15 },
  dark_oracle:  { charName: 'Dark_Oracle',      idleFrames: 18, attackFrames: 12, deathFrames: 15 },
}

const ANIM_FOLDER_NAME = { idle: 'Idle', attack: 'Slashing', death: 'Dying' } as const

export function getSpriteUrl(
  monsterId: string,
  animType: 'idle' | 'attack' | 'death',
  frame: number,
): string {
  const config = SPRITE_CONFIGS[monsterId]
  if (!config) return ''
  const frameStr = String(frame).padStart(3, '0')
  return `/sprites/${monsterId}/${animType}/0_${config.charName}_${ANIM_FOLDER_NAME[animType]}_${frameStr}.png`
}
