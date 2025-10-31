/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { StandardsService } from '../infrastructure/cc_configuration_standard/services/standards.service';
import { StandardsController } from '../presentation/controllers/v1/cc_configuration_standard/standards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationStandard } from 'src/domain/cc_configuration_standard/entities/standard.entity';
import { IStandardRepositoryToken } from 'src/application/cc_configuration_standard/tokens/standard-repository.tokens';
import { ConfigurationStandardRepository } from 'src/infrastructure/cc_configuration_standard/repositories/standard.repositoy';
import {
  CreateStandardUseCase,
  DeleteStandardUseCase,
  FindByIdtStandardUseCase,
  ListStandardUseCase,
  UpdateStandardUseCase,
} from 'src/application/cc_configuration_standard/use-cases/index.use-case';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationStandard]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [StandardsController],
  providers: [
    StandardsService,
    {
      provide: IStandardRepositoryToken,
      useClass: ConfigurationStandardRepository,
    },
    CreateStandardUseCase,
    DeleteStandardUseCase,
    UpdateStandardUseCase,
    ListStandardUseCase,
    FindByIdtStandardUseCase,
  ],
  exports: [StandardsService],
})
export class StandardsModule { }
