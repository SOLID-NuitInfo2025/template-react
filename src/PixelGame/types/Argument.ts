import type { ArgumentType } from "./ArgumentType";
import type { CounterArgumentType } from "./CounterArgumentType";

export interface Argument {
  label: string;
  type: ArgumentType;
  counterType: CounterArgumentType;
}
