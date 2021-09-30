import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import localResolve from 'rollup-plugin-local-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import babel from 'rollup-plugin-babel';
import fs from 'fs-extra';
import { terser } from 'rollup-plugin-terser';
import path from 'path';
const componentsPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');
import pkg from './package.json';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

// Excluded dependencies - dev dependencies
const external = Object.keys(pkg.devDependencies);

const plugins = [
  babel({
    exclude: 'node_modules/**',
    extensions,
    runtimeHelpers: true,
    presets: [
      ['@babel/preset-env'],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: [
      'babel-plugin-optimize-clsx',
      ['styled-jsx/babel', { optimizeForSpeed: true }],
      ['@babel/plugin-proposal-object-rest-spread', { loose: true }],
      ['@babel/plugin-transform-runtime', { useESModules: true }],
    ],
    ignore: [
      /@babel[\\|/]runtime/,
      /__tests__\.(js|ts|tsx)$/,
      /\.stories\.(js|ts|tsx)$/,
    ],
  }),
  //   terser(),
  peerDepsExternal(),
  localResolve(),
  nodeResolve({
    browser: true,
    extensions,
  }),
  commonjs(),
];

const globals = {
  react: 'React',
  'styled-jsx': '_JSXStyle',
  'react-dom': 'ReactDOM',
};

// const external = (id) => /^react|react-dom|styled-jsx|next\/link/.test(id);

export default (async () => {
  await fs.remove(distPath);
  const files = await fs.readdir(componentsPath);

  const components = await Promise.all(
    files.map(async (name) => {
      const comPath = path.join(componentsPath, name);
      const entry = path.join(comPath, 'index.ts');

      const stat = await fs.stat(comPath);
      if (!stat.isDirectory()) return null;

      const hasFile = await fs.pathExists(entry);
      if (!hasFile) return null;

      return { name, url: entry };
    })
  );
  const componentsEntries = components
    .filter((r) => r)
    .reduce((pre, current) => {
      return Object.assign({}, pre, { [current.name]: current.url });
    }, {});

  return [
    {
      external,
      plugins,
      input: {
        index: 'src/index.ts',
        ...componentsEntries,
      },
      output: [
        {
          format: 'esm',
          exports: 'named',
          dir: 'esm',
          entryFileNames: '[name]/index.js',
          globals,
        },
        {
          format: 'es',
          exports: 'named',
          dir: 'dist',
          entryFileNames: '[name]/index.js',
          globals,
        },
      ],
      experimentalOptimizeChunks: true,
      optimizeChunks: true,
    },
    {
      external,
      plugins,
      input: 'src/index.ts',
      output: {
        globals,
        file: pkg.browser,
        format: 'umd',
        exports: 'named',
        name: 'NextUI',
        esModule: false,
      },
    },
  ];
})();
