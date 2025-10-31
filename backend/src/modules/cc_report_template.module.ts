/* eslint-disable prettier/prettier */
import { ReportTemplateRepository } from 'src/infrastructure/cc_report_template/repository/report-template.repository';
import { forwardRef, Module } from '@nestjs/common';
import { ReportTemplateService } from '../infrastructure/cc_report_template/services/report_template.service';
import { ReportTemplateController } from '../presentation/controllers/v1/cc_report_template/report_template.controller';
import {
  CreateReportTemplateUseCase,
  DeleteReportTemplateUseCase,
  FindReportTemplateUseCase,
  ListReportTemplateUseCase,
  UpdateTransportUseCase,
} from 'src/application/cc_report_template/use-case/index-use-case';
import { IReportTemplateRepositoryToken } from 'src/application/cc_report_template/tokens/report-template-repository.token';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportTemplate } from 'src/domain/shared/index.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReportTemplate]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [ReportTemplateController],
  providers: [
    ReportTemplateService,
    {
      provide: IReportTemplateRepositoryToken,
      useClass: ReportTemplateRepository,
    },
    CreateReportTemplateUseCase,
    DeleteReportTemplateUseCase,
    FindReportTemplateUseCase,
    ListReportTemplateUseCase,
    UpdateTransportUseCase,
  ],
  exports: [ReportTemplateService],
})
export class ReportTemplateModule { }
