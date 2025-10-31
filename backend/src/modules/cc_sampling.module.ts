/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { SamplingService } from '../infrastructure/cc_sampling/services/sampling.service';
import { SamplingController } from '../presentation/controllers/v1/cc_sampling/sampling.controller';
import { ChainOfCustody } from 'src/domain/cc_custody/entities/chain_of_custody.entity';
import { Sampling } from '../domain/cc_sampling/entities/sampling.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SamplingRepository } from '../infrastructure/cc_sampling/repositories/sampling.repository';
import { ISamplingRepositoryToken } from 'src/application/cc_sampling/tokens/sampling-repository.tokens';
import {
  CreateSamplingUseCase,
  DeleteSamplingUseCase,
  FindByIdtSamplingUseCase,
  ListSamplingUseCase,
  UpdateLaboratorySamplingUseCase,
  UpdateSamplingUseCase
} from 'src/application/cc_sampling/use-cases/index.use-case'
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChainOfCustody, Sampling]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [SamplingController],
  providers: [SamplingService,
    {
      provide: ISamplingRepositoryToken,
      useClass: SamplingRepository
    },
    CreateSamplingUseCase,
    DeleteSamplingUseCase,
    FindByIdtSamplingUseCase,
    ListSamplingUseCase,
    UpdateLaboratorySamplingUseCase,
    UpdateSamplingUseCase
  ],
})
export class SamplingModule { }
