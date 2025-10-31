/* eslint-disable prettier/prettier */
import { forwardRef, Module } from '@nestjs/common';
import { PermissionsService } from '../infrastructure/auth_permission/services/permissions.service';
import { PermissionsController } from '../presentation/controllers/v1/auth_permission/permissions.controller';
import { Permission } from '../domain/auth_permission/entities/permission.entity';
import { PermissionRepository } from '../infrastructure/auth_permission/repositories/permissions.repository';
import { IPermissionRepositoryToken } from 'src/application/auth_permission/tokens/permission-repository.tokens';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  CreatePermissionUseCase,
  DeletePermissionUseCase,
  FindOnePermissionUseCase,
  ListPaginationPermissionUseCase,
  ListPermissionUseCase,
  UpdatePermissionUseCase
} from 'src/application/auth_permission/use-case/index.use-case';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    forwardRef(() => AuthModule),
  ],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    {
      provide: IPermissionRepositoryToken,
      useClass: PermissionRepository
    },
    CreatePermissionUseCase,
    DeletePermissionUseCase,
    FindOnePermissionUseCase,
    ListPaginationPermissionUseCase,
    ListPermissionUseCase,
    UpdatePermissionUseCase
  ],
  // exports: [PermissionsService]
})
export class PermissionsModule { }
