/* eslint-disable prettier/prettier */
import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';

// Define el tamaño máximo (ej: 10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024; 

// Define los tipos MIME permitidos (Imágenes y PDF)
const ALLOWED_FILE_TYPES = /(image\/(jpeg|png|gif|webp))|(application\/pdf)/;

/**
 * Pipe de validación que asegura que el archivo es una imagen o un PDF 
 * y no excede el tamaño máximo de 5MB.
 * * Se usa para limpiar el código de los controladores:
 * @UploadedFile(new ImageOrPdfPipe())
 */
export class ImageOrPdfPipe extends ParseFilePipe {
    constructor() {
        super({
            validators: [
                new MaxFileSizeValidator({ maxSize: MAX_FILE_SIZE }),
                new FileTypeValidator({ fileType: ALLOWED_FILE_TYPES }),
            ],
            // Permite subir un archivo solo si es opcional. 
            // Si el archivo es obligatorio, no incluir 'fileIsRequired: false'.
            fileIsRequired: true, 
        });
    }
}
