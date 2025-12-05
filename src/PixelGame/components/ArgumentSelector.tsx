import type { Argument } from "../types/Argument";

export function ArgumentSelector({
  args,
  selectArgument,
}: {
  args?: Argument[];
  selectArgument: (argument: Argument) => void;
}) {
  return (
    <div className="argument-selector">
      {args?.map((arg) => (
        <button
          onClick={() => selectArgument(arg)}
          className="argument-selector-button"
        >
          {arg.label}
        </button>
      ))}
    </div>
  );
}
