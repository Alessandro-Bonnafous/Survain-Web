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

- **2026-06-18 — Sprint B (3/n) : section Communauté**
  - `home/CommunauteSection.vue` (cible `#communaute`) ajoutée sous Univers sur
    la home, nouvelle DA : carte Discord (logo + CTA chanfreiné), carte Musiques
    (`MusicPlayer` restylé), grille « À venir » (6 chips). Contenu repris de
    l'ancienne `/community`.
  - **`community.vue` supprimé** ; `/community` → redirection vers `/#communaute`
    (`main.ts`). Plus aucune page sur le layout `default` (devenu fallback inerte ;
    `AppHeader`/`AppFooter`/ancien `AppNav` conservés mais non rendus).
  - **Bug asset corrigé** : `discord-logo.png` avait un faux damier *peint* dans
    ses pixels (opaque, R≈G≈B) — il se serait affiché tel quel. Détouré par
    flood-fill achromatique depuis les bords (`scripts/make-discord-transparent.mjs`)
    → `discord-logo-transparent.png` (squircle bleu + emblème blanc préservés).
  - Tests : `CommunauteSection.spec` (reprend les assertions de l'ex-`community.spec`),
    `community.spec` supprimé. 52 tests verts.
  - **Reste du Sprint B** : section/onglet Ascension, **Footer** (absent du site
    depuis le retrait de `/community`), migration éventuelle du reste.

- **2026-06-19 — Sprint B (4/n) : Footer global + retrait du « À venir »**
  - **Retrait de la grille « À venir »** de `CommunauteSection.vue` (validé par
    Aless après test) : bloc template `comm__soon-wrap`, const `soonKeys` et
    styles `.comm__soon*`/`.comm__heading--center` supprimés ; clés i18n
    `community.soon.*` retirées de `fr.json`/`en.json` ; assertion correspondante
    retirée de `CommunauteSection.spec`. La section ne garde que Discord + Musiques.
  - **Nouveau Footer** `components/layout/AppFooter.vue` (nouvelle DA gravée :
    filet doré haut, wordmark, liens `RouterLink` `/#univers` `/gameplay`
    `/#communaute`, lien Discord externe via `EXTERNAL_LINKS`, mention de droits
    Cinzel). Ajouté au layout **`blank`** (partagé home + gameplay) → comble
    l'absence de footer depuis le retrait de `/community`.
  - L'ancien `components/AppFooter.vue` (layout `default` inerte) est conservé
    mais non rendu ; le nouveau vit sous `layout/` avec `AppNav`.
  - Tests : `AppFooter.spec` ajouté. 54 tests verts, lint + build SSG OK.
  - **Reste du Sprint B** : section/onglet Ascension, migration éventuelle du reste.

- **2026-06-19 — Sprint B (5/n) : nettoyage du code legacy non rendu**
  - Suppression du code mort hérité de l'ancienne DA (audit : plus rien ne
    rendait le layout `default`). Supprimés : `layouts/default.vue`,
    `components/AppHeader.vue`, `components/AppNav.vue` (racine),
    `components/AppFooter.vue` (racine), `components/LocaleSwitcher.vue` (la
    version vivante est `ui/LangSwitcher.vue`), et leurs specs orphelines
    (`AppNav.spec`, `LocaleSwitcher.spec`). Le site n'a plus qu'**un seul
    layout** (`blank`) ; `components/layout/` (AppNav + AppFooter) est l'actif.
  - Clés i18n orphelines retirées (`fr.json` + `en.json`) : `coming_soon`
    (relique du « coming soon »), `pages.community.title` (page supprimée),
    `pages.tools.title` (page supprimée). Le namespace **racine** `tools.*`
    (craft tree, utilisé par `CraftTree`) est conservé — à ne pas confondre.
  - `useLog` **conservé** (utilitaire imposé par la convention « pas de
    `console.*` », pas encore mobilisé).
  - 48 tests verts (−6 des 2 specs supprimées), lint + build SSG OK.

- **2026-06-19 — Sprint B (6/n) : sections « Le jeu » + « Ascension »**
  - Reprise des sections `Le jeu` (#jeu) et `Ascension` (#ascension) du prototype
    `survain-home-theatrale-v5.html`, **adaptées à la DA gravée** du site (eyebrow
    à filets dorés, Cinzel, tokens) — sans les animations JS `reveal` du proto
    (nos sections home restent statiques).
  - `home/LeJeuSection.vue` : titre + accroche + 3 piliers (Survie / Politique /
    Faveur des Dieux) avec médaillons SVG (stroke `--color-gold`, fill
    `--color-gold-dark` via classe, pas de couleurs en dur).
  - `home/AscensionSection.vue` : 4 paliers (Contrée → Province → Région →
    Royaume) reliés par une frise dorée, runes Cinzel, palier Royaume marqué
    « guerre » (PvP, rune en `--color-red`). Fond `--color-black` (contraste avec
    les sections `--ink`), frise verticale en pile < 880px.
  - Ordre home : Hero → Univers → **Le jeu** → **Ascension** → Communauté.
  - i18n : namespaces `home.game.*` et `home.ascension.*` ajoutés (FR + EN),
    contenu repris fidèlement du proto.
  - Tests : `LeJeuSection.spec`, `AscensionSection.spec`, + assertion d'ordre des
    sections dans `index.spec`. 56 tests verts, lint + build SSG OK.
  - **Nav** : ancres `#jeu` et `#ascension` ajoutées à `AppNav` **et** au footer
    (clés `nav.jeu`/`nav.ascension` FR+EN), ordre Univers → Le jeu → Ascension →
    Gameplay → Communauté. `AppFooter.spec` mis à jour (liste des liens).
    NB : `AppNav` masque toujours les liens < 1180px (pas de menu burger — gap
    mobile préexistant, hors scope).

- **2026-06-26 — Sprint M3 : migration du simulateur de forge (épopée #21)**
  - Portage fidèle du mini-jeu legacy `OldSurvain-Web/Simulateur.html` (single-file
    HTML/CSS/JS) vers Vue 3, sur une **page dédiée `/simulateur`** (layout `blank`,
    ajoutée à `AppNav` + `AppFooter`, ordre Gameplay → **Forge** → Communauté).
    Redirection `/forge → /simulateur`.
  - **Flux complet (5 étapes)** porté : Matériaux (carte cliquable, 16 hotspots,
    qualité = 25 %/bon matériau) → Fourneau (gestion chaleur, soufflet, cycles,
    qualité `100−|DT|−|DC·5|`) → Forge (jeu de rythme 10 cycles, marteau/pince,
    `100−défauts·5`) → Trempe (plage qui rétrécit, `100−ECi/20`) → Final (qualité
    combinée). Toutes les formules reprises **à l'identique** du legacy.
  - **Architecture** (logique découplée de l'UI, testable) :
    - `config/forge.ts` — données typées (biomes, saisons, minerais + positions,
      cibles °C, chemins d'assets).
    - `composables/useForgeSimulator.ts` — cœur : état réactif + calculs + minuteries
      centralisées **nettoyées au démontage** (`onBeforeUnmount`). Ticks exposés pour
      les tests (déterministes, sans temps réel).
    - `composables/useForgeAudio.ts` — 5 SFX (soufflet, fourneau en boucle, marteau,
      pince, trempe), `Audio` créés paresseusement (SSR/test-safe), **mute**, garde
      autoplay (cf. `MusicPlayer`).
    - `components/forge/ForgeSimulator.vue` — UI : bandeau, jauges (transition CSS),
      sablier (flip `.is-tick`), swaps d'images, hotspots d'action. `prefers-reduced-motion`
      désactive les transitions. Habillage DA gravée (tokens), intérieur proche du legacy.
  - **Assets** copiés, **renommés en kebab-case** (sans accent/espace) et
    **optimisés WebP** via `scripts/compress-forge-assets.mjs` (sharp :
    redimensionnement ≤ 1100 px + WebP q80, alpha préservé) → **38,3 Mo → 1,8 Mo
    (−95 %)**. `public/images/forge/` (25 `.webp`) + `public/sons/forge/` (5 sons).
    Chemins centralisés dans `config/forge.ts`. Servis depuis `public/` (hors
    `vite-imagetools`).
  - i18n : namespace dédié `forge` (fichiers `locales/{fr,en}/forge.json`), fusionné
    dans `i18n/index.ts` **et** `test/helpers/i18n.ts`. Clé `nav.simulateur`.
  - Tests : `useForgeSimulator.spec` (16 — formules de qualité, ticks fourneau/forge,
    transitions, garde `start`/`reset`) + `ForgeSimulator.spec` (smoke : intro,
    passage matériaux + 16 hotspots, locale). **78 tests verts**, lint + build SSG OK
    (`dist/simulateur.html` rendu). Action/animation/son validés manuellement par Aless.
  - L'épopée #6 (« différé : maquette Thierry + simulateur ») avait été scindée :
    simulateur → #21 (fait ici) ; volet design Thierry abandonné (la refonte DA gravée
    Sprint A/B l'a remplacé).

## Décisions en attente

- **Intégration maquette Thierry** (UX/design) — en cours côté Thierry. Le
  design visuel actuel est **volontairement minimal** en attendant la refonte.
- **Mise en place de Decap CMS** pour Pascal (édition de contenu git-based) —
  sprint ultérieur.
- **Workflow cross-repo Survain-POC → Survain-Web** sur tag (publication
  automatique de contenu depuis le POC) — sprint ultérieur.
