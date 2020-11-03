const browserEnv = require('browser-env');
const babel = require('@babel/register');

browserEnv();
babel({
  extensions: [ '.js', '.ts', '.tsx' ],
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
        modules: 'commonjs',
        useBuiltIns: false,
        loose: true,
      },
    ],
  ],
});
