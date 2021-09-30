module.exports = {
  verbose: true,
  setupFiles: ['./tests/setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testPathIgnorePatterns: ['/dist/', '/lib/'],
  transform: {
    '^.+\\.tsx?$': ['babel-jest', { configFile: './tests/.babelrc.js' }],
  },
  testRegex: '.*\\.test\\.(j|t)sx?$',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/styles.{ts,tsx}',
    '!src/**/*stories.{ts,tsx}',
    '!src/**/*types.{ts,tsx}',
    '!src/styles/*',
    '!src/index.ts',
  ],
  moduleNameMapper: {
    'tests/(.*)$': '<rootDir>/tests/$1',
    components: './src/index.ts',
  },
};
