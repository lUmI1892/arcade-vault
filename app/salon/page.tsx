'use client'

import { useState } from 'react'
import { GAMES } from '../data/games'
import { getScoresByGame } from '../data/scores'

const rankClass = (rank: number) =>
  rank === 1 ? 'top1' : rank === 2 ? 'top2' : rank === 3 ? 'top3' : ''

export default function SalonPage() {
  const [activeGame, setActiveGame] = useState(GAMES[0].id)
  const scores = getScoresByGame(activeGame)
  const top3 = scores.slice(0, 3)
  const rest = scores.slice(3)

  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean)
  const podiumSlots = [
    { entry: podiumOrder[0], cls: 'silver', num: '#2' },
    { entry: podiumOrder[1], cls: 'gold', num: '#1' },
    { entry: podiumOrder[2], cls: 'bronze', num: '#3' },
  ]

  return (
    <div className="av-hall">
      <div className="hall-head">
        <h1>SALÓN DE LA FAMA</h1>
        <p>Los mejores jugadores de Arcade Vault</p>
      </div>

      <div className="hall-tabs">
        {GAMES.map((game) => (
          <button
            key={game.id}
            className={`chip${activeGame === game.id ? ' active' : ''}`}
            onClick={() => setActiveGame(game.id)}
          >
            {game.title}
          </button>
        ))}
      </div>

      <div className="podium">
        {podiumSlots.map(({ entry, cls, num }, i) =>
          entry ? (
            <div key={i} className={`podium-slot ${cls}`}>
              <div className="rank-num">{num}</div>
              <div className="name">{entry.playerName}</div>
              <div className="score">{entry.score.toLocaleString()}</div>
              <div className="date">{entry.date}</div>
            </div>
          ) : (
            <div key={i} className={`podium-slot ${cls}`} style={{ opacity: 0.3 }}>
              <div className="rank-num">{num}</div>
            </div>
          )
        )}
      </div>

      <div className="hall-table">
        <div className="th">
          <span>RANK</span>
          <span>JUGADOR</span>
          <span>JUEGO</span>
          <span>SCORE</span>
        </div>
        {scores.map((entry) => (
          <div key={entry.rank} className={`tr ${rankClass(entry.rank)}`}>
            <span className="rk">#{entry.rank}</span>
            <span className="pl">{entry.playerName}</span>
            <span className="dt">{entry.date}</span>
            <span className="sc">{entry.score.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
