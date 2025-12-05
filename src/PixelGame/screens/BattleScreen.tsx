import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { GameContext } from "../types/GameContext";
import { VillagerDialog } from "../components/VillagerDialog";
import "../styles/battle.css";
import "../styles/village.css";
import { ArgumentSelector } from "../components/ArgumentSelector";

// Types distincts
import type { Argument } from "../types/Argument"; // attaque de la menace
import { PLAYER } from "../config/player.config";

const DAMAGE_GOOD = 18.75;
const DAMAGE_BAD = DAMAGE_GOOD / 2;
const DAMAGE_ENEMY = DAMAGE_GOOD / 3;

export function BattleScreen({
  onContinue,
}: {
  onContinue: (isBattleWon: boolean, villagerId: number | undefined) => void;
}) {
  const { gameState } = useContext(GameContext);
  const [textSkipped, setTextSkipped] = useState(false);

  const villager = gameState.selectedVillager;
  const menace = villager?.menace;
  const player = PLAYER; // Player contient PlayerAbility[] dans player.config

  // Vie du villageois en pourcentage (0 = mort, 100 = menace totale)
  const [hp, setHp] = useState<number>(50);
  const [round, setRound] = useState<number>(0);
  // options sont des PlayerAbility (capacités du joueur)
  const [options, setOptions] = useState<Argument[]>([]);

  // 🔧 FIX: Utiliser useMemo pour que l'argument actuel se mette à jour avec round
  const actualMenaceArgument = useMemo(() => {
    if (!menace || !menace.arguments || menace.arguments.length === 0) {
      return undefined;
    }
    return menace.arguments[round % menace.arguments.length];
  }, [menace, round]);

  useEffect(() => {
    if (round > 0) {
      setHp((h) => Math.min(100, Number((h + DAMAGE_ENEMY).toFixed(3))));
    }
  }, [round]);

  // Génère 1 capacité correcte + 2 incorrectes (PlayerAbility)
  const generateArguments = useCallback(() => {
    if (!menace || !player || !player.arguments) return;

    const requiredType = actualMenaceArgument?.counterType;
    if (!requiredType) {
      console.error("Aucun counterType requis trouvé pour la menace.");
      setOptions([]);
      return;
    }

    // Player.arguments est un tableau de PlayerAbility, dont .type est CounterArgumentType
    const correct = player.arguments.find((a) => a.type === requiredType);

    if (!correct) {
      console.warn(
        "Aucune capacité joueur ne correspond au counterType requis:",
        requiredType
      );
      // fallback : choisir 3 aléatoires
      const fallback = player.arguments
        .slice()
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setOptions(fallback);
      return;
    }

    // Deux autres capacités qui n'ont PAS ce type
    const wrong = player.arguments
      .filter((a) => a.type !== requiredType)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const finalChoices = [correct, ...wrong].sort(() => Math.random() - 0.5);
    setOptions(finalChoices);
  }, [menace, player, actualMenaceArgument]);

  // Le joueur choisit une capacité (PlayerAbility)
  const selectArgument = useCallback(
    (ability: Argument) => {
      if (!menace) return;

      const requiredType = actualMenaceArgument?.counterType;
      if (!requiredType) return;

      if (ability.type === requiredType) {
        // Bonne réponse : on inflige DAMAGE_GOOD (réduit la "force" de la menace)
        setHp((h) => Math.max(0, Number((h - DAMAGE_GOOD).toFixed(3))));
      } else {
        // Mauvaise réponse : la menace gagne en puissance (on ajoute DAMAGE_BAD)
        setHp((h) => Math.min(100, Number((h + DAMAGE_BAD).toFixed(3))));
      }

      setRound((r) => r + 1);
      // Laisser un effet regénérer les options et l'UI du tour suivant
    },
    [menace, actualMenaceArgument]
  );

  const startBattle = useCallback(() => {
    setHp(50);
    setRound(0);
    // Les options seront générées via l'effet dépendant de round/menace
  }, []);

  useEffect(() => {
    if (textSkipped) startBattle();
  }, [textSkipped, startBattle]);

  // Regénère les options et met à jour l'attaque affichée quand le tour change
  useEffect(() => {
    generateArguments();
  }, [generateArguments]);

  // Si la menace change (nouveau villageois), réinitialiser le combat proprement
  useEffect(() => {
    if (!menace) return;
    setRound(0);
    setHp(50);
  }, [menace]);

  // Fin de combat
  useEffect(() => {
    if (hp <= 0) {
      // victoire joueur
      alert("🏆 Vous avez vaincu la menace !");
      onContinue(true, villager?.id);
    } else if (hp >= 100) {
      // défaite
      alert("💀 La menace l'emporte...");
      onContinue(false, villager?.id);
    }
  }, [hp, onContinue]);

  return (
    <div className="battle-screen">
      {!textSkipped ? (
        <VillagerDialog
          villager={gameState.selectedVillager}
          actionLabel="Passer"
          onAction={() => setTextSkipped(true)}
        />
      ) : (
        <div className="battle-arena">
          <div className="fighters-container">
            <img
              className="menace-in-battle"
              title={"Player"}
              alt={"Player"}
              src={"/public/assets/pixelgame/player.gif"}
              style={{ width: 320, height: 320 }}
            />
            <img
              className="menace-in-battle"
              title={villager?.name}
              alt={villager?.name ?? "menace"}
              src={villager?.imageUrl}
              style={{
                width: 320,
                height: 320,
                transform: "translateY(-50px)",
              }}
            />
            <img
              className="menace-in-battle"
              title={menace?.name}
              alt={menace?.name ?? "menace"}
              src={menace?.spriteUrl}
              style={{ width: 320, height: 320 }}
            />
          </div>

          <h2>Points du Villageois : {hp.toFixed(2)}%</h2>
          <h3>Tour : {round}</h3>
          <p>{actualMenaceArgument ? actualMenaceArgument.label : ""}</p>

          {/* ArgumentSelector doit accepter PlayerAbility[] */}
          <ArgumentSelector args={options} selectArgument={selectArgument} />
        </div>
      )}
    </div>
  );
}
