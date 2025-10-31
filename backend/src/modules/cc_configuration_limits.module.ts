/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LimitsService } from '../infrastructure/cc_configuration_limit/services/limits.service';
import { LimitsController } from '../presentation/controllers/v1/cc_configuration_limit/limits.controller';
import { ConfigurationLimit, ConfigurationParameter, ConfigurationStandard } from 'src/domain/shared/index.entity';
import { ILimitRepositoryToken } from 'src/application/cc_configuration_limit/tokens/limit-repository.tokens';
import { ConfigurationLimitRepository } from 'src/infrastructure/cc_configuration_limit/repositories/limit.repository';
import {
  CreateLimitUseCase,
  DeleteLimitUseCase,
  FindByIdLimitUseCase,
  ListLimitUseCase,
  UpdateLimitUseCase,
  ToListLimitUseCase,
} from 'src/application/cc_configuration_limit/use-cases/index.use-case';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfigurationLimit, ConfigurationParameter, ConfigurationStandard]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [LimitsController],
  providers: [
    LimitsService,
    {
      provide: ILimitRepositoryToken,
      useClass: ConfigurationLimitRepository,
    },
    CreateLimitUseCase,
    DeleteLimitUseCase,
    UpdateLimitUseCase,
    ListLimitUseCase,
    FindByIdLimitUseCase,
    ToListLimitUseCase,
  ],
  exports: [LimitsService],
})
export class LimitsModule { }
