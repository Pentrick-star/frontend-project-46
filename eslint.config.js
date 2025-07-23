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
        console: 'readonly',
        process: 'readonly',
      },
    },
    rules: {
      semi: ['error', 'never'],
      indent: ['error', 2],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-unused-vars': ['warn'],
      'arrow-parens': ['error', 'always'],
    },
  },
]
