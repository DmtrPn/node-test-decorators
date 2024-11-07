[![npm version](https://img.shields.io/npm/v/node-test-decorators.svg)](https://www.npmjs.com/package/node-test-decorators)

# node-test-decorators

A TypeScript decorator library designed to simplify and organize tests in node:test with a decorator-based, OOP-friendly approach. Transitioning from Jest to node:test can be challenging, as it introduces syntactic differences and lacks some familiar tools. However, node:test is a faster and more lightweight alternative, making it an attractive option for those looking to improve test performance.

If, like me, you prefer using decorators to keep your code organized with classes and an OOP approach, this library is here to help. It provides a set of decorators for structuring test suites, defining test cases, and setting up common hooks like beforeAll and beforeEach, all without boilerplate.

Additionally, this library includes an expect wrapper similar to Jest's expect, designed to smooth the transition to node:test. It offers a range of assertion methods that wrap around Node.js’s assert module, ensuring strict comparisons and expressive, readable tests. The expect function returns an Expect instance, allowing chaining methods like .not.toBe(), .toBeTrue(), .toContain(), and more, making your Jest-to-Node transition as seamless as possible.

### Expect Wrapper for node:test
This library provides an expect wrapper, similar to Jest's expect, for use with node:test. It offers a range of assertion methods to simplify test migration from Jest and maintain expressive and readable tests. Each assertion method in this library wraps around Node.js’s assert module for strict comparisons, ensuring test accuracy.

The expect function returns an Expect instance, allowing you to chain methods like .not.toBe(), .toBeTrue(), .toContain(), and more.

## Purpose
node:test is a powerful, native testing module in Node.js that requires explicit setup for each test suite, with manual definitions for test cases and lifecycle hooks. This library, node-test-decorators, enhances node:test by allowing you to organize and define tests in a more intuitive and declarative way using TypeScript decorators.

## With node-test-decorators, you can:

Define test suites and test cases with a clear, organized syntax.
Easily add beforeAll, beforeEach, and other lifecycle hooks as decorators.
Set up test descriptions, skip tests, and run individual tests directly from the decorators.

## Key Features
- `@Describe`: Marks a class as a test suite.  
- `@Test`: Marks a method as a test case within a test suite.  
- `@BeforeAll`: Runs setup code once before all test cases in a suite.  
- `@BeforeEach`: Runs setup code before each test case in a suite.
- `@AfterAll`: Runs setup code once after all test cases in a suite.  
- `@AfterEach`: Runs setup code after each test case in a suite.
- Familiar Syntax: Use Jest-like syntax for assertions in node:test.
- Flexible Assertions: Provides a comprehensive set of assertion methods for comparing primitives, objects, arrays, dates, and more.
- Negation with not: Chain .not to invert assertions.

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

To use the expect wrapper, import it from the library and call expect() with the value you want to test.

**Example**
```typescript
import { expect } from 'node-test-decorators';

expect(5).toBe(5);
expect([1, 2, 3]).toContain(2);
expect("hello").not.toBe("world");
```

Below is a list of available assertion methods and their descriptions:


|Method|Description  |
|-|-|
|.toBe(target)| 	Asserts strict equality (===) between currentValue and target." 
.toEqual(target)	|Asserts deep equality between currentValue and target.
.toBeInstanceOf(cls)|	Asserts that currentValue is an instance of the provided class.
.toBeNil()	|Asserts that currentValue is null or undefined.
.toBeNull()|	Asserts that currentValue is null.
.toBeUndefined()|	Asserts that currentValue is undefined.
.toBeDefined()|	Asserts that currentValue is defined (not undefined).
.toContain(value)|	Asserts that currentValue (string or array) contains value.
.toContainEqual(value)|	Asserts that currentValue (array) contains an element deeply equal to value.
.toMatchObject(obj)	|Asserts that currentValue contains the keys and values of obj.
.toBeDate()	|Asserts that currentValue is a Date object.
.toBeAfter(date)|	Asserts that currentValue (Date) is after or equal to date.
.toBeArrayOfSize(n)|	Asserts that currentValue (array) has a length equal to n.
.toContainAllValues(arr)|	Asserts that currentValue (array) contains all values in arr.
.toBeTrue()	|Asserts that currentValue is true.
.toBeFalse()	|Asserts that currentValue is false.
.toBeTruthy()	|Asserts that currentValue is truthy.
.toBeGreaterThan(n)	|Asserts that currentValue is greater than n.
.toBeGreaterThanOrEqual(n)|	Asserts that currentValue is greater than or equal to n.
.toBeNegative()|	Asserts that currentValue is a negative number.
.toBePositive()	|Asserts that currentValue is a positive number.


### Negation with .not
Add .not before any assertion to negate it. For example:

```typescript
Копировать код
expect(5).not.toBe(10);                 // Passes
expect("hello").not.toBeNull();          // Passes
expect([1, 2, 3]).not.toContain(4);      // Passes
```

###Sample Assertions
Here are some examples to illustrate usage:

```typescript
expect(10).toBeGreaterThan(5);
expect([1, 2, 3]).toContainEqual(3);
expect({ a: 1, b: 2 }).toMatchObject({ a: 1 });
expect("hello world").toInclude("world");
expect(new Date()).toBeAfter(new Date(Date.now() - 1000));
expect(true).toBeTruthy();
expect(false).not.toBeTruthy();
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