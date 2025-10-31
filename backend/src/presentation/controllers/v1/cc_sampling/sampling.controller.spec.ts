/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { SamplingController } from './sampling.controller';
import {
    UpdateLaboratorySamplingUseCase,
    CreateSamplingUseCase,
    DeleteSamplingUseCase,
    FindByIdtSamplingUseCase,
    ListSamplingUseCase,
    UpdateSamplingUseCase
} from 'src/application/cc_sampling/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import { Technique } from 'src/domain/cc_sampling/enum/technique.enum';

describe('SamplingController', () => {
    let controller: SamplingController;
    let createConfigurationParameterUseCase: CreateSamplingUseCase;
    let listConfigurationParameterUseCase: ListSamplingUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [SamplingController],
            providers: [
                {
                    provide: CreateSamplingUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: DeleteSamplingUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: UpdateLaboratorySamplingUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListSamplingUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindByIdtSamplingUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: UpdateSamplingUseCase,
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

        controller = module.get<SamplingController>(SamplingController);
        createConfigurationParameterUseCase = module.get<CreateSamplingUseCase>(CreateSamplingUseCase);
        listConfigurationParameterUseCase = module.get<ListSamplingUseCase>(ListSamplingUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createConfigurationParameterUseCase and return result', async () => {
            const dto = {
                sampleCode: '1',
                typeCode: 'Kg',
                description: 'TEST',
                sourceOfSupply: 'TEST',
                quantity: 100,
                sampleLocation: 'TEST',
                samplePoint: 'TEST',
                coordinatesX: '-12.34',
                coordinatesY: '-56.78',
                samplingTechnique: Technique.SIMPLE,
                samplingTechniqueM: 'TEST',
                statusPh: true,
                statusClr: false,
                ciResA: 1,
                ciResB: 2,
                condAmbT: 25,
                condAmbB: 50,
                samplingDay: new Date("2023-10-01"),
                samplingTime: '10:00',
                chainOfCustody: 1
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
                    sampleCode: '1',
                    typeCode: 'Kg',
                    description: 'TEST',
                    sourceOfSupply: 'TEST',
                    quantity: 100,
                    sampleLocation: 'TEST',
                    samplePoint: 'TEST',
                    coordinatesX: '-12.34',
                    coordinatesY: '-56.78',
                    samplingTechnique: Technique.SIMPLE,
                    samplingTechniqueM: 'TEST',
                    statusPh: true,
                    statusClr: false,
                    ciResA: 1,
                    ciResB: 2,
                    condAmbT: 25,
                    condAmbB: 50,
                    samplingDay: new Date("2023-10-01"),
                    samplingTime: '10:00',
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