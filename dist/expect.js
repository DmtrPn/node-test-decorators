"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expect = expect;
const node_assert_1 = require("node:assert");
const pick_1 = require("lodash/pick");
const isUndefined_1 = require("lodash/isUndefined");
const isNull_1 = require("lodash/isNull");
const isNil_1 = require("lodash/isNil");
const isDate_1 = require("lodash/isDate");
const isEqual_1 = require("lodash/isEqual");
class Expect {
    currentValue;
    isNot = false;
    constructor(value) {
        this.currentValue = value;
    }
    get not() {
        this.isNot = true;
        return this;
    }
    toInclude(target) {
        const isInclude = this.currentValue.includes(target);
        (0, node_assert_1.strict)(this.isNot ? !isInclude : isInclude);
    }
    toBeInstanceOf(target) {
        const isInstanceOf = this.currentValue instanceof target;
        (0, node_assert_1.strict)(this.isNot ? !isInstanceOf : isInstanceOf);
    }
    toMatchObject(target) {
        const curretTargetObject = (0, pick_1.default)(this.currentValue, Object.keys(target));
        if (this.isNot) {
            node_assert_1.strict.notDeepEqual(curretTargetObject, target);
        }
        else {
            node_assert_1.strict.deepEqual(curretTargetObject, target);
        }
    }
    toEqual(target) {
        if (this.isNot) {
            node_assert_1.strict.notDeepEqual(this.currentValue, target);
        }
        else {
            node_assert_1.strict.deepEqual(this.currentValue, target);
        }
    }
    toBe(target) {
        if (this.isNot) {
            node_assert_1.strict.notEqual(this.currentValue, target);
        }
        else {
            node_assert_1.strict.equal(this.currentValue, target);
        }
    }
    toBeNil() {
        (0, node_assert_1.strict)(this.isNot ? !(0, isNil_1.default)(this.currentValue) : (0, isNil_1.default)(this.currentValue));
    }
    toBeAfter(target) {
        (0, node_assert_1.strict)(this.currentValue.getTime() >= target.getTime());
    }
    toBeGreaterThanOrEqual(target) {
        (0, node_assert_1.strict)(this.currentValue >= target);
    }
    toBeArrayOfSize(targetLength) {
        if (this.isNot) {
            node_assert_1.strict.notEqual(this.currentValue.length, targetLength);
        }
        else {
            node_assert_1.strict.equal(this.currentValue.length, targetLength);
        }
    }
    toBeDefined() {
        if (this.isNot) {
            (0, node_assert_1.strict)((0, isUndefined_1.default)(this.currentValue));
        }
        else {
            (0, node_assert_1.strict)(!(0, isUndefined_1.default)(this.currentValue));
        }
    }
    toBeNull() {
        if (this.isNot) {
            (0, node_assert_1.strict)(!(0, isNull_1.default)(this.currentValue));
        }
        else {
            (0, node_assert_1.strict)((0, isNull_1.default)(this.currentValue));
        }
    }
    toBeDate() {
        (0, node_assert_1.strict)((0, isDate_1.default)(this.currentValue));
    }
    toBeUndefined() {
        if (this.isNot) {
            (0, node_assert_1.strict)(!(0, isUndefined_1.default)(this.currentValue));
        }
        else {
            (0, node_assert_1.strict)((0, isUndefined_1.default)(this.currentValue));
        }
    }
    toContain(target) {
        const includes = this.currentValue.includes(target);
        (0, node_assert_1.strict)(this.isNot ? !includes : includes);
    }
    toContainEqual(target) {
        const isContainEqual = this.currentValue.some(value => (0, isEqual_1.default)(value, target));
        (0, node_assert_1.strict)(this.isNot ? !isContainEqual : isContainEqual, `${this.isNot ? '' : 'Not '}found equal ${target} in ${this.currentValue}`);
    }
    toContainAllValues(target) {
        node_assert_1.strict.deepEqual(this.currentValue.sort(), target.sort());
    }
    toBeFalse() {
        (0, node_assert_1.strict)(this.currentValue === false);
    }
    toBeTrue() {
        (0, node_assert_1.strict)(this.currentValue === true);
    }
    toBeTruthy() {
        (0, node_assert_1.strict)(!!this.currentValue);
    }
    toBeGreaterThan(target) {
        (0, node_assert_1.strict)(this.currentValue >= target);
    }
    toBeNegative() {
        if (this.isNot) {
            (0, node_assert_1.strict)(this.currentValue >= 0);
        }
        else {
            (0, node_assert_1.strict)(this.currentValue < 0);
        }
    }
    toBePositive() {
        if (this.isNot) {
            (0, node_assert_1.strict)(this.currentValue < 0);
        }
        else {
            (0, node_assert_1.strict)(this.currentValue >= 0);
        }
    }
}
function expect(currentValue) {
    return new Expect(currentValue);
}
