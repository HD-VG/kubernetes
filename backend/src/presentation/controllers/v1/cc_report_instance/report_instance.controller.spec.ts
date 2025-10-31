/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ReportInstanceController } from './report_instance.controller';
import {
    CreateReportInstanceUseCase,
    DeleteReportInstanceUseCase,
    FindReportInstanceUseCase,
    ListReportInstanceUseCase,
} from 'src/application/cc_report_instance/use-case/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('ReportInstanceController', () => {
    let controller: ReportInstanceController;
    let createConfigurationParameterUseCase: CreateReportInstanceUseCase;
    let listConfigurationParameterUseCase: ListReportInstanceUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReportInstanceController],
            providers: [
                {
                    provide: CreateReportInstanceUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: DeleteReportInstanceUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindReportInstanceUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListReportInstanceUseCase,
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

        controller = module.get<ReportInstanceController>(ReportInstanceController);
        createConfigurationParameterUseCase = module.get<CreateReportInstanceUseCase>(CreateReportInstanceUseCase);
        listConfigurationParameterUseCase = module.get<ListReportInstanceUseCase>(ListReportInstanceUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createConfigurationParameterUseCase and return result', async () => {
            const dto = {
                chainOfCustody: 1,
                testType: 'Test Parameter',
                waterCode: 'Kg',
                codeCustody: 'TEST',
                reportCode: 'TEST',
                reportYear: 2023,
                summary: {},
                statusReport: 'PENDING'
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
            const queryId = { id: 1 };
            const result = {
                status: true,
                message: 'Registros encontrados',
                data: [{
                    id: 1,
                    testType: 'Test Parameter',
                    waterCode: 'Kg',
                    codeCustody: 'TEST',
                    reportCode: 'TEST',
                    reportYear: 2023,
                    summary: {},
                    statusReport: 'PENDING'
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