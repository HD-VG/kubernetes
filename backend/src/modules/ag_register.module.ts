/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { RegisterController } from 'src/presentation/controllers/v1/ag_register/register.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Register } from 'src/domain/ag_register/entities/register.entity';
import { IRegisterRepositoryToken } from 'src/application/ag_register/tokens/register-repository.tokens';
import { CreateRegisterUseCase,
    DeleteRegisterUseCase, 
    FindByIdRegisterUseCase, 
    ListRegisterUseCase, 
    UpdateRegisterUseCase,
    ChangeStateRegisterUseCase,
    GenerateReportByMonthAndYearRegisterUseCase,
    GetSnapshotRegisterUseCase,
    PrintResumenRegisterUseCase,
    SumAmountByRegisterIdRegisterUseCase,
    SumAmountsByMonthRegisterUseCase,
    PrintRegisterUseCase
    } from 'src/application/ag_register/use-cases/index.use-case';
import { RegisterRepository } from 'src/infrastructure/ag_register/repositories/register.repository';
import { RegisterService } from 'src/infrastructure/ag_register/services/register.service';
import { ConfigurationTypeMachine, ConfigurationTypeDagme, ConfigurationTypeWork, ConfigurationUtil,Reporter,Reported, 
  ConfigurationCars,
  Recurring,
  Water,
  AsignationUserRol,
  ConfigurationTypeMaterial
} from 'src/domain/shared/index.entity';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Register,
      ConfigurationTypeMachine,
      ConfigurationTypeDagme, 
      ConfigurationTypeWork, 
      ConfigurationUtil,
      Reporter,
      Reported,
      ConfigurationCars,
      Recurring,
      Water,
      AsignationUserRol,
      ConfigurationTypeMaterial ,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [RegisterController],
  providers: [
    RegisterService,
    RegisterRepository,
    {
      provide: IRegisterRepositoryToken,
      useClass: RegisterRepository,
    },
    CreateRegisterUseCase,
    DeleteRegisterUseCase,
    UpdateRegisterUseCase,
    ListRegisterUseCase,
    FindByIdRegisterUseCase,
    ChangeStateRegisterUseCase,
    GenerateReportByMonthAndYearRegisterUseCase,
    GetSnapshotRegisterUseCase,
    PrintResumenRegisterUseCase,
    SumAmountByRegisterIdRegisterUseCase,
    SumAmountsByMonthRegisterUseCase,
    PrintRegisterUseCase
  ],
  exports: [RegisterService],
})
export class RegisterModule {}
