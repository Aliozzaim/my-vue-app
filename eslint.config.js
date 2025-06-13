import vuePlugin from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import babelParser from "@babel/eslint-parser";
import { defineFlatConfig } from "eslint-define-config";

export default defineFlatConfig([
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: babelParser,
        ecmaVersion: 2022,
        sourceType: "module",
        requireConfigFile: false,
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      ...vuePlugin.configs.base.rules,
      ...vuePlugin.configs["vue3-essential"]?.rules,
      "vue/comment-directive": "off",
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
    },
  },
]);
