# Testing Setup for Liberty Bell

## Test Framework: Jest

We use **Jest** as our testing framework because:
- Industry standard for JavaScript/TypeScript
- Excellent Next.js integration
- Great developer experience
- Comprehensive tooling

## Installation

Dependencies are already installed:
```bash
npm install -D jest @types/jest ts-jest
```

## Running Tests

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:ci": "jest --ci --coverage --maxWorkers=2"
  }
}
```

Then run:
```bash
# Run all tests
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode
npm run test:ci
```

## Test File Structure

```
src/
└── lib/
    └── utils/
        ├── building-identifier.ts
        └── __tests__/
            └── building-identifier.test.ts
```

Tests are colocated with the code they test in `__tests__` directories.

## Writing Tests

### Test as Documentation

Our tests serve as **living documentation**. They should:
1. Clearly explain what the function does
2. Provide real-world examples
3. Document edge cases
4. Show expected behavior

### Example Test Structure

```typescript
describe('functionName()', () => {
  describe('Basic Functionality', () => {
    it('should do the main thing', () => {
      expect(functionName('input')).toBe('expected output');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty input', () => {
      expect(functionName('')).toBe('');
    });
  });

  describe('Real-World Examples', () => {
    it('should handle typical user input', () => {
      expect(functionName('Wymering Mansions')).toBe('wymeringmansions');
    });
  });
});
```

## Test Coverage

View coverage report after running `npm run test:coverage`:

```bash
# Opens coverage report in browser
open coverage/index.html
```

## Current Tests

### Building Identifier Tests
Location: `src/lib/utils/__tests__/building-identifier.test.ts`

**Covers:**
- Basic normalization (lowercase, remove spaces, remove punctuation)
- Real-world address examples
- Edge cases (empty strings, special characters)
- Consistency across different input formats
- Validation function

**Test Categories:**
1. Basic Functionality (7 tests)
2. Punctuation Removal (5 tests)
3. Special Characters (4 tests)
4. Real-World Examples (15 tests)
5. Edge Cases (7 tests)
6. Consistency Tests (3 tests)
7. Differentiation Tests (3 tests)
8. Common Variations (2 tests)
9. Validation Tests (7 tests)

**Total: 53 comprehensive tests**

## Configuration Files

### jest.config.js
Main Jest configuration with Next.js integration

### jest.setup.js
Global test setup (mocks, environment variables)

### tsconfig.json
TypeScript configuration (already setup for tests)

## Best Practices

1. **One assertion per test** (when possible)
2. **Clear test names** that describe expected behavior
3. **Arrange-Act-Assert** pattern
4. **Test the public interface**, not implementation details
5. **Use descriptive variable names** in tests
6. **Group related tests** with `describe` blocks

## Example: Running the Building Identifier Tests

```bash
# Run only building identifier tests
npm test -- building-identifier

# Run in watch mode
npm test -- --watch building-identifier

# Run with coverage
npm test -- --coverage building-identifier
```

## CI/CD Integration

The `test:ci` script is designed for CI environments:
- Runs once (no watch mode)
- Generates coverage report
- Limits workers for stability
- Exits with error code if tests fail

Example GitHub Actions:
```yaml
- name: Run tests
  run: npm run test:ci
```

## Debugging Tests

### VS Code
Add this to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal"
}
```

### Command Line
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Next Steps

As you add more functionality, add tests for:
- Registration flow
- Eligibility logic
- SharePoint sync
- Building matching
- User authentication

Each test file should serve as documentation for how that feature works.
