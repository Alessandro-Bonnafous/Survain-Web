# SURVAIN — Site officiel

> **SURVAIN** est un jeu PC indépendant mêlant survie et city-builder dans un
> univers de mythologie nordique. Ce dépôt contient le site vitrine officiel,
> statique et multilingue (FR/EN).

Repo du jeu (POC) : <https://github.com/Alessandro-Bonnafous/Survain-POC>

## Démarrer

Prérequis : **Node 20 LTS** (cf. `.nvmrc`).

```bash
nvm use       # bascule sur la version Node du projet
npm ci        # installe les dépendances (lockfile)
npm run dev   # lance le serveur de développement
```

## Build

```bash
npm run build   # génération statique → dossier dist/
npm run preview # prévisualise le build localement
```

La sortie dans `dist/` est 100 % statique (aucun runtime serveur requis).

## Déploiement

Automatique via **GitHub Actions** :

- **Push sur `main`** → déploiement *staging* (`staging.survain.com`).
- **Push d'un tag `v*`** → déploiement *production* (`survain.com`) + GitHub
  Release.

Voir `.github/workflows/`.

## Conventions

Toutes les conventions (commits, branches, stack, workflow) sont documentées
dans [CLAUDE.md](CLAUDE.md).

## Licence

© 2026 Alessandro Bonnafous. **All Rights Reserved.** Voir [LICENSE](LICENSE).
