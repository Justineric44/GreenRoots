# Campagne de tests XSS — GreenRoots

## Audit statique initial

| Élément vérifié      | Commande                                         | Résultat attendu                               | Résultat obtenu                                                        | Statut       |
| -------------------- | ------------------------------------------------ | ---------------------------------------------- | ---------------------------------------------------------------------- | ------------ |
| Rendu HTML brut EJS  | `grep -R "<%-" backend/views`                    | Aucun `<%-` dangereux avec données utilisateur | Includes EJS OK, flèches de tri OK, point à surveiller sur `data-tree` | À surveiller |
| Injection HTML React | `grep -R "dangerouslySetInnerHTML" frontend/src` | Aucun résultat                                 | Aucun résultat                                                         | OK           |

## Payloads utilisés

| Code   | Payload                            |
| ------ | ---------------------------------- |
| XSS-01 | `<script>alert('XSS')</script>`    |
| XSS-02 | `<img src=x onerror=alert('XSS')>` |
| XSS-03 | `"><script>alert('XSS')</script>`  |
| XSS-04 | `javascript:alert('XSS')`          |

## Tests manuels

Pour une meilleure lisibilité des tests, faites un clic droit sur le fichier « campagne-tests-xss.xlsx », puis sélectionnez « Afficher dans l’explorateur » pour l’ouvrir avec votre tableur.

## Critères de validation

Un test est réussi si :

- aucune alerte JavaScript ne s’affiche ;
- la page ne plante pas ;
- le HTML injecté est affiché comme du texte ou neutralisé ;
- les logs backend ne montrent pas d’erreur critique.

## Remarque

Anomalies détectées hors XSS

| ID                | Zone           | Problème                                   | Cause probable                                     | Action recommandée                                    |
| ----------------- | -------------- | ------------------------------------------ | -------------------------------------------------- | ----------------------------------------------------- |
| ANO-ADMIN-TREE-01 | Création arbre | Erreur Prisma P2020 numeric field overflow | Prix saisi trop élevé pour le type numeric en base | Ajouter une limite max dans le validateur Zod du prix |

## Conclusion

21 tests réalisés.
21 tests réussis.
Aucune exécution de JavaScript observée.
Aucune vulnérabilité XSS reproduite.
Les mots de passe sont stockés sous forme de hash Argon2id.
Les validations de slug ont correctement bloqué les entrées malveillantes.
Les interfaces publiques et d’administration ont correctement neutralisé les payloads testés.
