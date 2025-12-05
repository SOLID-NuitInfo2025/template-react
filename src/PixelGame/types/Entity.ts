import type { Argument } from "./Argument";

export interface Entity {
  name?: string;
  arguments: Argument[];
  spriteUrl?: string;
}
