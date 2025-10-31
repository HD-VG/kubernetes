/* eslint-disable prettier/prettier */
import { Global, Module } from '@nestjs/common';
import { CommonService } from './services/common.service';
import { LoggerModule } from 'nestjs-pino'; // Necesario para inyectar PinoLogger

@Global() // Hace que los servicios exportados estén disponibles en todos los módulos
@Module({
    imports: [LoggerModule], // Importa LoggerModule para que CommonService pueda usar PinoLogger
    providers: [CommonService],
    exports: [CommonService],
})
export class CommonModule {}
