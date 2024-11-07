"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expectError = expectError;
const expect_1 = require("./expect");
function expectError(error, message) {
    return function (target, key, descriptor) {
        return {
            async value(...args) {
                let isThrowError = false;
                try {
                    await descriptor.value.call(this, ...args);
                }
                catch (err) {
                    isThrowError = true;
                    (0, expect_1.expect)(err).toBeInstanceOf(error);
                    if (message) {
                        if (message instanceof RegExp) {
                            (0, expect_1.expect)(err.message).toBe(message.toString());
                        }
                        else {
                            (0, expect_1.expect)(err.message.replace('Mock', '')).toContain(message);
                        }
                    }
                }
                finally {
                    (0, expect_1.expect)(isThrowError).toBeTruthy();
                }
            },
        };
    };
}
