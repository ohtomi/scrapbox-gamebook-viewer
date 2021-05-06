module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'standard',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
    'svelte3',
  ],
  settings: {
  },
  rules: {
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    'no-useless-constructor': 'off' // SEE. https://github.com/typescript-eslint/typescript-eslint/issues/1131
  },
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/first': 0,
        'import/no-duplicates': 0,
        'import/no-mutable-exports': 0,
      }
    }
  ],
  ignorePatterns: [
    'public/build/',
    '.eslintrc.js',
    'rollup.config.js',
  ]
}
