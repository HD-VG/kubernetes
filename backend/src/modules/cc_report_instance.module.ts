/* eslint-disable prettier/prettier */
import { IReportInstanceRepositoryToken } from './../application/cc_report_instance/tokens/report-instance-repository.token';
import { forwardRef, Module } from '@nestjs/common';
import { ReportInstanceService } from 'src/infrastructure/cc_report_instance/services/report_instance.service';
import { ReportInstanceController } from '../presentation/controllers/v1/cc_report_instance/report_instance.controller';
import {
  CreateReportInstanceUseCase,
  DeleteReportInstanceUseCase,
  FindReportInstanceUseCase,
  ListReportInstanceUseCase,
} from 'src/application/cc_report_instance/use-case/index.use-case';
import { ReportInstanceRepository } from 'src/infrastructure/cc_report_instance/repository/reposrt_instance.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChainOfCustody, ConfigurationVersion, ReportInstance } from 'src/domain/shared/index.entity';
import { ChainOfCustodyModule } from './cc_chain_of_custody.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportInstance, ChainOfCustody, ConfigurationVersion]),
    forwardRef(() => ChainOfCustodyModule),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [ReportInstanceController],
  providers: [
    ReportInstanceService,
    {
      provide: IReportInstanceRepositoryToken,
      useClass: ReportInstanceRepository,
    },
    CreateReportInstanceUseCase,
    DeleteReportInstanceUseCase,
    FindReportInstanceUseCase,
    ListReportInstanceUseCase,
  ],
  exports: [ReportInstanceService],
})
export class ReportInstanceModule {}
