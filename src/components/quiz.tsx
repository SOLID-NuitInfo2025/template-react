import { useState, useEffect } from "react";
import { fetchQuestions } from "../services/api";
import type { ApiQuestion, QuizState } from "../types/quiz";
import Question from "./question";

function Quiz() {
  const [questions, setQuestions] = useState<ApiQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    currentIndex: 0,
    score: 0,
    showResult: false,
    impacts: {
      viePrivee: 0,
      donnees: 0,
      argent: 0,
      securite: 0,
      dependance: 0,
      durabilite: 0,
    },
  });

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const data = await fetchQuestions();
        setQuestions(data.questions);
        setError(null);
      } catch (err) {
        setError(
          "Impossible de charger les questions. Veuillez réessayer plus tard."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  const handleAnswer = (userAnswer: string) => {
    const currentQuestion = questions[quizState.currentIndex];
    const isCorrect = userAnswer === currentQuestion.correctAnswer;

    // Calculer les impacts si la réponse est incorrecte
    const newImpacts = { ...quizState.impacts };
    if (!isCorrect) {
      Object.entries(currentQuestion.impact).forEach(([key, value]) => {
        if (value !== undefined && key in newImpacts) {
          newImpacts[key as keyof typeof newImpacts] += value;
        }
      });
    }

    const newScore = isCorrect ? quizState.score + 1 : quizState.score;
    const nextIndex = quizState.currentIndex + 1;

    if (nextIndex < questions.length) {
      setQuizState({
        ...quizState,
        currentIndex: nextIndex,
        score: newScore,
        impacts: newImpacts,
      });
    } else {
      setQuizState({
        ...quizState,
        score: newScore,
        showResult: true,
        impacts: newImpacts,
      });
    }
  };

  const restart = () => {
    setQuizState({
      currentIndex: 0,
      score: 0,
      showResult: false,
      impacts: {
        viePrivee: 0,
        donnees: 0,
        argent: 0,
        securite: 0,
        dependance: 0,
        durabilite: 0,
      },
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Chargement des questions...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "red" }}>
        <h2>Erreur</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Réessayer</button>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Aucune question disponible</h2>
      </div>
    );
  }

  return (
    <div>
      {!quizState.showResult ? (
        <div>
          <div style={{ marginBottom: "1rem", color: "#666" }}>
            Question {quizState.currentIndex + 1} / {questions.length}
          </div>
          <Question
            question={questions[quizState.currentIndex]}
            onAnswer={handleAnswer}
          />
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Quiz terminé !</h2>
          <p style={{ fontSize: "1.5rem", margin: "1rem 0" }}>
            Score : {quizState.score} / {questions.length}
          </p>
          <p style={{ fontSize: "1.2rem" }}>
            ({Math.round((quizState.score / questions.length) * 100)}%)
          </p>

          <div
            style={{
              marginTop: "2rem",
              textAlign: "left",
              maxWidth: "600px",
              margin: "2rem auto",
            }}
          >
            <h3>Impacts de vos réponses incorrectes :</h3>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {quizState.impacts.viePrivee !== 0 && (
                <li style={{ padding: "0.5rem 0" }}>
                  🔒 Vie Privée : {quizState.impacts.viePrivee}
                </li>
              )}
              {quizState.impacts.donnees !== 0 && (
                <li style={{ padding: "0.5rem 0" }}>
                  📊 Données personnelles : {quizState.impacts.donnees}
                </li>
              )}
              {quizState.impacts.argent !== 0 && (
                <li style={{ padding: "0.5rem 0" }}>
                  💰 Profits Big Tech : {quizState.impacts.argent}
                </li>
              )}
              {quizState.impacts.securite !== 0 && (
                <li style={{ padding: "0.5rem 0" }}>
                  🛡️ Sécurité : {quizState.impacts.securite}
                </li>
              )}
              {quizState.impacts.dependance !== 0 && (
                <li style={{ padding: "0.5rem 0" }}>
                  🔗 Dépendance : {quizState.impacts.dependance}
                </li>
              )}
              {quizState.impacts.durabilite !== 0 && (
                <li
                  style={{
                    padding: "0.5rem 0",
                    color:
                      quizState.impacts.durabilite > 0 ? "green" : "inherit",
                  }}
                >
                  🌍 Durabilité : {quizState.impacts.durabilite > 0 ? "+" : ""}
                  {quizState.impacts.durabilite}
                </li>
              )}
            </ul>
          </div>

          <button
            onClick={restart}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.1rem",
              cursor: "pointer",
              borderRadius: "8px",
              border: "none",
              background: "#667eea",
              color: "white",
              marginTop: "1rem",
            }}
          >
            Recommencer
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
