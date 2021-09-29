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
    'src/components/**/*.{ts,tsx}',
    '!src/components/**/styles.{ts,tsx}',
    '!src/components/**/*stories.{ts,tsx}',
    '!src/components/**/*types.{ts,tsx}',
    '!src/components/styles/*',
    '!src/components/index.ts',
  ],
  moduleNameMapper: {
    'tests/(.*)$': '<rootDir>/tests/$1',
    components: './src/components/index.ts',
  },
};
