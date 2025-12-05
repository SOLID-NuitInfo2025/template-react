import React, { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [dir, setDir] = useState<Direction>("RIGHT");
  const [running, setRunning] = useState(true);
const [headAngle, setHeadAngle] = useState(Math.PI);

  // Config du jeu
  const tileSize = 32;
  const tiles = 22; // 20 x 20 cases
  const speed = 100; // ms par mouvement

    // 🔥 Chargement images
  const headImg = useRef<HTMLImageElement>(new Image());
  const bodyImg = useRef<HTMLImageElement>(new Image());
  const appleImg = useRef<HTMLImageElement>(new Image());

    useEffect(() => {
    headImg.current.src = "../assets/snake/snakehead.png";
    bodyImg.current.src = "../assets/snake/snakebody.png";
    appleImg.current.src = "../assets/snake/apple.png";

  }, []);

  // Placement aléatoire de nourriture
  const randomFood = () => {
    return {
      x: Math.floor(Math.random() * tiles),
      y: Math.floor(Math.random() * tiles)
    };
  };

  const drawRotatedImage = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    x: number,
    y: number,
    size: number,
    angle: number
  ) => {
    ctx.save();
    ctx.translate(x + size / 2, y + size / 2);
    ctx.rotate(angle);
    ctx.drawImage(img, -size / 2, -size / 2, size, size);
    ctx.restore();
  };


  const getBodyAngle = (current: Point, next: Point) => {
    if (next.x > current.x) return 0; // RIGHT
    if (next.x < current.x) return Math.PI; // LEFT
    if (next.y > current.y) return Math.PI / 2; // DOWN
    if (next.y < current.y) return -Math.PI / 2; // UP
    return 0;
  };


  // const directionToAngle = (d: Direction) => {
  //   switch (d) {
  //     case "UP": return -Math.PI / 2;
  //     case "DOWN": return Math.PI / 2;
  //     case "LEFT": return Math.PI;
  //     case "RIGHT": return 0;
  //   }
  // };

  // Gestion des touches
// Gestion des touches
useEffect(() => {
  const handleKey = (e: KeyboardEvent) => {
    setDir((currentDir) => {
      switch (e.key) {
        case "ArrowUp":
          if (currentDir !== "DOWN") {
            setHeadAngle(Math.PI / 2); // tête vers le bas
            
            return "UP";
          }
          break;
        case "ArrowDown":
          if (currentDir !== "UP") {
            setHeadAngle(-Math.PI / 2); // tête vers le haut

            return "DOWN";
          }
          break;
        case "ArrowLeft":
          if (currentDir !== "RIGHT") {
            setHeadAngle(0); // tête vers la droite

            return "LEFT";
          }
          break;
        case "ArrowRight":
          if (currentDir !== "LEFT") {
            setHeadAngle(Math.PI); // tête vers la gauche
            
            return "RIGHT";
          }
          break;
      }
      return currentDir; // sinon on garde la direction actuelle
    });
  };

  window.addEventListener("keydown", handleKey);
  return () => window.removeEventListener("keydown", handleKey);
}, []);


  // Mécanique du jeu
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const head = prev[0];
        let newHead = { ...head };

        // déplacement
        if (dir === "UP"){
            newHead.y -= 1;
            //drawRotatedImage(ctx, headImg.current, px, py, tileSize, angle);
            //Ici tourne la tete non ? 
        } 
        else if (dir === "DOWN") {
            newHead.y += 1;}

        else if (dir === "LEFT") {
            newHead.x -= 1;}

        else if (dir === "RIGHT") {
            newHead.x += 1;
        }
        // Check collision murs
        if (
          newHead.x < 0 ||
          newHead.x >= tiles ||
          newHead.y < 0 ||
          newHead.y >= tiles
        ) {
          setRunning(false);
          return prev;
        }

        // Check collision corps
        if (prev.some((p) => p.x === newHead.x && p.y === newHead.y)) {
          setRunning(false);
          return prev;
        }

        let newSnake = [newHead, ...prev];

        // Manger
        if (newHead.x === food.x && newHead.y === food.y) {
          setFood(randomFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [dir, food, running]);

  // Dessin du jeu
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // snake
    snake.forEach((segment, index) => {
      // const img = index === 0 ? headImg.current : bodyImg.current;

 const px = segment.x * tileSize;
const py = segment.y * tileSize;

if (index === 0) {
  // 🔥 tête orientée selon direction
  drawRotatedImage(ctx, headImg.current, px, py, tileSize, headAngle);
} else {
  // 🔥 angle du corps basé sur segment suivant
  const next = snake[index - 1];
  const angle = getBodyAngle(segment, next);

  drawRotatedImage(ctx, bodyImg.current, px, py, tileSize, angle);
}

    });


if (appleImg.current.complete) {
  drawRotatedImage(ctx, appleImg.current, food.x * tileSize, food.y * tileSize, tileSize, 0);
} else {
  // fallback si l'image n'est pas encore chargée
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);
}
    if (!running) {
      ctx.fillStyle = "white";
      ctx.font = "24px Arial";
      ctx.fillText("Game Over", 50, 200);
    }
  }, [snake, food, running]);

  const restart = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDir("RIGHT");
    setFood(randomFood());
    setRunning(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Snake Game</h2>
      <canvas
        ref={canvasRef}
        width={tileSize * tiles}
        height={tileSize * tiles}
        style={{ border: "2px solid white", background: "#111" }}
      />
      {!running && (
        <button
          onClick={restart}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px"
          }}
        >
          Rejouer
        </button>
      )}
    </div>
  );
};

export default SnakeGame;
