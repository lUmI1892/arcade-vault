import { PLAYERS } from './players'

export type ScoreEntry = {
  rank: number
  playerName: string
  score: number
  date: string
  gameId: string
}

function seededRand(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

const GAME_IDS = [
  'bloque-buster',
  'caida',
  'serpentina',
  'gloton',
  'invasores',
  'rocas',
  'ranaria',
  'duelo-pixel',
]

const BASE_SCORES: Record<string, number> = {
  'bloque-buster': 98400,
  'caida': 234500,
  'serpentina': 45600,
  'gloton': 312800,
  'invasores': 187300,
  'rocas': 93700,
  'ranaria': 67200,
  'duelo-pixel': 54900,
}

function genDate(rand: () => number): string {
  const year = 2025
  const month = Math.floor(rand() * 12) + 1
  const day = Math.floor(rand() * 28) + 1
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`
}

function buildScores(): ScoreEntry[] {
  const all: ScoreEntry[] = []
  GAME_IDS.forEach((gameId, gi) => {
    const rand = seededRand(gi * 31337 + 42)
    const base = BASE_SCORES[gameId]
    const usedPlayers = [...PLAYERS].sort(() => rand() - 0.5).slice(0, 12)
    usedPlayers.forEach((playerName, i) => {
      const factor = 1 - i * 0.07 - rand() * 0.03
      const score = Math.round(base * factor / 100) * 100
      all.push({
        rank: i + 1,
        playerName,
        score,
        date: genDate(rand),
        gameId,
      })
    })
  })
  return all
}

export const SCORES: ScoreEntry[] = buildScores()

export function getScoresByGame(gameId: string): ScoreEntry[] {
  return SCORES.filter(s => s.gameId === gameId)
}
