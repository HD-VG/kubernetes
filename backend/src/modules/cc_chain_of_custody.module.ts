/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ChainOfCustodyService } from '../infrastructure/cc_custody/services/chain_of_custody.service';
import { ChainOfCustodyController } from '../presentation/controllers/v1/cc_custody/chain_of_custody.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChainOfCustody } from 'src/domain/cc_custody/entities/chain_of_custody.entity';
import { Sampling, Transport, ConfigurationVersion, Applicant } from 'src/domain/shared/index.entity';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ChainOfCustodyRepository } from '../infrastructure/cc_custody/repositories/chain_of_custody.repository';
import { ICustodyRepositoryToken } from 'src/application/cc_custody/tokens/custody-repository.tokens';
import {
  CreateCustodyUseCase,
  DeleteCustodyUseCase,
  GetMapsCustodyUseCase,
  ListCustodyUseCase,
  PrintCustodyUseCase,
  PrintPdfCustodyUseCase,
  UpdateCustodyUseCase,
  FindByIdCustodyUseCase
} from 'src/application/cc_custody/use-cases/index-custody.use-case'
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChainOfCustody, Sampling, Transport, ConfigurationVersion, Applicant]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/assets'),
      serveRoot: '/assets/',
    }),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [ChainOfCustodyController],
  providers: [ChainOfCustodyService,
    {
      provide: ICustodyRepositoryToken,
      useClass: ChainOfCustodyRepository
    },
    CreateCustodyUseCase,
    DeleteCustodyUseCase,
    GetMapsCustodyUseCase,
    ListCustodyUseCase,
    PrintCustodyUseCase,
    PrintPdfCustodyUseCase,
    UpdateCustodyUseCase,
    FindByIdCustodyUseCase
  ],
})
export class ChainOfCustodyModule { }
