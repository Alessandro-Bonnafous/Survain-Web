import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import prettier from '@vue/eslint-config-prettier'

export default tseslint.config(
  {
    name: 'app/ignores',
    ignores: ['dist/**', 'node_modules/**', '.vite/**', '**/*.d.ts'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    name: 'app/vue-ts',
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    name: 'app/rules',
    rules: {
      // Interdit console.* en prod : utiliser le composable useLog().
      'no-console': 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  prettier,
)
