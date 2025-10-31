/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigurationTypeDagmeService } from 'src/infrastructure/ag_configuration_type_dagme/service/configuration_type_dagme.service';
import { ConfigurationTypeDagmeController } from 'src/presentation/controllers/v1/ag_configuration_type_dagme/configuration_type_dagme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationTypeDagme } from 'src/domain/ag_configuration_type_dagme/entities/configuration_type_dagme.entity';
import { IConfigurationTypeDagmeToken } from 'src/application/ag_configuration_type_dagme/tokens/configuration_type_dagme.tokens';
import { ConfigurationTypeDagmeRepository } from 'src/infrastructure/ag_configuration_type_dagme/repository/configuration_type_dagme.repository';
import { 
  CreateConfigurationTypeDagmeUseCase,
  UpdateConfigurationTypeDagmeUseCase,
  ListConfigurationTypeDagmeUseCase,
  FindByConfigurationTypeDagmeUseCase,
  FindAllDataConfigurationTypeDagmeUseCase,
  DeleteConfigurationTypeDagmeUseCase
} from 'src/application/ag_configuration_type_dagme/use-cases/index.use-case'
import { AuthModule } from './auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationTypeDagme]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ConfigurationTypeDagmeController],
  providers: [ConfigurationTypeDagmeService, ConfigurationTypeDagmeRepository,
    {
      provide : IConfigurationTypeDagmeToken,
      useClass : ConfigurationTypeDagmeRepository
  },
  CreateConfigurationTypeDagmeUseCase,
  UpdateConfigurationTypeDagmeUseCase,
  ListConfigurationTypeDagmeUseCase,
  FindByConfigurationTypeDagmeUseCase,
  FindAllDataConfigurationTypeDagmeUseCase,
  DeleteConfigurationTypeDagmeUseCase
],
  exports : [ConfigurationTypeDagmeService]
})
export class ConfigurationTypeDagmeModule {}
