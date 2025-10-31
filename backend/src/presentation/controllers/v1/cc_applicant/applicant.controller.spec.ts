/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantController } from './applicant.controller';
import { CreateApplicantUseCase } from 'src/application/cc_applicant/use-cases/create-applicant.use-case';
import { DeleteApplicantUseCase } from 'src/application/cc_applicant/use-cases/delete-applicant.use-case';
import { FindByIdApplicantUseCase } from 'src/application/cc_applicant/use-cases/find-by-id.use-case';
import { ListApplicantUseCase } from 'src/application/cc_applicant/use-cases/list-applicant.use-case';
import { UpdateApplicantUseCase } from 'src/application/cc_applicant/use-cases/update-applicant.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';

describe('ApplicantController', () => {
  let controller: ApplicantController;
  let createApplicantUseCase: CreateApplicantUseCase;
  let listApplicantUseCase: ListApplicantUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicantController],
      providers: [
        {
          provide: CreateApplicantUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: DeleteApplicantUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: FindByIdApplicantUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: ListApplicantUseCase,
          useValue: { execute: jest.fn() },
        },
        {
          provide: UpdateApplicantUseCase,
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

    controller = module.get<ApplicantController>(ApplicantController);
    createApplicantUseCase = module.get<CreateApplicantUseCase>(CreateApplicantUseCase);
    listApplicantUseCase = module.get<ListApplicantUseCase>(ListApplicantUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call CreateApplicantUseCase and return result', async () => {
      const dto = {
        entityName: 'ELAPAS',
        location: 'Lima',
        phone: '123456789',
        referencePerson: 'Juan Perez',
        chainOfCustody: 5,
      };
      const req = { user: { userId: 1 } };
      const result = { status: true, message: 'Registro creado' };
      jest.spyOn(createApplicantUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createApplicantUseCase.execute).toHaveBeenCalledWith(dto, 1);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call ListApplicantUseCase and return result', async () => {
      const query = { id: 5 };
      const result = {
        status: true,
        message: 'Registros encontrados',
        data: [{ id: 1, name: 'John Doe' }],
        all: 1,
      };
      jest.spyOn(listApplicantUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAll(query);
      expect(listApplicantUseCase.execute).toHaveBeenCalledWith(query);
      expect(response).toEqual(result);
    });
  });
});