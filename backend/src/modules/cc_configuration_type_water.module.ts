/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TypeWaterService } from '../infrastructure/cc_configuration_type_water/services/type_water.service';
import { TypeWaterController } from '../presentation/controllers/v1/cc_configuration_type_water/type_water.controller';
import {
  CreateConfigurationTypeWaterUseCase,
  DeleteConfigurationTypeWaterUseCase,
  FindByIdtConfigurationTypeWaterUseCase,
  ListConfigurationTypeWaterUseCase,
  UpdateConfigurationTypeWaterUseCase,
} from 'src/application/cc_configuration_type_water/use-cases/index.use-case';
import { IConfigurationTypeWaterRepositoryToken } from 'src/application/cc_configuration_type_water/tokens/configuration-tpe-water-repository.tokens';
import { ConfigurationTypeWaterRepository } from 'src/infrastructure/cc_configuration_type_water/repository/configuration_type_water.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationTypeWater } from 'src/domain/shared/index.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationTypeWater]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [TypeWaterController],
  providers: [
    TypeWaterService,
    {
      provide: IConfigurationTypeWaterRepositoryToken,
      useClass: ConfigurationTypeWaterRepository,
    },
    CreateConfigurationTypeWaterUseCase,
    DeleteConfigurationTypeWaterUseCase,
    FindByIdtConfigurationTypeWaterUseCase,
    ListConfigurationTypeWaterUseCase,
    UpdateConfigurationTypeWaterUseCase,
  ],
  exports: [TypeWaterService],
})
export class ConfigurationTypeWaterModule { }
