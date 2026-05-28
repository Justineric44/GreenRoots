import typescript from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'

export default [
  {
    files: ['**/*.ts'],

    ignores: ['prisma/generated/**'],

    languageOptions: {
      parser,
    },

    plugins: {
      '@typescript-eslint': typescript,
    },

    rules: {
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
]