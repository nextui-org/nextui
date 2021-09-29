const fs = require('fs-extra');
const path = require('path');
const sourcePath = path.join(__dirname, '../src/components');

module.exports = async () => {
  const files = await fs.readdir(sourcePath);
  const components = await Promise.all(
    files.map(async (name) => {
      const comPath = path.join(sourcePath, name);
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

  console.log(
    `\n${
      Object.keys(componentsEntries).length
    } Components in total have been collected.`
  );
  console.log('Bundle now...');

  const configs = {
    mode: 'none',
    entry: componentsEntries,
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
      libraryTarget: 'commonjs',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        components: sourcePath,
      },
    },
    externals: [
      {
        react: {
          root: 'React',
          commonjs2: 'react',
          commonjs: 'react',
          amd: 'react',
        },
        'react-dom': {
          root: 'ReactDOM',
          commonjs2: 'react-dom',
          commonjs: 'react-dom',
          amd: 'react-dom',
        },
        '/styled-jsx/': {
          root: '_JSXStyle',
          commonjs2: 'styled-jsx',
          commonjs: 'styled-jsx',
          amd: 'styled-jsx',
        },
      },
      function (context, request, done) {
        if (/^styled-jsx/.test(request)) {
          return done(null, 'commonjs ' + request);
        }
        done();
      },
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  bugfixes: true,
                },
              ],
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
          },
        },
      ],
    },
  };

  return [
    configs,
    {
      ...configs,
      entry: {
        index: path.join(sourcePath, 'index.ts'),
      },
    },
    {
      ...configs,
      mode: 'production',
      entry: {
        'index.min': path.join(sourcePath, 'index.ts'),
      },
      output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
        library: 'NextUI',
        libraryTarget: 'umd',
        globalObject: 'this',
      },
      optimization: {
        runtimeChunk: true,
        splitChunks: {
          chunks: 'all',
        },
      },
    },
  ];
};
