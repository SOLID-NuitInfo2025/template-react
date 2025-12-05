export function EndScreen({ onContinue }: { onContinue: () => void }) {
  return (
    <>
      <p>End Screen</p>
      <button onClick={onContinue}>Continuer</button>
    </>
  );
}
