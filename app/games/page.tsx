import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { GameRow } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const CATEGORIES = ["TODOS", "ARCADE", "PUZZLE", "SHOOTER", "VERSUS"] as const;

export default async function BibliotecaPage() {
  const supabase = await createClient();
  const { data: games, error } = await supabase
    .from("games")
    .select("*")
    .returns<GameRow[]>();

  if (error) console.error("[games/page] Supabase error:", error);

  const list = games ?? [];

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
          <input
            type="text"
            placeholder="Buscar un juego por nombre…"
            readOnly
          />
        </div>
        <div className="av-chips">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`chip${cat === "TODOS" ? " active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="av-grid">
        {list.map((game) => (
          <Link
            key={game.id}
            href={`/juego/${game.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <div className="cover">
                <div className={`cover-bg ${game.cover}`} />
                <span className="label">{game.cat}</span>
              </div>
              <div className="meta">
                <div className="title">{game.title}</div>
                <div className="desc">{game.short}</div>
                <div className="row">
                  <div className="score-badge">
                    <span>MEJOR PUNTUACIÓN</span>
                    <b>—</b>
                  </div>
                  <button
                    className={`btn${game.color === "magenta" ? " magenta" : game.color === "yellow" ? " yellow" : ""}`}
                  >
                    JUGAR
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
