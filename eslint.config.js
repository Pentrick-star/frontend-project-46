import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'

export default [
  js.configs.recommended,
  {
    plugins: { stylistic },
    rules: {
      'stylistic/arrow-parens': ['error', 'as-needed'],
      'stylistic/indent': ['error', 2],
      // ... другие правила по необходимости
    },
  },
]
