export default {
  collectCoverage: true,
  coverageReporters: ['lcov'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!node_modules/**',
  ],
  testMatch: ['**/*.test.js'],
}