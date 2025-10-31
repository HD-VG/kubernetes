/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigurationUexpService } from '../infrastructure/cc_configuration_uexp/services/configuration_uexp.service';
import { ConfigurationUexpController } from 'src/presentation/controllers/v1/cc_configuration_uexp/configuration_uexp.controller';
import {
  CreateConfigurationUexpUseCase,
  DeleteConfigurationUexpUseCase,
  FindByIdtConfigurationUexpUseCase,
  ListConfigurationUexpUseCase,
  UpdateConfigurationUexpUseCase,
} from 'src/application/cc_configuration_uexp/use-cases/index.use-case';
import { IConfigurationUexpRepositoryToken } from 'src/application/cc_configuration_uexp/tokens/configuration-uexp-repository.tokens';
import { ConfigurationUexpRepository } from 'src/infrastructure/cc_configuration_uexp/repository/configuration_uexp.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationTypeWater, ConfigurationUexp } from 'src/domain/shared/index.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationTypeWater, ConfigurationUexp]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [ConfigurationUexpController],
  providers: [
    ConfigurationUexpService,
    {
      provide: IConfigurationUexpRepositoryToken,
      useClass: ConfigurationUexpRepository,
    },
    CreateConfigurationUexpUseCase,
    DeleteConfigurationUexpUseCase,
    FindByIdtConfigurationUexpUseCase,
    ListConfigurationUexpUseCase,
    UpdateConfigurationUexpUseCase,
  ],
  exports: [ConfigurationUexpService],
})
export class ConfigurationUexpModule { }
