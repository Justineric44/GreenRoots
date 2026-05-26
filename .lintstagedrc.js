export default {
  'frontend/**/*.{ts,tsx}': [
    'eslint --fix --config frontend/eslint.config.mjs',
    'prettier --write',
  ],
  'backend/**/*.ts': [
    'eslint --fix --config backend/eslint.config.mjs',
    'prettier --write',
  ],
  '*.{json,md}': ['prettier --write'],
};
