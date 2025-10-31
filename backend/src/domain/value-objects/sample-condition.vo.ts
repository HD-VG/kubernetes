/* eslint-disable prettier/prettier */
import { DomainException } from "../../common/domain/exceptions/domain.exception";
import { BaseValueObject } from "./base.value-object";
export class SampleCondition extends BaseValueObject<SampleCondition> {
  private readonly _value: string;
  private readonly validConditions = [
    'GOOD',
    'DAMAGED',
    'LOST',
    'CONTAMINATED',
  ];

  constructor(value: string) {
      super();
    if (!value || !this.validConditions.includes(value.toUpperCase())) {
      throw new DomainException(`Invalid sample condition: ${value}`);
    }
    this._value = value.toUpperCase();
  }

  get value(): string {
    return this._value;
  }

  isGood(): boolean {
    return this._value === 'GOOD';
  }
  isDamaged(): boolean {
    return this._value === 'DAMAGED';
  }

  equals(other: SampleCondition): boolean {
    if (!(other instanceof SampleCondition)) return false;
    return this._value === other.value;
  }
}
