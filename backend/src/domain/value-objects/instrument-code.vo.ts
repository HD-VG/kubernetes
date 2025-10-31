/* eslint-disable prettier/prettier */
import { DomainException } from '../../common/domain/exceptions/domain.exception';

export class InstrumentCode {
  private readonly _value: string;

  constructor(value: string) {
    if (!value || value.trim() === '') {
      throw new DomainException('Instrument code cannot be empty.');
    }
    if (value.length > 50) {
      throw new DomainException('Instrument code is too long.');
    }
    this._value = value.toUpperCase().trim();
  }

  get value(): string {
    return this._value;
  }

  equals(other: InstrumentCode): boolean {
    return this._value === other._value;
  }
}
