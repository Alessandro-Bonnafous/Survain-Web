import { fileURLToPath, URL } from 'node:url'
// `defineConfig` importé depuis `vitest/config` (et non `vite`) pour typer le
// bloc `test` ci-dessous, tout en conservant le typage Vite (dont ssgOptions).
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts-next'
import Markdown from 'unplugin-vue-markdown/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { imagetools } from 'vite-imagetools'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    Vue({
      // Permet aux composants `.md` d'être traités comme des SFC Vue.
      include: [/\.vue$/, /\.md$/],
    }),
    Pages({
      dirs: 'src/pages',
      extensions: ['vue', 'md'],
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'default',
    }),
    Markdown({
      // gray-matter est utilisé en interne pour extraire le frontmatter.
      headEnabled: true,
    }),
    // Les messages sont importés directement en JSON (cf. src/i18n/index.ts).
    // On garde le plugin pour le support des blocs `<i18n>` dans les SFC et les
    // flags de build vue-i18n. `runtimeOnly: false` embarque le compilateur,
    // nécessaire à la compilation des messages lors du rendu SSR de vite-ssg.
    VueI18nPlugin({
      runtimeOnly: false,
    }),
    imagetools(),
  ],
  // Options propres à vite-ssg (génération statique).
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
  },
  // Configuration des tests unitaires (Vitest).
  test: {
    environment: 'happy-dom',
    // Les helpers (describe/it/expect) sont importés explicitement dans chaque
    // spec — pas de globals pour garder le typage TS simple.
    // Tests regroupés à la racine dans test/ (hors src/).
    include: ['test/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      // `json-summary` + `json` sont requis par l'action de report GitHub ;
      // `text` pour la sortie console, `html` pour l'inspection locale.
      reporter: ['text', 'json', 'json-summary', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{ts,vue}'],
      exclude: ['src/env.d.ts', 'src/main.ts'],
      // Cible d'équipe : ~80 % sur la logique. Volontairement INDICATIF —
      // aucun seuil bloquant ici, la CI n'échoue pas sur le pourcentage.
    },
  },
})
