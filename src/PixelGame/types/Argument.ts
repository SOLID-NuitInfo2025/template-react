import type { ArgumentType } from "./ArgumentType";

export interface Argument {
  label: string;
  type: ArgumentType;
  counterType?: ArgumentType;
}
