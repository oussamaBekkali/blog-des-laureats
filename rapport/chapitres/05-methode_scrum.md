# Méthode de travail

## La méthode SCRUM

La méthodologie Scrum permet de gérer le développement du Blog des Lauréats de manière flexible et progressive. Le projet est découpé en sprints, puis les fonctionnalités sont priorisées, réalisées, vérifiées et intégrées selon les résultats obtenus.

![Méthodologie Scrum](../assets/scrum.png)

_Figure 3 : La méthode SCRUM_

**Principe Scrum :**

- **Transparence** : visibilité complète sur les tâches, les objectifs et l'avancement du projet pour toute l'équipe.
- **Inspection** : évaluation régulière à la fin de chaque sprint afin d'identifier les erreurs, les blocages et les axes d'amélioration.
- **Adaptation** : ajustement du plan de travail en fonction des retours et des résultats obtenus lors des sprints.

**Organisation du projet en sprints :**

### Sprint 1 : initialisation et première fonctionnalité

Le Sprint 1 comprend l'initialisation du dépôt, la configuration de l'environnement, le cadrage du projet, la modélisation fonctionnelle, la gestion du backlog et l'implémentation de la consultation détaillée d'un article.

L'architecture retenue pour cette première fonctionnalité sépare un contrôleur Laravel mince d'une classe Service contenant la logique de récupération de l'article. Une vue Blade présente les informations et une réponse HTTP adaptée est affichée lorsque l'article n'existe pas.
