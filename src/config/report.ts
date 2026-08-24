// Configuration du lead magnet /rapport — un seul endroit à modifier
// pour changer l'édition envoyée contre email.

export const REPORT = {
  // Chemin public du PDF envoyé en pièce jointe. Remplacer ce fichier
  // (même nom, ou changer ce chemin) pour livrer une vraie édition.
  pdfPublicPath: "/reports/paradoxi-rapport-exemple.pdf",
  pdfFilename: "PARADOXI-Observatory-Rapport-Exemple.pdf",
  // Validité du lien de confirmation (double opt-in).
  confirmTokenTtlMs: 48 * 60 * 60 * 1000, // 48h
} as const;
