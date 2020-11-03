import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-node-resolve';
import { peerDependencies } from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/es/react-harness.js',
      format: 'es',
      exports: 'default',
    },
    {
      file: 'dist/cjs/react-harness.js',
      format: 'cjs',
      exports: 'default',
    },
  ],
  plugins: [
    localResolve({
      extensions: [ '.js', '.ts', '.tsx' ],
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: [ '.js', '.ts', '.tsx' ],
    }),
  ],
  external: Object.keys(peerDependencies),
};
