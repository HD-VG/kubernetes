/* eslint-disable prettier/prettier */

/**
 * Interfaz genérica para estandarizar las respuestas del backend.
 * * El tipo genérico <T> representa el tipo de dato esperado en el campo 'data'.
 */
export interface AnswerQuery<T> {
  message: string;
  error?: string;
  data?: T;
  status: boolean;
  statusCode?: number;
}
