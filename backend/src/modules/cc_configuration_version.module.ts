/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigurationVersionService } from '../infrastructure/cc_configuration_version/services/configuration_version.service';
import { ConfigurationVersionController } from '../presentation/controllers/v1/cc_configuration_version/admin_configuration.controller';
import { ConfigurationVersionRepository } from '../infrastructure/cc_configuration_version/repositories/configuration_version.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationVersion } from 'src/domain/shared/index.entity';
import {
  CreateConfigurationVersionUseCase,
  DeleteConfigurationVersionUseCase,
  FindByIdConfigurationVersionUseCase,
  ListConfigurationVersionUseCase,
  UpdateConfigurationVersionUseCase,
  ModifyStatusConfigurationVersionUseCase
} from 'src/application/cc_configuration_version/use-cases/index-configuration-version.use-case'
import { IConfigurationVersionRepositoryToken } from 'src/application/cc_configuration_version/tokens/configuration_version.tokens';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationVersion]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [ConfigurationVersionController],
  providers: [
    ConfigurationVersionService,
    {
      provide: IConfigurationVersionRepositoryToken,
      useClass: ConfigurationVersionRepository
    },
    CreateConfigurationVersionUseCase,
    DeleteConfigurationVersionUseCase,
    FindByIdConfigurationVersionUseCase,
    ListConfigurationVersionUseCase,
    UpdateConfigurationVersionUseCase,
    ModifyStatusConfigurationVersionUseCase
  ],
  exports: [ConfigurationVersionService]
})
export class ConfigurationVersionModule { }
