import { useContext } from "react";
import { GameContext } from "../types/GameContext";
import "../styles/dependence-bar.css";

export function DependenceBar() {
  const { gameState } = useContext(GameContext);

  const wins = gameState.battlesWon ?? gameState.completedBattles;
  const total = gameState.battlesCount || 1;
  const remainingPct = Math.max(0, Math.min(100, 100 - (wins / total) * 100));
  const getPercentage = (value: number, total: number) => {
    console.log(value, total);
    return ((total - value) / total) * 100;
  };

  return (
    <div className="dependence-bar">
      <div className="dependence-label">
        Influence des Big Tech {getPercentage(wins, total).toFixed(0)}%
      </div>
      <div
        className="dependence-track"
        role="progressbar"
        aria-label="Niveau de dépendance"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={total - wins}
        title={`Dépendance: ${Math.round(remainingPct)}%`}
      >
        <div
          className="dependence-fill"
          style={{ width: `${remainingPct}%` }}
        />
      </div>
    </div>
  );
}
