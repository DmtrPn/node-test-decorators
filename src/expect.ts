import { strict as assert } from 'node:assert';

import pick from 'lodash/pick';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import isNil from 'lodash/isNil';
import isDate from 'lodash/isDate';
import isEqual from 'lodash/isEqual';

type Optional<T> = T | undefined;

class Expect {
    private readonly currentValue: any;
    private isNot = false;

    constructor(value: any) {
        this.currentValue = value;
    }

    public get not(): Expect {
        this.isNot = true;
        return this;
    }

    public toInclude(target: string): void {
        const isInclude = this.currentValue.includes(target);
        assert(this.isNot ? !isInclude : isInclude);
    }

    public toBeInstanceOf(target: any): void {
        const isInstanceOf = this.currentValue instanceof target;
        assert(this.isNot ? !isInstanceOf : isInstanceOf);
    }

    public toMatchObject(target: object): void {
        const curretTargetObject = pick(this.currentValue, Object.keys(target));
        if (this.isNot) {
            assert.notDeepEqual(curretTargetObject, target);
        } else {
            assert.deepEqual(curretTargetObject, target);
        }
    }

    public toEqual(target: Optional<object | string | number>): void {
        if (this.isNot) {
            assert.notDeepEqual(this.currentValue, target);
        } else {
            assert.deepEqual(this.currentValue, target);
        }
    }

    public toBe(target: Optional<string | number | boolean | Date>): void {
        if (this.isNot) {
            assert.notEqual(this.currentValue, target);
        } else {
            assert.equal(this.currentValue, target);
        }
    }

    public toBeNil(): void {
        assert(this.isNot ? !isNil(this.currentValue) : isNil(this.currentValue));
    }

    public toBeAfter(target: Date): void {
        assert(this.currentValue.getTime() >= target.getTime());
    }

    public toBeGreaterThanOrEqual(target: number): void {
        assert(this.currentValue >= target);
    }

    public toBeArrayOfSize(targetLength: number): void {
        if (this.isNot) {
            assert.notEqual(this.currentValue.length, targetLength);
        } else {
            assert.equal(this.currentValue.length, targetLength);
        }
    }

    public toBeDefined(): void {
        if (this.isNot) {
            assert(isUndefined(this.currentValue));
        } else {
            assert(!isUndefined(this.currentValue));
        }
    }

    public toBeNull(): void {
        if (this.isNot) {
            assert(!isNull(this.currentValue));
        } else {
            assert(isNull(this.currentValue));
        }
    }

    public toBeDate(): void {
        assert(isDate(this.currentValue));
    }

    public toBeUndefined(): void {
        if (this.isNot) {
            assert(!isUndefined(this.currentValue));
        } else {
            assert(isUndefined(this.currentValue));
        }
    }

    public toContain(target: any): void {
        const includes = this.currentValue.includes(target);
        assert(this.isNot ? !includes : includes);
    }

    public toContainEqual(target: any): void {
        const isContainEqual = (this.currentValue as any[]).some(value => isEqual(value, target));
        assert(
            this.isNot ? !isContainEqual : isContainEqual,
            `${this.isNot ? '' : 'Not '}found equal ${target} in ${this.currentValue}`,
        );
    }

    public toContainAllValues(target: any[]): void {
        assert.deepEqual(this.currentValue.sort(), target.sort());
    }

    public toBeFalse(): void {
        assert(this.currentValue === false);
    }

    public toBeTrue(): void {
        assert(this.currentValue === true);
    }

    public toBeTruthy(): void {
        assert(!!this.currentValue);
    }

    public toBeGreaterThan(target: number): void {
        assert(this.currentValue >= target);
    }

    public toBeNegative(): void {
        if (this.isNot) {
            assert(this.currentValue >= 0);
        } else {
            assert(this.currentValue < 0);
        }
    }

    public toBePositive(): void {
        if (this.isNot) {
            assert(this.currentValue < 0);
        } else {
            assert(this.currentValue >= 0);
        }
    }
}

export function expect(currentValue: any): Expect {
    return new Expect(currentValue);
}
