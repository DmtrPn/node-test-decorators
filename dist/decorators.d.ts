interface TestOptions {
    description?: string;
    only?: boolean;
    skip?: boolean;
}
declare function Describe(description?: string): (constructor: Function) => void;
declare function Test(params?: TestOptions | string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
declare function BeforeAll(): (target: any, propertyKey: string) => void;
declare function BeforeEach(): (target: any, propertyKey: string) => void;
declare function AfterAll(): (target: any, propertyKey: string) => void;
declare function AfterEach(): (target: any, propertyKey: string) => void;
export { Describe, Test, BeforeAll, BeforeEach, AfterAll, AfterEach };
