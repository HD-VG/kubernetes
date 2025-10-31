/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigurationUtilService } from 'src/infrastructure/ag_configuration_utils/service/configuration_utils.service';
import { ConfigurationUtilController } from 'src/presentation/controllers/v1/ag_configuration_utils/configuration_utils.controller';
import { ConfigurationUtil } from 'src/domain/ag_configuration_utils/entities/configuration_util.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationUtilRepository } from 'src/infrastructure/ag_configuration_utils/repository/configuration_utils.repository';
import { 
  CreateConfigurationUtilUseCase,
  UpdateConfigurationUtilUseCase,
  ListConfigurationUtilUseCase,
  FindByConfigurationUtilUseCase,
  FindAllDataConfigurationUtilUseCase,
  DeleteConfigurationUtilUseCase
} from 'src/application/ag_configuration_utils/use-cases/index.use-case'
import { IConfigurationUtilToken } from 'src/application/ag_configuration_utils/tokens/configuration_utils.tockens';
import { AuthModule } from './auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationUtil]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ConfigurationUtilController],
  providers: [ConfigurationUtilService, ConfigurationUtilRepository,
    {
      provide : IConfigurationUtilToken,
      useClass : ConfigurationUtilRepository
    },
  CreateConfigurationUtilUseCase,
  UpdateConfigurationUtilUseCase,
  ListConfigurationUtilUseCase,
  FindByConfigurationUtilUseCase,
  FindAllDataConfigurationUtilUseCase,
  DeleteConfigurationUtilUseCase
  ],
  exports : [ConfigurationUtilService]
})
export class ConfigurationUtilsModule {}
