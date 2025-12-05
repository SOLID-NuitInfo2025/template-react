import { useContext } from "react";
import { GameContext } from "../types/GameContext";
import "../styles/intro.css";

export function IntroScreen({ onContinue }: { onContinue: () => void }) {
  const { setPlayerPseudo, gameState } = useContext(GameContext);
  const canStart = Boolean(
    gameState.playerPseudo && gameState.playerPseudo.trim().length > 0
  );
  return (
    <div className="intro-container">
      <h1 className="intro-title">NIRD</h1>
      <input
        className="intro-input"
        type="text"
        placeholder="Entrez votre pseudo"
        onChange={(e) => setPlayerPseudo(e.target.value)}
      />
      <button
        className="intro-button"
        onClick={() => {
          if (canStart) onContinue();
        }}
        disabled={!canStart}
        aria-disabled={!canStart}
        title={!canStart ? "Entrez un pseudo pour commencer" : "Commencer"}
      >
        Commencer la partie
      </button>
    </div>
  );
}
