import type { Argument } from "./Argument";

export interface Entity {
  name?: string;
  lifePoints: number;
  arguments: Argument[];
}
