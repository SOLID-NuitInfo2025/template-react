// KeySequenceListener.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SecretEventListenerProps {
  sequence: string;
  to: string;
}

export default function SecretEventListener({ sequence, to }: SecretEventListenerProps) {
  const navigate = useNavigate();
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const newBuffer = (buffer + e.key).slice(-sequence.length);
      setBuffer(newBuffer);

      if (newBuffer === sequence) {
        navigate(to);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [buffer, sequence, navigate, to]);

  return null; // Rien à afficher, c'est un listener invisible
}
