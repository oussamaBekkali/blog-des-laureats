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
 * 6. Generer la table de matiere
 * 7. Placer Conclusion toujours a la fin
 * 8. Corriger les chemins des images
 * 9. Verifier les images manquantes
 * 10. Generer rapport-blog.md
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

function normalizeTitle(title) {
  return title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/gi, " ")
    .trim()
    .toLowerCase();
}

function isRemovedSectionTitle(title) {
  return (
    title === "branche fonctionnelle" ||
    title === "branche technique" ||
    /^prototype(?:\s|$)/.test(title)
  );
}

function isRemovedChapter(filename) {
  return isRemovedSectionTitle(normalizeTitle(generateTitle(filename)));
}

function removeExcludedSections(content) {
  let removedSectionLevel = 0;

  const withoutExcludedSections = content
    .split(/\r?\n/)
    .filter((line) => {
      const heading = line.match(/^(#{1,6})\s+(.*)$/);

      if (removedSectionLevel) {
        if (!heading || heading[1].length > removedSectionLevel) {
          return false;
        }

        removedSectionLevel = 0;
      }

      if (heading) {
        const title = normalizeTitle(
          heading[2].replace(/^chapitre\s+\d+\s*:\s*/i, ""),
        );

        if (/\b2TUP\b/i.test(heading[2]) || isRemovedSectionTitle(title)) {
          removedSectionLevel = heading[1].length;
          return false;
        }
      }

      return true;
    })
    .join("\n");

  return withoutExcludedSections
    .split(/\n\s*\n/)
    .filter((paragraph) => !/\b2TUP\b/i.test(paragraph))
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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

function getChapterTitle(content, filename) {
  const headings = [...content.matchAll(/^#{1,6}\s+(.+?)\s*#*\s*$/gm)]
    .map((match) => match[1].trim())
    .filter((title) => !/^Chapitre\s+\d+\s*:\s*Conclusion$/i.test(title));

  return headings[0] || generateTitle(filename);
}

function getChapterAnchor(filename, index) {
  const slug = path
    .basename(filename, ".md")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `chapter-${index + 1}-${slug}`;
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

        const label = alt.trim() || "Image";
        return `> **[IMAGE À INSÉRER : ${label}]**`;
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

const chapters = files
  .map((file) => {
    let chapterContent = fs
      .readFileSync(path.join(CHAPTERS_DIR, file), "utf8")
      .trim();
    const empty = !chapterContent;

    if (isRemovedChapter(file)) {
      return null;
    }

    if (empty) {
      const title = generateTitle(file);
      chapterContent = `# ${title}`;
      chapitresVides++;
    } else {
      chapterContent = removeExcludedSections(chapterContent);

      if (!chapterContent) {
        return null;
      }
    }

    chapterContent = correctConclusion(chapterContent, file);

    return {
      file,
      title: getChapterTitle(chapterContent, file),
      content: chapterContent,
      empty,
    };
  })
  .filter(Boolean);

const includedFiles = chapters.map((chapter) => chapter.file);
const includedFilesSansNumero = includedFiles.filter(
  (file) => getNumber(file) === Infinity,
);

console.log(`Fichiers detectes : ${chapters.length}`);
console.log("\n--- DEBUT DE COMPILATION ---\n");

content += "## Table de matière\n\n";
content += chapters
  .map(
    (item, chapterIndex) =>
      `- [${item.title.replace(/([\\[\]])/g, "\\$1")}](#${getChapterAnchor(item.file, chapterIndex)})`,
  )
  .join("\n");
content += "\n\n";

chapters.forEach((chapter, index) => {
  const { file } = chapter;
  console.log(`[${index + 1}/${chapters.length}] ${file}`);

  if (chapter.empty) {
    console.log(`  + Chapitre vide : titre "${chapter.title}" genere`);
  }

  // Corriger et verifier les images
  chapter.content = processImages(chapter.content, file);

  content += `<a id="${getChapterAnchor(file, index)}"></a>\n\n`;
  content += chapter.content + "\n\n";

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

console.log(`Total des fichiers detectes : ${chapters.length}`);
console.log(`Chapitres compiles          : ${compteur}`);
console.log(`Chapitres vides             : ${chapitresVides}`);
console.log(`Fichiers sans numero        : ${fichiersSupplementaires}`);
console.log(`Images verifiees            : ${imagesVerifiees}`);
console.log(`Images manquantes           : ${imagesManquantes.length}`);

if (includedFilesSansNumero.length > 0) {
  console.log("\n--- FICHIERS SANS NUMERO ---");

  includedFilesSansNumero.forEach((file) => {
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
