/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { RecurringService } from 'src/infrastructure/ag_recurring/service/recurring.service';
import { RecurringController } from 'src/presentation/controllers/v1/ag_recurring/recurring.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recurring } from 'src/domain/ag_recurring/entities/recurring.entity';
import { IRecurringToken } from 'src/application/ag_recurring/tokens/recurring.tokens';
import { RecurringRepository } from 'src/infrastructure/ag_recurring/repository/recurring.repository';
import { 
  CreateRecurringUseCase,
  UpdateRecurringUseCase,
  ListRecurringUseCase,
  FindByRecurringUseCase,
  FindAllDataRecurringUseCase,
  DeleteRecurringUseCase
} from 'src/application/ag_recurring/use-cases/index.use-case'
import { AuthModule } from './auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Recurring]),
    forwardRef(() => AuthModule),
  ],
  controllers: [RecurringController],
  providers: [RecurringService, RecurringRepository,
    {
      provide : IRecurringToken,
      useClass : RecurringRepository
  },
  CreateRecurringUseCase,
  UpdateRecurringUseCase,
  ListRecurringUseCase,
  FindByRecurringUseCase,
  FindAllDataRecurringUseCase,
  DeleteRecurringUseCase
],
  exports : [RecurringService]
})
export class RecurringModule {}
