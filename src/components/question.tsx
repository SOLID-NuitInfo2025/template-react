import { useState } from "react";
import type { ApiQuestion } from "../types/quiz";

type QuestionProps = {
  question: ApiQuestion;
  onAnswer: (answer: string) => void;
};

function Question({ question, onAnswer }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const choices = ["Vrai", "Faux"];

  const handleAnswerClick = (choice: string) => {
    setSelectedAnswer(choice);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <div
        style={{
          background: "white",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "0.5rem 1rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            borderRadius: "20px",
            fontSize: "0.9rem",
            fontWeight: 600,
            marginBottom: "1rem",
          }}
        >
          {question.theme}
        </div>

        <h2
          style={{ fontSize: "1.5rem", marginBottom: "2rem", color: "#2d3748" }}
        >
          {question.question}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {choices.map((choice, index) => {
            const isSelected = selectedAnswer === choice;
            const isCorrect = choice === question.correctAnswer;
            const showCorrectness = showExplanation && isSelected;

            return (
              <button
                key={index}
                onClick={() => !showExplanation && handleAnswerClick(choice)}
                disabled={showExplanation}
                style={{
                  padding: "1.25rem 1.5rem",
                  cursor: showExplanation ? "default" : "pointer",
                  borderRadius: "12px",
                  border: `2px solid ${
                    showCorrectness
                      ? isCorrect
                        ? "#48bb78"
                        : "#f56565"
                      : isSelected
                      ? "#667eea"
                      : "#e2e8f0"
                  }`,
                  background: showCorrectness
                    ? isCorrect
                      ? "#f0fff4"
                      : "#fff5f5"
                    : isSelected
                    ? "#f7fafc"
                    : "white",
                  color: "#2d3748",
                  fontSize: "1rem",
                  fontWeight: isSelected ? "600" : "normal",
                  transition: "all 0.3s ease",
                  opacity: showExplanation && !isSelected ? 0.5 : 1,
                }}
              >
                {choice}
                {showCorrectness && (
                  <span style={{ marginLeft: "0.5rem" }}>
                    {isCorrect ? "✓" : "✗"}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              background: "#f7fafc",
              borderRadius: "8px",
              borderLeft: `4px solid ${
                selectedAnswer === question.correctAnswer
                  ? "#48bb78"
                  : "#f56565"
              }`,
            }}
          >
            <p style={{ margin: 0, color: "#4a5568", marginBottom: "1rem" }}>
              <strong>Explication : </strong>
              {question.explain}
            </p>
            <p style={{ margin: 0, color: "#667eea", fontStyle: "italic" }}>
              💡 <strong>Conseil : </strong>
              {question.tip}
            </p>
          </div>
        )}

        {showExplanation && (
          <button
            onClick={handleNext}
            style={{
              marginTop: "2rem",
              padding: "1rem 2rem",
              border: "none",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              width: "100%",
            }}
          >
            Question suivante →
          </button>
        )}
      </div>
    </div>
  );
}

export default Question;
