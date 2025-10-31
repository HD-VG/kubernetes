/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationCalculationsController } from './configuration_calculations.controller';
import {
  CreateConfigurationCalculationUseCase,
  DeleteConfigurationCalculationUseCase,
  FindByIdConfigurationCalculationUseCase,
  ListConfigurationCalculationUseCase,
  ModifyStatusConfigurationCalculationUseCase,
  UpdateConfigurationCalculationUseCase,
  ModifyStatusAppsConfigurationCalculationUseCase
} from 'src/application/cc_configuration_calculation/use-case/index-configuration-calculation.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('ConfigurationCalculationsController', () => {
  let controller: ConfigurationCalculationsController;
  let createConfigurationCalculationUseCase: CreateConfigurationCalculationUseCase;
  let listConfigurationCalculationUseCase: ListConfigurationCalculationUseCase;

  beforeEach(async () => {

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationCalculationsController],
      providers: [
        {
          provide: CreateConfigurationCalculationUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteConfigurationCalculationUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindByIdConfigurationCalculationUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ListConfigurationCalculationUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ModifyStatusConfigurationCalculationUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateConfigurationCalculationUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ModifyStatusAppsConfigurationCalculationUseCase,
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
        { provide: Reflector, useValue: { get: jest.fn() } },
        { provide: IAuthRepositoryToken, useValue: { findUserRoles: jest.fn() } },
        { provide: AuthService, useValue: { validateUser: jest.fn() } },
        { provide: RolesGuard, useClass: RolesGuard },
      ],
    }).compile();

    controller = module.get<ConfigurationCalculationsController>(
      ConfigurationCalculationsController,
    );
    createConfigurationCalculationUseCase = module.get<CreateConfigurationCalculationUseCase>(CreateConfigurationCalculationUseCase);
    listConfigurationCalculationUseCase = module.get<ListConfigurationCalculationUseCase>(ListConfigurationCalculationUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call createConfigurationCalculationUseCase and return result', async () => {
      const dto = {
        formula: 'x+100/10',
        instrumentUsed: 'TEST MACHINE',
        approvedByApps: true,
        statusConfiguration: true,
      };
      const req = { user: { userId: 1 } };
      const result = { status: true, message: 'Registro creado' };
      jest.spyOn(createConfigurationCalculationUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createConfigurationCalculationUseCase.execute).toHaveBeenCalledWith(dto, 1);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call listConfigurationCalculationUseCase and return result', async () => {
      const result = {
        status: true,
        message: 'Registros encontrados',
        data: [{ id: 1, formula: 'John Doe', instrumentUsed: 'Instrument', approvedByApps: true, statusConfiguration: true }],
        all: 1,
      };
      jest.spyOn(listConfigurationCalculationUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAll();
      expect(listConfigurationCalculationUseCase.execute).toHaveBeenCalledWith();
      expect(response).toEqual(result);
    });
  });
});
