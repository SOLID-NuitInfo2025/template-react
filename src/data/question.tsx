const questions = [
  {
    question: "Quel est le langage utilisé par React ?",
    choices: ["Java", "TypeScript", "C++", "Swift"],
    answer: 1,
    impact: { viePrivee: -5, donnees: -3, argent: 0, securite: 0, dependance: 0, durabilite: 0 },
  },
  {
    question: "React est principalement utilisé pour :",
    choices: [
      "La création de bases de données",
      "Le développement d’interfaces utilisateur",
      "La cybersécurité",
      "La création de jeux vidéo",
    ],
    answer: 1,
    impact: { viePrivee: -8, donnees: 0, argent: 0, securite: 0, dependance: 0, durabilite: 0 },
  },
  {
    question: "Quel hook permet de gérer l'état dans un composant ?",
    choices: ["useFetch", "useEvent", "useState", "useService"],
    answer: 2,
    impact: { viePrivee: 0, donnees: -2, argent: 0, securite: 0, dependance: 0, durabilite: 0 },
  },
];

export default questions;
