import js from '@eslint/js'

export default [
  js.configs.recommended,
  {
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
      'no-unused-vars': ['warn'],
      'no-trailing-spaces': ['error'],
      'eol-last': ['error', 'always'],
      'arrow-parens': ['error', 'always'],
      'curly': ['error', 'all'],
    },
  },
]
