import { Test, TestingModule } from '@nestjs/testing';
import { ReportedController } from './reported.controller';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import {
  CreateReportedUseCase,
  UpdateReportedUseCase,
  ListReportedUseCase,
  FindByIdReportedUseCase,
  DeleteReportedUseCase,
  IndexReportedUseCase
} from 'src/application/ag_reported/use-cases/index.use-case';
import { FindById } from 'src/common/dto/findById.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

describe('ReportedController', () => {
  let controller: ReportedController;
  let createReportedUseCase: CreateReportedUseCase;
  let listReportedUseCase: ListReportedUseCase;
  let updateReportedUseCase: UpdateReportedUseCase;
  let deleteReportedUseCase: DeleteReportedUseCase;
  let findByIdReportedUseCase: FindByIdReportedUseCase;
  let indexReportedUseCase: IndexReportedUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportedController],
      providers: [{
        provide: CreateReportedUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: UpdateReportedUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: ListReportedUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: FindByIdReportedUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: DeleteReportedUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: IndexReportedUseCase,
        useValue: { execute: jest.fn() }
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
      {
        provide: Reflector,
        useValue: { get: jest.fn() }
      },
      {
        provide: IAuthRepositoryToken,
        useValue: { findUserRoles: jest.fn() }
      },
      {
        provide: AuthService,
        useValue: { validateUser: jest.fn() }
      },
      {
        provide: RolesGuard, useClass: RolesGuard
      },],
    }).compile();

    controller = module.get<ReportedController>(ReportedController);
    createReportedUseCase = module.get<CreateReportedUseCase>(CreateReportedUseCase);
    listReportedUseCase = module.get<ListReportedUseCase>(ListReportedUseCase);
    updateReportedUseCase = module.get<UpdateReportedUseCase>(UpdateReportedUseCase);
    deleteReportedUseCase = module.get<DeleteReportedUseCase>(DeleteReportedUseCase);
    findByIdReportedUseCase = module.get<FindByIdReportedUseCase>(FindByIdReportedUseCase);
    indexReportedUseCase = module.get<IndexReportedUseCase>(IndexReportedUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const data = {
    id: 1, name: 'Reported Test'
  };
  const id = "s45de5d4g5y4k8g8y";
  const FindByUuid : FindByUuid= { uuid: id };
  const req = { user: { userId: 1 } };
  const user: FindById = { id: req.user.userId };
  const data1 ={
        id: 1, name: 'Reported Test'
      };
      const data2 ={
        id: 2, name: 'Reported Test'
      };
      const data3 ={
        id: 3, name: 'Reported Test'
      };

  describe('create', () => {
    it('should call CreateReportedUseCase and return result', async () => {
      const dto = {
        name: 'nombre',
        lastname: 'apellido',
        ci: '78945613',
        phone: '123456789',
        email: 'reporter@gmail.com',
        address: 'calle2',
        codeReporter: 'A-2'
      };
      const result = { status: true, message: 'Registro creado' };
      jest.spyOn(createReportedUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createReportedUseCase.execute).toHaveBeenCalledWith(dto, user);
      expect(response).toEqual(result);
    });
  });

  describe('findAllPaginated', () => {
    it('should call IndexReportedUseCase and return a paginated result', async () => {
      const paginationDto: PaginationDto = { limit: 10, offset: 0 };
      const result = {
        status: true,
        message: 'Registros encontrados',
        data: data,
      };
      jest.spyOn(indexReportedUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAll(paginationDto);
      expect(indexReportedUseCase.execute).toHaveBeenCalledWith(paginationDto);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call ListReportedUseCase and return a result', async () => {
      const result = {
        status: true,
        message: 'Registros encontrados',
        data: [data1,data2,data3],
      };
      jest.spyOn(listReportedUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAllData();
      expect(listReportedUseCase.execute).toHaveBeenCalledWith();
      expect(response).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should call FindByIdReportedUseCase and return a result', async () => {
        const result = { status: true, message: 'Registro encontrado', data: data };
        jest.spyOn(findByIdReportedUseCase, 'execute').mockResolvedValue(result);
        const response = await controller.findOne(id);
        expect(findByIdReportedUseCase.execute).toHaveBeenCalledWith(FindByUuid);
        expect(response).toEqual(result);
    });
  });

  describe('update', () => {
    it('should call UpdateReportedUseCase and return the result', async () => {
      const dto = {
        name: 'nombre-actualizado',
        lastname: 'apellido-actualizado',
        ci: '78945613',
        phone: '123456789',
        email: 'reporter@gmail.com',
        address: 'calle2',
        codeReporter: 'A-2'
      };
      const result = { status: true, message: 'Registro actualizado' };
      jest.spyOn(updateReportedUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.update(id, dto, req);
      expect(updateReportedUseCase.execute).toHaveBeenCalledWith(FindByUuid, dto, user);
      expect(response).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should call DeleteReportedUseCase and return the result', async () => {
        const result = { status: true, message: 'Registro eliminado' };
        jest.spyOn(deleteReportedUseCase, 'execute').mockResolvedValue(result);
        const response = await controller.remove(id, req);
        expect(deleteReportedUseCase.execute).toHaveBeenCalledWith(FindByUuid, user);
        expect(response).toEqual(result);
    });
  });
});