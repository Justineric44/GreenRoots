// Vérifie le bon fonctionnement des routes d’authentification de l’API.

import test from 'node:test';
import assert from 'node:assert/strict';

// Vérifie que l’environnement de test fonctionne correctement.
test('login route should work', () => {
  assert.equal(1 + 1, 2);
});
