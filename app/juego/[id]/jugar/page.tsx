import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { GameRow } from "@/lib/supabase/types";
import AsteroidsPlay from "./_components/AsteroidsPlay";

export default async function JugarPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: game } = await supabase
    .from("games")
    .select("*")
    .eq("id", id)
    .single<GameRow>();

  if (!game) notFound();

  if (id === "asteroids") {
    return (
      <div className="flex flex-col items-center gap-4 py-6">
        <div className="flex items-center gap-4">
          <Link href={`/juego/${id}`}>
            <button
              className="btn ghost"
              style={{ fontSize: "9px", padding: "8px 12px" }}
            >
              ✕ SALIR
            </button>
          </Link>
        </div>
        <AsteroidsPlay gameId={id} />
      </div>
    );
  }

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
          <button
            className="btn ghost"
            style={{ fontSize: "9px", padding: "8px 12px" }}
          >
            ⏸ PAUSA
          </button>
          <Link href={`/juego/${id}`}>
            <button
              className="btn ghost"
              style={{ fontSize: "9px", padding: "8px 12px" }}
            >
              ✕ SALIR
            </button>
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
    </div>
  );
}
