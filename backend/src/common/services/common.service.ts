/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as CryptoJS from 'crypto-js';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import { format } from 'date-fns';
import * as archiver from 'archiver';
import { PinoLogger } from 'nestjs-pino';
dotenv.config();
const FILES_BASE_PATH = process.env.FILES_SYSTEM || path.join(process.cwd(), 'uploads');
@Injectable()
export class CommonService {

  constructor(
    private readonly logger: PinoLogger
  ) {
    this.ensureBaseDirectoryExists();
  }

  async DecriptResponse(param: string): Promise<string> {
    const AES_SECRET_KEY = process.env.SECRET_KEY
    const salt = CryptoJS.AES.decrypt(param, AES_SECRET_KEY);
    const plainResponse = salt.toString(CryptoJS.enc.Utf8);
    return await bcrypt.hash(plainResponse, 10);
  }

  private ensureBaseDirectoryExists(): void {
    if (!fs.existsSync(FILES_BASE_PATH)) {
      try {
        fs.mkdirSync(FILES_BASE_PATH, { recursive: true });
        this.logger.info(`Directorio base de archivos creado: ${FILES_BASE_PATH}`);
      } catch (error) {
        this.logger.error(`Fallo al crear el directorio base: ${FILES_BASE_PATH}`, error.stack);
        throw new InternalServerErrorException('Error al inicializar el sistema de archivos del servidor.');
      }
    }
  }

  /**
   * Genera un nombre de archivo único y estructurado.
   * Formato: <prefix>_<date>_<unique_id>.<ext>
   * @param prefix Prefijo para categorizar el archivo (ej: 'register', 'report', 'user').
   * @param originalName Nombre original para extraer la extensión.
   * @returns El nombre de archivo único generado.
   */
  generateUniqueFileName(prefix: string, originalName: string): string {
    const fileExtension = path.extname(originalName);
    const formattedDate = format(new Date(), 'yyyyMMdd_HHmmss');
    const uniqueId = Math.random().toString(36).substring(2, 8); // Usamos una pequeña porción de un UUID o random para asegurar unicidad
    return `${prefix}_${formattedDate}_${uniqueId}${fileExtension}`; // Ejemplo de nombre: register_20251013_091400_abc123.jpg
  }

  /**
   * Guarda el buffer de un archivo en el sistema de archivos local.
   * @param fileBuffer Buffer del archivo subido (Express.Multer.File.buffer).
   * @param fileName Nombre único generado para guardar el archivo.
   * @param prefix Prefijo para crear un subdirectorio si es necesario.
   * @returns El path completo donde se guardó el archivo.
   */
  async saveFile(fileBuffer: Buffer, fileName: string, prefix: string): Promise<string> {
    const subDirectoryPath = path.join(FILES_BASE_PATH, prefix); // Crea un subdirectorio basado en el prefijo (ej: /uploads/register)

    try {
      if (!fs.existsSync(subDirectoryPath)) {
        fs.mkdirSync(subDirectoryPath, { recursive: true });
      }
      const fullPath = path.join(subDirectoryPath, fileName);
      await new Promise<void>((resolve, reject) => {
        fs.writeFile(fullPath, fileBuffer, (err) => {
          if (err) {
            this.logger.error(`Error al escribir el archivo ${fileName}: ${err.message}`, err.stack);
            reject(new InternalServerErrorException('Fallo al guardar el archivo en disco.'));
          } else {
            resolve();
          }
        });
      });
      return path.join(prefix, fileName);// Devolvemos el path relativo (prefix/fileName) para guardar en la BD

    } catch (error) {
      throw error;
    }
  }

  /**
   * Recupera un archivo individual basado en su URL (path relativo).
   * @param fileUrl Path relativo del archivo (ej: 'register/file_name.jpg')
   * @returns Un objeto que contiene el path absoluto y el nombre del archivo.
   */
  getFilePath(fileUrl: string): { fullPath: string, fileName: string } {
    const parts = fileUrl.split(path.sep);
    const prefix = parts[0];
    const fileName = parts[parts.length - 1];
    if (fileUrl.includes('..')) {
      throw new InternalServerErrorException('URL de archivo inválida.');
    }
    const fullPath = path.join(FILES_BASE_PATH, fileUrl);
    if (!fs.existsSync(fullPath)) {
      throw new NotFoundException(`Archivo no encontrado: ${fileName}`);
    }

    return { fullPath, fileName };
  }

  /**
   * Crea un stream ZIP de una lista de paths de archivos.
   * @param fileUrls Array de paths relativos de los archivos a incluir.
   * @returns Streamable Archiver instance.
   */
  createZipStream(fileUrls: string[]): archiver.Archiver {
    const archive = archiver('zip', {
      zlib: { level: 9 } // Nivel de compresión alto
    });

    archive.on('warning', (err) => {
      if (err.code !== 'ENOENT') {
        this.logger.warn(`Advertencia al crear ZIP: ${err.message}`);
      }
    });

    archive.on('error', (err) => {
      this.logger.error(`Error fatal al crear ZIP: ${err.message}`, err.stack);
      throw new InternalServerErrorException('Error al crear el archivo ZIP.');
    });

    fileUrls.forEach(fileUrl => {
      try {
        const { fullPath, fileName } = this.getFilePath(fileUrl);
        archive.file(fullPath, { name: fileName });// Adjunta el archivo al ZIP con su nombre original (o el que se desea en el ZIP)
      } catch (error) {
        this.logger.warn(`Archivo omitido en el ZIP (no encontrado): ${fileUrl}`);
      }
    });

    archive.finalize(); // Cierra el archivo y comienza a transmitir
    return archive;
  }
}
