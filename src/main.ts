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

// Redirections : la page Gameplay fusionne désormais Gameplay + Outils
// (sous-onglets). L'ancienne route /tools redirige vers /gameplay.
routes.push({ path: '/tools', redirect: '/gameplay' })

// `createApp` est consommé par vite-ssg pour le rendu statique et l'hydratation.
export const createApp = ViteSSG(
  App,
  {
    routes,
    // Défilement vers l'ancre ciblée (#univers, …) lors des navigations, y
    // compris cross-page (ex. depuis /gameplay vers /#univers).
    scrollBehavior(to) {
      if (to.hash) return { el: to.hash, top: 84, behavior: 'smooth' }
      return { top: 0 }
    },
  },
  ({ app, isClient }) => {
    app.use(i18n)
    // Restauration du choix de langue : client uniquement (pas de localStorage
    // pendant le rendu statique).
    if (isClient) {
      restoreLocale()
    }
  },
)
