import { useContext, useState } from "react";
import { GameContext } from "../types/GameContext";
import { VillagerDialog } from "../components/VillagerDialog";

export function BattleScreen({ onContinue }: { onContinue: () => void }) {
  const { gameState } = useContext(GameContext);
  const [textSkipped, setTextSkipped] = useState(false);

  const handleStartGame = () => {
    setTextSkipped(true);
  };
  return (
    <>
      <p>Battle Screen</p>
      <button onClick={onContinue}>Continuer</button>
      {!textSkipped && (
        <VillagerDialog
          villager={gameState.selectedVillager}
          actionLabel={"Passer"}
          onAction={() => handleStartGame()}
        ></VillagerDialog>
      )}
    </>
  );
}
