/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationVersionController } from './admin_configuration.controller';
import {
    CreateConfigurationVersionUseCase,
    DeleteConfigurationVersionUseCase,
    FindByIdConfigurationVersionUseCase,
    ListConfigurationVersionUseCase,
    UpdateConfigurationVersionUseCase,
    ModifyStatusConfigurationVersionUseCase
} from 'src/application/cc_configuration_version/use-cases/index-configuration-version.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('ConfigurationVersionController', () => {
    let controller: ConfigurationVersionController;
    let createConfigurationParameterUseCase: CreateConfigurationVersionUseCase;
    let listConfigurationParameterUseCase: ListConfigurationVersionUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ConfigurationVersionController],
            providers: [
                {
                    provide: CreateConfigurationVersionUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: DeleteConfigurationVersionUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindByIdConfigurationVersionUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListConfigurationVersionUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: UpdateConfigurationVersionUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ModifyStatusConfigurationVersionUseCase,
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

        controller = module.get<ConfigurationVersionController>(ConfigurationVersionController);
        createConfigurationParameterUseCase = module.get<CreateConfigurationVersionUseCase>(CreateConfigurationVersionUseCase);
        listConfigurationParameterUseCase = module.get<ListConfigurationVersionUseCase>(ListConfigurationVersionUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createConfigurationParameterUseCase and return result', async () => {
            const dto = {
                codeConfiguration: 'Test Version',
                versionConfiguration: '10/2025',
                messageConfiguration: 'TEST'
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
                    codeConfiguration: 'Test Version',
                    versionConfiguration: '10/2025',
                    messageConfiguration: 'TEST'
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