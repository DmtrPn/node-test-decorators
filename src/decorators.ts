import { describe, it,before,  beforeEach, after, afterEach } from 'node:test';
type TestFunction = () => Promise<void> | void;

interface TestOptions {
    description?: string;
    only?: boolean;
    skip?: boolean;
}

function Describe(description?: string) {
    return function (constructor: Function) {
        describe(description ?? constructor.name, () => {
            const instance = new (constructor as any)();
            const prototype = Object.getPrototypeOf(instance);

            const testMethods = Object.getOwnPropertyNames(prototype)
                .map(key => prototype[key])
                .filter(method => method && method.isTest);

            const hasOnlyTests = testMethods.some((method: any) => method.only);

            for (const method of testMethods) {
                const testName = method.description || method.name;
                if (hasOnlyTests) {
                    if (method.only) {
                        it(testName, method.bind(instance));
                    }
                } else if (method.skip) {
                    it.skip(testName, method.bind(instance));
                } else {
                    it(testName, method.bind(instance));
                }
            }
        });
    };
}

function Test(params?: TestOptions | string) {
    const {
        description,
        only = false,
        skip = false,
    } = (params instanceof String ? ({ description: params } as TestOptions) : params ?? {}) as TestOptions;
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value as TestFunction & TestOptions & { isTest: boolean };
        originalMethod.isTest = true;
        originalMethod.description = description || propertyKey;
        originalMethod.only = only;
        originalMethod.skip = skip;
    };
}

function BeforeAll() {
    return function (target: any, propertyKey: string) {
        before(async () => {
            const instance = new target.constructor();
            await instance[propertyKey]();
        });
    };
}

function BeforeEach() {
    return function (target: any, propertyKey: string) {
        beforeEach(async () => {
            const instance = new target.constructor();
            await instance[propertyKey]();
        });
    };
}

function AfterAll() {
    return function (target: any, propertyKey: string) {
        after(async () => {
            const instance = new target.constructor();
            await instance[propertyKey]();
        });
    };
}

function AfterEach() {
    return function (target: any, propertyKey: string) {
        afterEach(async () => {
            const instance = new target.constructor();
            await instance[propertyKey]();
        });
    };
}

export { Describe, Test, BeforeAll, BeforeEach, AfterAll, AfterEach };
