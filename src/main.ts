import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import App from './App.vue'
import { i18n } from '@/i18n'
import { restoreLocale } from '@/i18n/locale'
import '@fontsource/cinzel/400.css'
import '@fontsource/cinzel/500.css'
import '@fontsource/cinzel/600.css'
import '@fontsource/cinzel/700.css'
import '@fontsource/cinzel/800.css'
import '@/styles/reset.css'
import '@/styles/tokens.css'

const routes = setupLayouts(generatedRoutes)

// `createApp` est consommé par vite-ssg pour le rendu statique et l'hydratation.
export const createApp = ViteSSG(App, { routes }, ({ app, isClient }) => {
  app.use(i18n)
  // Restauration du choix de langue : client uniquement (pas de localStorage
  // pendant le rendu statique).
  if (isClient) {
    restoreLocale()
  }
})
