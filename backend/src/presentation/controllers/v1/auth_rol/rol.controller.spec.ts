/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RolController } from './rol.controller';
import {
  CreateRolUseCase,
  DeleteMultiplyRolUseCase,
  DeleteRolUseCase,
  FindAllRolUseCase,
  ListRolUseCase,
  UpdateRolUseCase,
  FindByIdRolUseCase
} from 'src/application/auth_rol/use-case/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';


describe('RolController', () => {
  let controller: RolController;
  let createRolUseCase: CreateRolUseCase;
  let listRolUseCase: ListRolUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolController],
      providers: [
        {
          provide: CreateRolUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteMultiplyRolUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteRolUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindAllRolUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ListRolUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateRolUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindByIdRolUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: JwtStrategy,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn(),
            sign: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: IAuthRepositoryToken,
          useValue: {
            // mock methods if needed
            findUserRoles: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn(),
          },
        },
        {
          provide: RolesGuard,
          useClass: RolesGuard,
        },

      ],
    }).compile();

    controller = module.get<RolController>(RolController);
    createRolUseCase = module.get<CreateRolUseCase>(CreateRolUseCase);
    listRolUseCase = module.get<ListRolUseCase>(ListRolUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call CreateRolUseCase and return created rol', async () => {
      const dto = {
        name: 'ADMIN',
        permisos: [{ id_permission: 1 }],
      };
      const req = { user: { userId: 1 } };
      const result = { status: true, message: 'Rol creado correctamente' };
      jest.spyOn(createRolUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createRolUseCase.execute).toHaveBeenCalledWith(dto, 1);
      expect(response).toEqual(result);
    });
  });

  describe('listRol', () => {
    it('should call ListRolUseCase and return roles', async () => {
      const result = {
        status: true,
        message: '',
        data: [{ id: 1, name: 'ADMIN', permisos: ['READ_USER'] }],
      };
      jest.spyOn(listRolUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.listRol();
      expect(listRolUseCase.execute).toHaveBeenCalledWith();
      expect(response).toEqual(result);
    });
  });
});