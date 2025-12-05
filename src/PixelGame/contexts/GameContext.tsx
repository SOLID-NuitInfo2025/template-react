import React, { useState, useEffect, useCallback, type ReactNode } from "react";
import type { GameState } from "../types/GameState";
import { INITIAL_GAME_STATE } from "../utils/constants";
import {
  clearGameData,
  loadGameData,
  saveGameData,
} from "../utils/localStorage";
import type { GameContextType } from "../types/GameContextType";
import { GameContext } from "../types/GameContext";
import type { VillagerInfo } from "../config/villagers.config";

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    try {
      const savedData = loadGameData();
      if (savedData) {
        // Merge with defaults to ensure required fields (like villagers) exist
        setGameState((prev) => ({
          ...prev,
          ...savedData,
          // If saved data lacks villagers, fallback to initial config
          villagers:
            (savedData as Partial<GameState>).villagers &&
            Array.isArray((savedData as Partial<GameState>).villagers)
              ? (savedData as GameState).villagers
              : INITIAL_GAME_STATE.villagers,
        }));
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
      clearGameData();
    } finally {
      setIsInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      saveGameData(gameState);
    }
  }, [gameState, isInitialLoad]);

  const startGame = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isGameStarted: true,
    }));
  }, []);

  const setPlayerPseudo = useCallback((pseudo: string) => {
    setGameState((prev) => ({
      ...prev,
      playerPseudo: pseudo,
    }));
  }, []);

  const startBattle = useCallback((battleIndex: number) => {
    setGameState((prev) => ({
      ...prev,
      currentBattleIndex: battleIndex,
    }));
  }, []);

  const completeBattle = useCallback(
    (isBattleWon: boolean, villagerId: number | undefined) => {
      setGameState((prev) => {
        console.log(prev);
        return {
          ...prev,
          completedBattles: isBattleWon
            ? prev.completedBattles + 1
            : prev.completedBattles,
          battlesWon: isBattleWon ? prev.battlesWon + 1 : prev.battlesWon,
          villagers: (prev.villagers && Array.isArray(prev.villagers)
            ? prev.villagers
            : INITIAL_GAME_STATE.villagers
          ).map((villager) =>
            villagerId === villager.id
              ? { ...villager, isVisited: true }
              : villager
          ),
        };
      });
    },
    []
  );

  const selectVillager = useCallback((villager: VillagerInfo) => {
    setGameState((prev) => ({
      ...prev,
      selectedVillager: villager,
    }));
  }, []);

  const contextValue: GameContextType = {
    gameState,
    startBattle,
    startGame,
    setPlayerPseudo,
    completeBattle,
    selectVillager,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};
