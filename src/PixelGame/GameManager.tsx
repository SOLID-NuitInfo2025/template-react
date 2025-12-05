// export const SCREENS = {
//   TITLE: "TITLE",
//   MENU: "MENU",
//   LEVEL: "LEVEL",
//   BATTLE: "BATTLE",
//   INTRO: "INTRO",
// };

// const GameManager = () => {
//   const { gameState } = useContext(GameContext);
//   // L'écran par défaut est déterminé en fonction de l'état du jeu
//   const getInitialScreen = () => {
//     if (!gameState.playerPseudo) {
//       return SCREENS.TITLE;
//     }
//     return SCREENS.MENU;
//   };

//   // État pour suivre l'écran actuel
//   const [currentScreen, setCurrentScreen] = useState(getInitialScreen());
//   // État pour suivre les données additionnelles (comme l'index du niveau sélectionné)
//   const [screenData, setScreenData] = useState({});

//   // Fonction pour changer d'écran
//   const navigateTo = (screen, data = {}) => {
//     setCurrentScreen(screen);
//     setScreenData(data);
//   };

//   // Fonction pour revenir à l'écran précédent (historique simple)
//   const goBack = () => {
//     switch (currentScreen) {
//       case SCREENS.BATTLE:
//         navigateTo(SCREENS.LEVEL, { levelIndex: screenData.levelIndex });
//         break;
//       case SCREENS.LEVEL:
//         navigateTo(SCREENS.MENU);
//         break;
//       case SCREENS.MENU:
//         navigateTo(SCREENS.TITLE);
//         break;
//       case SCREENS.TITLE:
//         navigateTo(SCREENS.TITLE);
//       default:
//         break;
//     }
//   };

//   // revenir directement au menu
//   const goToMenu = () => {
//     navigateTo(SCREENS.MENU);
//   };

//   // Rendu conditionnel basé sur l'écran actuel
//   const renderScreen = () => {
//     switch (currentScreen) {
//       case SCREENS.TITLE:
//         return (
//           <TitleScreen
//             onStart={() => navigateTo(SCREENS.INTRO)}
//             onContinue={() => navigateTo(SCREENS.MENU)}
//           />
//         );
//       case SCREENS.INTRO:
//         return <IntroScreen onContinue={() => navigateTo(SCREENS.MENU)} />;
//       case SCREENS.MENU:
//         return (
//           <MenuScreen
//             onSelectLevel={(levelIndex) =>
//               navigateTo(SCREENS.LEVEL, { levelIndex })
//             }
//           />
//         );
//       case SCREENS.LEVEL:
//         return (
//           <LevelScreen
//             levelIndex={screenData.levelIndex}
//             onBack={goBack}
//             onStartBattle={(selectedWeapon) =>
//               navigateTo(SCREENS.BATTLE, {
//                 levelIndex: screenData.levelIndex,
//                 selectedWeapon,
//               })
//             }
//           />
//         );
//       case SCREENS.BATTLE:
//         return (
//           <BattleScreen
//             levelIndex={screenData.levelIndex}
//             selectedWeapon={screenData.selectedWeapon}
//             onBack={goBack}
//             onReturnToMenu={goToMenu}
//           />
//         );
//       default:
//         return <TitleScreen onStart={() => navigateTo(SCREENS.INTRO)} />;
//     }
//   };

//   return <div className="screen">{renderScreen()}</div>;
// };

// export default ScreenManager;
