/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationUexpController } from './configuration_uexp.controller';
import {
  CreateConfigurationUexpUseCase,
  DeleteConfigurationUexpUseCase,
  FindByIdtConfigurationUexpUseCase,
  ListConfigurationUexpUseCase,
  UpdateConfigurationUexpUseCase,
} from 'src/application/cc_configuration_uexp/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('ConfigurationUexpController', () => {
  let controller: ConfigurationUexpController;
  let createConfigurationUexpUseCase: CreateConfigurationUexpUseCase;
  let listConfigurationUexpUseCase: ListConfigurationUexpUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationUexpController],
      providers: [
        {
          provide: CreateConfigurationUexpUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteConfigurationUexpUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindByIdtConfigurationUexpUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ListConfigurationUexpUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateConfigurationUexpUseCase,
          useValue: { execute: jest.fn() },
        },
        { provide: JwtStrategy, useValue: {} },
        {
          provide: JwtService,
          useValue: { verify: jest.fn(), sign: jest.fn() },
        },
        { provide: Reflector, useValue: { get: jest.fn() } },
        {
          provide: IAuthRepositoryToken,
          useValue: { findUserRoles: jest.fn() },
        },
        { provide: AuthService, useValue: { validateUser: jest.fn() } },
        { provide: RolesGuard, useClass: RolesGuard },
      ],
    }).compile();

    controller = module.get<ConfigurationUexpController>(
      ConfigurationUexpController,
    );
    createConfigurationUexpUseCase = module.get<CreateConfigurationUexpUseCase>(
      CreateConfigurationUexpUseCase,
    );
    listConfigurationUexpUseCase = module.get<ListConfigurationUexpUseCase>(
      ListConfigurationUexpUseCase,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call createConfigurationUexpUseCase and return result', async () => {
      const dto = {
        minValue: 1,
        maxValue: 5,
        ld: 3.5,
        formula: 'x-0.1542',
        ctwId: 1,
      };
      const req = { user: { userId: 1 } };
      const result = { status: true, message: 'Registro creado' };

      jest
        .spyOn(createConfigurationUexpUseCase, 'execute')
        .mockResolvedValue(result);

      const response = await controller.create(dto, req);

      expect(createConfigurationUexpUseCase.execute).toHaveBeenCalledWith(
        dto,
        1,
      );
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call listConfigurationUexpUseCase and return result', async () => {
      const result = {
        status: true,
        message: 'Registros encontrados',
        data: [{ id: 1, formula: 'x-0.1542' }],
        all: 1,
      };

      jest
        .spyOn(listConfigurationUexpUseCase, 'execute')
        .mockResolvedValue(result);

      const response = await controller.findAll();

      expect(listConfigurationUexpUseCase.execute).toHaveBeenCalledWith();
      expect(response).toEqual(result);
    });
  });
});
