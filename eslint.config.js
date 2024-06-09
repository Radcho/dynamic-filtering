// @ts-check
import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReactConfigRecommended from 'eslint-plugin-react/configs/recommended.js';
import pluginReactConfigRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  ...tseslint.config({
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  }),
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReactConfigRecommended,
  pluginReactConfigRuntime,
  eslintPluginPrettierRecommended,
];
