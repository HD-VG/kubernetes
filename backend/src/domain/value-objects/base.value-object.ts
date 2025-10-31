/* eslint-disable prettier/prettier */
export abstract class BaseValueObject<T> {
    abstract equals(other: T): boolean;
}