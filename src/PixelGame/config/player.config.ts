import type { Entity } from "../types/Entity";

export const PLAYER: Entity = {
  name: "Village NIRD Résistant",
  arguments: [
    // --- Obsolescence ---
    {
      label: "Migrer les postes vers une distribution Linux légère.",
      type: "linux",
    },
    {
      label: "Stabiliser les postes pour rendre les systèmes plus résilients.",
      type: "résilience",
    },
    {
      label:
        "Mettre en place un programme de réemploi et de reconditionnement du matériel.",
      type: "réemploi",
    },
    {
      label:
        "Garantir le droit à la réparation en maîtrisant les mises à jour.",
      type: "réparabilité",
    },

    // --- Dépendance ---
    {
      label:
        "Remplacer les solutions propriétaires par des logiciels libres et ouverts.",
      type: "open-source",
    },
    {
      label: "Mutualiser les services numériques à l’échelle académique.",
      type: "mutualisation",
    },
    {
      label:
        "Utiliser des services en ligne libres et véritablement souverains.",
      type: "services-libres",
    },
    {
      label: "S’appuyer sur des plateformes éducatives souveraines.",
      type: "souveraineté",
    },

    // --- Surveillance ---
    {
      label: "Activer le chiffrement et désactiver les fonctions intrusives.",
      type: "protection-données",
    },
    {
      label: "Synchroniser les fichiers via des outils décentralisés.",
      type: "décentralisation",
    },
    {
      label: "Anonymiser les usages et limiter les traces de navigation.",
      type: "anonymisation",
    },
    {
      label:
        "Assurer une transparence complète sur les traitements des outils.",
      type: "transparence",
    },
    {
      label: "Déployer des protections efficaces contre la publicité.",
      type: "bloqueur-publicité",
    },

    // --- Fermeture / Interopérabilité ---
    {
      label: "Utiliser des formats et connectiques standards ouverts.",
      type: "standard-ouvert",
    },
    {
      label:
        "Garantir l’interopérabilité entre les services et les applications.",
      type: "interopérabilité",
    },
    {
      label:
        "Construire un écosystème numérique modulaire et facilement remplaçable.",
      type: "modularité",
    },
  ],
};
