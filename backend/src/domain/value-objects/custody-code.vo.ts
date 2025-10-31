/* eslint-disable prettier/prettier */
import { DomainException } from "../../common/domain/exceptions/domain.exception";
export class CustodyCode {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || !/^DCCE - \d+$/.test(value)) {
      throw new DomainException('Invalid custody code format.');
    }
    this._value = value;
  }

  get value(): string {
    return this._value;
  }

  equals(other: CustodyCode): boolean {
    return this._value === other._value;
  }
}
