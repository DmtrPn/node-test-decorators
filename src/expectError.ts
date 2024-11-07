import { expect } from './expect';

export function expectError(error: { new (...args: any[]): any }, message?: string | RegExp) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
        return {
            async value(...args: any[]) {
                let isThrowError = false;
                try {
                    await descriptor.value.call(this, ...args);
                } catch (err: any) {
                    isThrowError = true;
                    expect(err).toBeInstanceOf(error);

                    if (message) {
                        if (message instanceof RegExp) {
                            expect(err.message as string).toBe(message.toString());
                        } else {
                            expect((err.message as string).replace('Mock', '')).toContain(message);
                        }
                    }
                } finally {
                    expect(isThrowError).toBeTruthy();
                }
            },
        };
    };
}
