import { GameProvider } from "./contexts/GameContext";
import ScreenManager from "./screens/ScreenManager";

export function Game() {
  return (
    <GameProvider>
      <div className="app">
        <ScreenManager />
      </div>
    </GameProvider>
  );
}
