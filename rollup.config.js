import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import localResolve from 'rollup-plugin-local-resolve'
import babel from 'rollup-plugin-babel'
import fs from 'fs-extra'
import path from 'path'
const componentsPath = path.join(__dirname, 'components')
const distPath = path.join(__dirname, 'dist')

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const plugins = [
  babel({
    exclude: 'node_modules/**',
    extensions,
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: ['styled-jsx/babel'],
  }),
  localResolve(),
  nodeResolve({
    browser: true,
    extensions,
  }),
  commonjs(),
]

const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
}

const external = id => /^react|react-dom|styled-jsx|next\/link/.test(id)

const cjsOutput = {
  format: 'cjs',
  exports: 'named',
  entryFileNames: '[name]/index.js',
  dir: 'dist',
  globals,
}

export default (async () => {
  await fs.remove(distPath)
  const files = await fs.readdir(componentsPath)

  const components = await Promise.all(
    files.map(async name => {
      const comPath = path.join(componentsPath, name)
      const entry = path.join(comPath, 'index.ts')

      const stat = await fs.stat(comPath)
      if (!stat.isDirectory()) return null

      const hasFile = await fs.pathExists(entry)
      if (!hasFile) return null

      return { name, url: entry }
    }),
  )

  return [
    ...components
      .filter(r => r)
      .map(({ name, url }) => ({
        input: { [name]: url },
        output: [cjsOutput],
        external,
        plugins,
      })),
    {
      input: { index: path.join(componentsPath, 'index.ts') },
      output: [
        {
          ...cjsOutput,
          entryFileNames: 'index.js',
        },
      ],
      external,
      plugins,
    },
  ]
})()
