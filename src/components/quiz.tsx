import { useState, useEffect } from "react";
import { fetchQuestions } from "../services/api";
import type { ApiQuestion, QuizState } from "../types/quiz";
import Question from "./question";
import { Link } from "react-router-dom";

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

  // Ajout de l'état du personnage
  const [character, setCharacter] = useState({
    viePrivee: 0,
    donnees: 0,
    argent: 0,
    securite: 0,
    dependance: 0,
    durabilite: 0,
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
    let newCharacter = { ...character };

    if (!isCorrect) {
      Object.entries(currentQuestion.impact).forEach(([key, value]) => {
        if (value !== undefined && key in newImpacts) {
          // Toujours soustraire la valeur absolue pour l'impact
          newImpacts[key as keyof typeof newImpacts] += -Math.abs(value);
          // Décrémente les points du personnage (toujours soustraire la valeur absolue)
          newCharacter[key as keyof typeof newCharacter] =
            newCharacter[key as keyof typeof newCharacter] - Math.abs(value);
        }
      });
    }

    setCharacter(newCharacter);

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
    setCharacter({
      viePrivee: 0,
      donnees: 0,
      argent: 0,
      securite: 0,
      dependance: 0,
      durabilite: 0,
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
      {/* Bouton Accueil */}
      <div style={{ marginBottom: "1.5rem", textAlign: "left" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <button
            className="quiz-button"
            style={{ marginRight: "1rem" }}
          >
            Accueil
          </button>
        </Link>
      </div>

      {/* Affichage des points de compétences uniquement pendant le quiz */}
      {!quizState.showResult && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>🔒 Vie privée : {character.viePrivee}</div>
          <div>📊 Données : {character.donnees}</div>
          <div>💰 Argent : {character.argent}</div>
          <div>🛡️ Sécurité : {character.securite}</div>
          <div>🔗 Dépendance : {character.dependance}</div>
          <div>🌍 Durabilité : {character.durabilite}</div>
        </div>
      )}
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "70vh" }}>
          <div style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "24px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            padding: "2.5rem 2rem",
            maxWidth: "480px",
            width: "100%",
            color: "white",
            textAlign: "center",
          }}>
            <h2 style={{ fontSize: "2.2rem", marginBottom: "1.2rem", fontWeight: 700, letterSpacing: "1px" }}>Quiz terminé !</h2>
            <div style={{ fontSize: "1.7rem", fontWeight: 600, marginBottom: "0.5rem" }}>
              🏆 Score : <span style={{ color: "#ffe066" }}>{quizState.score} / {questions.length}</span>
            </div>
            <div style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
              <span style={{ background: "rgba(255,255,255,0.15)", borderRadius: "12px", padding: "0.3rem 1rem" }}>
                {Math.round((quizState.score / questions.length) * 100)}%
              </span>
            </div>
            <div style={{ margin: "2rem 0 1.5rem 0", textAlign: "left", background: "rgba(0,0,0,0.10)", borderRadius: "16px", padding: "1.2rem" }}>
              <h3 style={{ fontSize: "1.15rem", marginBottom: "1rem", color: "#ffe066" }}>🌟 Impacts de vos réponses incorrectes :</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {quizState.impacts.viePrivee !== 0 && (
                  <li style={{ padding: "0.5rem 0", fontSize: "1.08rem" }}>
                    🔒 Vie Privée : <span style={{ color: "#f56565", fontWeight: 600 }}>{quizState.impacts.viePrivee}</span>
                  </li>
                )}
                {quizState.impacts.donnees !== 0 && (
                  <li style={{ padding: "0.5rem 0", fontSize: "1.08rem" }}>
                    📊 Données personnelles : <span style={{ color: "#4299e1", fontWeight: 600 }}>{quizState.impacts.donnees}</span>
                  </li>
                )}
                {quizState.impacts.argent !== 0 && (
                  <li style={{ padding: "0.5rem 0", fontSize: "1.08rem" }}>
                    💰 Profits Big Tech : <span style={{ color: "#ecc94b", fontWeight: 600 }}>{quizState.impacts.argent}</span>
                  </li>
                )}
                {quizState.impacts.securite !== 0 && (
                  <li style={{ padding: "0.5rem 0", fontSize: "1.08rem" }}>
                    🛡️ Sécurité : <span style={{ color: "#48bb78", fontWeight: 600 }}>{quizState.impacts.securite}</span>
                  </li>
                )}
                {quizState.impacts.dependance !== 0 && (
                  <li style={{ padding: "0.5rem 0", fontSize: "1.08rem" }}>
                    🔗 Dépendance : <span style={{ color: "#a0aec0", fontWeight: 600 }}>{quizState.impacts.dependance}</span>
                  </li>
                )}
                {quizState.impacts.durabilite !== 0 && (
                  <li style={{ padding: "0.5rem 0", fontSize: "1.08rem" }}>
                    🌍 Durabilité : <span style={{ color: "#38b2ac", fontWeight: 600 }}>{quizState.impacts.durabilite > 0 ? "+" : ""}{quizState.impacts.durabilite}</span>
                  </li>
                )}
              </ul>
            </div>
            <div style={{ margin: "2rem 0 0.5rem 0", fontSize: "1.08rem", color: "#fff", background: "rgba(0,0,0,0.10)", borderRadius: "12px", padding: "1rem" }}>
              Après ce quiz, retenez surtout que vos données personnelles ont de la valeur et qu’elles peuvent être utilisées bien plus que vous ne l’imaginez. Les services gratuits ne le sont jamais vraiment, la sécurité dépend souvent de quelques bons réflexes, et il est possible d’éviter de devenir trop dépendant des grandes entreprises en choisissant des alternatives. Enfin, n’oubliez pas que votre matériel peut souvent durer plus longtemps qu’on le pense : réparer ou réinstaller vaut souvent mieux que remplacer. En bref, gardez le contrôle sur votre vie numérique.
            </div>
            <button
              onClick={restart}
              className="quiz-button"
              style={{ marginTop: "2rem", fontSize: "1.15rem", fontWeight: 600, letterSpacing: "1px" }}
            >
              Recommencer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
