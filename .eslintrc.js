const base = require('@2600hz/commio-native-utilities/lib/eslint-config/base');

const config = base(__dirname);
config.env = {
  browser: true,
  es2021: true,
};
config.parserOptions = {
  tsconfigRootDir: __dirname,
  project: ['tsconfig.eslint.json'],
  ecmaVersion: 'latest',
  sourceType: 'module',
};
config.rules = {
  ...config.rules,
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling']],
      pathGroups: [
        {
          pattern: '@/**',
          group: 'parent',
          position: 'before',
        },
        {
          pattern: '@**/**',
          group: 'parent',
          position: 'before',
        },
      ],
      'newlines-between': 'never',
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
  '@typescript-eslint/no-unsafe-argument': 'warn',
  '@typescript-eslint/no-unsafe-assignment': 'warn',
  '@typescript-eslint/no-unsafe-call': 'warn',
  '@typescript-eslint/no-unsafe-member-access': 'warn',
  '@typescript-eslint/no-unsafe-return': 'warn',
  '@typescript-eslint/strict-boolean-expressions': 'warn',
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: 'variableLike',
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      leadingUnderscore: 'allow',
      trailingUnderscore: 'allow',
    },
  ],
  // note you must disable the base rule as it can report incorrect errors
  'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': ['warn', { vars: 'all', args: 'all' }],
};

module.exports = config;
