# Note de Cadrage du Projet — Blog des Lauréats

> **Ingénierie logicielle — Étape 2 : Cadrage & Périmètre Produit**

## 1. Présentation du Projet & Contexte Institutionnel

Le projet **Blog des Lauréats** vise à centraliser et valoriser les expériences professionnelles, réalisations et conseils de carrière des anciens lauréats de l'EFP, actuellement dispersés sur les réseaux sociaux ou partagés informellement.

La plateforme a pour missions de :

- **Valoriser les lauréats :** partager leurs parcours, réalisations et expertises.
- **Accompagner les apprenants :** faciliter l'accès aux retours d'expérience professionnels.
- **Dynamiser la communauté :** promouvoir l'excellence technique et le partage des connaissances.

Le projet repose sur deux canaux complémentaires :

- **Plateforme Web :** rédaction, modification, administration, modération et consultation des articles.
- **Application Mobile :** consultation du catalogue et lecture des articles en mobilité, en mode lecture seule.

## 2. Objectifs Stratégiques & SMART

| Critère             | Objectifs                                                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **S — Spécifique**  | Développer une plateforme Web de gestion éditoriale et une application mobile dédiée à la consultation des articles.                                                                |
| **M — Mesurable**   | Minimum 50 articles publiés au premier trimestre ; chargement d'un article inférieur à 300 ms en conditions normales ; interfaces accessibles et adaptées aux différents terminaux. |
| **A — Atteignable** | Développement incrémental en sprints Scrum de 80 heures, avec livraison de fonctionnalités testées de bout en bout.                                                                 |
| **R — Réaliste**    | Stack standardisée : Laravel 13, MySQL, Tailwind CSS, Preline UI et Alpine.js pour le Web, avec une API de consultation pour le Mobile.                                             |
| **T — Temporel**    | Sprint 0 : cadrage, infrastructure et prototypes ; Sprint 1 : socle technique, persistance et première tranche fonctionnelle ; clôture : déploiement et mise en production.         |

**Indicateurs de réussite :**

- **Web :** publication d'au moins 50 articles et temps de chargement inférieur à 300 ms.
- **Mobile :** accès au catalogue et lecture complète des articles sur smartphone.

## 3. Matrice de Périmètre

### 3.1. In-Scope — Périmètre inclus

**A. Plateforme Web**

- Consultation des articles par catégories, recherche textuelle et pagination.
- Authentification sécurisée : inscription, connexion et réinitialisation du mot de passe.
- Gestion des profils lauréats : nom, biographie, photo, liens LinkedIn et GitHub.
- Tableau de bord personnel et rédaction avec éditeur riche.
- Gestion des statuts : **Brouillon → Soumis pour modération → Publié**.
- Espace d'administration : gestion des utilisateurs, des rôles (RBAC), des catégories et modération des articles (validation, publication, demande de correction avec motif).

**B. Application Mobile**

- Affichage du catalogue des articles.
- Consultation et lecture complète des articles.
- Accès en mode lecture seule pour les apprenants et visiteurs en déplacement.

### 3.2. Out-of-Scope — Périmètre exclu

**Sur l'application mobile :**

- Rédaction et modification des articles.
- Modération et administration.
- Toute gestion éditoriale, réservée exclusivement à la plateforme Web.

**Globalement :**

- Messagerie instantanée et chat en direct.
- Paiement en ligne, abonnements payants et dons.
- Fonctionnalités complexes de réseau social.
- Notation étoilée et recommandations prédictives par IA.
- Import/export automatisé depuis Medium, WordPress et autres plateformes.

## 4. Parties Prenantes

| Partie prenante                   | Responsabilités                                                              |
| --------------------------------- | ---------------------------------------------------------------------------- |
| **Product Owner (Groupe 1)**      | Définition des besoins, priorisation du backlog et validation des livrables. |
| **Développeurs Web**              | Conception et développement de la plateforme Web et de son API.              |
| **Développeurs Mobile**           | Développement de l'application mobile de consultation.                       |
| **Formateurs référents**          | Encadrement, suivi et validation pédagogique.                                |
| **Visiteurs et apprenants**       | Consultation des articles sur ordinateur et smartphone.                      |
| **Lauréats (Auteurs)**            | Gestion des profils, rédaction et soumission des articles.                   |
| **Administrateurs / Modérateurs** | Gestion des utilisateurs, catégories et validation éditoriale.               |

## 5. Risques Identifiés & Stratégies d'Atténuation

| Risque                                 | Stratégie d'atténuation                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Indisponibilité des contenus**       | Préparer un stock initial d'articles et encourager les lauréats à contribuer régulièrement.            |
| **Non-respect des délais de sprint**   | Prioriser le MVP, suivre le backlog et contrôler régulièrement l'avancement.                           |
| **Incohérence de l'API Web/Mobile**    | Centraliser les données, standardiser les endpoints et tester les échanges entre les deux plateformes. |
| **Vulnérabilités et fuite de données** | Authentification sécurisée, hachage des mots de passe et validation des entrées.                       |
| **Non-conformité réglementaire**       | Respect du RGPD : consentement, droits d'accès, de rectification et de suppression des données.        |
| **Problèmes d'accessibilité**          | Respect des normes WCAG AA, approche Mobile-First et HTML5 sémantique.                                 |

---

**Facteurs clés de succès :**

- Simplicité et rapidité de rédaction pour les lauréats.
- Qualité et clarté de lecture pour les apprenants.
- Fluidité du processus de modération.
- Cohérence de l'expérience entre les plateformes Web et Mobile.

**Synthèse :** Le Blog des Lauréats est une solution institutionnelle à double canal (Web et Mobile), destinée à valoriser les expériences professionnelles et faciliter le partage des connaissances. Son MVP repose sur une gestion éditoriale centralisée via le Web et une application mobile dédiée à la consultation.
