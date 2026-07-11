# Plan de migration

L'application est deja sur en Vue 3, donc je ne ferais pas une reecriture complete. Je garderais cette base et je corrigerais surtout la structure, les bugs visibles et les dependances qui compliquent la maintenance.

## Stack cible

Je garderais Vue 3, en migrant progressivement vers TypeScript. Pour l'etat global, je remplacerais Vuex par Pinia, plus simple et mieux adapte a Vue aujourd'hui.

Je supprimerais aussi les dependances qui ne sont pas vraiment necessaires ici : `lodash`, `moment` et `vue3-styled-components`. Les methodes natives JavaScript suffisent pour les listes, `Intl.DateTimeFormat` suffit pour les dates, et du CSS scoped est assez clair pour cette taille de projet.

J'ajouterais enfin Vitest, Vue Test Utils, ESLint et Prettier pour securiser les changements et garder un code plus homogene.

## Ordre de migration

Je commencerais par stabiliser l'existant avant de changer l'architecture. Les premiers correctifs seraient les plus visibles : retirer les `v-html` inutiles, verifier les erreurs HTTP, refuser les taches vides, afficher les dates en francais et supprimer les logs de debug.

Ensuite, j'ajouterais quelques tests unitaires, affichage du texte, toggle, suppression et etat visuel d'une tache terminee.

Une fois cette base posee, je centraliserais les appels API dans un service ou un composable dedie. Les composants ne devraient pas appeler directement `fetch`, ni gerer chacun les erreurs HTTP.

Je migrerais ensuite les composants vers TypeScript petit a petit : `TodoItem`, puis `TodoForm`, `TodoFilter` et enfin `pages/index.vue`.

La migration Vuex vers Pinia viendrait apres, quand les composants seront plus propres. Le nouveau store porterait les taches, le filtre, le chargement, les erreurs et les actions principales : charger, ajouter, cocher, supprimer et filtrer.

Pour finir, je nettoierais les styles et les dependances : suppression de Vuex, Lodash, Moment et styled-components et ajout d'un lint/typecheck.
