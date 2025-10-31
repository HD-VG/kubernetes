/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TypeWaterController } from './type_water.controller';
import {
    CreateConfigurationTypeWaterUseCase,
    DeleteConfigurationTypeWaterUseCase,
    FindByIdtConfigurationTypeWaterUseCase,
    ListConfigurationTypeWaterUseCase,
    UpdateConfigurationTypeWaterUseCase,
} from 'src/application/cc_configuration_type_water/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('TypeWaterController', () => {
    let controller: TypeWaterController;
    let createConfigurationTypeWaterUseCase: CreateConfigurationTypeWaterUseCase;
    let listConfigurationTypeWaterUseCase: ListConfigurationTypeWaterUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TypeWaterController],
            providers: [
                {
                    provide: CreateConfigurationTypeWaterUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: DeleteConfigurationTypeWaterUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindByIdtConfigurationTypeWaterUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListConfigurationTypeWaterUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: UpdateConfigurationTypeWaterUseCase,
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

        controller = module.get<TypeWaterController>(TypeWaterController);
        createConfigurationTypeWaterUseCase = module.get<CreateConfigurationTypeWaterUseCase>(CreateConfigurationTypeWaterUseCase);
        listConfigurationTypeWaterUseCase = module.get<ListConfigurationTypeWaterUseCase>(ListConfigurationTypeWaterUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createConfigurationTypeWaterUseCase and return result', async () => {
            const dto = {
                name: 'Test Agua Cruda',
                definition: 'AGUA_CRUDA',
                abbreviation: 'AC'
            };
            const req = { user: { userId: 1 } };
            const result = { status: true, message: 'Registro creado' };
            jest.spyOn(createConfigurationTypeWaterUseCase, 'execute').mockResolvedValue(result);
            const response = await controller.create(dto, req);
            expect(createConfigurationTypeWaterUseCase.execute).toHaveBeenCalledWith(dto, 1);
            expect(response).toEqual(result);
        });
    });

    describe('findAll', () => {
        it('should call listConfigurationTypeWaterUseCase and return result', async () => {
            const result = {
                status: true,
                message: 'Registros encontrados',
                data: [{
                    id: 1,
                    name: 'Test Agua Cruda',
                    definition: 'AGUA_CRUDA',
                    abbreviation: 'AC'
                }],
                all: 1,
            };
            jest.spyOn(listConfigurationTypeWaterUseCase, 'execute').mockResolvedValue(result);
            const response = await controller.findAll();
            expect(listConfigurationTypeWaterUseCase.execute).toHaveBeenCalledWith();
            expect(response).toEqual(result);
        });
    });
});