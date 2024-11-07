"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Describe = Describe;
exports.Test = Test;
exports.BeforeAll = BeforeAll;
exports.BeforeEach = BeforeEach;
exports.AfterAll = AfterAll;
exports.AfterEach = AfterEach;
const node_test_1 = require("node:test");
function Describe(description) {
    return function (constructor) {
        (0, node_test_1.describe)(description ?? constructor.name, () => {
            const instance = new constructor();
            const prototype = Object.getPrototypeOf(instance);
            const testMethods = Object.getOwnPropertyNames(prototype)
                .map(key => prototype[key])
                .filter(method => method && method.isTest);
            const hasOnlyTests = testMethods.some((method) => method.only);
            for (const method of testMethods) {
                const testName = method.description || method.name;
                if (hasOnlyTests) {
                    if (method.only) {
                        (0, node_test_1.it)(testName, method.bind(instance));
                    }
                }
                else if (method.skip) {
                    node_test_1.it.skip(testName, method.bind(instance));
                }
                else {
                    (0, node_test_1.it)(testName, method.bind(instance));
                }
            }
        });
    };
}
function Test(params) {
    const { description, only = false, skip = false, } = (params instanceof String ? { description: params } : params ?? {});
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        originalMethod.isTest = true;
        originalMethod.description = description || propertyKey;
        originalMethod.only = only;
        originalMethod.skip = skip;
    };
}
function BeforeAll() {
    return function (target, propertyKey) {
        (0, node_test_1.before)(async () => {
            const instance = new target.constructor();
            await instance[propertyKey]();
        });
    };
}
function BeforeEach() {
    return function (target, propertyKey) {
        (0, node_test_1.beforeEach)(async () => {
            const instance = new target.constructor();
            await instance[propertyKey]();
        });
    };
}
function AfterAll() {
    return function (target, propertyKey) {
        (0, node_test_1.after)(async () => {
            const instance = new target.constructor();
            await instance[propertyKey]();
        });
    };
}
function AfterEach() {
    return function (target, propertyKey) {
        (0, node_test_1.afterEach)(async () => {
            const instance = new target.constructor();
            await instance[propertyKey]();
        });
    };
}
