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
      <p>
        Bienvenue dans le <strong>Village Numérique Résistant</strong> !<br />
        <br />
        Ton objectif est de convaincre tous les villageois d’adopter les
        principes du <strong>NIRD</strong> : un numérique plus libre, plus
        durable et plus responsable.
        <br />
        <br />
        Chaque villageois te présente une menace numérique sous forme de duel.
        Pour gagner un combat, choisis l’argument qui répond le mieux à la
        menace. <br />
        <br />
        Une victoire <strong>réduit la dépendance</strong> du village et fait
        progresser ta barre de conviction. Une défaite n’est jamais finale :
        elle ne fait <strong>pas reculer</strong> la progression, tu peux
        toujours réessayer !<br />
        <br />
        Pour remporter la partie, ta barre doit atteindre{" "}
        <strong>0% de dépendance</strong>… et ainsi convaincre l’ensemble du
        village.
      </p>
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
