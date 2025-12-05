import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Game } from "./PixelGame/Game";
import SecretEventListener from "./SnakeGame/SecretEventListener";

function App() {


  return (
    <>
      <SecretEventListener sequence="snake" to="/secret-snake" />
      <Routes>
        <Route path="/pixelgame" element={<Game />} />
        <Route
          path="*"
          element={
            <div>
              Welcome to the App! <Link to="/pixelgame">Go to Pixel Game</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
