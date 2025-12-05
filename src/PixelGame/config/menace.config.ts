import type { Entity } from "../types/ENtity";

export const THREATS: Entity[] = [
  {
    name: "Centurion WinDominator XI",
    lifePoints: 120,
    arguments: [
      {
        label: "Mise à Jour Catapulte",
        type: "obsolescence",
        counterType: "linux",
      },
      {
        label: "Écran Bleu Impérial",
        type: "obsolescence",
        counterType: "résilience",
      },
      {
        label: "Licence Légionnaire",
        type: "dépendance",
        counterType: "open-source",
      },
      {
        label: "Télémetrie d’Espionnage",
        type: "surveillance",
        counterType: "protection-données",
      },
    ],
  },

  {
    name: "Cloudus Maximus 365",
    lifePoints: 140,
    arguments: [
      {
        label: "Paywall Temporel",
        type: "dépendance",
        counterType: "services-libres",
      },
      {
        label: "Orage Synchronisé",
        type: "surveillance",
        counterType: "décentralisation",
      },
      {
        label: "Pluie d’Abonnements",
        type: "dépendance",
        counterType: "mutualisation",
      },
      {
        label: "Vapeur de Données",
        type: "surveillance",
        counterType: "hébergement-local",
      },
    ],
  },

  {
    name: "Obsoletus Rex",
    lifePoints: 150,
    arguments: [
      {
        label: "Ventilateur Mourant",
        type: "obsolescence",
        counterType: "réemploi",
      },
      {
        label: "Pilote Perdu",
        type: "fermeture",
        counterType: "interopérabilité",
      },
      {
        label: "Message Cryptique",
        type: "surveillance",
        counterType: "transparence",
      },
      {
        label: "Fin de Support Total",
        type: "obsolescence",
        counterType: "linux",
      },
    ],
  },

  {
    name: "Pub’Menhir",
    lifePoints: 110,
    arguments: [
      {
        label: "Pop-up Inarrêtable",
        type: "surveillance",
        counterType: "bloqueur-publicité",
      },
      {
        label: "Tracking au Goudron",
        type: "surveillance",
        counterType: "anonymisation",
      },
      {
        label: "Cookie-Bombe",
        type: "surveillance",
        counterType: "protection-données",
      },
      {
        label: "Vidéo Non-Skipable",
        type: "dépendance",
        counterType: "souveraineté",
      },
    ],
  },

  {
    name: "Écosystor le Verrouillé",
    lifePoints: 135,
    arguments: [
      {
        label: "Câble Exclusif",
        type: "fermeture",
        counterType: "standard-ouvert",
      },
      {
        label: "Forteresse d’Interopérabilité",
        type: "fermeture",
        counterType: "interopérabilité",
      },
      {
        label: "Jardin Fermé",
        type: "fermeture",
        counterType: "modularité",
      },
      {
        label: "MAJ Restrictive",
        type: "obsolescence",
        counterType: "réparabilité",
      },
    ],
  },
];
