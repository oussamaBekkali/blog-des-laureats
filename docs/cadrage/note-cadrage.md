# Note de Cadrage — Blog des Lauréats

> **Ingénierie logicielle — Étape 2 : Cadrage & Périmètre Produit**

## 1. Contexte et Proposition de Valeur

Le projet vise à centraliser et valoriser les expériences professionnelles, réalisations et conseils de carrière des lauréats, actuellement dispersés sur des réseaux sociaux ou partagés informellement.

Le **Blog des Lauréats** est une plateforme institutionnelle permettant de :

- **Valoriser les lauréats :** partager leurs parcours, réalisations et expertises.
- **Accompagner les apprenants :** accéder à des retours d'expérience concrets.
- **Dynamiser la communauté :** promouvoir l'excellence technique et le partage des connaissances.

## 2. Objectifs SMART

| Critère             | Objectif                                                                                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **S — Spécifique**  | Développer une plateforme web autonome de rédaction, modération, publication et consultation d'articles classés par catégories.                                           |
| **M — Mesurable**   | Minimum 50 articles publiés au premier trimestre ; chargement inférieur à 300 ms en conditions normales ; interface accessible et responsive (mobile, tablette, desktop). |
| **A — Atteignable** | Développement incrémental en sprints Scrum de 80 heures, avec fonctionnalités testées de bout en bout.                                                                    |
| **R — Réaliste**    | Stack standardisée : Laravel 13, MySQL, Tailwind CSS, Preline UI et Alpine.js.                                                                                            |
| **T — Temporel**    | Sprint 0 : cadrage, infrastructure et prototypes ; Sprint 1 : socle technique, persistance et première fonctionnalité ; clôture : déploiement en production.              |

## 3. Périmètre du Produit (MVP)

### 3.1. In-Scope — Fonctionnalités incluses

**A. Consultation publique**

- Accueil avec derniers articles publiés.
- Lecture détaillée (auteur, date, catégorie, typographie soignée).
- Filtrage par catégories, recherche textuelle et pagination dynamique.

**B. Espace Auteur (Lauréat)**

- Authentification : inscription, connexion et réinitialisation du mot de passe.
- Profil : nom, biographie, photo, liens LinkedIn et GitHub.
- Tableau de bord personnel.
- Rédaction avec éditeur riche.
- Cycle de vie des articles : **Brouillon → Soumis pour modération → Publié**.

**C. Administration et Modération**

- Tableau de bord des articles soumis.
- Validation, publication et demande de correction avec motif.
- Gestion des catégories : création, modification et archivage.
- Gestion des utilisateurs et des rôles (**RBAC — Role-Based Access Control**).

### 3.2. Out-of-Scope — Fonctionnalités exclues

- Messagerie instantanée et chat (contacts via profils externes).
- Abonnements payants, dons et monétisation e-commerce.
- Applications mobiles natives iOS/Android (web responsive privilégié).
- Notation étoilée et recommandations prédictives par IA.
- Import/export automatisé depuis Medium, WordPress et autres plateformes.

## 4. Contraintes et Exigences

### 4.1. Techniques

- Infrastructure classique PHP/MySQL, sans dépendance propriétaire complexe.
- Architecture en deux couches : **Contrôleur mince → Service métier**.
- Rendu serveur avec Laravel Blade et Alpine.js ; aucune SPA monolithique ni dépendance lourde côté client.

### 4.2. Réglementaires (RGPD)

- Consentement explicite à l'inscription.
- Droits d'accès, de rectification et de suppression des données personnelles.
- Hachage des mots de passe et protection contre les vulnérabilités courantes.

### 4.3. Accessibilité et Ergonomie

- Contraste visuel conforme au niveau **WCAG AA**.
- Approche **Mobile-First** et interface responsive.
- HTML5 sémantique compatible avec les lecteurs d'écran.

## 5. Facteurs Clés de Succès

1. **Rédaction :** parcours simple et rapide pour les lauréats.
2. **Lecture :** expérience claire et agréable pour les apprenants.
3. **Modération :** processus éditorial fluide et efficace.

---

**Synthèse :** Le Blog des Lauréats est une plateforme web institutionnelle centralisant le partage d'expériences professionnelles. Son MVP repose sur trois espaces (public, auteur et administration), une architecture Laravel structurée et un développement agile respectant les exigences techniques, réglementaires et d'accessibilité.
