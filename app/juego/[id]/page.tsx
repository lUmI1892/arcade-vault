import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { GameRow, ScoreRow } from "@/lib/supabase/types";

export default async function JuegoPage({
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

  const { data: scores } = await supabase
    .from("scores")
    .select("*")
    .eq("game_id", id)
    .order("score", { ascending: false })
    .limit(10)
    .returns<ScoreRow[]>();

  const list = scores ?? [];
  const best = list[0]?.score ?? null;

  const rankClass = (rank: number) =>
    rank === 1 ? "top1" : rank === 2 ? "top2" : rank === 3 ? "top3" : "";

  return (
    <div className="av-detail">
      <div>
        <div className="detail-cover">
          <div
            className={`cover-bg ${game.cover}`}
            style={{ position: "absolute", inset: 0 }}
          />
        </div>

        <div className="detail-info" style={{ marginTop: "24px" }}>
          <h2 className={`neon-${game.color}`}>{game.title}</h2>
          <div className="detail-tags">
            <span>{game.cat}</span>
            <span>ARCADE VAULT</span>
          </div>
          <p>{game.long}</p>
          <div className="stat-strip">
            <div>
              <div className="l">MEJOR SCORE</div>
              <div className="v">
                {best !== null ? best.toLocaleString() : "—"}
              </div>
            </div>
            <div>
              <div className="l">JUGADORES</div>
              <div className="v">{list.length}</div>
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
        {list.length === 0 ? (
          <p className="lb-empty">
            Sé el primero en entrar al salón de la fama
          </p>
        ) : (
          list.map((entry, i) => (
            <div key={entry.id} className={`lb-row ${rankClass(i + 1)}`}>
              <span className="rk">#{i + 1}</span>
              <span className="pl">{entry.player_name}</span>
              <span className="sc">{entry.score.toLocaleString()}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
