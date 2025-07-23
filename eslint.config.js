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
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      'stylistic/arrow-parens': ['error', 'as-needed'],
      'stylistic/comma-dangle': ['error', 'always-multiline'],
      'stylistic/eol-last': ['error', 'always'],
      'stylistic/no-trailing-spaces': 'error',
    },
  },
]
