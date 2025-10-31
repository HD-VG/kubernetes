/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigurationCalculationsService } from '../infrastructure/cc_configuration_calculations/service/configuration_calculations.service';
import { ConfigurationCalculationsController } from 'src/presentation/controllers/v1/cc_configuration_calculations/configuration_calculations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationCalculation } from 'src/domain/cc_configuration_calculations/entities/configuration_calculation.entity';
import { ConfigurationCalculationRepository } from './../infrastructure/cc_configuration_calculations/repositories/configuration_calculation.repository';
import { IConfigurationCalculationRepositoryToken } from './../application/cc_configuration_calculation/tokens/configuration_calculation.tokens';
import {
  CreateConfigurationCalculationUseCase,
  DeleteConfigurationCalculationUseCase,
  FindByIdConfigurationCalculationUseCase,
  ListConfigurationCalculationUseCase,
  ModifyStatusConfigurationCalculationUseCase,
  UpdateConfigurationCalculationUseCase,
  ModifyStatusAppsConfigurationCalculationUseCase
} from 'src/application/cc_configuration_calculation/use-case/index-configuration-calculation.use-case'
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationCalculation]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [ConfigurationCalculationsController],
  providers: [ConfigurationCalculationsService,
    {
      provide: IConfigurationCalculationRepositoryToken,
      useClass: ConfigurationCalculationRepository
    },
    CreateConfigurationCalculationUseCase,
    DeleteConfigurationCalculationUseCase,
    FindByIdConfigurationCalculationUseCase,
    ListConfigurationCalculationUseCase,
    ModifyStatusConfigurationCalculationUseCase,
    UpdateConfigurationCalculationUseCase,
    ModifyStatusAppsConfigurationCalculationUseCase
  ],
  exports: [ConfigurationCalculationsService]
})
export class ConfigurationCalculationsModule { }
