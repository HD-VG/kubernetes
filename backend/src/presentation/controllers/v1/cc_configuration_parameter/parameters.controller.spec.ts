/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ParametersController } from './parameters.controller';
import {
    UpdateParameterUseCase,
    CreateParameterUseCase,
    DeleteParameterUseCase,
    FindByIdParameterUseCase,
    ListParameterUseCase,
} from 'src/application/cc_configuration_parameter/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('ParametersController', () => {
    let controller: ParametersController;
    let createConfigurationParameterUseCase: CreateParameterUseCase;
    let listConfigurationParameterUseCase: ListParameterUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ParametersController],
            providers: [
                {
                    provide: CreateParameterUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: DeleteParameterUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: UpdateParameterUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListParameterUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindByIdParameterUseCase,
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

        controller = module.get<ParametersController>(ParametersController);
        createConfigurationParameterUseCase = module.get<CreateParameterUseCase>(CreateParameterUseCase);
        listConfigurationParameterUseCase = module.get<ListParameterUseCase>(ListParameterUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createConfigurationParameterUseCase and return result', async () => {
            const dto = {
                name: 'Test Parameter',
                unit: 'Kg',
                testMethod: 'TEST',
                testCode: 'TEST'
            };
            const req = { user: { userId: 1 } };
            const result = { status: true, message: 'Registro creado' };
            jest.spyOn(createConfigurationParameterUseCase, 'execute').mockResolvedValue(result);
            const response = await controller.create(dto, req);
            expect(createConfigurationParameterUseCase.execute).toHaveBeenCalledWith(dto, 1);
            expect(response).toEqual(result);
        });
    });

    describe('findAll', () => {
        it('should call listConfigurationParameterUseCase and return result', async () => {
            const result = {
                status: true,
                message: 'Registros encontrados',
                data: [{
                    id: 1,
                    name: 'Test Parameter',
                    unit: 'Kg',
                    testMethod: 'TEST',
                    testCode: 'TEST'
                }],
                all: 1,
            };
            jest.spyOn(listConfigurationParameterUseCase, 'execute').mockResolvedValue(result);
            const response = await controller.findAll();
            expect(listConfigurationParameterUseCase.execute).toHaveBeenCalledWith();
            expect(response).toEqual(result);
        });
    });
});