import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    plugins: { stylistic },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        test: 'readonly',
        expect: 'readonly',
        process: 'readonly',
        console: 'readonly',
      },
    },
    rules: {
      'stylistic/arrow-parens': ['error', 'always'],
      'stylistic/eol-last': ['error', 'always'],
      'stylistic/no-trailing-spaces': 'error',
    },
  },
]
