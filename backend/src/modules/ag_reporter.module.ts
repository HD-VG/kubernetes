
import { forwardRef, Module } from '@nestjs/common';
import { ReporterController } from '../presentation/controllers/v1/ag_reporter/reporter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reporter } from 'src/domain/ag_reporter/entities/reporter.entity'
import { IReporterRepositoryToken } from 'src/application/ag_reporter/tokens/reporter-repository.tokens';
import { ReporterRepository } from 'src/infrastructure/ag_reporter/repositories/reporter.repository';
import { CreateReporterUseCase } from 'src/application/ag_reporter/use-cases/create-reporter.use-case';
import { DeleteReporterUseCase } from 'src/application/ag_reporter/use-cases/delete-reporter.use-case';
import { UpdateReporterUseCase } from 'src/application/ag_reporter/use-cases/update-reporter.use-case';
import { ListReporterUseCase } from 'src/application/ag_reporter/use-cases/list-reporter.use-case';
import { FindByIdReporterUseCase } from 'src/application/ag_reporter/use-cases/find-by-id-reporter.use.case';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reporter]),
    forwardRef(() => AuthModule),
  ],
  controllers: [ReporterController],
  providers: [ReporterRepository,
    {
      provide: IReporterRepositoryToken,
      useClass: ReporterRepository,
    },
    CreateReporterUseCase,
    DeleteReporterUseCase,
    UpdateReporterUseCase,
    ListReporterUseCase,
    FindByIdReporterUseCase,
  ],
})
export class ReporterModule {}
