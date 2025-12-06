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
    intro: "Moi j'aime bien windows, c'est mon ami de tout les jours",
    imageUrl: "/src/assets/pixelgame/villagers/gaulois1.png",
    hoverImageUrl: "/src/assets/pixelgame/villagers/gaulois1_hover.png",
    menace: THREATS[0],
    healthPoints: 50,
    maxHealthPoints: 100,
  },
  {
    id: 2,
    name: "Borin",
    position: { xPercent: 31, yPercent: 48 },
    intro: "Je stock tout en ligne pour y accéder facilement depuis partout",
    imageUrl: "/src/assets/pixelgame/villagers/gaulois2.png",
    hoverImageUrl: "/src/assets/pixelgame/villagers/gaulois2_hover.png",
    menace: THREATS[1],
    healthPoints: 50,
    maxHealthPoints: 100,
  },
  {
    id: 3,
    name: "Céleste",
    position: { xPercent: 40, yPercent: 80 },
    intro: "J'aime bien Iphone",
    imageUrl: "/src/assets/pixelgame/villagers/gaulois3.png",
    hoverImageUrl: "/src/assets/pixelgame/villagers/gaulois3_hover.png",
    menace: THREATS[2],
    healthPoints: 50,
    maxHealthPoints: 100,
  },
  {
    id: 4,
    name: "Darius",
    position: { xPercent: 70, yPercent: 68 },
    intro: "J'ai des pubs tout les jours",
    imageUrl: "/src/assets/pixelgame/villagers/gaulois4.png",
    hoverImageUrl: "/src/assets/pixelgame/villagers/gaulois4_hover.png",
    menace: THREATS[3],
    healthPoints: 50,
    maxHealthPoints: 100,
  },
];
