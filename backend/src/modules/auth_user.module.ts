/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from 'src/infrastructure/auth_user/services/user.service';
import { UsesrController } from 'src/presentation/controllers/v1/auth_user/user.controller';
import { UserRepository } from 'src/infrastructure/auth_user/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/auth_user/entities/user.entity';
import { AsignationUserRol } from 'src/domain/auth_asignation_user_rol/entities/asignacion_user_rol.entity'
import { Rol } from 'src/domain/auth_rol/entities/rol.entity'
import { AuthModule } from 'src/modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { IUserRepositoryToken } from 'src/application/auth_user/tokens/user-repository.tokens';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  ListUserUseCase,
  DeleteMassiveUserUseCase,
  ListPaginationUserUseCase,
  FindOneByIdnUserUseCase,
  FindUserUseCase,
  DeleteUserUseCase,
  FindInformationUserUseCase
} from 'src/application/auth_user/use-cases/index-user.use-case'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, AsignationUserRol, Rol]),
    ConfigModule.forRoot(),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsesrController],
  providers: [
    UserService, {
      provide: IUserRepositoryToken,
      useClass: UserRepository
    },
    CreateUserUseCase,
    UpdateUserUseCase,
    ListUserUseCase,
    DeleteMassiveUserUseCase,
    ListPaginationUserUseCase,
    FindOneByIdnUserUseCase,
    FindUserUseCase,
    DeleteUserUseCase,
    FindInformationUserUseCase
  ],
  exports: [UserService]
})
export class UserModule { }
