# node-test-decorators

A TypeScript decorator library for simplifying and organizing tests in node:test with a decorator-based approach. This library allows you to use decorators to structure your test suites, define test cases, and set up common hooks like beforeAll and beforeEach without directly writing boilerplate code.

## Purpose
node:test is a powerful, native testing module in Node.js that requires explicit setup for each test suite, with manual definitions for test cases and lifecycle hooks. This library, node-test-decorators, enhances node:test by allowing you to organize and define tests in a more intuitive and declarative way using TypeScript decorators.

## With node-test-decorators, you can:

Define test suites and test cases with a clear, organized syntax.
Easily add beforeAll, beforeEach, and other lifecycle hooks as decorators.
Set up test descriptions, skip tests, and run individual tests directly from the decorators.

## Key Features
`@Describe`: Marks a class as a test suite.  
`@Test`: Marks a method as a test case within a test suite.  
`@BeforeAll`: Runs setup code once before all test cases in a suite.  
`@BeforeEach`: Runs setup code before each test case in a suite.
`@AfterAll`: Runs setup code once after all test cases in a suite.  
`@AfterEach`: Runs setup code after each test case in a suite.

Flexible Test Options: Use options like only and skip to control the test cases to be run.

## Installation

```bash
npm install my-node-test-decorators
```

## Usage

### Example Test Suite
Here is a simple example demonstrating how to use node-test-decorators:

```typescript
import { Describe, Test, BeforeAll, BeforeEach } from 'node-test-decorators';

@Describe("Math Test Suite")
class MathTests {
private value: number;

    @BeforeAll()
    async setupAll() {
        console.log("Setup before all tests in this suite");
        // Setup code that runs once before any test in the suite
    }

    @BeforeEach()
    async setupEach() {
        console.log("Setup before each test");
        this.value = 0; // Reset value before each test
    }

    @Test("should add numbers correctly")
    async testAdd() {
        this.value += 2 + 3;
        console.log("Testing addition:", this.value);
        // Assertions for addition here
    }

    @Test("should multiply numbers correctly")
    async testMultiply() {
        this.value += 2 * 3;
        console.log("Testing multiplication:", this.value);
        // Assertions for multiplication here
    }
}
```

### Decorators and Their Usage
1. **@Describe**  
Use this decorator on a class to define a test suite. The class name or the string passed to @Describe will be the suite's name in the output.

```typescript
@Describe("User Authentication Tests")
class AuthTests { ... }
```

2. **@Test**

This decorator is used on methods to define individual test cases within a test suite. You can pass an optional description as a string or an options object.

**Options:**
- description (string): Describes the test case.
- only (boolean): Runs only this test case within the suite.
- skip (boolean): Skips this test case.

```typescript

@Test("should authenticate valid users")
async testValidAuthentication() { ... }

@Test({ description: "should fail for invalid credentials", skip: true })
async testInvalidAuthentication() { ... }
```

3. **@BeforeAll**  
Runs the decorated method once before all test cases in the suite.

```typescript
@BeforeAll()
async setup() {
console.log("Setting up before all tests");
}
```

4. **@BeforeEach**  
Runs the decorated method before each test case in the suite.

```typescript

@BeforeEach()
async setupEach() {
console.log("Setting up before each test");
}
```


### Advanced Usage
You can combine options in `@Test` to control specific test behavior within your suite.

```typescript
@Test({ description: "should return user profile", only: true })
async testUserProfile() {
// Code to test user profile retrieval
}
```
With the above example, only the testUserProfile case will be run in the suite, ignoring other test cases.

## Benefits
Cleaner Code: Using decorators simplifies and organizes test code, making it easier to read and maintain.
Flexible Control: Easily control which tests to run or skip, either by suite or individual test cases.
TypeScript Support: Written in TypeScript, so you get full type safety and autocompletion when writing your tests.

## Conclusion
node-test-decorators brings the power of TypeScript decorators to node:test, enabling a more readable and structured way to define and organize test suites. It removes the need for boilerplate code, offering a convenient, flexible, and intuitive way to set up tests.