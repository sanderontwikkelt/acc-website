/** @type {import('eslint').Linter.Config} */
const config = {
  extends: ["plugin:@next/next/recommended"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "@typescript-eslint/require-await": "off",
    "jsx-a11y/heading-has-content": "off",
  },
};

module.exports = config;
