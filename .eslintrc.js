module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  // https://medium.com/@killerchip0/react-native-typescript-with-eslint-and-prettier-e98d50585627
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  settings: {
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@navigations': './src/navigations',
          '@screens': './src/screens',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
