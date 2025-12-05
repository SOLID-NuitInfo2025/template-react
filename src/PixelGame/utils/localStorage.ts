import type { GameState } from "../types/GameState";
import { STORAGE_KEY } from "./constants";

/**
 * Saves game data to local storage
 * @param gameData The game data to save
 * @returns Success status
 */
export const saveGameData = (gameData: GameState): boolean => {
  try {
    const serializedData = JSON.stringify(gameData);
    localStorage.setItem(STORAGE_KEY, serializedData);
    return true;
  } catch (error) {
    console.error("Failed to save game data:", error);
    return false;
  }
};

/**
 * Loads game data from local storage
 * @returns The loaded game data or null if no data exists
 */
export const loadGameData = (): GameState | null => {
  try {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    if (!serializedData) {
      return null;
    }

    const parsedData: GameState = JSON.parse(serializedData);
    return parsedData;
  } catch (error) {
    console.error("Failed to load game data:", error);
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

/**
 * Clears game data from local storage
 * @returns Success status
 */
export const clearGameData = (): boolean => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Failed to clear game data:", error);
    return false;
  }
};

/**
 * Checks if game data exists in local storage
 * @returns True if game data exists
 */
export const hasGameData = (): boolean => {
  return localStorage.getItem(STORAGE_KEY) !== null;
};
