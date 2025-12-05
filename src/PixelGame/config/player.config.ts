import type { Entity } from "../types/Entity";

export const PLAYER: Entity = {
  name: "Village NIRD Résistant",
  arguments: [
    // --- Obsolescence ---
    {
      label: "Migration vers une distribution Linux légère",
      type: "linux",
    },
    {
      label: "Postes résilients grâce à des configurations stables",
      type: "résilience",
    },
    {
      label: "Programme de réemploi et reconditionnement du matériel",
      type: "réemploi",
    },
    {
      label: "Droit à la réparation et mises à jour maîtrisées",
      type: "réparabilité",
    },

    // --- Dépendance ---
    {
      label: "Remplacement par des logiciels libres et ouverts",
      type: "open-source",
    },
    {
      label: "Mutualisation académique des services numériques",
      type: "mutualisation",
    },
    {
      label: "Recours à des services en ligne libres et souverains",
      type: "services-libres",
    },
    {
      label: "Usage de plateformes éducatives souveraines",
      type: "souveraineté",
    },

    // --- Surveillance ---
    {
      label: "Chiffrement et désactivation des fonctions intrusives",
      type: "protection-données",
    },
    {
      label: "Synchronisation via outils décentralisés",
      type: "décentralisation",
    },
    {
      label: "Anonymisation et limitation des traces de navigation",
      type: "anonymisation",
    },
    {
      label: "Transparence sur les traitements des outils",
      type: "transparence",
    },
    {
      label: "Déploiement de protections contre la publicité",
      type: "bloqueur-publicité",
    },

    // --- Fermeture / Interopérabilité ---
    {
      label: "Choix de formats et connectiques standards ouverts",
      type: "standard-ouvert",
    },
    {
      label: "Interopérabilité entre services et applications",
      type: "interopérabilité",
    },
    {
      label: "Écosystème numérique modulaire et remplaçable",
      type: "modularité",
    },
  ],
};
