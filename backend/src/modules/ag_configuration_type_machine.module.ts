/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigurationTypeMachineService } from 'src/infrastructure/ag_configuration_type_machine/service/configuration_type_machine.service';
import { ConfigurationTypeMachineController } from 'src/presentation/controllers/v1/ag_configuration_type_machine/configuration_type_machine.controller';
import { ConfigurationTypeMachineRepository } from 'src/infrastructure/ag_configuration_type_machine/repository/configuration_type_machine.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationTypeMachine } from 'src/domain/ag_configuration_type_machine/entities/configuration_type_machine.entity'
import { IConfigurationTypeMachineToken } from 'src/application/ag_configuration_type_machine/tokens/configuration_type_machine.tokens';
import { 
  CreateConfigurationTypeMachineUseCase,
  UpdateConfigurationTypeMachineUseCase,
  ListConfigurationTypeMachineUseCase,
  FindByConfigurationTypeMachineUseCase,
  FindAllDataConfigurationTypeMachineUseCase,
  DeleteConfigurationTypeMachineUseCase
} from 'src/application/ag_configuration_type_machine/use-cases/index.use-case'
import { AuthModule } from './auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationTypeMachine]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ConfigurationTypeMachineController],
  providers: [ConfigurationTypeMachineService, ConfigurationTypeMachineRepository,
    {
      provide : IConfigurationTypeMachineToken,
      useClass : ConfigurationTypeMachineRepository
  },
  CreateConfigurationTypeMachineUseCase,
  UpdateConfigurationTypeMachineUseCase,
  ListConfigurationTypeMachineUseCase,
  FindByConfigurationTypeMachineUseCase,
  FindAllDataConfigurationTypeMachineUseCase,
  DeleteConfigurationTypeMachineUseCase

  ],
  exports : [ConfigurationTypeMachineService]
})
export class ConfigurationTypeMachineModule {}
