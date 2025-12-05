import type { Entity } from "../types/Entity";
import { THREATS } from "./menace.config";

export interface VillagerInfo {
  id: number;
  name: string;
  position: { xPercent: number; yPercent: number };
  intro: string;
  imageUrl: string;
  hoverImageUrl?: string;
  menace: Entity;
  healthPoints: number;
  maxHealthPoints: number;
  isVisited?: boolean;
}

export const villagersConfig: VillagerInfo[] = [
  {
    id: 1,
    name: "Ariane",
    position: { xPercent: 70, yPercent: 25 },
    intro: "Bienvenue au village ! Je veille sur la place centrale.",
    imageUrl: "/public/assets/pixelgame/villagers/gaulois1.png",
    hoverImageUrl: "/public/assets/pixelgame/villagers/gaulois1_hover.png",
    menace: THREATS[0],
    healthPoints: 50,
    maxHealthPoints: 100,
  },
  {
    id: 2,
    name: "Borin",
    position: { xPercent: 31, yPercent: 48 },
    intro: "Forgeron du village, je répare vos équipements.",
    imageUrl: "/public/assets/pixelgame/villagers/gaulois2.png",
    hoverImageUrl: "/public/assets/pixelgame/villagers/gaulois2_hover.png",
    menace: THREATS[1],
    healthPoints: 50,
    maxHealthPoints: 100,
  },
  {
    id: 3,
    name: "Céleste",
    position: { xPercent: 40, yPercent: 80 },
    intro: "Herboriste, j'ai toujours quelques remèdes à partager.",
    imageUrl: "/public/assets/pixelgame/villagers/gaulois3.png",
    hoverImageUrl: "/public/assets/pixelgame/villagers/gaulois3_hover.png",
    menace: THREATS[2],
    healthPoints: 50,
    maxHealthPoints: 100,
  },
  {
    id: 4,
    name: "Darius",
    position: { xPercent: 70, yPercent: 68 },
    intro: "Chasseur aguerri, je protège le village des menaces.",
    imageUrl: "/public/assets/pixelgame/villagers/gaulois4.png",
    hoverImageUrl: "/public/assets/pixelgame/villagers/gaulois4_hover.png",
    menace: THREATS[3],
    healthPoints: 50,
    maxHealthPoints: 100,
  },
];
