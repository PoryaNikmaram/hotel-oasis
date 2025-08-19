// Jest Setup File - Runs before each test file
import { afterAll, beforeAll, jest } from '@jest/globals';
import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      pathname: '/',
      query: {},
      asPath: '/',
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn()
      }
    };
  },
  usePathname() {
    return '/';
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  useParams() {
    return {};
  }
}));

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: function Image({ src, alt, ...props }) {
    return <img src={src} alt={alt} {...props} />;
  }
}));

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } }
      }))
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(),
          limit: jest.fn(),
          order: jest.fn()
        })),
        order: jest.fn(),
        limit: jest.fn()
      })),
      insert: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }))
  }))
}));

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
  takeRecords() {
    return [];
  }
};

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn()
}));

// Suppress console errors in tests (optional)
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: ReactDOM.render')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Global test utilities
global.testUtils = {
  // Helper to wait for async operations
  waitFor: (callback, options = {}) => {
    const { timeout = 1000, interval = 50 } = options;
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const timer = setInterval(() => {
        try {
          callback();
          clearInterval(timer);
          resolve();
        } catch (error) {
          if (Date.now() - startTime > timeout) {
            clearInterval(timer);
            reject(error);
          }
        }
      }, interval);
    });
  },

  // Mock data generators
  generateMockCabin: (overrides = {}) => ({
    id: '1',
    name: 'Cabin 001',
    maxCapacity: 4,
    regularPrice: 250,
    discount: 0,
    image: '/cabin-001.jpg',
    description: 'Luxury cabin in the woods',
    ...overrides
  }),

  generateMockBooking: (overrides = {}) => ({
    id: '1',
    startDate: new Date().toISOString(),
    endDate: new Date(Date.now() + 86400000 * 3).toISOString(),
    numNights: 3,
    totalPrice: 750,
    numGuests: 2,
    created_at: new Date().toISOString(),
    cabins: {
      name: 'Cabin 001',
      image: '/cabin-001.jpg'
    },
    ...overrides
  })
};
