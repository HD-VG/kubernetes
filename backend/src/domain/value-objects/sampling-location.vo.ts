/* eslint-disable prettier/prettier */
export class Coordinates {
  constructor(
    public readonly x: string,
    public readonly y: string,
  ) {
    if (!x || !y) {
      throw new Error('Coordenadas inválidas');
    }
  }
}
