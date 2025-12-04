import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { Game } from "./PixelGame/Game";

function App() {
  return (
    <>
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
