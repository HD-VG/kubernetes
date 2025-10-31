/* eslint-disable prettier/prettier */
export class AnswerQuery {
  message: string;
  data?: any;
  all?: any; // Este valor representa el número total de registros disponibles en la base de datos, sin importar la paginación.
  total?: number; // Este es el número total de páginas disponibles, que se calcula como el total de registros dividido por el límite de registros por página (redondeado hacia arriba).
  currentPage?: number; // Este es el número de la página que estás visualizando actualmente.
  limit?: number; // Este es el número de registros que se muestran por página.
  status: boolean;
}
