module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.ts', '.android.ts', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@components': ['components/*'],
            '@navigations': ['navigations/*'],
            '@sreens': ['sreens/*'],
          },
        },
      ],
    ],
  };
};
