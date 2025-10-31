/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TestResultController } from './test_result.controller';
import {
    CreateTestResultUseCase,
    DeleteTestResultUseCase,
    FindByIdTestResultUseCase,
    ListByCustodyTestResultUseCase,
    UpdateTestResultUseCase,
    ListBySamplingTestResultUseCase
} from 'src/application/cc_test_result/use-case/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('TestResultController', () => {
    let controller: TestResultController;
    let createConfigurationParameterUseCase: CreateTestResultUseCase;
    let listConfigurationParameterUseCase: ListByCustodyTestResultUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TestResultController],
            providers: [
                {
                    provide: CreateTestResultUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: DeleteTestResultUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindByIdTestResultUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListByCustodyTestResultUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: UpdateTestResultUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListBySamplingTestResultUseCase,
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

        controller = module.get<TestResultController>(TestResultController);
        createConfigurationParameterUseCase = module.get<CreateTestResultUseCase>(CreateTestResultUseCase);
        listConfigurationParameterUseCase = module.get<ListByCustodyTestResultUseCase>(ListByCustodyTestResultUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createConfigurationParameterUseCase and return result', async () => {
            const dto = {
                parameter: 'Test Parameter',
                valueA: 5,
                valueB: 9,
                usedFormula: true,
                configuration_id: 1,
                configuration_limit_id: '1',
                sampling_id: 1
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
            const queryId = { sampling_id: 1, custody_id: 1, rol: 'ADMIN' };
            const result = {
                status: true,
                message: 'Registros encontrados',
                data: [{
                    id: 1,
                    parameter: 'Test Parameter',
                    valueA: 5,
                    valueB: 9,
                    usedFormula: true,
                }],
                all: 1,
            };
            jest.spyOn(listConfigurationParameterUseCase, 'execute').mockResolvedValue(result);
            const response = await controller.findAll(queryId);
            expect(listConfigurationParameterUseCase.execute).toHaveBeenCalledWith(queryId);
            expect(response).toEqual(result);
        });
    });
});