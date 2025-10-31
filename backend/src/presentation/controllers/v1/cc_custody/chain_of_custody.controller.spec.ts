/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ChainOfCustodyController } from './chain_of_custody.controller';
import {
    CreateCustodyUseCase,
    DeleteCustodyUseCase,
    GetMapsCustodyUseCase,
    ListCustodyUseCase,
    PrintCustodyUseCase,
    PrintPdfCustodyUseCase,
    UpdateCustodyUseCase,
    FindByIdCustodyUseCase
} from 'src/application/cc_custody/use-cases/index-custody.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('ChainOfCustodyController', () => {
    let controller: ChainOfCustodyController;
    let createConfigurationParameterUseCase: CreateCustodyUseCase;
    let listConfigurationParameterUseCase: ListCustodyUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ChainOfCustodyController],
            providers: [
                {
                    provide: CreateCustodyUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: DeleteCustodyUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: GetMapsCustodyUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListCustodyUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: PrintCustodyUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: PrintPdfCustodyUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindByIdCustodyUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: UpdateCustodyUseCase,
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

        controller = module.get<ChainOfCustodyController>(ChainOfCustodyController);
        createConfigurationParameterUseCase = module.get<CreateCustodyUseCase>(CreateCustodyUseCase);
        listConfigurationParameterUseCase = module.get<ListCustodyUseCase>(ListCustodyUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createConfigurationParameterUseCase and return result', async () => {
            const dto = {
                laboratoryMB: true,
                laboratoryFQ: false,
                codeThermohygrometer: 'TEST',
                codeThermometerMM: 'TEST',
                codeThermometer: 'TEST',
                codeColorimeter: 'TEST',
                initialConservative: 'TEST',
                configurationVersion: 1
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
                    laboratoryMB: true,
                    laboratoryFQ: false,
                    codeThermohygrometer: 'TEST',
                    codeThermometerMM: 'TEST',
                    codeThermometer: 'TEST',
                    codeColorimeter: 'TEST',
                    initialConservative: 'TEST'
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