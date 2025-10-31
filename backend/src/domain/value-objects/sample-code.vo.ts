/* eslint-disable prettier/prettier */
export class SampleCode {
  private readonly value: string;

  constructor(typeAbbr: string, index: number) {
    if (!typeAbbr) throw new Error('Tipo inválido para el código de muestra');
    this.value = `${typeAbbr}-${index}`;
  }

  public getValue(): string {
    return this.value;
  }
}
