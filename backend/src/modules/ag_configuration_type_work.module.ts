/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigurationTypeWorkService } from 'src/infrastructure/ag_configuration_type_work/service/configuration_type_work.service';
import { ConfigurationTypeWorkController } from 'src/presentation/controllers/v1/ag_configuration_type_work/configuration_type_work.controller';
import { ConfigurationTypeWorkRepository } from 'src/infrastructure/ag_configuration_type_work/repository/configuration_type_work.repository';
import { ConfigurationTypeWork } from 'src/domain/ag_configuration_type_work/entities/configuration_type_work.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  CreateConfigurationTypeWorkUseCase,
  UpdateConfigurationTypeWorkUseCase,
  ListConfigurationTypeWorkUseCase,
  FindByConfigurationTypeWorkUseCase,
  FindAllDataConfigurationTypeWorkUseCase,
  DeleteConfigurationTypeWorkUseCase
} from 'src/application/ag_configuration_type_work/use-cases/index.use-case'
import { IConfigurationTypeWorkToken } from 'src/application/ag_configuration_type_work/tokens/configuration_type_work.tokens';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationTypeWork]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ConfigurationTypeWorkController],
  providers: [ConfigurationTypeWorkService, ConfigurationTypeWorkRepository,
    {
      provide : IConfigurationTypeWorkToken,
      useClass : ConfigurationTypeWorkRepository
    },
  CreateConfigurationTypeWorkUseCase,
  UpdateConfigurationTypeWorkUseCase,
  ListConfigurationTypeWorkUseCase,
  FindByConfigurationTypeWorkUseCase,
  FindAllDataConfigurationTypeWorkUseCase,
  DeleteConfigurationTypeWorkUseCase
  ],
  exports : [ConfigurationTypeWorkService]
})
export class ConfigurationTypeWorkModule {}
