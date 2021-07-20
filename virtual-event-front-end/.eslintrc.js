module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'airbnb',
  ],
  globals: {
    $zopim: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import',
    'eslint-plugin-babel',
    'react-hooks',
    '@typescript-eslint',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        project: './',
      },
    },
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-shadow': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/jsx-props-no-spreading': 'off',
    'max-len': 'off',
    'import/no-cycle': [2, { maxDepth: 1 }],
    'import/no-unresolved': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '__REDUX_DEVTOOLS_EXTENSION__',
          '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__',
        ],
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'no-empty-function': 'off',
    'no-unused-expressions': 0,
    'babel/no-unused-expressions': 2,
    'react/no-array-index-key': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-unused-vars': 'warn',
    'spaced-comment': 'warn',
    'no-console': 0,
  },
  overrides: [
    {
      files: [
        '*index.js',
        '*spec.js',
      ],
      rules: {
        'react/jsx-filename-extension': [
          1,
          { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
        ],
        'no-empty-function': 'off',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-empty-function': 'warn',
        'react/prop-types': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'react/require-default-props': 'off',
      },
    },
  ],
  ignorePatterns: ['env/**/*.js', 'src/network/graphql-models.ts'],
};
