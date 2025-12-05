import type { VillagerInfo } from "../config/villagers.config";
import { useState } from "react";

export function Villager({
  villager,
  onClick,
}: {
  villager: VillagerInfo;
  onClick?: () => void;
}) {
  const [isHover, setIsHover] = useState(false);
  return (
    <img
      className="villager"
      title={villager.name}
      alt={villager.name}
      src={
        isHover && villager.hoverImageUrl && !villager.isVisited
          ? villager.hoverImageUrl
          : villager.imageUrl
      }
      style={{
        top: `${villager.position.yPercent}%`,
        left: `${villager.position.xPercent}%`,
        width: "320px",
        height: "320px",
        animationDelay: `${(villager.id % 5) * 0.15}s`,
        filter: villager.isVisited
          ? "grayscale(100%) brightness(0.8)"
          : undefined,
        pointerEvents: villager.isVisited ? "none" : "auto",
        cursor: villager.isVisited ? "default" : "pointer",
      }}
      onClick={villager.isVisited ? undefined : onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      aria-disabled={villager.isVisited}
    />
  );
}
