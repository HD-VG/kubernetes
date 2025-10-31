/* eslint-disable prettier/prettier */
import {
    Injectable,
    NestMiddleware,
    BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express'; 
import * as CryptoJS from 'crypto-js';
import * as dotenv from 'dotenv';
import { PinoLogger } from 'nestjs-pino';
dotenv.config();

/**
 * Tipo local que refleja la interfaz Express.DecryptedData definida en express.d.ts.
 * Esto asegura que la variable local 'decryptedData' cumpla el contrato 
 * de la propiedad 'req.decryptedData' sin usar 'as Record<string, any>' 
 * en la inicialización.
 */
interface DecryptedDataContract {
    query: Record<string, any>;
    params: Record<string, any>;
    body: Record<string, any>;
}

@Injectable()
export class DecryptBodyMiddleware implements NestMiddleware {
    constructor(private readonly logger: PinoLogger) {
        logger.setContext(DecryptBodyMiddleware.name);
    }
    use(req: Request, res: Response, next: NextFunction) {
        const secret = process.env.SECRET_KEY;
        const ip = req.ip || 'unknown-ip'; 

        // 1. Inicialización de la variable local con el tipo DecryptedDataContract
        const decryptedData: DecryptedDataContract = { 
            query: {}, 
            params: {}, 
            body: {} 
        };

        // --- Procesamiento del Cuerpo (Body) ---
        // Verificamos si req.body es de un tipo que pueda contener 'encrypted'
        if (req.body && typeof req.body === 'object' && req.body.encrypted && typeof req.body.encrypted === 'string') {
            try {
                const encryptedString = req.body.encrypted as string;
                const decryptedText = CryptoJS.AES.decrypt(encryptedString, secret).toString(CryptoJS.enc.Utf8);

                if (!decryptedText) {
                    this.logger.error(`[BODY] Decryption failed: Empty result from IP ${ip}`);
                    throw new BadRequestException('Fallo al desencriptar el cuerpo');
                }

                // Asumimos que el texto desencriptado es un JSON que se convierte en un objeto
                const parsed: Record<string, any> = JSON.parse(decryptedText); 
                
                if (!parsed || typeof parsed !== 'object') {
                    this.logger.warn(`[BODY] Invalid decrypted JSON payload received from ${req.ip}`);
                    throw new BadRequestException('Cuerpo desencriptado inválido');
                }
                
                decryptedData.body = parsed; 

                this.logger.info({
                    context: 'DecryptionBody',
                    message: 'Cuerpo de solicitud desencriptado con éxito.',
                    ip: ip,
                    originalPath: req.path,
                    decryptedBody: parsed,
                });

                // Sobreescribimos el cuerpo de la petición con el valor desencriptado
                req.body = parsed;
            } catch (error) {
                this.logger.error(`[BODY] Decryption failed for body from ${req.ip}. Error: ${error.message}`, error.stack);
                throw new BadRequestException('Fallo al desencriptar el cuerpo');
            }
        }

        // --- Procesamiento de Query Parameters ---
        // req.query es Partial<{[key: string]: string | string[]}>. 
        for (const key in req.query) {
            const value = req.query[key];
            if (typeof value === 'string') {
                try {
                    const decrypted = CryptoJS.AES.decrypt(value, secret).toString(CryptoJS.enc.Utf8);
                    
                    if (!decrypted) throw new Error('Decryption empty');
                    
                    // Conversión a número si es posible
                    const finalValue = /^\d+$/.test(decrypted) ? Number(decrypted) : decrypted;
                    
                    // Asignación de valores tipados
                    req.query[key] = finalValue as any; // Necesario 'as any' aquí ya que req.query es muy estricto
                    decryptedData.query[key] = finalValue; 

                } catch {
                    this.logger.debug(`[QUERY] Decryption skipped or failed for key: ${key}. Keeping original value.`);
                    decryptedData.query[key] = value;
                }
            }
        }

        // --- Procesamiento de Route Parameters (Params) ---
        for (const key in req.params) {
            const value = req.params[key];
            if (typeof value === 'string') {
                try {
                    const decrypted = CryptoJS.AES.decrypt(value, secret).toString(CryptoJS.enc.Utf8);
                    
                    if (!decrypted) throw new Error('Decryption empty');

                    // Conversión a número si es posible
                    const finalValue = /^\d+$/.test(decrypted) ? Number(decrypted) : decrypted;
                    
                    // Asignación de valores tipados
                    req.params[key] = finalValue as any; // Necesario 'as any' aquí ya que req.params es muy estricto
                    decryptedData.params[key] = finalValue;

                } catch {
                    this.logger.debug(`[PARAMS] Decryption skipped or failed for key: ${key}. Keeping original value.`);
                    decryptedData.params[key] = value;
                }
            }
        }

        // 2. Asignación tipificada: req.decryptedData ahora está tipado gracias a express.d.ts
        req.decryptedData = decryptedData;

        if (Object.keys(decryptedData.params).length > 0 || Object.keys(decryptedData.query).length > 0) {
            this.logger.info({
                context: 'DecryptionURL',
                message: 'Parámetros y/o Query desencriptados.',
                ip: ip,
                path: req.path,
                data: { params: decryptedData.params, query: decryptedData.query }, 
            });
        }

        next();
    }
}
