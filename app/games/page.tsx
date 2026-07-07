import Link from 'next/link'
import { GAMES } from '../data/games'

const CATEGORIES = ['TODOS', 'ARCADE', 'PUZZLE', 'SHOOTER', 'VERSUS'] as const

export default function BibliotecaPage() {
  return (
    <>
      <section className="av-hero">
        <h1 className="flicker">ARCADE VAULT</h1>
        <div className="sub">
          INSERTA UNA MONEDA PARA JUGAR <span className="blink">_</span>
        </div>
      </section>

      <div className="av-filters">
        <div className="av-search">
          <span className="ico">⌕</span>
          <input type="text" placeholder="Buscar un juego por nombre…" readOnly />
        </div>
        <div className="av-chips">
          {CATEGORIES.map((cat) => (
            <button key={cat} className={`chip${cat === 'TODOS' ? ' active' : ''}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="av-grid">
        {GAMES.map((game) => (
          <Link key={game.id} href={`/juego/${game.id}`} style={{ textDecoration: 'none' }}>
            <div className="card">
              <div className="cover">
                <div className={`cover-bg ${game.coverClass}`} />
                <span className="label">{game.category}</span>
              </div>
              <div className="meta">
                <div className="title">{game.title}</div>
                <div className="desc">{game.description}</div>
                <div className="row">
                  <div className="score-badge">
                    <span>MEJOR PUNTUACIÓN</span>
                    <b>{game.bestScore.toLocaleString('es-ES')}</b>
                  </div>
                  <button className={`btn${game.color === 'magenta' ? ' magenta' : game.color === 'yellow' ? ' yellow' : ''}`}>
                    JUGAR
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}
