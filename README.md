# 🌱 GreenRoots

GreenRoots is an e-commerce platform dedicated to reforestation. It allows individuals, companies, and associations to purchase trees that will be planted through reforestation projects around the world.

## About

Born from the urgency to take concrete action against deforestation and climate change, GreenRoots connects buyers with reforestation projects. Every tree purchased contributes directly to a specific, traceable planting project.

## Features

- Browse and filter trees and reforestation projects
- View detailed information about each tree species
- Add trees to cart and place orders
- Track past orders from your account dashboard
- Admin interface to manage trees, projects, and orders

## Sommaire

- [🌱 GreenRoots](#-greenroots)
  - [About](#about)
  - [Features](#features)
  - [Sommaire](#sommaire)
  - [Stack technique](#stack-technique)
  - [Structure du projet](#structure-du-projet)
  - [Prérequis](#prérequis)
  - [Installation](#installation)
  - [Lancer l'environnement de développement](#lancer-lenvironnement-de-développement)
    - [Avec Docker (recommandé)](#avec-docker-recommandé)
    - [Frontend (hors Docker)](#frontend-hors-docker)
  - [Variables d'environnement](#variables-denvironnement)
    - [Racine — `.env`](#racine--env)
    - [Backend — `backend/.env`](#backend--backendenv)
  - [Base de données (Prisma)](#base-de-données-prisma)
  - [Qualité de code](#qualité-de-code)
    - [Formatage — Prettier](#formatage--prettier)
    - [Lint — ESLint](#lint--eslint)
    - [Hooks Git — Husky](#hooks-git--husky)
    - [Convention de commits](#convention-de-commits)
  - [Workflow Git](#workflow-git)

## Stack technique

| Couche           | Technologie                        |
| ---------------- | ---------------------------------- |
| Frontend         | Next.js 16 (App Router) + React 19 |
| Styles           | Tailwind CSS 4                     |
| API              | Node.js 24 + Express 5             |
| Admin            | EJS (server-side rendering)        |
| ORM              | Prisma 7 (adapter `pg`)            |
| Base de données  | PostgreSQL 17 (alpine)             |
| Langage          | TypeScript                         |
| Conteneurisation | Docker + Docker Compose            |
| Hooks Git        | Husky + lint-staged + commitlint   |
| Formatage / Lint | Prettier + ESLint                  |

## Structure du projet

```
projet-cda-GreenRoots/
├── backend/                  # API Express + admin EJS
│   ├── src/
│   │   ├── server.ts        # démarrage du serveur
│   │   ├── app.ts           # configuration Express
│   │   ├── @types/           # Types TypeScript partagés
│   │   ├── controllers/      # Contrôleurs des routes
│   │   ├── lib/              # Utilitaires (Prisma client, etc.)
│   │   ├── middlewares/      # Middlewares Express
│   │   ├── models/           # Modèles métier
│   │   └── routers/          # Définition des routes
│   ├── prisma/
│   │   ├── schema.prisma     # Schéma de la base de données
│   │   └── generated/        # Client Prisma généré
│   │   └── seed.ts           # Données de test
│   │
│   │──.dockerignore
│   ├── Dockerfile            # Image de dev du backend
│   └── package.json
│
├── frontend/                 # Application Next.js
│   ├── app/                  # App Router (pages, layouts)
│   └── package.json
│
├──.gitignore
├── docker-compose.dev.yml    # Stack de dev (db + backend)
├── .husky/                   # Hooks Git
├── commitlint.config.js      # Convention de commits
└── package.json              # Scripts racine (workspace)
```

## Prérequis

- **Docker** + **Docker Compose** (pour la stack dev)
- **Node.js 24+** (si tu veux lancer les services hors Docker)
- **npm** (livré avec Node)

## Installation

1. Cloner le dépôt :

   ```bash
   git clone git@github.com:O-clock-Helsinki/projet-cda-GreenRoots.git
   cd projet-cda-GreenRoots
   ```

2. Copier les fichiers d'environnement :

   ```bash
   cp .env.example .env
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

   Adapte les valeurs (notamment `POSTGRES_PASSWORD`).

3. Installer toutes les dépendances (racine + frontend + backend) :
   ```bash
   npm run install:all
   ```

## Lancer l'environnement de développement

### Avec Docker (recommandé)

Lance la base PostgreSQL et l'API backend :

```bash
docker compose -f docker-compose.dev.yml up
```

- **API backend** : http://localhost:3001
- **PostgreSQL** : `localhost:5432`

Le code du backend est monté en volume — les modifications sont rechargées à chaud grâce à `tsx watch`.

Pour arrêter :

```bash
docker compose -f docker-compose.dev.yml down
```

Pour réinitialiser complètement (incluant le volume de données Postgres) :

```bash
docker compose -f docker-compose.dev.yml down -v
```

### Frontend (hors Docker)

Le frontend Next.js n'est pas conteneurisé pour l'instant :

```bash
cd frontend
npm run dev
```

→ http://localhost:3000

## Variables d'environnement

### Racine — `.env`

Utilisé par `docker-compose.dev.yml`.

```env
POSTGRES_USER=greenroots
POSTGRES_PASSWORD=your_password
POSTGRES_DB=greenroots
DATABASE_URL="postgresql://greenroots:your_password@localhost:5432/greenroots"
```

### Backend — `backend/.env`

Voir `backend/.env.example`. Une variante `backend/.env.test.example` existe pour les tests.

## Base de données (Prisma)

Toutes les commandes sont à lancer depuis `backend/`.

| Commande                  | Description                                     |
| ------------------------- | ----------------------------------------------- |
| `npm run prisma:generate` | Régénère le client Prisma                       |
| `npm run prisma:migrate`  | Crée et applique une nouvelle migration (dev)   |
| `npm run prisma:studio`   | Ouvre Prisma Studio (interface web pour la DB)  |
| `npm run prisma:seed`     | Exécute le seed                                 |
| `npm run prisma:reset`    | Reset complet de la DB + rejouer les migrations |

> Dans le conteneur Docker, `prisma generate` est lancé automatiquement au démarrage.

## Qualité de code

### Formatage — Prettier

Configuration : `.prettierrc`. Le formatage est appliqué automatiquement au commit via `lint-staged`.

### Lint — ESLint

- Backend : `backend/eslint.config.mjs`
- Frontend : `frontend/eslint.config.mjs` (`npm run lint`)

### Hooks Git — Husky

Hooks configurés dans `.husky/` :

- **pre-commit** : exécute `lint-staged` (formatage + lint des fichiers stagés)
- **commit-msg** : valide le message via `commitlint`

### Convention de commits

Les messages doivent suivre [Conventional Commits](https://www.conventionalcommits.org/) :

```
<type>(<scope>): <description>
```

Exemples :

- `feat(backend): add user authentication`
- `fix(frontend): correct cart total calculation`
- `build(backend): add pg adapter dependencies`

Types courants : `feat`, `fix`, `build`, `chore`, `docs`, `style`, `refactor`, `test`.

## Workflow Git

- Branche principale : `main`
- Branche d'intégration : `DEV`
- Branches de feature : `feat/<nom>`, `fix/<nom>`, `chore/<nom>`, etc.

Le workflow type :

1. Créer une branche depuis `DEV` : `git checkout -b feat/ma-feature DEV`
2. Travailler et committer (les hooks valident automatiquement)
3. Pousser : `git push -u origin feat/ma-feature`
4. Ouvrir une Pull Request vers `DEV`

---

> GreenRoots is a fictional project created for educational purposes.
