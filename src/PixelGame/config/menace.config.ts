import type { Entity } from "../types/Entity";

export const THREATS: Entity[] = [
  {
    name: "Centurion WinDominator XI",
    arguments: [
      {
        label: "Mise à jour forcée qui ralentit l’ordinateur",
        type: "obsolescence",
        counterType: "linux",
      },
      {
        label: "Panne générale du système (écran bleu)",
        type: "obsolescence",
        counterType: "résilience",
      },
      {
        label: "Licence payante obligatoire pour continuer à l’utiliser",
        type: "dépendance",
        counterType: "open-source",
      },
      {
        label: "Collecte automatique des usages et des données des élèves",
        type: "surveillance",
        counterType: "protection-données",
      },
    ],
    spriteUrl: "/src/assets/pixelgame/menaces/menace1.gif",
  },

  {
    name: "Cloudus Maximus 365",
    arguments: [
      {
        label: "Fonctionnalités bloquées sans abonnement payant",
        type: "dépendance",
        counterType: "services-libres",
      },
      {
        label: "Fichiers synchronisés en permanence sur des serveurs externes",
        type: "surveillance",
        counterType: "décentralisation",
      },
      {
        label: "Multiplication des abonnements pour chaque petit service",
        type: "dépendance",
        counterType: "mutualisation",
      },
      {
        label: "Données stockées hors de l’établissement et parfois hors UE",
        type: "surveillance",
        counterType: "hébergement-local",
      },
    ],
    spriteUrl: "/src/assets/pixelgame/menaces/menace2.gif",
  },

  {
    name: "Obsoletus Rex",
    arguments: [
      {
        label:
          "Ordinateur ralenti qu’on veut remplacer alors qu’il fonctionne encore",
        type: "obsolescence",
        counterType: "réemploi",
      },
      {
        label: "Périphériques qui ne marchent plus faute de pilotes à jour",
        type: "fermeture",
        counterType: "interopérabilité",
      },
      {
        label:
          "Messages techniques incompréhensibles qui cachent ce qui se passe",
        type: "surveillance",
        counterType: "transparence",
      },
      {
        label: "Fin officielle des mises à jour et de la sécurité",
        type: "obsolescence",
        counterType: "linux",
      },
    ],
    spriteUrl: "/src/assets/pixelgame/menaces/menace3.gif",
  },

  {
    name: "Pub’Menhir",
    arguments: [
      {
        label: "Fenêtres de publicités qui s’ouvrent sans arrêt",
        type: "surveillance",
        counterType: "bloqueur-publicité",
      },
      {
        label: "Suivi permanent de la navigation des élèves pour la publicité",
        type: "surveillance",
        counterType: "anonymisation",
      },
      {
        label: "Cookies publicitaires qui profilent les utilisateurs",
        type: "surveillance",
        counterType: "protection-données",
      },
      {
        label: "Vidéos publicitaires imposées avant le contenu pédagogique",
        type: "dépendance",
        counterType: "souveraineté",
      },
    ],
    spriteUrl: "/src/assets/pixelgame/menaces/mechant4.gif",
  },

  {
    name: "Écosystor le Verrouillé",
    arguments: [
      {
        label:
          "Câble propriétaire impossible à remplacer par un câble standard",
        type: "fermeture",
        counterType: "standard-ouvert",
      },
      {
        label:
          "Système qui refuse de fonctionner avec d’autres logiciels ou matériels",
        type: "fermeture",
        counterType: "interopérabilité",
      },
      {
        label: "Écosystème fermé qui oblige à rester chez le même fournisseur",
        type: "fermeture",
        counterType: "modularité",
      },
      {
        label: "Mises à jour qui bloquent les réparations ou logiciels tiers",
        type: "obsolescence",
        counterType: "réparabilité",
      },
    ],
    spriteUrl: "../../../public/assets/pixelgame/menaces/menace1.gif",
  },
];
