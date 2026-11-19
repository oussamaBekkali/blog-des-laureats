# Diagramme de cas d'utilisation

```mermaid
flowchart LR
    Laureat[Lauréat]
    Apprenant[Apprenant]
    Formateur[Formateur]
    Recruteur[Recruteur]
    Admin[Administrateur]

    UC1[Consulter les articles]
    UC2[Consulter le profil d'un lauréat]
    UC3[Rédiger et publier un article]
    UC4[Suivre les ressources pédagogiques]
    UC5[Évaluer les parcours professionnels]
    UC6[Gérer les utilisateurs]
    UC7[Gérer les articles]
    UC8[Gérer les catégories]

    Apprenant --> UC1
    Apprenant --> UC2
    Laureat --> UC1
    Laureat --> UC2
    Laureat --> UC3
    Formateur --> UC1
    Formateur --> UC2
    Formateur --> UC4
    Recruteur --> UC1
    Recruteur --> UC2
    Recruteur --> UC5
    Admin --> UC6
    Admin --> UC7
    Admin --> UC8
```
