# Analyse du code existant

| Problème | Solution |
|----------|----------|
| **6 dépendances vulnérables**. La vulnérabilité provient de `vue3-styled-components`, qui dépend de bibliothèques obsolètes. | Remplacer `vue3-styled-components` par une solution maintenue ou utiliser Tailwind CSS et des variables CSS. |
| Le projet utilise **Vuex**. | Migrer vers **Pinia**, le gestionnaire d'état officiel de Vue/Nuxt. |
| La logique métier et les appels API sont directement dans les composants/pages. | Déplacer la logique dans des **composables** ou des **stores** et centraliser les appels API. |
| Utilisation de `window.__store__` dans `plugins/vuex.client.js`. | Supprimer cette implémentation si elle n'est plus nécessaire. |
| **Lodash** est utilisé alors que JavaScript fournit les méthodes natives équivalentes. | Remplacer Lodash par les méthodes natives (`map`, `filter`, `find`, `reduce`, etc.). |
| Utilisation de comparaisons faibles (`==` et `!=`). | Activer **ESLint** et utiliser `===` et `!==`. |
| Variables et fonctions inutilisées (`appVersion`, `nbTodos`, `getDisplayText`, `getFormattedDate`, etc.). | Supprimer le code mort et configurer ESLint pour le détecter automatiquement. |
| Présence de nombreux `console.log()`. | Les supprimer avant la mise en production ou utiliser un système de logs adapté. |
| Utilisation de `v-html`. | Remplacer par `{{ }}` lorsque le HTML n'est pas indispensable afin de limiter les risques de XSS. |
| Plusieurs fichiers sont encore en JavaScript (`App.vue`, `pages/index.vue`, `plugins/vuex.client.js`). | Migrer progressivement vers **TypeScript**. |
| Trois systèmes de styles coexistent : Bootstrap, CSS global et `vue3-styled-components`. | Uniformiser la gestion des styles avec **Tailwind CSS** et supprimer progressivement les autres solutions. |
| `App.vue` contient beaucoup de styles globaux et de `!important`. | Déplacer les styles dans les composants et supprimer les `!important`. |
| Les tokens CSS sont dispersés dans le projet. | Les centraliser dans un fichier dédié. |
| Utilisation de `v-model` sur un `<input type="checkbox">` alors qu'il n'est pas nécessaire. | Utiliser `:checked` et `@change`. |
| Les erreurs HTTP (404, 500, etc.) ne sont pas correctement gérées après les appels API. | Vérifier `response.ok` et mettre en place une gestion centralisée des erreurs. |
| Les conventions de code ne sont pas homogènes. | Mettre en place **ESLint** et **Prettier** pour uniformiser le code et détecter automatiquement certaines erreurs. |

# Test de l'app

- Un clic sur le bouton Recharger ajoute directement des tâches vides.
- Après avoir marqué une tâche comme terminée, son état n’est pas conservé lors du rechargement des données depuis l’API.
- Des erreurs apparaissent dans la console concernant les routes API server/api/todos/[id].js.
- Une erreur indique dans la console que jQuery n’est pas chargé.
- Les dates sont affichées en anglais au lieu du français.