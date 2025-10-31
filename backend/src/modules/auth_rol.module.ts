/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { RolService } from '../infrastructure/auth_rol/services/rol.service';
import { RolController } from '../presentation/controllers/v1/auth_rol/rol.controller';
import { RolRepository } from '../infrastructure/auth_rol/repositories/rol.repository';
import { Rol } from '../domain/auth_rol/entities/rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/domain/auth_permission/entities/permission.entity';
import { AsignationRolPermission } from 'src/domain/auth_asignation_rol_permision/entities/asignation_rol_permission.entity';
import {
  CreateRolUseCase,
  DeleteMultiplyRolUseCase,
  DeleteRolUseCase,
  FindAllRolUseCase,
  ListRolUseCase,
  UpdateRolUseCase,
  FindByIdRolUseCase
} from 'src/application/auth_rol/use-case/index.use-case';
import { IRolRepositoryToken } from 'src/application/auth_rol/tokens/rol-repository.tokens';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rol, Permission, AsignationRolPermission]),
    forwardRef(() => AuthModule),
  ],
  controllers: [RolController],
  providers: [
    RolService,
    {
      provide: IRolRepositoryToken,
      useClass: RolRepository,
    },
    CreateRolUseCase,
    DeleteMultiplyRolUseCase,
    DeleteRolUseCase,
    FindAllRolUseCase,
    ListRolUseCase,
    UpdateRolUseCase,
    FindByIdRolUseCase,
  ],
  exports: [RolService]
})
export class RolModule { }
