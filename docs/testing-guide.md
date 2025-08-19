# Testing Guide for Wild Oasis Project

## Overview

This project uses a comprehensive testing strategy with multiple layers:

- **Unit Tests**: Jest + React Testing Library
- **E2E Tests**: Playwright
- **Component Testing**: React Testing Library
- **API Testing**: Jest + Supertest (optional)

## 🧪 Testing Stack

### Primary Tools

- **Jest**: Test runner and assertion library
- **React Testing Library**: React component testing
- **Playwright**: End-to-end browser testing
- **@testing-library/jest-dom**: Additional Jest matchers

### Why These Tools?

1. **Jest**: Industry standard, great ecosystem, built-in mocking
2. **React Testing Library**: Encourages testing best practices, focuses on user behavior
3. **Playwright**: Modern E2E testing, supports multiple browsers, great debugging

## 📁 Project Structure

```
project-root/
├── __tests__/                 # Global test utilities
├── __mocks__/                 # Mock files
├── app/
│   ├── components/
│   │   └── __tests__/         # Component tests
│   ├── lib/
│   │   └── __tests__/         # Utility function tests
│   └── hooks/
│       └── __tests__/         # Custom hook tests
├── e2e/                       # Playwright E2E tests
│   ├── auth/                  # Auth setup files
│   ├── fixtures/              # Test data
│   └── *.spec.js              # Test files
├── jest.config.js             # Jest configuration
├── jest.setup.js              # Jest setup file
└── playwright.config.js       # Playwright configuration
```

## 🚀 Getting Started

### Installation

The testing dependencies are already included in package.json. Run:

```bash
npm install
```

### Running Tests

```bash
# Run all unit tests
npm run test

# Run tests in watch mode (development)
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests for CI/CD (no watch, with coverage)
npm run test:ci

# Run E2E tests
npm run e2e

# Run E2E tests with UI mode (visual debugging)
npm run e2e:ui

# Run E2E tests in headed mode (see browser)
npm run e2e:headed
```

## 📝 Writing Unit Tests

### Basic Component Test Structure

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent prop='value' />);

    // Test what users see/do
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();

    render(<MyComponent onAction={mockFn} />);

    await user.click(screen.getByRole('button', { name: 'Click me' }));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
```

### Testing Best Practices

#### ✅ DO:

- Test behavior, not implementation details
- Use semantic queries (`getByRole`, `getByLabelText`, `getByText`)
- Test user interactions
- Mock external dependencies
- Write descriptive test names
- Group related tests with `describe`
- Use `screen` for queries
- Test error states and edge cases

#### ❌ DON'T:

- Test internal component state
- Use implementation-specific selectors (class names, data-testid unless necessary)
- Test every possible prop combination
- Write overly complex tests
- Mock everything (mock what you need)

### Query Priority (React Testing Library)

1. **getByRole**: Most accessible way to find elements
2. **getByLabelText**: Form elements with labels
3. **getByPlaceholderText**: Form inputs with placeholders
4. **getByText**: Non-interactive text content
5. **getByDisplayValue**: Form elements with values
6. **getByAltText**: Images with alt text
7. **getByTitle**: Elements with title attribute
8. **getByTestId**: Last resort, use data-testid

### Example: Testing the CabinCard Component

```javascript
import { render, screen } from '@testing-library/react';
import CabinCard from '../CabinCard';

describe('CabinCard', () => {
  const mockCabin = {
    id: '1',
    name: 'Luxury Cabin',
    maxCapacity: 4,
    regularPrice: 300,
    discount: 50,
    image: '/cabin.jpg'
  };

  it('should display cabin information correctly', () => {
    render(<CabinCard cabin={mockCabin} />);

    // Test visible content
    expect(screen.getByText('Cabin Luxury Cabin')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('$250')).toBeInTheDocument(); // After discount
    expect(screen.getByText('$300')).toHaveClass('line-through');
  });

  it('should have accessible image', () => {
    render(<CabinCard cabin={mockCabin} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Cabin Luxury Cabin');
  });

  it('should have correct reservation link', () => {
    render(<CabinCard cabin={mockCabin} />);

    const link = screen.getByRole('link', { name: /details & reservation/i });
    expect(link).toHaveAttribute('href', '/cabins/1');
  });
});
```

## 🎭 Writing E2E Tests

### Basic E2E Test Structure

```javascript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should perform user journey', async ({ page }) => {
    // Navigate and interact
    await page.click('text=Cabins');
    await expect(page.locator('h1')).toContainText('Our Cabins');

    // Test specific functionality
    await page.fill('[data-testid="search"]', 'luxury');
    await page.press('[data-testid="search"]', 'Enter');

    // Verify results
    await expect(page.locator('[data-testid="cabin-card"]')).toHaveCount({
      gte: 1
    });
  });
});
```

### E2E Testing Best Practices

#### ✅ DO:

- Test critical user journeys
- Use page object models for complex pages
- Test on multiple browsers/devices
- Use meaningful waits (`waitForSelector`, not `waitForTimeout`)
- Test realistic user scenarios
- Include accessibility testing

#### ❌ DON'T:

- Test every possible scenario in E2E (unit tests are faster)
- Use hardcoded waits
- Test implementation details
- Make tests dependent on each other

## 🔧 Testing Configuration

### Jest Configuration Highlights

- **testEnvironment**: `jsdom` for DOM testing
- **setupFilesAfterEnv**: Loads jest-dom matchers
- **moduleNameMapper**: Handles CSS and asset imports
- **collectCoverageFrom**: Defines what files to include in coverage
- **coverageThresholds**: Minimum coverage requirements

### Coverage Thresholds

Current thresholds (adjust based on your needs):

- **Branches**: 60%
- **Functions**: 60%
- **Lines**: 60%
- **Statements**: 60%

## 🛠 Debugging Tests

### Unit Test Debugging

```javascript
// Add console.log to see what's rendered
import { render, screen, logRoles, prettyDOM } from '@testing-library/react';

test('debug example', () => {
  const { container } = render(<MyComponent />);

  // Log all available roles
  logRoles(container);

  // Pretty print the DOM
  console.log(prettyDOM(container));

  // Debug specific element
  screen.debug(screen.getByRole('button'));
});
```

### E2E Test Debugging

```javascript
test('debug e2e test', async ({ page }) => {
  // Pause test execution
  await page.pause();

  // Take screenshot
  await page.screenshot({ path: 'debug.png' });

  // Get page content
  const content = await page.content();
  console.log(content);
});
```

### VS Code Integration

Add to `.vscode/settings.json`:

```json
{
  "jest.jestCommandLine": "npm run test --",
  "jest.autoRun": "watch",
  "jest.showCoverageOnLoad": true
}
```

## 📊 Test Reports

### Coverage Reports

After running `npm run test:coverage`, open `coverage/lcov-report/index.html`

### E2E Reports

After E2E tests, open `playwright-report/index.html`

## 🚨 Common Testing Pitfalls

### 1. Testing Implementation Details

❌ **Wrong:**

```javascript
expect(wrapper.state().count).toBe(1);
```

✅ **Right:**

```javascript
expect(screen.getByText('Count: 1')).toBeInTheDocument();
```

### 2. Using Wrong Queries

❌ **Wrong:**

```javascript
container.querySelector('.submit-button');
```

✅ **Right:**

```javascript
screen.getByRole('button', { name: /submit/i });
```

### 3. Not Waiting for Async Operations

❌ **Wrong:**

```javascript
fireEvent.click(button);
expect(screen.getByText('Success')).toBeInTheDocument();
```

✅ **Right:**

```javascript
fireEvent.click(button);
await waitFor(() => {
  expect(screen.getByText('Success')).toBeInTheDocument();
});
```

## 📚 Learning Resources

### Documentation

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/)

### Best Practices Articles

- [Common Mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)

### Video Tutorials

- [React Testing Library Course by Kent C. Dodds](https://testingjavascript.com/)
- [Playwright Tutorial Series](https://www.youtube.com/playlist?list=PLYDwWPRvXB8-yfPiGY_R7R5Q8p6ks-Kov)

## 🎯 Testing Checklist

### Before Writing Tests

- [ ] Understand the user requirements
- [ ] Identify critical user journeys
- [ ] Plan test coverage strategy

### While Writing Tests

- [ ] Use descriptive test names
- [ ] Test behavior, not implementation
- [ ] Mock external dependencies
- [ ] Include edge cases and error scenarios
- [ ] Write readable and maintainable tests

### After Writing Tests

- [ ] Run tests locally
- [ ] Check coverage reports
- [ ] Update documentation if needed
- [ ] Review with team members

## 📈 Advanced Topics

### Mocking Supabase

```javascript
// In jest.setup.js
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => Promise.resolve({ data: [], error: null })),
      insert: jest.fn(() => Promise.resolve({ data: null, error: null }))
    }))
  }))
}));
```

### Custom Render Function

```javascript
// __tests__/utils.js
import { render } from '@testing-library/react';
import { SomeProvider } from '../contexts/SomeProvider';

export function renderWithProviders(ui, options = {}) {
  const wrapper = ({ children }) => <SomeProvider>{children}</SomeProvider>;

  return render(ui, { wrapper, ...options });
}
```

### Performance Testing

```javascript
test('component renders within performance budget', () => {
  const startTime = performance.now();
  render(<ExpensiveComponent />);
  const endTime = performance.now();

  expect(endTime - startTime).toBeLessThan(100); // 100ms budget
});
```

## 🔄 CI/CD Integration

Tests are automatically run in the GitHub Actions pipeline:

- Unit tests run on every PR and push
- E2E tests run on main branch and PRs
- Coverage reports are uploaded to Codecov
- Failed tests block deployments

Happy Testing! 🚀
