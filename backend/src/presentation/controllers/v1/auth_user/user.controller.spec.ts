/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsesrController } from './user.controller';
import {
  CreateUserUseCase,
  UpdateUserUseCase,
  ListUserUseCase,
  DeleteMassiveUserUseCase,
  ListPaginationUserUseCase,
  FindOneByIdnUserUseCase,
  FindUserUseCase,
  DeleteUserUseCase,
  FindInformationUserUseCase,
} from 'src/application/auth_user/use-cases/index-user.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('UsesrController', () => {
  let controller: UsesrController;
  let createUserUseCase: CreateUserUseCase;
  let listPaginationUserUseCase: ListPaginationUserUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsesrController],
      providers: [
        { provide: CreateUserUseCase, useValue: { execute: jest.fn() } },
        { provide: UpdateUserUseCase, useValue: { execute: jest.fn() } },
        { provide: ListUserUseCase, useValue: { execute: jest.fn() } },
        { provide: ListPaginationUserUseCase, useValue: { execute: jest.fn() } },
        { provide: DeleteMassiveUserUseCase, useValue: { execute: jest.fn() } },
        { provide: DeleteUserUseCase, useValue: { execute: jest.fn() } },
        { provide: FindOneByIdnUserUseCase, useValue: { execute: jest.fn() } },
        { provide: FindUserUseCase, useValue: { execute: jest.fn() } },
        { provide: FindInformationUserUseCase, useValue: { execute: jest.fn() } },
        { provide: JwtStrategy, useValue: {} },
        { provide: JwtService, useValue: { verify: jest.fn(), sign: jest.fn() } },

        { provide: Reflector, useValue: { get: jest.fn() } },
        { provide: IAuthRepositoryToken, useValue: { findUserRoles: jest.fn() } },
        { provide: AuthService, useValue: { validateUser: jest.fn() } },
        { provide: RolesGuard, useClass: RolesGuard },
      ],
    }).compile();

    controller = module.get<UsesrController>(UsesrController);
    createUserUseCase = module.get<CreateUserUseCase>(CreateUserUseCase);
    listPaginationUserUseCase = module.get<ListPaginationUserUseCase>(ListPaginationUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call CreateUserUseCase and return created user', async () => {
      const dto = {
        email: 'test@example.com',
        password: 'securePass123',
        name: 'Test User',
        username: 'testuser',
        roles: [{ id_rol: 1 }],
      };
      const req = { user: { userId: 1 } };
      const result = { status: true, message: 'User created', data: { id: 1 } };

      jest.spyOn(createUserUseCase, 'execute').mockResolvedValue(result);

      const response = await controller.create(dto, req);

      expect(createUserUseCase.execute).toHaveBeenCalledWith(dto, 1);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call ListPaginationUserUseCase and return paginated users', async () => {
      const paginationDto = { limit: 10, offset: 0, parameter: '' };
      const result = {
        status: true,
        message: 'Registros encontrados',
        data: [{ id: 1, name: 'Test User', rol: ['ADMIN'] }],
      };

      jest.spyOn(listPaginationUserUseCase, 'execute').mockResolvedValue(result);

      const response = await controller.findAll(paginationDto);

      expect(listPaginationUserUseCase.execute).toHaveBeenCalledWith(paginationDto);
      expect(response).toEqual(result);
    });
  });
});