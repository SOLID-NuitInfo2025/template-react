import type { VillagerInfo } from "../config/villagers.config";
import "../styles/villager-dialog.css";

type VillagerDialogProps = {
  villager?: VillagerInfo;
  actionLabel: string;
  onAction: () => void;
};

export function VillagerDialog({
  villager,
  actionLabel,
  onAction,
}: VillagerDialogProps) {
  return (
    <div
      className="villager-dialog"
      role="group"
      aria-label="Dialogue villageois"
    >
      <img
        className="villager-dialog__avatar"
        src={villager?.imageUrl}
        alt="Villageois"
      />
      <div className="villager-dialog__box">
        <p className="villager-dialog__text">{villager?.intro}</p>
        <button className="villager-dialog__button" onClick={onAction}>
          {actionLabel}
        </button>
      </div>
    </div>
  );
}
