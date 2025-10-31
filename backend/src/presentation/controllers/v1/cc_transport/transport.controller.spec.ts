/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { TransportController } from './transport.controller';
import {
    CreateTransportUseCase,
    DeleteTransportUseCase,
    FindTransportUseCase,
    ListTransportUseCase,
    UpdateTransportUseCase
} from 'src/application/cc_transport/use-cases/index-transport.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import { formatDate, formatDateWithoutTime, formatTime } from 'src/common/utils/date.utils';

describe('TransportController', () => {
    let controller: TransportController;
    let createConfigurationParameterUseCase: CreateTransportUseCase;
    let listConfigurationParameterUseCase: ListTransportUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [TransportController],
            providers: [
                {
                    provide: CreateTransportUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: DeleteTransportUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindTransportUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListTransportUseCase,
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

        controller = module.get<TransportController>(TransportController);
        createConfigurationParameterUseCase = module.get<CreateTransportUseCase>(CreateTransportUseCase);
        listConfigurationParameterUseCase = module.get<ListTransportUseCase>(ListTransportUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createConfigurationParameterUseCase and return result', async () => {
            const dto = {
                responsable: 'Test Parameter',
                distanceTraveled: 'Kg',
                conservativeArrivalStretch: 'TEST',
                maximumStretch: 'TEST',
                initDate: new Date(),
                endDate: new Date(),
                initTime: '10:00',
                endTime: '12:00',
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
                    responsable: 'Test Parameter',
                    distanceTraveled: 'Kg',
                    conservativeArrivalStretch: 'TEST',
                    maximumStretch: 'TEST',
                    initDate: formatDateWithoutTime(new Date().toString()),
                    endDate: formatDateWithoutTime(new Date().toString()),
                    initTime: formatTime('10:00'),
                    endTime: formatTime('12:00'),
                    createAt: formatDate(new Date().toString()),
                    updateAt: formatDate(new Date().toString())
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