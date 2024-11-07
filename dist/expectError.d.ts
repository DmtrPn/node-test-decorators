export declare function expectError(error: {
    new (...args: any[]): any;
}, message?: string | RegExp): (target: any, key: string, descriptor: PropertyDescriptor) => {
    value(...args: any[]): Promise<void>;
};
