/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { AuthController } from '../presentation/controllers/auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AsignationUserRol, Rol, User } from 'src/domain/shared/index.entity';
import { AuthRepository } from 'src/infrastructure/auth/repositories/auth.repository';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import {
  CheckTokensUseCase,
  GetUserUseCase,
  LoginUseCase
} from 'src/application/auth/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/index.guard';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    // AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '6h' },
    }),
    TypeOrmModule.forFeature([User, AsignationUserRol, Rol]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    {
      provide: IAuthRepositoryToken,
      useClass: AuthRepository
    },
    CheckTokensUseCase,
    GetUserUseCase,
    LoginUseCase,
    JwtStrategy
  ],
  exports: [
    AuthService,
    {
      provide: IAuthRepositoryToken,
      useClass: AuthRepository,
    },

  ]
})
export class AuthModule { }
