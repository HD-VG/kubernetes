/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ReportTemplateController } from './report_template.controller';
import {
    CreateReportTemplateUseCase,
    DeleteReportTemplateUseCase,
    FindReportTemplateUseCase,
    ListReportTemplateUseCase,
    UpdateTransportUseCase,
} from 'src/application/cc_report_template/use-case/index-use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('ReportTemplateController', () => {
    let controller: ReportTemplateController;
    let createConfigurationParameterUseCase: CreateReportTemplateUseCase;
    let listConfigurationParameterUseCase: ListReportTemplateUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ReportTemplateController],
            providers: [
                {
                    provide: CreateReportTemplateUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: DeleteReportTemplateUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindReportTemplateUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListReportTemplateUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: UpdateTransportUseCase,
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

        controller = module.get<ReportTemplateController>(ReportTemplateController);
        createConfigurationParameterUseCase = module.get<CreateReportTemplateUseCase>(CreateReportTemplateUseCase);
        listConfigurationParameterUseCase = module.get<ListReportTemplateUseCase>(ListReportTemplateUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createConfigurationParameterUseCase and return result', async () => {
            const dto = {
                codeCustody: 'Test Parameter',
                typeCode: 'agua_cruda',
                codeReport: 'TEST',
                name: 'TEST',
                expectedParameters: ['TEST'],
                statusReport: true,
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
            const queryId = "codeCustody=Test";
            const result = {
                status: true,
                message: 'Registros encontrados',
                data: [{
                    id: 1,
                    codeCustody: 'Test Parameter',
                    typeCode: 'agua_cruda',
                    codeReport: 'TEST',
                    name: 'TEST',
                    expectedParameters: ['TEST'],
                    statusReport: true,
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