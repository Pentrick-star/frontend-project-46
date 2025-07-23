import js from '@eslint/js';

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
      semi: ['error', 'always'],
      indent: ['error', 2],
      'no-unused-vars': ['warn'],
      'arrow-parens': ['error', 'always'],
      'eol-last': ['error', 'always'],
      'no-trailing-spaces': ['error'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
    },
  },
];
