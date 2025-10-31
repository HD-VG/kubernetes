/* eslint-disable prettier/prettier */
export class MeasurementPair {
  readonly valueA: number;
  readonly valueB: number;

  constructor(valueA: number, valueB: number) {
    if (valueA == null || valueB == null) {
      throw new Error('Ambos valores son requeridos');
    }
    this.valueA = valueA;
    this.valueB = valueB;
  }

  get average(): number {
    return (this.valueA + this.valueB) / 2;
  }
}
