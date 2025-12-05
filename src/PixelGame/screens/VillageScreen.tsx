import { useContext } from "react";
import { GameContext } from "../types/GameContext";
import "../styles/village.css";
import { villagersConfig, type VillagerInfo } from "../config/villagers.config";
import { Villager } from "../components/VIllager";
import { DependenceBar } from "../components/DependenceBar";

export function VillageScreen({ onContinue }: { onContinue: () => void }) {
  const { gameState, selectVillager } = useContext(GameContext);

  const handleSelectVillager = (villager: VillagerInfo) => {
    selectVillager(villager);
    onContinue();
  };

  return (
    <div className="village-bg">
      {villagersConfig.map((villager) => (
        <Villager
          key={villager.name}
          villager={villager}
          onClick={() => handleSelectVillager(villager)}
        />
      ))}

      <p className="player-pseudo">{gameState.playerPseudo}</p>
      <DependenceBar />
    </div>
  );
}
