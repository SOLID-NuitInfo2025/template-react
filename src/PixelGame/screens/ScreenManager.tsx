import React, { useState, useContext } from "react";
import { IntroScreen } from "./IntroScreen";
import { VillageScreen } from "./VillageScreen";
import { BattleScreen } from "./BattleScreen";
import { EndScreen } from "./EndScreen";
import { GameContext } from "../types/GameContext";

const SCREENS = {
  INTRO: "INTRO",
  VILLAGE: "VILLAGE",
  BATTLE: "BATTLE",
  END: "END",
} as const;

export type ScreenType = (typeof SCREENS)[keyof typeof SCREENS];

const ScreenManager: React.FC = () => {
  const { gameState, completeBattle } = useContext(GameContext);

  // L'écran par défaut est déterminé en fonction de l'état du jeu
  const getInitialScreen = (): ScreenType => {
    if (!gameState.playerPseudo) {
      return SCREENS.INTRO;
    }
    return SCREENS.VILLAGE;
  };

  // État pour suivre l'écran actuel
  const [currentScreen, setCurrentScreen] =
    useState<ScreenType>(getInitialScreen);

  const navigateTo = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const finishedBattle = (
    isBattleWon: boolean,
    villagerId: number | undefined
  ) => {
    completeBattle(isBattleWon, villagerId);
    navigateTo(SCREENS.VILLAGE);
  };

  // Rendu conditionnel basé sur l'écran actuel
  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.INTRO:
        return <IntroScreen onContinue={() => navigateTo(SCREENS.VILLAGE)} />;
      case SCREENS.VILLAGE:
        return <VillageScreen onContinue={() => navigateTo(SCREENS.BATTLE)} />;
      case SCREENS.BATTLE:
        return <BattleScreen onContinue={finishedBattle} />;
      case SCREENS.END:
        return <EndScreen onContinue={() => navigateTo(SCREENS.INTRO)} />;
      default:
        return <IntroScreen onContinue={() => navigateTo(SCREENS.VILLAGE)} />;
    }
  };

  return <div className="screen">{renderScreen()}</div>;
};

export default ScreenManager;
