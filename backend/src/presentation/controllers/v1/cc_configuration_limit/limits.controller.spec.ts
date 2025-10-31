/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { LimitsController } from './limits.controller';
import {
    CreateLimitUseCase,
    DeleteLimitUseCase,
    FindByIdLimitUseCase,
    ListLimitUseCase,
    ToListLimitUseCase,
    UpdateLimitUseCase,
} from 'src/application/cc_configuration_limit/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('LimitsController', () => {
    let controller: LimitsController;
    let createConfigurationLimitUseCase: CreateLimitUseCase;
    let listConfigurationLimitUseCase: ListLimitUseCase;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LimitsController],
            providers: [
                {
                    provide: CreateLimitUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: DeleteLimitUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: FindByIdLimitUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ListLimitUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: ToListLimitUseCase,
                    useValue: { execute: jest.fn() },
                },
                {
                    provide: UpdateLimitUseCase,
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

        controller = module.get<LimitsController>(LimitsController);
        createConfigurationLimitUseCase = module.get<CreateLimitUseCase>(CreateLimitUseCase);
        listConfigurationLimitUseCase = module.get<ListLimitUseCase>(ListLimitUseCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should call createConfigurationLimitUseCase and return result', async () => {
            const dto = {
                minValue: 1,
                maxValue: 5,
                absoluteValue: null,
                conditionalValue: null,
                specialCondition: null,
                standardId: 1,
                parameterId: 1,
            };
            const req = { user: { userId: 1 } };
            const result = { status: true, message: 'Registro creado' };
            jest.spyOn(createConfigurationLimitUseCase, 'execute').mockResolvedValue(result);
            const response = await controller.create(dto, req);
            expect(createConfigurationLimitUseCase.execute).toHaveBeenCalledWith(dto, 1);
            expect(response).toEqual(result);
        });
    });

    describe('findAll', () => {
        it('should call listConfigurationLimitUseCase and return result', async () => {
            const result = {
                status: true,
                message: 'Registros encontrados',
                data: [{
                    id: 1,
                    minValue: 1,
                    maxValue: 5,
                    absoluteValue: null,
                    conditionalValue: null,
                    specialCondition: null
                }],
                all: 1,
            };
            jest.spyOn(listConfigurationLimitUseCase, 'execute').mockResolvedValue(result);
            const response = await controller.findAll();
            expect(listConfigurationLimitUseCase.execute).toHaveBeenCalledWith();
            expect(response).toEqual(result);
        });
    });
});