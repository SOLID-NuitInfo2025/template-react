import type { VillagerInfo } from "../config/villagers.config";
import type { GameState } from "./GameState";

export interface GameContextType {
  gameState: GameState;
  startGame: () => void;
  startBattle: (battleIndex: number) => void;
  setPlayerPseudo: (pseudo: string) => void;
  completeBattle: (isBattleWon: boolean, villagerId: number) => void;
  selectVillager: (villager: VillagerInfo) => void;
}
