/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { RegisterPictureService } from 'src/infrastructure/ag_register_picture/service/register_picture.service';
import { RegisterPictureController } from 'src/presentation/controllers/v1/ag_register_picture/register_picture.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Register,
  RegisterPicture
} from 'src/domain/shared/index.entity'
import { RegisterPictureRepository } from 'src/infrastructure/ag_register_picture/repository/register_picture.repository'
import { CreateRegisterPictureUseCase,
  ListRegisterPictureByRegisterUseCase,
  DeleteRegisterPictureUseCase
} from 'src/application/ag_register_picture/use-cases/index.use-case';
import { IRegisterPictureToken } from 'src/application/ag_register_picture/tokens/register_picture.tokens';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([
      RegisterPicture,
      Register,
    ]),
    forwardRef(() => AuthModule),
  ],
  controllers: [RegisterPictureController],
  providers: [
    RegisterPictureService,
    RegisterPictureRepository,
    {
      provide : IRegisterPictureToken,
      useClass : RegisterPictureRepository,
    },
    CreateRegisterPictureUseCase,
    ListRegisterPictureByRegisterUseCase,
    DeleteRegisterPictureUseCase,
  ],
  exports: [RegisterPictureService],
})
export class RegisterPictureModule {}
