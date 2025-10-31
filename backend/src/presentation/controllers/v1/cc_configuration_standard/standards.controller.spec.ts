/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { StandardsController } from './standards.controller';
import {
    CreateStandardUseCase,
    DeleteStandardUseCase,
    FindByIdtStandardUseCase,
    ListStandardUseCase,
    UpdateStandardUseCase,
} from 'src/application/cc_configuration_standard/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('StandardsController', () => {
    let controller: StandardsController;
    let createConfigurationStandarUseCase: CreateStandardUseCase;
    let listConfigurationStandarUseCase: ListStandardUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [StandardsController],
            providers: [
                {
                    provide: CreateStandardUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: DeleteStandardUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindByIdtStandardUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListStandardUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: UpdateStandardUseCase,
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

        controller = module.get<StandardsController>(StandardsController);
        createConfigurationStandarUseCase = module.get<CreateStandardUseCase>(CreateStandardUseCase);
        listConfigurationStandarUseCase = module.get<ListStandardUseCase>(ListStandardUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createConfigurationStandarUseCase and return result', async () => {
            const dto = {
                name: 'Test Standar',
                type: 'TEST'
            };
            const req = { user: { userId: 1 } };
            const result = { status: true, message: 'Registro creado' };
            jest.spyOn(createConfigurationStandarUseCase, 'execute').mockResolvedValue(result);
            const response = await controller.create(dto, req);
            expect(createConfigurationStandarUseCase.execute).toHaveBeenCalledWith(dto, 1);
            expect(response).toEqual(result);
        });
    });

    describe('findAll', () => {
        it('should call listConfigurationStandarUseCase and return result', async () => {
            const result = {
                status: true,
                message: 'Registros encontrados',
                data: [{
                    id: 1,
                    name: 'Test Standar',
                    type: 'TEST'
                }],
                all: 1,
            };
            jest.spyOn(listConfigurationStandarUseCase, 'execute').mockResolvedValue(result);
            const response = await controller.findAll();
            expect(listConfigurationStandarUseCase.execute).toHaveBeenCalledWith();
            expect(response).toEqual(result);
        });
    });
});