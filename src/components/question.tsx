import { useState, useRef, useEffect } from "react";
import type { ApiQuestion } from "../types/quiz";

type QuestionProps = {
  question: ApiQuestion;
  onAnswer: (answer: string) => void;
};

function Question({ question, onAnswer }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);

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

  // Gestion du swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (showExplanation) return;
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || showExplanation) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    // Limite le déplacement pour que la carte reste dans l'écran
    const cardWidth = Math.min(
      cardRef.current?.offsetWidth || 0,
      window.innerWidth * 0.8
    );
    const screenWidth = window.innerWidth;
    const margin = 24; // marge de sécurité
    // Limite stricte pour que la carte reste entièrement visible
    const maxOffset = (screenWidth - cardWidth) / 2 - margin;
    const minOffset = -((screenWidth - cardWidth) / 2 - margin);
    const limitedDiff = Math.max(minOffset, Math.min(diff, maxOffset));
    setDragOffset(limitedDiff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || showExplanation) return;
    const threshold = 100; // Distance minimale pour valider le swipe

    if (Math.abs(dragOffset) > threshold) {
      const answer = dragOffset > 0 ? "Vrai" : "Faux";
      setSelectedAnswer(answer);
      setShowExplanation(true);
    }

    setDragOffset(0);
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (showExplanation) return;
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || showExplanation) return;
    const currentX = e.clientX;
    const diff = currentX - startXRef.current;
    // Limite le déplacement pour que la carte reste dans l'écran
    const cardWidth = Math.min(
      cardRef.current?.offsetWidth || 0,
      window.innerWidth * 0.8
    );
    const screenWidth = window.innerWidth;
    const margin = 24; // marge de sécurité
    // Limite stricte pour que la carte reste entièrement visible
    const maxOffset = (screenWidth - cardWidth) / 2 - margin;
    const minOffset = -((screenWidth - cardWidth) / 2 - margin);
    const limitedDiff = Math.max(minOffset, Math.min(diff, maxOffset));
    setDragOffset(limitedDiff);
  };

  const handleMouseUp = () => {
    if (!isDragging || showExplanation) return;
    const threshold = 100;

    if (Math.abs(dragOffset) > threshold) {
      const answer = dragOffset > 0 ? "Vrai" : "Faux";
      setSelectedAnswer(answer);
      setShowExplanation(true);
    }

    setDragOffset(0);
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging, dragOffset]);

  const getCardStyle = () => {
    let background = "white";
    if (isDragging && !showExplanation) {
      if (dragOffset > 50) {
        background = "#e6ffe5"; // vert clair
      } else if (dragOffset < -50) {
        background = "#ffe5e5"; // rouge clair
      }
    }
    return {
      background,
      borderRadius: "16px",
      padding: "2rem",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: isDragging ? "none" : "all 0.3s ease",
      transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`,
      cursor: showExplanation ? "default" : "grab",
      userSelect: "none" as const,
      touchAction: "pan-y" as const,
    };
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      {/* Layout avec boutons latéraux et card au centre */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: "center",
        }}
      >
        {/* Bouton Faux à gauche, effet image de fond */}
        {!showExplanation && (
          <button
            className="side-answer-button"
            onClick={() => handleAnswerClick("Faux")}
            aria-label="Répondre Faux"
            style={{
              padding: "1.2rem 1rem",
              minWidth: "100px",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.06)",
              background: "linear-gradient(180deg,#fff5f5 0%, #ffecec 100%)",
              color: "#b91c1c",
              fontSize: "1.6rem",
              fontWeight: 700,
              transition: "transform 0.12s ease, box-shadow 0.12s ease",
              boxShadow: "0 8px 18px rgba(185,28,28,0.08)",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
          >
            Faux
          </button>
        )}

        <div
          ref={cardRef}
          style={{
            zIndex: 10,
            ...getCardStyle(),
            flex: showExplanation ? "1" : "0 1 700px",
            maxWidth: showExplanation ? "100%" : "700px",
            width: "100%",
            boxSizing: "border-box",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
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
            style={{
              fontSize: "1.5rem",
              marginBottom: "2rem",
              color: "#2d3748",
            }}
          >
            {question.question}
          </h2>

          {/* Afficher les boutons uniquement si l'explication n'est pas montrée */}
          {!showExplanation && (
            <div
              style={{
                textAlign: "center",
                color: "#94a3b8",
                fontSize: "0.9rem",
                fontStyle: "italic",
                marginTop: "2rem",
              }}
            >
              Glissez la carte ou cliquez sur les boutons
            </div>
          )}

          {showExplanation && (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {choices.map((choice, index) => {
                  const isSelected = selectedAnswer === choice;
                  const isCorrect = choice === question.correctAnswer;
                  const showCorrectness = showExplanation && isSelected;

                  return (
                    <button
                      key={index}
                      disabled={true}
                      style={{
                        padding: "1.25rem 1.5rem",
                        cursor: "default",
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

              <div
                style={{
                  marginTop: "1rem",
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
                <p
                  style={{ margin: 0, color: "#4a5568", marginBottom: "1rem" }}
                >
                  <strong>Explication : </strong>
                  {question.explain}
                </p>
                <p style={{ margin: 0, color: "#667eea", fontStyle: "italic" }}>
                  💡 <strong>Conseil : </strong>
                  {question.tip}
                </p>
              </div>

              <button
                onClick={handleNext}
                style={{
                  marginTop: "2rem",
                  padding: "1rem 2rem",
                  border: "none",
                  borderRadius: "12px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Question suivante →
              </button>
            </>
          )}
        </div>

        {/* Bouton Vrai à droite, effet image de fond */}
        {!showExplanation && (
          <button
            className="side-answer-button"
            onClick={() => handleAnswerClick("Vrai")}
            aria-label="Répondre Vrai"
            style={{
              padding: "1.2rem 1rem",
              minWidth: "100px",
              borderRadius: "12px",
              border: "1px solid rgba(0,0,0,0.06)",
              background: "linear-gradient(180deg,#f0fff4 0%, #e6fff0 100%)",
              color: "#065f46",
              fontSize: "1.6rem",
              fontWeight: 700,
              transition: "transform 0.12s ease, box-shadow 0.12s ease",
              boxShadow: "0 8px 18px rgba(6,95,70,0.06)",
              cursor: "pointer",
              pointerEvents: "auto",
            }}
          >
            Vrai
          </button>
        )}
      </div>
    </div>
  );
}

export default Question;
