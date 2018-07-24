import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import multiEntry from 'rollup-plugin-multi-entry';
import commonjs from 'rollup-plugin-commonjs';

const env = process.env.NODE_ENV;
const config = {
  input: {
    include: ['src/**/*.js'],
    exclude: ['src/util']
  },
  plugins: [
    multiEntry(),
    commonjs({
      namedExports: {
        // Web3 exports an object of sub-components, but it needs to be instantiated first,
        // but it has no default name, hence we give it a name here.
        'node_modules/web3/index.js': ['Web3']
      }
    })
  ],
  external: [
    'redux-saga',
    'web3-utils',
    'uuid',
    'web3',
    'redux',
    'redux-saga'
  ]
};

if (env === 'es' || env === 'cjs') {
  config.output = {format: env, indent: false};
  config.external = ['symbol-observable'];
  config.plugins.push(
    babel({
      plugins: ['@babel/plugin-external-helpers'],
    })
  );
}

if (env === 'development' || env === 'production') {
  config.output = {format: 'umd', name: 'redapp', indent: false};
  config.plugins.push(
    nodeResolve({
      jsnext: true
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: ['@babel/plugin-external-helpers'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  );
}

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
