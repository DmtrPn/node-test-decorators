const { strict: assert } = require( 'node:assert');
const { expect } = require('../dist/index.js');
const { test, describe } = require('node:test')

describe('expect function', () => {
    test( 'should pass when values are equal', () => {
         expect(5).toBe(5);
    });

    test('should fail when values are not equal', () => {
        assert.throws(() => expect(5).toBe(10));
    });

    test('should pass when values are deeply equal', () => {
        expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
    });

    test('should fail when values are not deeply equal', () => {
        assert.throws(() => expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 3 }));
    });

    test('should pass when value is null', () => {
        expect(null).toBeNull();
    });

    test('should fail when value is not null', () => {
        assert.throws(() => expect(5).toBeNull());
    });

    test('should pass when value is undefined', () => {
        expect(undefined).toBeUndefined();
    });

    test('should fail when value is not undefined', () => {
        assert.throws(() => expect(5).toBeUndefined());
    });

    test('should pass when value is a date', () => {
        expect(new Date()).toBeDate();
    });

    test('should fail when value is not a date', () => {
        assert.throws(() => expect(5).toBeDate());
    });

    test('should pass when value is an array of size 3', () => {
        expect([1, 2, 3]).toBeArrayOfSize(3);
    });

    test('should fail when value is not an array of size 3', () => {
        assert.throws(() => expect([1, 2]).toBeArrayOfSize(3));
    });

    test('should pass when value contains all values', () => {
        expect([1, 2, 3]).toContainAllValues([1, 2, 3]);
    });

    test('should fail when value does not contain all values', () => {
        assert.throws(() => expect([1, 2]).toContainAllValues([1, 2, 3]));
    });

    test('should pass when value is after a date', () => {
        expect(new Date()).toBeAfter(new Date(Date.now() - 1000));
    });

    test('should fail when value is not after a date', () => {
        assert.throws(() => expect(new Date()).toBeAfter(new Date(Date.now() + 1000)));
    });

    test('should pass when value is greater than or equal to a number', () => {
        expect(5).toBeGreaterThanOrEqual(5);
    });

    test('should fail when value is not greater than or equal to a number', () => {
        assert.throws(() => expect(5).toBeGreaterThanOrEqual(10));
    });

    test('should pass when value is positive', () => {
        expect(5).toBePositive();
    });

    test('should fail when value is not positive', () => {
        assert.throws(() => expect(-5).toBePositive());
    });

    test('should pass when value is truthy', () => {
        expect(true).toBeTruthy();
    });

    test('should fail when value is not truthy', () => {
        assert.throws(() => expect(false).toBeTruthy());
    });

    test('should pass when value is falsy', () => {
        expect(false).toBeFalse();
    });

    test('should fail when value is not falsy', () => {
        assert.throws(() => expect(true).toBeFalse());
    });
});