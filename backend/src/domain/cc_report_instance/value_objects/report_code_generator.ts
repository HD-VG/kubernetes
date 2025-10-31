/* eslint-disable prettier/prettier */
export class ReportYear {
  readonly value: number;

  constructor(date: Date = new Date()) {
    this.value = date.getFullYear();
  }

  toString(): string {
    return this.value.toString();
  }
}
