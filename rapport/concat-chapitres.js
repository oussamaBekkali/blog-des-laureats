/**
 * Script Node.js de concatenation modulaire des chapitres du rapport.
 * Usage : node concat-chapitres.js
 */

const fs = require("fs");
const path = require("path");

const chapitresDir = path.join(__dirname, "chapitres");
const outputFile = path.join(__dirname, "rapport-blog.md");

console.log("--- Compilation du Rapport de Projet ---");

if (!fs.existsSync(chapitresDir)) {
  console.error(`Erreur : Le dossier "${chapitresDir}" n'existe pas.`);
  process.exit(1);
}

// Lire tous les fichiers .md du dossier chapitres, en ignorant README.md
const files = fs
  .readdirSync(chapitresDir)
  .filter((file) => file.endsWith(".md") && file.toLowerCase() !== "readme.md")
  .sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
  );

if (files.length === 0) {
  console.warn("Attention : Aucun chapitre Markdown trouve a compiler.");
  process.exit(0);
}

console.log(`Chapitres detectes (${files.length}) :`);
files.forEach((file, index) => {
  console.log(`  ${index + 1}. ${file}`);
});

// En-tête global du rapport
let content = `# Rapport de Projet : Blog des Lauréats

> Document consolidé généré automatiquement à partir des chapitres modulaires.
> Date de génération : ${new Date().toISOString().split("T")[0]}

---

`;

// Concaténer chaque chapitre
files.forEach((file, index) => {
  const filePath = path.join(chapitresDir, file);
  const chapterContent = fs.readFileSync(filePath, "utf-8").trim();
  content += chapterContent + "\n\n";
  if (index < files.length - 1) {
    content += "---\n\n";
  }
});

// Écrire le fichier consolidé
fs.writeFileSync(outputFile, content, "utf-8");

console.log(
  `Succes : Rapport compile avec succes dans "${path.basename(outputFile)}" !`,
);
