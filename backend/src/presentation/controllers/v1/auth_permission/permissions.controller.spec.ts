/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { PermissionsController } from './permissions.controller';
import {
  CreatePermissionUseCase,
  ListPaginationPermissionUseCase,
  DeletePermissionUseCase,
  UpdatePermissionUseCase,
  FindOnePermissionUseCase,
} from 'src/application/auth_permission/use-case/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('PermissionsController', () => {
  let controller: PermissionsController;
  let createPermissionUseCase: CreatePermissionUseCase;
  let listPermissionUseCase: ListPaginationPermissionUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionsController],
      providers: [
        // Use Cases
        { provide: CreatePermissionUseCase, useValue: { execute: jest.fn() } },
        { provide: ListPaginationPermissionUseCase, useValue: { execute: jest.fn() } },
        { provide: DeletePermissionUseCase, useValue: { execute: jest.fn() } },
        { provide: UpdatePermissionUseCase, useValue: { execute: jest.fn() } },
        { provide: FindOnePermissionUseCase, useValue: { execute: jest.fn() } },

        // JWT
        { provide: JwtStrategy, useValue: {} },
        { provide: JwtService, useValue: { verify: jest.fn(), sign: jest.fn() } },

        // MOCK DEL RolesGuard (clave)
        {
          provide: RolesGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true), // siempre permite
          },
        },

        // Dependencias del RolesGuard
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
            get: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
        {
          provide: IAuthRepositoryToken,
          useValue: {
            findUserRoles: jest.fn().mockResolvedValue(['ADMIN']),
          },
        },
      ],
    }).compile();

    controller = module.get<PermissionsController>(PermissionsController);
    createPermissionUseCase = module.get<CreatePermissionUseCase>(CreatePermissionUseCase);
    listPermissionUseCase = module.get<ListPaginationPermissionUseCase>(ListPaginationPermissionUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call CreatePermissionUseCase with dto and userId, and return result', async () => {
      const dto = { name: 'READ_USER' };
      const result = { status: true, message: 'Permission created successfully' };

      jest.spyOn(createPermissionUseCase, 'execute').mockResolvedValue(result);

      const req = { user: { userId: 1 } };
      const response = await controller.create(dto, req);

      expect(createPermissionUseCase.execute).toHaveBeenCalledWith(dto, 1);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call listPermissionUseCase with pagination and return result', async () => {
      const parameter = { limit: 5, offset: 0 };
      const data = [
        { id: 1, name: 'READ_USER' },
        { id: 2, name: 'WRITE_USER' },
      ];
      const result = { status: true, message: '', data };

      jest.spyOn(listPermissionUseCase, 'execute').mockResolvedValue(result);

      const response = await controller.findAll(parameter);

      expect(listPermissionUseCase.execute).toHaveBeenCalledWith(parameter);
      expect(response).toEqual(result);
    });
  });
});