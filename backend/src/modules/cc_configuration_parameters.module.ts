/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ParametersService } from '../infrastructure/cc_configuration_parameter/services/parameters.service';
import { ParametersController } from '../presentation/controllers/v1/cc_configuration_parameter/parameters.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationParameter } from 'src/domain/shared/index.entity';
import { IParameterRepositoryToken } from 'src/application/cc_configuration_parameter/tokens/parameter-repository.tokens';
import {
  CreateParameterUseCase,
  DeleteParameterUseCase,
  FindByIdParameterUseCase,
  ListParameterUseCase,
  UpdateParameterUseCase,
} from 'src/application/cc_configuration_parameter/use-cases/index.use-case';
import { ConfigurationParameterRepository } from 'src/infrastructure/cc_configuration_parameter/repositories/parameter.repository';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationParameter]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [ParametersController],
  providers: [
    ParametersService,
    {
      provide: IParameterRepositoryToken,
      useClass: ConfigurationParameterRepository,
    },
    CreateParameterUseCase,
    DeleteParameterUseCase,
    FindByIdParameterUseCase,
    ListParameterUseCase,
    UpdateParameterUseCase,
  ],
  exports: [ParametersService],
})
export class ParametersModule { }
