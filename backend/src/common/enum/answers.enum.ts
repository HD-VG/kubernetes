/* eslint-disable prettier/prettier */
export enum ResponseMessages {
  RECORD_MODIFIED = 'Registro modificado con éxito',
  RECORD_CREATED = 'Registro creado con éxito',
  RECORDS_FOUND = 'Registros encontrados',
  RECORD_DELETED = 'Registro eliminado con éxito',
  NO_RECORDS_FOUND = 'No se encontraron registros',
  INVALID_REQUEST = 'Solicitud inválida',
  UNAUTHORIZED_ACCESS = 'Acceso no autorizado',
  FORBIDDEN_ACCESS = 'Acceso prohibido',
  SERVER_ERROR = 'Error interno del servidor',
  BAD_REQUEST = 'Petición incorrecta',
  BAD_EMAIL = 'Correo existente',
  BAD_PARAM = 'Nombre o Parametro existente',
  NO_CONFIGURATIONS = 'No se encontraron configuraciones para este paso',
  RECORDS_DELETE = 'No se encontro el registro o Ya eliminado',
}
