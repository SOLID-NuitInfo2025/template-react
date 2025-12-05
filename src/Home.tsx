import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const letterDescriptions = {
  n: {
    badge: "N",
    title: "Numérique",
    content: (
      <>
        <p>
          Le <strong>Numérique</strong> représente l'ensemble des technologies
          digitales qui transforment notre société. Il englobe les outils,
          plateformes et innovations qui façonnent notre quotidien et notre
          manière de communiquer, travailler et apprendre.
        </p>
        <p>
          Le numérique est au cœur de la transformation digitale, permettant
          l'accès à l'information, la création de nouveaux services et
          l'amélioration de notre qualité de vie.
        </p>
      </>
    ),
  },
  i: {
    badge: "I",
    title: "Inclusif",
    content: (
      <>
        <p>
          L'<strong>Inclusif</strong> désigne l'engagement à rendre le
          numérique accessible à tous, sans discrimination. Cela inclut
          l'accessibilité pour les personnes en situation de handicap, la
          réduction de la fracture numérique et l'égalité des chances.
        </p>
        <p>
          Un numérique inclusif garantit que chacun, quel que soit son âge,
          son origine, ses capacités ou sa situation géographique, puisse
          bénéficier des opportunités offertes par les technologies.
        </p>
      </>
    ),
  },
  r: {
    badge: "R",
    title: "Responsable",
    content: (
      <>
        <p>
          Le numérique <strong>Responsable</strong> implique une utilisation
          éthique et durable des technologies. Cela englobe la protection de
          l'environnement (réduction de l'empreinte carbone), la sécurité des
          données et le respect de la vie privée.
        </p>
        <p>
          Être responsable signifie aussi développer des solutions qui
          minimisent l'impact écologique, favorisent la sobriété numérique et
          prennent en compte les enjeux sociaux et environnementaux.
        </p>
      </>
    ),
  },
  d: {
    badge: "D",
    title: "Durable",
    content: (
      <>
        <p>
          La <strong>Durabilité</strong> dans le numérique vise à créer des
          systèmes et solutions pérennes qui respectent l'environnement sur le
          long terme. Cela passe par l'écoconception, la réduction des déchets
          électroniques et l'optimisation de la consommation énergétique.
        </p>
        <p>
          Un numérique durable s'inscrit dans une démarche d'avenir,
          garantissant que les innovations d'aujourd'hui ne compromettent pas
          les ressources et le bien-être des générations futures.
        </p>
      </>
    ),
  },
};

function Home() {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter((prev) => (prev === letter ? null : letter));
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="acronym-title">
          <a
            href="#n"
            className="letter-link"
            onClick={() => handleLetterClick("n")}
          >
            N
          </a>
          <a
            href="#i"
            className="letter-link"
            onClick={() => handleLetterClick("i")}
          >
            I
          </a>
          <a
            href="#r"
            className="letter-link"
            onClick={() => handleLetterClick("r")}
          >
            R
          </a>
          <a
            href="#d"
            className="letter-link"
            onClick={() => handleLetterClick("d")}
          >
            D
          </a>
        </h1>
        <p className="subtitle">Découvrez ce que signifie NIRD</p>

        {/* Description affichée uniquement après clic sur une lettre */}
        {selectedLetter !== null && (
          <section
            className="info-card visible"
            style={{ margin: "2rem auto 1.5rem auto", maxWidth: 600 }}
          >
            <div className="letter-badge">
              {letterDescriptions[selectedLetter].badge}
            </div>
            <h2>{letterDescriptions[selectedLetter].title}</h2>
            {letterDescriptions[selectedLetter].content}
          </section>
        )}

        <Link to="/quiz">
          <button className="quiz-button">Tester vos connaissances</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
