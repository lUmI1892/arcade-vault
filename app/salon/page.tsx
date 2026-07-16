"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { GameRow, ScoreRow } from "@/lib/supabase/types";

const rankClass = (rank: number) =>
  rank === 1 ? "top1" : rank === 2 ? "top2" : rank === 3 ? "top3" : "";

export default function SalonPage() {
  const [games, setGames] = useState<GameRow[]>([]);
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [scores, setScores] = useState<ScoreRow[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("games")
      .select("*")
      .returns<GameRow[]>()
      .then(({ data }) => {
        const list = data ?? [];
        setGames(list);
        if (list.length > 0) setActiveGame(list[0].id);
      });
  }, []);

  useEffect(() => {
    if (!activeGame) return;
    const supabase = createClient();
    supabase
      .from("scores")
      .select("*")
      .eq("game_id", activeGame)
      .order("score", { ascending: false })
      .limit(12)
      .returns<ScoreRow[]>()
      .then(({ data }) => setScores(data ?? []));
  }, [activeGame]);

  const top3 = scores.slice(0, 3);

  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumSlots = [
    { entry: podiumOrder[0], cls: "silver", num: "#2" },
    { entry: podiumOrder[1], cls: "gold", num: "#1" },
    { entry: podiumOrder[2], cls: "bronze", num: "#3" },
  ];

  return (
    <div className="av-hall">
      <div className="hall-head">
        <h1>SALÓN DE LA FAMA</h1>
        <p>Los mejores jugadores de Arcade Vault</p>
      </div>

      <div className="hall-tabs">
        {games.map((game) => (
          <button
            key={game.id}
            className={`chip${activeGame === game.id ? " active" : ""}`}
            onClick={() => setActiveGame(game.id)}
          >
            {game.title}
          </button>
        ))}
      </div>

      {scores.length === 0 ? (
        <p
          className="lb-empty"
          style={{ textAlign: "center", marginTop: "3rem" }}
        >
          Sé el primero en entrar al salón de la fama
        </p>
      ) : (
        <>
          <div className="podium">
            {podiumSlots.map(({ entry, cls, num }, i) =>
              entry ? (
                <div key={i} className={`podium-slot ${cls}`}>
                  <div className="rank-num">{num}</div>
                  <div className="name">{entry.player_name}</div>
                  <div className="score">{entry.score.toLocaleString()}</div>
                </div>
              ) : (
                <div
                  key={i}
                  className={`podium-slot ${cls}`}
                  style={{ opacity: 0.3 }}
                >
                  <div className="rank-num">{num}</div>
                </div>
              ),
            )}
          </div>

          <div className="hall-table">
            <div className="th">
              <span>RANK</span>
              <span>JUGADOR</span>
              <span>SCORE</span>
            </div>
            {scores.map((entry, i) => (
              <div key={entry.id} className={`tr ${rankClass(i + 1)}`}>
                <span className="rk">#{i + 1}</span>
                <span className="pl">{entry.player_name}</span>
                <span className="sc">{entry.score.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
