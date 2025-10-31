/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigurationTypeMaterialService } from '../infrastructure/ag_configuration_type_material/service/configuration_type_material.service';
import { ConfigurationTypeMaterialController } from '../presentation/controllers/v1/ag_configuration_type_material/configuration_type_material.controller';
import { ConfigurationTypeMaterialRepository } from '../infrastructure/ag_configuration_type_material/repository/configuration_type_material.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationTypeMaterial } from '../domain/ag_configuration_type_material/entities/configuration_type_material.entity'
import { HttpModule } from '@nestjs/axios';
import { Register } from 'src/domain/shared/index.entity';
import { 
  CreateConfigurationTypeMaterialUseCase,
  UpdateConfigurationTypeMaterialUseCase,
  ListConfigurationTypeMaterialUseCase,
  FindByConfigurationTypeMaterialUseCase,
  FindAllDataConfigurationTypeMaterialUseCase,
  DeleteConfigurationTypeMaterialUseCase,
  GetApiMaterialUseCase,
} from 'src/application/ag_configuration_type_material/use-cases/index.use-case'
import { IConfigurationTypeMaterialToken } from 'src/application/ag_configuration_type_material/tokens/configuration_type_material.tokens';
import { AuthModule } from './auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationTypeMaterial,Register]),
    HttpModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [ConfigurationTypeMaterialController],
  providers: [
    ConfigurationTypeMaterialService, 
    ConfigurationTypeMaterialRepository,
        {
      provide : IConfigurationTypeMaterialToken,
      useClass : ConfigurationTypeMaterialRepository
  },
  CreateConfigurationTypeMaterialUseCase,
  UpdateConfigurationTypeMaterialUseCase,
  ListConfigurationTypeMaterialUseCase,
  FindByConfigurationTypeMaterialUseCase,
  FindAllDataConfigurationTypeMaterialUseCase,
  DeleteConfigurationTypeMaterialUseCase,
  GetApiMaterialUseCase,
  ],
  exports : [ConfigurationTypeMaterialService]
})
export class ConfigurationTypeMaterialModule {}
