import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Game } from "./PixelGame/Game";
import Quiz from "./components/quiz";
import Home from "./Home";
import SnakeGame from "./SnakeGame/SnakeGame";

import SecretEventListener from "./SnakeGame/SecretEventListener";
import Login from "./login/Login";
import Register from "./register/Register";

function App() {
  return (
    <>
      <SecretEventListener sequence="snake" to="/secret-snake" />
      <Routes>
        <Route path="/pixelgame" element={<Game />} />
         <Route path="/secret-snake" element={<SnakeGame />} />

        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
