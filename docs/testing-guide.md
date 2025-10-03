# Testing Guide for Wild Oasis

## Overview

This project uses Jest and React Testing Library for comprehensive unit and component testing.

## 🧪 Testing Stack

- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing focused on user behavior
- **@testing-library/jest-dom**: Additional Jest matchers for DOM assertions

### Why These Tools?

- **Jest**: Industry standard, excellent ecosystem, built-in mocking capabilities
- **React Testing Library**: Encourages testing best practices by focusing on user interactions rather than implementation details

## 📁 Project Structure

```
project-root/
├── __tests__/                 # Global test utilities
├── __mocks__/                 # Mock files
├── app/
│   ├── components/
│   │   └── __tests__/         # Component tests
│   ├── lib/
│   │   └── __tests__/         # Utility tests
│   └── hooks/
│       └── __tests__/         # Hook tests
├── jest.config.js             # Jest configuration
└── jest.setup.js              # Jest setup file
```

## 🚀 Running Tests

```bash
# Run all tests
npm run test

# Watch mode (development)
npm run test:watch

# With coverage report
npm run test:coverage

# CI mode (no watch, with coverage)
npm run test:ci
```

## 📝 Writing Tests

### Basic Component Test

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent prop='value' />);

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

- Test user behavior, not implementation
- Use semantic queries (`getByRole`, `getByLabelText`, `getByText`)
- Test user interactions and outcomes
- Mock external dependencies (APIs, databases)
- Write descriptive test names
- Group related tests with `describe`
- Test error states and edge cases

#### ❌ DON'T:

- Test internal component state
- Use implementation-specific selectors (class names)
- Test every possible prop combination
- Write overly complex tests
- Mock everything unnecessarily

### Query Priority

Use queries in this order of preference:

1. **getByRole** - Most accessible (buttons, links, inputs)
2. **getByLabelText** - Form fields with labels
3. **getByPlaceholderText** - Form inputs with placeholders
4. **getByText** - Text content
5. **getByDisplayValue** - Form elements with current values
6. **getByAltText** - Images with alt text
7. **getByTitle** - Elements with title attribute
8. **getByTestId** - Last resort (use `data-testid`)

### Example: CabinCard Component Test

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

  it('should display cabin information', () => {
    render(<CabinCard cabin={mockCabin} />);

    expect(screen.getByText('Cabin Luxury Cabin')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('$250')).toBeInTheDocument();
  });

  it('should have accessible image', () => {
    render(<CabinCard cabin={mockCabin} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Cabin Luxury Cabin');
  });

  it('should link to correct reservation page', () => {
    render(<CabinCard cabin={mockCabin} />);

    const link = screen.getByRole('link', { name: /details & reservation/i });
    expect(link).toHaveAttribute('href', '/cabins/1');
  });
});
```

## 🔧 Testing Configuration

### Jest Configuration Highlights

- **testEnvironment**: `jsdom` for DOM testing
- **setupFilesAfterEnv**: Loads jest-dom matchers
- **moduleNameMapper**: Handles CSS and asset imports
- **collectCoverageFrom**: Defines coverage scope
- **coverageThresholds**: Minimum coverage requirements (60%)

### Coverage Thresholds

Current requirements:

- Branches: 60%
- Functions: 60%
- Lines: 60%
- Statements: 60%

## 🛠️ Debugging Tests

### Console Debugging

```javascript
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

### VS Code Integration

Add to `.vscode/settings.json`:

```json
{
  "jest.jestCommandLine": "npm run test --",
  "jest.autoRun": "watch",
  "jest.showCoverageOnLoad": true
}
```

## 📊 Coverage Reports

After running `npm run test:coverage`, open `coverage/lcov-report/index.html` in your browser to view detailed coverage reports.

## 🚨 Common Pitfalls

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

## 🎓 Learning Resources

### Documentation

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Common Mistakes with RTL](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## 🎯 Testing Checklist

### Before Writing Tests

- [ ] Understand user requirements
- [ ] Identify critical user flows
- [ ] Plan test coverage strategy

### While Writing Tests

- [ ] Use descriptive test names
- [ ] Test behavior, not implementation
- [ ] Mock external dependencies
- [ ] Include edge cases
- [ ] Write maintainable tests

### After Writing Tests

- [ ] Run tests locally
- [ ] Check coverage reports
- [ ] Review test quality
- [ ] Update documentation

## 🔬 Advanced Topics

### Mocking Supabase

```javascript
// In jest.setup.js or __mocks__/@supabase/supabase-js.js
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => Promise.resolve({ data: [], error: null })),
      insert: jest.fn(() => Promise.resolve({ data: null, error: null })),
      update: jest.fn(() => Promise.resolve({ data: null, error: null })),
      delete: jest.fn(() => Promise.resolve({ data: null, error: null }))
    })),
    auth: {
      signIn: jest.fn(() => Promise.resolve({ user: null, error: null })),
      signOut: jest.fn(() => Promise.resolve({ error: null }))
    }
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

// Usage in tests
import { renderWithProviders } from '../__tests__/utils';

test('component with context', () => {
  renderWithProviders(<MyComponent />);
  // Your assertions
});
```

### Testing Async Components

```javascript
import { render, screen, waitFor } from '@testing-library/react';

test('async component loads data', async () => {
  render(<AsyncComponent />);

  // Check loading state
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  // Wait for data to load
  await waitFor(() => {
    expect(screen.getByText('Data loaded')).toBeInTheDocument();
  });
});
```

### Testing Custom Hooks

```javascript
import { renderHook, waitFor } from '@testing-library/react';
import { useCustomHook } from '../useCustomHook';

test('custom hook returns expected value', () => {
  const { result } = renderHook(() => useCustomHook());

  expect(result.current.value).toBe('initial');
});

test('custom hook handles updates', async () => {
  const { result } = renderHook(() => useCustomHook());

  act(() => {
    result.current.updateValue('new value');
  });

  await waitFor(() => {
    expect(result.current.value).toBe('new value');
  });
});
```

### Testing Forms

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('form submission', async () => {
  const user = userEvent.setup();
  const mockSubmit = jest.fn();

  render(<MyForm onSubmit={mockSubmit} />);

  // Fill out form
  await user.type(screen.getByLabelText('Name'), 'John Doe');
  await user.type(screen.getByLabelText('Email'), 'john@example.com');

  // Submit form
  await user.click(screen.getByRole('button', { name: /submit/i }));

  // Verify submission
  expect(mockSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com'
  });
});
```

## 🔄 CI/CD Integration

Tests automatically run in GitHub Actions:

- ✅ Unit tests on every PR and push
- ✅ Coverage reports generated
- ✅ Failed tests block deployment
- ✅ Coverage thresholds enforced

## 💡 Tips for Writing Good Tests

1. **Test user behavior**: Focus on what users see and do, not implementation
2. **Keep tests simple**: One assertion per test when possible
3. **Use descriptive names**: Test names should explain what's being tested
4. **Avoid test interdependence**: Each test should run independently
5. **Mock external dependencies**: APIs, databases, third-party services
6. **Test edge cases**: Empty states, errors, loading states
7. **Use accessibility queries**: Prefer `getByRole` and `getByLabelText`
8. **Keep tests maintainable**: Refactor tests as you refactor code

Happy Testing! 🚀
