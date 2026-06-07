import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
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
})
