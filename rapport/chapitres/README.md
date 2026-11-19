# Sous-dossier des Chapitres (`rapport/chapitres/`)

Ce sous-dossier contient les chapitres unitaires qui composent le rapport de projet.

## 1. Rôle du sous-dossier

- Découper la rédaction du rapport en modules indépendants et clairs.
- Permettre à l'apprenant de se concentrer sur un chapitre spécifique à la fois.
- Faciliter le travail collaboratif et les revues de code/documentation.

## 2. Chapitres inclus

- `01-introduction.md` : Contexte, objectifs et démarche méthodologique.
- `02-conclusion.md` : Synthèse des acquis, bilan technique et perspectives d'évolution.

## 3. Règle de nommage et compilation

- Nommer les fichiers avec un préfixe numérique ordonné (`01-...`, `02-...`).
- Chaque fichier commence par un titre Markdown de niveau 1 (`# Chapitre N : ...`).
- Le script `../concat-chapitres.js` lit automatiquement ces fichiers par ordre alphabétique pour générer le rapport consolidé `rapport-blog.md`.
