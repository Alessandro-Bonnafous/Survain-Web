# CLAUDE.md — Survain-Web

## Pitch

`Survain-Web` est le **site vitrine officiel de SURVAIN**, un jeu PC indépendant
en développement : survie + city-builder dans un univers de mythologie nordique.
Le site est statique (généré au build), multilingue FR/EN, et hébergé chez OVH
sur le domaine `survain.com`.

Le développement du jeu lui-même se fait dans le repo POC :
<https://github.com/Alessandro-Bonnafous/Survain-POC>. On s'aligne sur ses
conventions.

## Stack

- **Vite 6** + **Vue 3** (Composition API, `<script setup>`) + **TypeScript**
- **vite-ssg** — génération statique (`npm run build` → `dist/` 100 % statique)
- **vue-router 4** — routing
- **vite-plugin-pages** — file-based routing (`src/pages/`)
- **vite-plugin-vue-layouts** — layouts (`src/layouts/`)
- **vue-i18n 9** + **@intlify/unplugin-vue-i18n** — multilingue FR/EN
  (`src/i18n/locales/`)
- **unplugin-vue-markdown** + **gray-matter** — Markdown + frontmatter
- **vite-imagetools** — optimisation images au build
- **ESLint** (flat config) + **Prettier** + **simple-git-hooks** (pre-commit)
- **Node 20 LTS** (cf. `.nvmrc`)

Pas de Pinia ni Tailwind pour l'instant — KISS, on ajoutera au besoin.

## Conventions

- **Langue de travail** : français (commits, issues, doc).
- **Conventional Commits FR** : `<type>(<scope>): <description>`
  - Types : `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `ci`
  - Scopes typiques : `home`, `gameplay`, `i18n`, `build`, `deploy`, `content`
- **SemVer** : tags `v0.x.x`. Premier tag de mise en ligne : `v0.1.0`.
- **License** : All Rights Reserved (proprietary).
- **Composants Vue** : PascalCase, un composant par fichier.
- **Pages** : kebab-case dans `src/pages/`.
- **Styles** : globaux dans `src/styles/`, `scoped` par défaut dans les composants.
- **Pas de `console.*`** en code de production — utiliser le composable
  `useLog()` (`src/composables/useLog.ts`).
- **Alias** : `@` → `src/`.

## Workflow

- **GitHub Flow** : branches `feat/`, `fix/`, `chore/` ; **squash and merge** sur PR.
- **CI** (`.github/workflows/ci.yml`) : lint + build sur chaque PR vers `main`.
- **Staging** (`deploy-staging.yml`) : push `main` → déploiement SFTP OVH
  `/www/staging/` (→ `staging.survain.com`).
- **Production** (`deploy-prod.yml`) : push d'un tag `v*` → déploiement SFTP OVH
  `/www/` + création d'une GitHub Release.

Commandes :

```bash
npm run dev      # serveur de dev
npm run build    # build statique → dist/
npm run preview  # prévisualiser le build
npm run lint     # ESLint
npm run format   # Prettier
```

## Journal

> Section append-only. Une entrée par évènement notable, format
> `YYYY-MM-DD — titre`.

- **2026-06-07 — Bootstrap initial du repo (stack Vite + Vue 3 + vite-ssg + i18n)**
  - Mise en place de la structure complète, du pipeline CI/CD et de la page
    d'accueil minimaliste « coming soon » avec switch FR/EN.
  - Décisions techniques prises (choix mainstream/maintenu, cf. notes) :
    - **Vite 6** retenu plutôt que Vite 5 : version stable récente, supportée
      par tout l'écosystème **tout en restant compatible Node 20**. Vite 7/8
      écartés car plusieurs plugins exigent désormais Node 22+ à leur dernière
      version (cf. ci-dessous), ce qui entrerait en conflit avec le standard
      d'équipe Node 20.
    - **`@vitejs/plugin-vue`** utilisé pour la compilation SFC + intégration
      Markdown (`include: [/\.vue$/, /\.md$/]`).
    - **ESLint flat config** via `typescript-eslint` + `eslint-plugin-vue` +
      `@vue/eslint-config-prettier` (stack ESLint 9 standard et maintenue).
    - **`vite-plugin-vue-layouts-next`** retenu à la place de
      `vite-plugin-vue-layouts` (d'origine) : ce dernier est resté bloqué en
      peer `vite ^4 || ^5` et ne supporte pas Vite 6. Le fork `-next` est la
      version maintenue (Vite 6/7/8), même API (`virtual:generated-layouts`,
      `setupLayouts`).
    - **Versions épinglées pour rester compatibles Node 20** (le standard
      d'équipe) : `unplugin-vue-markdown@30` (v32 exige Node 22 ; v31.0.0 a un
      publish cassé sur npm — `dist/` absent du tarball),
      `vite-imagetools@^9` (v10 exige Vite 7 + Node 22),
      `@intlify/unplugin-vue-i18n@~11.1` (v11.2 exige Node 22.13).
  - **Note environnement** : le build local de bootstrap a été réalisé avec
    **Node 24** (seule LTS disponible via winget au moment du bootstrap). Le
    `.nvmrc` et la CI restent volontairement sur **Node 20** (standard d'équipe
    imposé). La stack build de façon identique sur les deux versions.

- **2026-06-07 — Fix déploiement : SFTP via `wlixcc/SFTP-Deploy-Action`**
  - `SamKirkland/FTP-Deploy-Action@v4.3.5` (préconisé au bootstrap) ne supporte
    **pas** le protocole SFTP (uniquement `ftp`/`ftps`/`ftps-legacy`) → la CI
    échouait avec « protocol: invalid parameter - you provided "sftp" ».
  - Remplacé dans `deploy-staging.yml` et `deploy-prod.yml` par
    **`wlixcc/SFTP-Deploy-Action@v1.2.6`** (vrai SFTP, port 22, mêmes secrets
    `OVH_SFTP_*`). `sftp_only: true` est requis car l'offre OVH mutualisée PERSO
    n'a pas de `rsync` côté serveur (l'action l'utilise sinon par défaut).
  - Pas de suppression distante (`delete_remote_files` laissé à `false`) :
    l'upload écrase les fichiers mais ne nettoie pas les anciens assets hashés.
    À réévaluer si l'accumulation devient gênante.
  - En mode `sftp_only`, l'action **ne crée pas** le dossier distant. Ajout d'une
    étape `Ensure remote staging directory exists` (sshpass + `sftp -b`) qui fait
    un `-mkdir /www/staging` avant l'upload. La prod déploie dans `/www/` (racine
    déjà existante) → pas d'étape équivalente nécessaire.

- **2026-06-08 — Fix déploiement : chemins SFTP relatifs (`www/`, pas `/www/`)**
  - La CI staging échouait encore : `remote mkdir "/www/staging": No such file
    or directory` puis `Multiple paths match, but destination "/www/staging/"
    is not a directory`.
  - Cause : sur le mutualisé OVH, la session SFTP atterrit dans le **home** du
    compte ; le dossier web racine `www` est un chemin **relatif**. Le chemin
    **absolu** `/www` n'existe pas → l'hypothèse « `/www/` racine existante »
    (entrée précédente) était fausse, pour staging **comme** pour prod.
  - Correctif : passage en relatif dans les deux workflows — `www/staging` (+
    `-mkdir www/staging`) pour staging, `www/` pour prod. `www` existant déjà,
    aucune étape mkdir n'est nécessaire côté prod. Run staging vert confirmé.
  - Secrets OVH (`OVH_SFTP_HOST/USER/PASSWORD/PORT`) : OK, la connexion réussit.

- **2026-06-08 — Fix déploiement prod : suppression du symlink `www/index.html`**
  - Au premier tag `v0.1.0`, le deploy prod échouait sur
    `dest open ".../www/index.html": No such file or directory`, alors que
    `assets/` et `favicon.svg` s'uploadaient bien.
  - Diagnostic (via une étape temporaire `ls -la` dans le workflow staging,
    même compte OVH) : `www/index.html` est un **symlink** (la page de parking
    OVH par défaut, propriétaire `ovh`). Le `put` SFTP suit le symlink et tente
    d'écrire dans sa cible non writable → erreur. Staging n'était pas concerné
    (`www/staging/` est un dossier neuf sans ce symlink).
  - Correctif : étape `Prepare remote production directory` qui fait
    `-mkdir www` puis `-rm www/index.html` avant l'upload (le `-` ignore
    l'absence). Le `put` crée ensuite un vrai `index.html`.
  - Le tag `v0.1.0` (et sa Release vide) a été recréé sur le commit corrigé
    (rien n'avait été déployé sur les tentatives précédentes).

- **2026-06-18 — Intégration hero v7 (Sprint A) : fondations + AppNav + HeroSection**
  - Direction visuelle « théâtrale Norse, gravée romaine » validée en HTML
    (prototype hero v7), intégrée en Vue 3 sur la **home uniquement** (Sprint A).
  - **Police display définitive : Cinzel** (remplace Allura) via
    `@fontsource/cinzel` (poids 400→800 importés dans `main.ts`).
  - **Tokens étendus** (`tokens.css`) : `--stone-light/stone/stone-dark`,
    `--ink`, `--parchment`, `--ash`, `--ease-theatrical`, `--chamfer`,
    `--tracking-caps`. Couleurs or/rouge du POC conservées.
  - **Composants** : `ui/Btn.vue` (boutons chanfreinés primary/ghost),
    `ui/LangSwitcher.vue` (menu déroulant accessible, fermeture clic dehors +
    Échap), `layout/AppNav.vue` (nav fixe transparente, devient opaque au
    scroll), `home/HeroSection.vue`. Composable `composables/useEmbers.ts`
    (braises générées dynamiquement, respecte `prefers-reduced-motion`).
  - **Wordmark** intégré comme PNG transparent (`public/images/survain-wordmark.png`)
    — suppression du hack `mix-blend-mode`. Background hero positionné
    `right center` (sujet à droite : guerrier + feu de camp).
  - **Décisions d'intégration** (le repo a divergé du plan d'origine, écrit pour
    l'état « coming soon » mono-page) :
    - La home porte une **nav fixe mono-page** (ancres `#univers/#gameplay/
      #communaute`, sections à venir en Sprint B). Elle sort donc du layout
      `default` (AppHeader/AppNav/AppFooter) via un nouveau layout **`blank`**
      (`<route>{ meta: { layout: 'blank' } }`) — sinon double nav.
    - Les pages **Gameplay et Outils** sont **mises de côté** (toujours
      présentes et routables, mais hors du nouveau flux home) ; réintégration
      dans un second temps.
    - i18n **fusionné** (et non écrasé) : ajout du namespace `hero`, des clés
      `nav.univers/nav.communaute` et `coming_soon`, sans toucher aux
      traductions existantes (gameplay, community, arbre de craft, footer).
    - Asset corrigé : le fond hero est `hero-bg.png` (le plan citait `.jpg`).
  - **Note environnement** : build/lint validés sous **Node 20.20.2** (installé
    via nvm ; le shell était par défaut sur Node 18 incompatible — ESM/CJS).
  - À venir **Sprint B** : sections Univers, Ascension, Communauté, Footer, et
    réintégration Gameplay/Outils dans la nouvelle DA.

- **2026-06-18 — Sprint B (1/n) : section Univers**
  - Première section du Sprint B : `home/UniversSection.vue` (cible de l'ancre
    `#univers`), ajoutée sous le hero sur la home. Réemploi du lore existant
    (`home.presentation.paragraphs`) — aucun contenu inventé ; un titre/intro
    dédié pourra être glissé plus tard (contenu fourni au fil de l'eau par Aless).
  - DA gravée : eyebrow `nav.univers` encadré de filets dorés, lettrine Cinzel
    dorée sur le paragraphe d'accroche, corps en `--parchment` justifié, filet
    doré de séparation avec le hero. `scroll-margin-top` pour dégager la nav fixe.
  - `scroll-behavior: smooth` ajouté (guardé `prefers-reduced-motion`) pour les
    ancres mono-page.
  - À venir : sections Ascension, Communauté, Footer (contenu à fournir).

- **2026-06-18 — Sprint B (2/n) : page Gameplay (fusion Gameplay + Outils)**
  - Nouvelle page `/gameplay` (layout `blank`, nouvelle DA) fusionnant l'ancien
    Gameplay et l'ancien Outils sous **deux sous-onglets** « Gameplay » /
    « Arbre de craft ». Logique préservée, juste réorganisée :
    - `components/gameplay/GameplayCategories.vue` (onglets de catégories +
      chapitres) extrait de l'ancien `gameplay.vue`.
    - `components/gameplay/CraftTree.vue` (arbre de craft : sections + sélecteurs
      biome/tier + tableaux, avec `tv`/`tvi`/`translateCost`) extrait de l'ancien
      `tools.vue`.
  - **`tools.vue` supprimé** ; route `/tools` → redirection vers `/gameplay`
    (`main.ts`). NB : en SSG, `dist/tools.html` est rendu avec le contenu de
    Gameplay (dégradation gracieuse) + le routeur redirige côté client.
  - **Nav multi-page** : `AppNav` déplacé dans le layout `blank` (partagé
    home + gameplay). Liens passés en `RouterLink` : `/#univers`, `/gameplay`,
    `/#communaute` ; `scrollBehavior` ajouté (ViteSSG) pour le défilement vers
    l'ancre, y compris cross-page. La home (`index.vue`) ne porte plus `AppNav`.
  - Restyle DA des composants de contenu : `InfoTable` (en-têtes Cinzel dorés,
    lignes zébrées, parchemin), `GameplayChapter`, `ContentBlock`,
    `ExampleSelector` ; onglets chanfreinés cohérents avec les boutons.
  - Tests : `CraftTree.spec` (ex-`tools.spec`), `gameplay.spec` adapté
    (sous-onglets) ; `tools.spec` supprimé. 50 tests verts.
  - NB : la page `/community` reste sur l'**ancienne** DA (layout `default`) —
    à migrer lors du lot Communauté.

## Décisions en attente

- **Intégration maquette Thierry** (UX/design) — en cours côté Thierry. Le
  design visuel actuel est **volontairement minimal** en attendant la refonte.
- **Mise en place de Decap CMS** pour Pascal (édition de contenu git-based) —
  sprint ultérieur.
- **Workflow cross-repo Survain-POC → Survain-Web** sur tag (publication
  automatique de contenu depuis le POC) — sprint ultérieur.
