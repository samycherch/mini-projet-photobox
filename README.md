# mini-projet-photobox
# Photobox — TD7 Fetch et Promesses

Université de Lorraine / IUT Nancy-Charlemagne — BUT Info S4  
Programmation web en JavaScript / TypeScript

## Membres du groupe

- Samy Cherchari
- Léo Feral

## Fonctionnalités réalisées

### Exercice 1 — Affichage d'une photo individuelle
- Récupération des données d'une photo depuis l'API via son identifiant
- Affichage de l'image, du titre, du type, de la résolution et de la description
- Affichage de la catégorie de la photo
- Affichage des commentaires associés à la photo
- Lecture de l'identifiant depuis le hash de l'URL (`index.html#106`)

### Exercice 2 — Affichage d'une galerie
- Chargement de la liste de photos depuis l'API via le bouton "load"
- Affichage des vignettes dans une grille

### Exercice 3 — Navigation dans les galeries
- Navigation entre les pages de la galerie via les boutons "prev", "next", "first" et "last"
- Stockage des liens de pagination retournés par l'API pour permettre la navigation

### Exercice 4 — Affichage d'une photo depuis la galerie
- Au clic sur une vignette, chargement et affichage de la photo en format original dans la section dédiée

### Exercice 5 (bonus) — Lightbox
- Au clic sur une vignette, ouverture de la photo en mode plein écran
- Navigation entre les photos de la galerie depuis la lightbox sans revenir à la grille
- Fermeture de la lightbox via le bouton "✕" ou la touche Échap
- Navigation clavier avec les flèches gauche et droite

## Technologies utilisées

- TypeScript
- ESBuild
- Handlebars
- API REST Photobox — IUT Nancy-Charlemagne