"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import AsteroidsGame from "@/app/games/asteroids/_components/AsteroidsGame";
import { createClient } from "@/lib/supabase/client";

export default function AsteroidsPlay({ gameId }: { gameId: string }) {
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [name, setName] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("av_player_name") ?? "";
    }
    return "";
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGameOver = useCallback((score: number) => {
    setFinalScore(score);
    setSaved(false);
    setName(
      typeof window !== "undefined"
        ? (localStorage.getItem("av_player_name") ?? "")
        : "",
    );
  }, []);

  async function handleSave() {
    if (!name.trim() || finalScore === null || saved) return;
    setSaving(true);
    localStorage.setItem("av_player_name", name.trim());
    const supabase = createClient();
    await supabase.from("scores").insert({
      game_id: gameId,
      player_name: name.trim(),
      score: finalScore,
      user_id: null,
    });
    setSaved(true);
    setSaving(false);
  }

  return (
    <>
      <AsteroidsGame onGameOver={handleGameOver} />

      {finalScore !== null && (
        <div className="modal-bd">
          <div className="modal">
            <h2>GAME OVER</h2>
            <div className="final-label">PUNTUACIÓN FINAL</div>
            <div className="final">{finalScore.toLocaleString()}</div>
            <div className="input-row">
              <input
                type="text"
                placeholder="TU NOMBRE"
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={saved}
              />
            </div>
            <div className="actions">
              <button
                className="btn pulse"
                onClick={handleSave}
                disabled={saved || saving || !name.trim()}
              >
                {saved ? "✓ GUARDADO" : saving ? "GUARDANDO…" : "GUARDAR SCORE"}
              </button>
              <Link href={`/juego/${gameId}`}>
                <button className="btn magenta">REINTENTAR</button>
              </Link>
              <Link href="/games">
                <button className="btn ghost">JUEGOS</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
