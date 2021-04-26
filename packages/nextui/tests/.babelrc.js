module.exports = {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: ['styled-jsx/babel-test', '@babel/plugin-transform-runtime'],
};
