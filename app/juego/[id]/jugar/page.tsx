import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GAMES } from '../../../data/games'

export default async function JugarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const game = GAMES.find((g) => g.id === id)
  if (!game) notFound()

  return (
    <div className="av-player">
      <div className="player-hud">
        <div className="hud-stat">
          <span className="l">SCORE</span>
          <span className="v">000000</span>
        </div>
        <div className="hud-stat lives">
          <span className="l">VIDAS</span>
          <span className="v">♥ ♥ ♥</span>
        </div>
        <div className="hud-stat level">
          <span className="l">NIVEL</span>
          <span className="v">01</span>
        </div>
        <div className="hud-actions">
          <button className="btn ghost" style={{ fontSize: '9px', padding: '8px 12px' }}>⏸ PAUSA</button>
          <Link href={`/juego/${id}`}>
            <button className="btn ghost" style={{ fontSize: '9px', padding: '8px 12px' }}>✕ SALIR</button>
          </Link>
        </div>
      </div>

      <div className="crt">
        <div className="crt-screen">
          <div className="game-arena">
            <div className="grid-floor" />
            <div className="player-ship" />
            <div className="enemy e1" />
            <div className="enemy e2" />
            <div className="enemy e3" />
          </div>
        </div>
        <div className="crt-bottom">
          <span className="led">ACTIVO</span>
          <span>{game.title}</span>
          <span>60 FPS</span>
        </div>
      </div>

      <div className="modal-bd">
        <div className="modal">
          <h2>GAME OVER</h2>
          <div className="final-label">PUNTUACIÓN FINAL</div>
          <div className="final">000000</div>
          <div className="input-row">
            <input type="text" placeholder="INGRESA TUS INICIALES" maxLength={3} readOnly />
          </div>
          <div className="actions">
            <button className="btn pulse">GUARDAR SCORE</button>
            <Link href={`/juego/${id}`}>
              <button className="btn magenta">REINTENTAR</button>
            </Link>
            <Link href="/biblioteca">
              <button className="btn ghost">BIBLIOTECA</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
