import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    // Node-side files (smoke tests, CI scripts, Playwright config) — not app code.
    files: ['tests/**/*.js', 'scripts/**/*.mjs', 'playwright.config.js'],
    languageOptions: { globals: { ...globals.node, ...globals.browser } },
  },
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: { react },
    rules: {
      // JSX usage now counts as usage (react/jsx-uses-vars), so the old
      // varsIgnorePattern '^[A-Z_]' escape hatch is gone — it was exempting
      // every component/icon import from no-unused-vars (2026-07-02 review).
      'react/jsx-uses-vars': 'error',
      'no-unused-vars': ['error'],
      // Experimental React-Compiler rule: flags idiomatic run-once-on-mount
      // and prop-sync effects as errors. Not using the compiler here; the
      // stable rules-of-hooks, exhaustive-deps, purity and refs stay on.
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
