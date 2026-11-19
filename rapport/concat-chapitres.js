/**
 * ============================================
 * BLOG DES LAUREATS - REPORT COMPILER
 * ============================================
 *
 * Fonctionnalites :
 * 1. Detecter automatiquement tous les fichiers .md
 * 2. Trier selon les numeros des fichiers
 * 3. Ajouter automatiquement les nouveaux chapitres
 * 4. Inclure les fichiers vides
 * 5. Generer automatiquement les titres
 * 6. Placer Conclusion toujours a la fin
 * 7. Corriger les chemins des images
 * 8. Verifier les images manquantes
 * 9. Generer rapport-blog.md
 *
 * Usage : node concat-chapitres.js
 */

const fs = require("fs");
const path = require("path");

// ============================================
// 1. CONFIGURATION
// ============================================

const ROOT = __dirname;
const CHAPTERS_DIR = path.join(ROOT, "chapitres");
const ASSETS_DIR = path.join(ROOT, "assets");
const OUTPUT_FILE = path.join(ROOT, "rapport-blog.md");

console.log("\n========================================");
console.log("       BLOG DES LAUREATS");
console.log("       COMPILATION DU RAPPORT");
console.log("========================================\n");

// ============================================
// 2. VERIFICATION DES DOSSIERS
// ============================================

if (!fs.existsSync(CHAPTERS_DIR)) {
  console.error("ERREUR : dossier chapitres introuvable.");
  process.exit(1);
}

if (!fs.existsSync(ASSETS_DIR)) {
  console.warn("ATTENTION : dossier assets introuvable.");
}

// ============================================
// 3. DETECTION AUTOMATIQUE DES FICHIERS
// ============================================

const allFiles = fs
  .readdirSync(CHAPTERS_DIR, {
    withFileTypes: true,
  })
  .filter(
    (entry) =>
      entry.isFile() &&
      entry.name.toLowerCase().endsWith(".md") &&
      entry.name.toLowerCase() !== "readme.md",
  )
  .map((entry) => entry.name);

// ============================================
// 4. FONCTIONS DE TRI
// ============================================

// Recuperer le numero au debut du nom
function getNumber(filename) {
  const match = filename.match(/^(\d+)/);
  return match ? Number(match[1]) : Infinity;
}

// Verifier si le fichier est une conclusion
function isConclusion(filename) {
  const name = path.basename(filename, ".md");

  return /(^|[-_\s])conclusion($|[-_\s])/i.test(name);
}

// Trier les chapitres
function sortChapters(files) {
  const conclusions = files.filter(isConclusion);
  const otherFiles = files.filter((file) => !isConclusion(file));

  otherFiles.sort((a, b) => {
    const numberA = getNumber(a);
    const numberB = getNumber(b);

    // Trier d'abord selon les numeros
    if (numberA !== numberB) {
      return numberA - numberB;
    }

    // Si les deux fichiers n'ont pas de numero
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    });
  });

  // Conclusion toujours a la fin
  conclusions.sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: "base",
    }),
  );

  return [...otherFiles, ...conclusions];
}

const files = sortChapters(allFiles);

// ============================================
// 5. GENERER UN TITRE AUTOMATIQUEMENT
// ============================================

function generateTitle(filename) {
  let title = path.basename(filename, ".md");

  // Supprimer le numero au debut
  title = title.replace(/^\d+[-_.\s]*/, "");

  // Remplacer tirets et underscores par espaces
  title = title.replace(/[-_]+/g, " ");

  // Supprimer les espaces supplementaires
  title = title.replace(/\s+/g, " ").trim();

  // Mettre la premiere lettre en majuscule
  if (title.length > 0) {
    title = title.charAt(0).toLocaleUpperCase("fr") + title.slice(1);
  }

  return title;
}

// ============================================
// 6. CORRECTION DU TITRE CONCLUSION
// ============================================

function correctConclusion(content, filename) {
  if (!isConclusion(filename)) {
    return content;
  }

  // Remplacer les anciens titres de conclusion
  content = content.replace(
    /^#{1,6}\s*(?:Chapitre\s*\d+\s*:\s*)?Conclusion\s*#*\s*$/gim,
    "# Conclusion",
  );

  // Si aucun titre principal n'existe, l'ajouter
  if (!/^#\s+Conclusion\s*$/im.test(content)) {
    content = "# Conclusion\n\n" + content;
  }

  return content;
}

// ============================================
// 7. CORRECTION ET VERIFICATION DES IMAGES
// ============================================

const imagesManquantes = [];
let imagesVerifiees = 0;

function processImages(content, filename) {
  return content.replace(
    /!\[([^\]]*)\]\(([^)\n]+)\)/g,
    (match, alt, originalPath) => {
      let imagePath = originalPath.trim();

      // Ignorer les images externes
      if (/^(https?:|data:)/i.test(imagePath)) {
        return match;
      }

      // Extraire le chemin sans titre optionnel
      imagePath = imagePath.replace(/^(<)(.*)(>)$/, "$2");

      // Corriger le chemin relatif
      imagePath = imagePath.replace(/^\.\.\/assets\//, "assets/");

      // Supprimer les espaces non encodes
      const decodedPath = decodeURIComponent(imagePath.split(/[?#]/)[0]);

      const absolutePath = path.resolve(ROOT, decodedPath);

      // Verifier l'existence
      if (fs.existsSync(absolutePath)) {
        console.log(`  ✓ Image : ${imagePath}`);
        imagesVerifiees++;
      } else {
        console.warn(`  ⚠ Image introuvable : ${imagePath}`);

        imagesManquantes.push({
          chapter: filename,
          image: imagePath,
        });
      }

      // Encoder les espaces pour Markdown
      const safePath = imagePath.replace(/ /g, "%20");

      return `![${alt}](${safePath})`;
    },
  );
}

// ============================================
// 8. EN-TETE DU RAPPORT
// ============================================

let content = `# Rapport de Projet : Blog des Lauréats

> Document consolidé généré automatiquement.

> Date de génération : ${new Date().toISOString().split("T")[0]}

`;

// ============================================
// 9. COMPILATION DES CHAPITRES
// ============================================

let compteur = 0;
let chapitresVides = 0;
let fichiersSupplementaires = 0;

const fichiersSansNumero = files.filter((file) => getNumber(file) === Infinity);

console.log(`Fichiers detectes : ${files.length}`);
console.log("\n--- DEBUT DE COMPILATION ---\n");

files.forEach((file, index) => {
  const filePath = path.join(CHAPTERS_DIR, file);

  console.log(`[${index + 1}/${files.length}] ${file}`);

  // Lire le contenu
  let chapterContent = fs.readFileSync(filePath, "utf8").trim();

  // Generer le titre si le fichier est vide
  if (!chapterContent) {
    const title = generateTitle(file);

    chapterContent = `# ${title}`;

    console.log(`  + Chapitre vide : titre "${title}" genere`);

    chapitresVides++;
  }

  // Corriger le titre de conclusion
  chapterContent = correctConclusion(chapterContent, file);

  // Corriger et verifier les images
  chapterContent = processImages(chapterContent, file);

  // Ajouter le contenu au rapport
  content += chapterContent + "\n\n";

  // Compter les fichiers sans numero
  if (getNumber(file) === Infinity) {
    fichiersSupplementaires++;
  }

  compteur++;
});

// ============================================
// 10. GENERATION DU FICHIER FINAL
// ============================================

fs.writeFileSync(OUTPUT_FILE, content, "utf8");

// ============================================
// 11. RAPPORT DE COMPILATION
// ============================================

console.log("\n========================================");
console.log("         BILAN DE COMPILATION");
console.log("========================================");

console.log(`Total des fichiers detectes : ${files.length}`);
console.log(`Chapitres compiles          : ${compteur}`);
console.log(`Chapitres vides             : ${chapitresVides}`);
console.log(`Fichiers sans numero        : ${fichiersSupplementaires}`);
console.log(`Images verifiees            : ${imagesVerifiees}`);
console.log(`Images manquantes           : ${imagesManquantes.length}`);

if (fichiersSansNumero.length > 0) {
  console.log("\n--- FICHIERS SANS NUMERO ---");

  fichiersSansNumero.forEach((file) => {
    console.log(`- ${file}`);
  });
}

if (imagesManquantes.length > 0) {
  console.log("\n--- IMAGES MANQUANTES ---");

  imagesManquantes.forEach((item) => {
    console.log(`- ${item.image}`);
    console.log(`  Chapitre : ${item.chapter}`);
  });
}

// ============================================
// 12. RESULTAT FINAL
// ============================================

console.log("\n========================================");
console.log("✓ RAPPORT GENERE AVEC SUCCES");
console.log(`Fichier : ${path.basename(OUTPUT_FILE)}`);
console.log("✓ Conclusion placee a la fin.");
console.log("========================================\n");
