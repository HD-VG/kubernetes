export interface AnswerQuery<T> {
    message: string;
    data?: T; // Datos de cualquier tipo
    all?: number; // Número total de registros
    total?: number; // Número total de páginas
    currentPage?: number; // Página actual
    limit?: number; // Límite de registros por página
    status: boolean;
}

export interface AnswerQueryResponse {
    message: string;
    status: boolean;
    data: any
}
