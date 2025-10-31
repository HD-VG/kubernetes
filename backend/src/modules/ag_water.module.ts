/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { WaterService } from 'src/infrastructure/ag_water/services/water.service';
import { WaterController } from 'src/presentation/controllers/v1/ag_water/water.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Water } from 'src/domain/ag_water/entities/water.entity';
import { IWaterToken } from 'src/application/ag_water/tokens/worker.tocken';
import { WaterRepository } from 'src/infrastructure/ag_water/repository/water.repository';
import { 
  CreateWaterUseCase,
  UpdateWaterUseCase,
  ListWaterUseCase,
  FindByWaterUseCase,
  FindAllDataWaterUseCase,
  DeleteWaterUseCase
} from 'src/application/ag_water/use-cases/index.use-case'
import { AuthModule } from './auth.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Water]),
    forwardRef(() => AuthModule),
  ],
  controllers: [WaterController],
  providers: [WaterService, WaterRepository,
    {
      provide : IWaterToken,
      useClass : WaterRepository
  },
  CreateWaterUseCase,
  UpdateWaterUseCase,
  ListWaterUseCase,
  FindByWaterUseCase,
  FindAllDataWaterUseCase,
  DeleteWaterUseCase
],
  exports : [WaterService]
})
export class WaterModule {}
