import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Game } from "./PixelGame/Game";
import Quiz from "./components/quiz";
import Home from "./Home";
import SecretEventListener from "./SnakeGame/SecretEventListener";

function App() {
  return (
    <>
      <SecretEventListener sequence="snake" to="/secret-snake" />
      <Routes>
        <Route path="/pixelgame" element={<Game />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
