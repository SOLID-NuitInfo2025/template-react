import { villagersConfig } from "../config/villagers.config";
import type { GameState } from "../types/GameState";

export const INITIAL_GAME_STATE: GameState = {
  isGameStarted: false,
  playerPseudo: "",
  completedBattles: 0,
  battlesWon: 0,
  battlesCount: 4,
  villagers: villagersConfig,
};

export const STORAGE_KEY = "developer_battle_data";
