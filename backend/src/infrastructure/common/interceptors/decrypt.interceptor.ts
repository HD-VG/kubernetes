/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class DecryptBodyInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    console.log('Interceptor recibió:', req.body);

    const secret = process.env.SECRET_KEY;

    const encrypted =
      req.body && typeof req.body === 'object' && 'encrypted' in req.body
        ? req.body.encrypted
        : null;


    if (!encrypted || typeof encrypted !== 'string') {
      throw new BadRequestException('Cuerpo encriptado no encontrado');
    }

    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, secret);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      const parsed = JSON.parse(decryptedText);

      if (!parsed.username || !parsed.password) {
        throw new BadRequestException(
          'Campos faltantes después de desencriptar',
        );
      }

      req.body = parsed; // reemplaza el body desencriptado para el pipe y DTO
    } catch (error) {
      throw new BadRequestException('Fallo al desencriptar el cuerpo');
    }

    return next.handle();
  }
}
