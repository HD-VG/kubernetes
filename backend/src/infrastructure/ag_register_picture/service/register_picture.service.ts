/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Register } from 'src/domain/shared/index.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRegisterPictureDto } from 'src/presentation/dtos/ag_register_picture/index.dto';
import { format } from 'date-fns';
import archiver from 'archiver';
import * as dotenv from 'dotenv';
import { PassThrough } from 'stream';
dotenv.config();

@Injectable()
export class RegisterPictureService {
  constructor(
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>
  ) {}

  // Guardar archivo
  async saveFile(fileBuffer: Buffer, destinationPath: string, fileName: string){
  try {
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true });
    }
    const fullPath = path.join(destinationPath, fileName);
    await fs.promises.writeFile(fullPath, fileBuffer);
    console.log(`Archivo guardado correctamente en: ${fullPath}`);
    return true;
  } catch (error: any) {
    console.error("Error al guardar el archivo:", error.message);
    return false;
  }
}

  // Buscar register
  async ValidationRegister(id: number) {
    const register = await this.registerRepository.findOneBy({ id });
    console.log('enviamos este register', register);
    return register;
  }

  // Validar archivo
  validateFile(file: Express.Multer.File, options?: { maxSize?: number; allowedTypes?: string[] }) {
    const maxSize = options?.maxSize || 5 * 1024 * 1024; // 5MB por defecto
    const allowedTypes = options?.allowedTypes || ['image/jpeg', 'image/png', 'image/gif'];

    if (!file) throw new Error('No se ha recibido ningún archivo.');
    if (file.size > maxSize) throw new Error(`El archivo excede el tamaño máximo permitido de ${maxSize} bytes.`);
    if (!allowedTypes.includes(file.mimetype))
      throw new Error(`Tipo de archivo no permitido. Tipos permitidos: ${allowedTypes.join(', ')}`);
    
    return true;
  }

  // Configurar y guardar archivo
  async configurationSave(createRegisterPictureDto: CreateRegisterPictureDto, registerPicture: Express.Multer.File) {
    this.validateFile(registerPicture, {
      maxSize: Number(process.env.MAX_SIZE_FILES) || 5 * 1024 * 1024,
      allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    });

    const fileExtension = path.extname(registerPicture.originalname);
    const formattedDate = format(new Date(), 'yyyyMMdd_HHmmss');
    const nameFile = `${createRegisterPictureDto.register_id}_${formattedDate}${fileExtension}`;
    const destinationPath = process.env.FILES_SYSTEM || path.join(__dirname, '../../../uploads');

    await this.saveFile(registerPicture.buffer, destinationPath, nameFile);
    createRegisterPictureDto.pictureUrl = nameFile;

    return createRegisterPictureDto;
  }

  // Generar ZIP
  async GenerateZip(filenames: string[]) {
    const archive = archiver('zip', { zlib: { level: 9 } });
    const stream = new PassThrough(); // para mandar al controlador

    archive.pipe(stream);

    filenames.forEach(filename => {
      const filePath = path.join(process.env.FILES_SYSTEM || './uploads', filename);
      if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: filename });
      }
    });

    archive.finalize();

    return stream; 
  }
  async deleteFile(registerPicture) {
    const destinationPath = process.env.FILES_SYSTEM || './uploads';
    const filePath = path.join(destinationPath, registerPicture.pictureUrl);
    try {
      if (fs.existsSync(filePath)) {
          await fs.promises.unlink(filePath);
          console.log(`Archivo eliminado correctamente: ${filePath}`);
      } else {
          console.warn(`Archivo no encontrado en: ${filePath}`);
      }
      return true;
      } catch (error) {
      console.error('Error al eliminar el archivo:', error.message);
      return false;
      }
  }
}
