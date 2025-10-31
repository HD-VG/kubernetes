/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigurationCarsService } from '../infrastructure/ag_configuration_cars/services/configuration_cars.service';
import { ConfigurationCarsController } from '../presentation/controllers/v1/ag_configuration_cars/configuration_cars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationCars } from '../domain/ag_configuration_cars/entities/configuration_car.entity';
import { IConfigurationCarsToken } from 'src/application/ag_configuration_cars/tokens/configuration_cars.tokens';
import { ConfigurationCarsRepository } from 'src/infrastructure/ag_configuration_cars/repository/configuration_cars.repository';
import {
  CreateConfigurationCarsUseCase,
  UpdateConfigurationCarsUseCase,
  ListConfigurationCarsUseCase,
  FindByConfigurationCarsUseCase,
  FindAllDataConfigurationCarsUseCase,
  DeleteConfigurationCarsUseCase,
  GetApiCarsUseCase,
  GetApiByIdCarsUseCase,
} from 'src/application/ag_configuration_cars/use-cases/index.use-case';
import { HttpModule } from '@nestjs/axios';
import { Register } from 'src/domain/shared/index.entity';
import { AuthModule } from './auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationCars,Register]),
    HttpModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [ConfigurationCarsController],
  providers: [
    ConfigurationCarsService,
    ConfigurationCarsRepository,
    {
      provide: IConfigurationCarsToken, 
      useClass: ConfigurationCarsRepository, 
    },
    CreateConfigurationCarsUseCase,
    UpdateConfigurationCarsUseCase,
    ListConfigurationCarsUseCase,
    FindByConfigurationCarsUseCase,
    FindAllDataConfigurationCarsUseCase,
    DeleteConfigurationCarsUseCase,
    GetApiCarsUseCase,
    GetApiByIdCarsUseCase,
  ],
  exports: [ConfigurationCarsService],
})
export class ConfigurationCarsModule {}
