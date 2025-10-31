/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { ApplicantService } from '../infrastructure/cc_applicant/services/applicant.service';
import { ApplicantController } from '../presentation/controllers/v1/cc_applicant/applicant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Applicant } from '../domain/cc_applicant/entities/applicant.entity';
import { ChainOfCustody } from '../domain/cc_custody/entities/chain_of_custody.entity';
import { ApplicantRepository } from '../infrastructure/cc_applicant/repositories/applicant.repository';
import { IApplicantRepositoryToken } from 'src/application/cc_applicant/tokens/applicant.tokens';
import {
  CreateApplicantUseCase,
  DeleteApplicantUseCase,
  FindByCustodyApplicantUseCase,
  FindByIdApplicantUseCase,
  ListApplicantUseCase,
  UpdateApplicantUseCase
} from 'src/application/cc_applicant/use-cases/index-applicant.use-case';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/modules/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ChainOfCustody, Applicant]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [ApplicantController],
  providers: [ApplicantService,
    {
      provide: IApplicantRepositoryToken,
      useClass: ApplicantRepository
    },
    CreateApplicantUseCase,
    DeleteApplicantUseCase,
    FindByCustodyApplicantUseCase,
    FindByIdApplicantUseCase,
    ListApplicantUseCase,
    UpdateApplicantUseCase
  ],
  exports: [ApplicantService],
})
export class ApplicantModule { }
