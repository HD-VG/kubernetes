/* eslint-disable prettier/prettier */
export class MeasuredParameters {
  private readonly parameters: string[];

  constructor(params: string[]) {
    if (!params.length) throw new Error('No se proporcionaron parámetros medidos');
    this.parameters = params.map(p => p.toUpperCase().trim());
  }

  includesAll(expected: string[]): boolean {
    return expected.every(exp => this.parameters.includes(exp.toUpperCase().trim()));
  }

  toArray(): string[] {
    return this.parameters;
  }
}
