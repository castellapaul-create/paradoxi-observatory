// Preuve sociale affichée sur le site — un seul endroit à modifier.
//
// Règle : jamais de chiffre qui ne peut pas être justifié si on nous le
// demande. Une valeur inconnue ou invérifiable se retire, elle ne se
// remplace pas par une estimation.

export const PROOF = {
  cadence: "Chaque dimanche, sans exception",
  readership: "Lecture confidentielle",
} as const;
