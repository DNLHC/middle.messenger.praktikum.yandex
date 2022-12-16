module.exports = {
  plugins: ['@typescript-eslint', 'promise', 'unicorn'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'prettier',
  ],
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'no-undefined': 'error',
    'prefer-spread': 'error',
    'no-underscore-dangle': 'off',
    'prefer-template': 'off',
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],

    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',

    // disallow certain syntax forms
    // https://eslint.org/docs/rules/no-restricted-syntax
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],

    'unicorn/no-null': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'unicorn/prefer-add-event-listener': 'off',
    'unicorn/no-object-as-default-parameter': 'off',
    'unicorn/filename-case': [
      'error',
      {
        case: 'kebabCase',
      },
    ],
    'unicorn/prefer-ternary': 'off',
    'unicorn/consistent-function-scoping': 'off',

    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],

    // promises
    'promise/prefer-await-to-then': 'error',
    'promise/prefer-await-to-callbacks': 'error',
    'promise/no-nesting': 'error',
    'promise/no-return-in-finally': 'error',
    'promise/always-return': 'off',
  },
};
