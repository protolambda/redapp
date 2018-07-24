import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import commonjs from 'rollup-plugin-commonjs';

const env = process.env.NODE_ENV;
const config = {
  input: './src/index.js',
  plugins: [
    commonjs({
      namedExports: {
        // Web3 exports an object of sub-components, but it needs to be instantiated first,
        // but it has no default name, hence we give it a name here.
        'node_modules/web3/index.js': ['Web3']
      }
    }),
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ],
  external: [
    'crypto',
    'redux-saga',
    'redux-saga/effects',
    'web3-utils',
    'uuid/v4',
    'web3',
    'redux'
  ],
  output: {format: 'umd', name: 'redapp', indent: false, exports: 'named'}
};

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

export default config;
