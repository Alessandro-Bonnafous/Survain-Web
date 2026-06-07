/**
 * Logger minimal pour le site (équivalent simplifié du `SurvainLog` du POC).
 *
 * On évite les `console.*` dispersés dans le code (interdits par ESLint) :
 * tout passe par ce composable, ce qui permettra plus tard d'ajouter des
 * niveaux, un transport distant ou une désactivation en production.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

const PREFIX = '[Survain]'

function emit(level: LogLevel, ...args: unknown[]): void {
  // Unique point du code autorisé à appeler la console.
  // eslint-disable-next-line no-console
  console[level](PREFIX, ...args)
}

export function useLog() {
  return {
    debug: (...args: unknown[]) => emit('debug', ...args),
    info: (...args: unknown[]) => emit('info', ...args),
    warn: (...args: unknown[]) => emit('warn', ...args),
    error: (...args: unknown[]) => emit('error', ...args),
  }
}
