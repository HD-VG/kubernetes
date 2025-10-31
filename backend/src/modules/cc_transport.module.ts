/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TransportService } from '../infrastructure/cc_transport/services/transport.service';
import { TransportController } from '../presentation/controllers/v1/cc_transport/transport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChainOfCustody } from 'src/domain/cc_custody/entities/chain_of_custody.entity';
import { Transport } from '../domain/cc_transport/entities/transport.entity';
import { TransportRepository } from '../infrastructure/cc_transport/repositories/transport.repository';
import { ITransportRepositoryToken } from 'src/application/cc_transport/tokens/transport-repository.tokens';
import {
  CreateTransportUseCase,
  DeleteTransportUseCase,
  FindTransportUseCase,
  ListTransportUseCase,
  UpdateTransportUseCase
} from 'src/application/cc_transport/use-cases/index-transport.use-case'
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChainOfCustody, Transport]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [TransportController],
  providers: [TransportService,
    {
      provide: ITransportRepositoryToken,
      useClass: TransportRepository
    },
    CreateTransportUseCase,
    DeleteTransportUseCase,
    FindTransportUseCase,
    ListTransportUseCase,
    UpdateTransportUseCase
  ],
  exports: [TransportService],
})
export class TransportModule { }
