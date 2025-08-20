import nextJest from 'next/jest.js';

// Create Jest configuration with Next.js
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './'
});

// Custom Jest configuration
const customJestConfig = {
  // Test environment setup
  testEnvironment: 'jest-environment-jsdom',

  // Setup files to run after Jest is initialized
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // Module name mapper for handling CSS imports and static assets
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$':
      '<rootDir>/__mocks__/fileMock.js',

    // Handle module aliases (update according to your tsconfig/jsconfig paths)
    '^@/components/(.*)$': '<rootDir>/app/components/$1',
    '^@/lib/(.*)$': '<rootDir>/app/lib/$1',
    '^@/hooks/(.*)$': '<rootDir>/app/hooks/$1',
    '^@/utils/(.*)$': '<rootDir>/app/utils/$1',
    '^@/(.*)$': '<rootDir>/app/$1'
  },

  // Ignore patterns for transformation
  transformIgnorePatterns: ['node_modules/(?!(.*\\.mjs$|@heroicons|date-fns))'],

  // Test match patterns
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  // Coverage configuration
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    '!app/**/*.d.ts',
    '!app/**/_*.{js,jsx}',
    '!app/**/__tests__/**',
    '!app/**/__mocks__/**',
    '!app/layout.js',
    '!app/error.js',
    '!app/loading.js',
    '!app/not-found.js',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/vendor/**'
  ],

  // Coverage thresholds (adjust based on your requirements)
  coverageThresholds: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60
    }
  },

  // Coverage report formats
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],

  // Test timeout
  testTimeout: 10000,

  // Verbose output
  verbose: true,

  // Clear mocks automatically between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected
  collectCoverage: false, // Set to true when running coverage

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Automatically restore mock state between every test
  restoreMocks: true,

  // The paths to modules that run some code to configure the test env
  moduleDirectories: ['node_modules', '<rootDir>'],

  // Roots for searching test files
  roots: ['<rootDir>'],

  // Test environment options
  testEnvironmentOptions: {
    url: 'http://localhost:3000'
  },

  // Watch plugins for better development experience
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ],

  // Global variables available in tests
  globals: {
    'process.env': {
      NEXT_PUBLIC_SUPABASE_URL: 'https://test.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-anon-key'
    }
  }
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
