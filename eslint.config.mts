import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';
import fs from 'fs';
import path from 'path';
import prettier from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import importPlugin from 'eslint-plugin-import';

const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));
const paths = tsconfig.compilerOptions?.paths ?? {};

const aliasPrefixes = Object.keys(paths)
  .map((key) => key.replace(/\*$/, ''))
  .filter((key) => key.startsWith('@'));

const aliasGroupRegex = aliasPrefixes.map((alias) => `^${alias}`);

export default defineConfig([
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier,
      'simple-import-sort': simpleImportSort,
      import: importPlugin,
    },
    rules: {
      // Отключаем правила ESLint, которые могут конфликтовать с Prettier
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      // Правила Prettier
      'prettier/prettier': 'error',
      // Основные правила
      eqeqeq: 'error',
      'array-callback-return': [
        'error',
        { allowImplicit: true, checkForEach: true },
      ],
      'no-async-promise-executor': 'error',
      'no-console': 'warn',
      'no-irregular-whitespace': ['error', { skipComments: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { ignoreRestSiblings: true },
      ],
      'no-unused-expressions': 'error',
      'prefer-const': 'error',
      // Отключаем строгие правила для тестов
      'no-magic-numbers': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      // Правила импортов
      'simple-import-sort/imports': [
        'error',
        {
          groups: [['^\\w', '^@\\w', ...aliasGroupRegex, '^', '^\\.']],
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-unresolved': 'warn', // Изменяем на предупреждение
      'import/no-useless-path-segments': 'warn',
    },
  },
  {
    files: ['**/*.spec.ts', '**/*.test.ts', 'playwright.config.ts'],
    rules: {
      // Дополнительные правила для тестовых файлов
      'import/no-unresolved': 'off', // Отключаем для тестов
      'import/no-duplicates': 'off', // Отключаем для тестов
    },
  },
  {
    ignores: [
      'node_modules',
      'test-results',
      'allure-results',
      'allure-report',
    ],
  },
]);
