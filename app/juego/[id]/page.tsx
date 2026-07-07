import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GAMES } from '../../data/games'
import { getScoresByGame } from '../../data/scores'

export default async function JuegoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const game = GAMES.find((g) => g.id === id)
  if (!game) notFound()

  const scores = getScoresByGame(id)

  const rankClass = (rank: number) =>
    rank === 1 ? 'top1' : rank === 2 ? 'top2' : rank === 3 ? 'top3' : ''

  return (
    <div className="av-detail">
      <div>
        <div className="detail-cover">
          <div className={`cover-bg ${game.coverClass}`} style={{ position: 'absolute', inset: 0 }} />
        </div>

        <div className="detail-info" style={{ marginTop: '24px' }}>
          <h2 className={`neon-${game.color}`}>{game.title}</h2>
          <div className="detail-tags">
            <span>{game.category}</span>
            <span>ARCADE VAULT</span>
          </div>
          <p>{game.longDescription}</p>
          <div className="stat-strip">
            <div>
              <div className="l">MEJOR SCORE</div>
              <div className="v">{game.bestScore.toLocaleString()}</div>
            </div>
            <div>
              <div className="l">PARTIDAS</div>
              <div className="v">{game.playCount.toLocaleString()}</div>
            </div>
            <div>
              <div className="l">JUGADORES</div>
              <div className="v">{scores.length}</div>
            </div>
          </div>
          <div className="detail-actions">
            <Link href={`/juego/${id}/jugar`}>
              <button className="btn pulse lg">▶ JUGAR</button>
            </Link>
            <Link href="/games">
              <button className="btn ghost">← VOLVER</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="leaderboard">
        <h3>TOP SCORES</h3>
        {scores.map((entry) => (
          <div key={entry.rank} className={`lb-row ${rankClass(entry.rank)}`}>
            <span className="rk">#{entry.rank}</span>
            <span className="pl">{entry.playerName}</span>
            <span className="sc">{entry.score.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
