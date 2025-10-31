/* eslint-disable prettier/prettier */
import { DomainException } from "../../common/domain/exceptions/domain.exception";
export class InitialConservative {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new DomainException('Initial conservative cannot be empty.');
    }
    this._value = value.toUpperCase().trim();
  }

  get value(): string {
    return this._value;
  }

  equals(other: InitialConservative): boolean {
    return this._value === other._value;
  }
}
