module.exports = {
  extends: [
    "@vercel/style-guide/eslint/node",
    "@vercel/style-guide/eslint/typescript",
    "eslint-config-turbo",
    "eslint-config-prettier",
  ],
  rules: {
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
