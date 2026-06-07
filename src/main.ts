import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import App from './App.vue'
import { i18n } from '@/i18n'
import '@/styles/reset.css'
import '@/styles/tokens.css'

const routes = setupLayouts(generatedRoutes)

// `createApp` est consommé par vite-ssg pour le rendu statique et l'hydratation.
export const createApp = ViteSSG(App, { routes }, ({ app }) => {
  app.use(i18n)
})
