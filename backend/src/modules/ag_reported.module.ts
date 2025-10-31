import { forwardRef, Module } from '@nestjs/common';
import { ReportedService } from '../infrastructure/ag_reported/services/reported.service';
import { ReportedController } from '../presentation/controllers/v1/ag_reported/reported.controller';
import { IReportedRepositoryToken } from 'src/application/ag_reported/tokens/reported-repository.tokens';
import { ReportedRepository } from 'src/infrastructure/ag_reported/repositories/reported.repository';
import { CreateReportedUseCase } from 'src/application/ag_reported/use-cases/create-reported.use-case';
import { DeleteReportedUseCase } from 'src/application/ag_reported/use-cases/delete-reported.use-case';
import { UpdateReportedUseCase } from 'src/application/ag_reported/use-cases/update-reported.use-case';
import { ListReportedUseCase } from 'src/application/ag_reported/use-cases/list-reported.use-case';
import { FindByIdReportedUseCase } from 'src/application/ag_reported/use-cases/find-by-id-reported.use.case';
import { Reported } from 'src/domain/ag_reported/entities/reported.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IndexReportedUseCase } from 'src/application/ag_reported/use-cases/index-reported.use-case';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reported]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ReportedController],
  providers: [
    ReportedService,
    {
      provide: IReportedRepositoryToken,
      useClass: ReportedRepository,
    },
    CreateReportedUseCase,
    DeleteReportedUseCase,
    UpdateReportedUseCase,
    ListReportedUseCase,
    FindByIdReportedUseCase,
    IndexReportedUseCase,
  ],
})
export class ReportedModule {}
