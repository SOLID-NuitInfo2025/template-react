import type { VillagerInfo } from "../config/villagers.config";

export interface GameState {
  isGameStarted: boolean;
  playerPseudo: string;
  completedBattles: number;
  villagers: VillagerInfo[];
  selectedVillager?: VillagerInfo;
  battlesWon: number;
  battlesCount: number;
}
