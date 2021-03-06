module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.ts', '.android.ts', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@': './src',
            '@class': './src/class',
            '@constants': './src/constants',
            '@components': './src/components',
            '@navigations': './src/navigations',
            '@screens': './src/screens',
            '@types': './src/@types',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
