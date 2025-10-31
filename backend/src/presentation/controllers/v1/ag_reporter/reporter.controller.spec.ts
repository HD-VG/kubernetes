import { Test, TestingModule } from '@nestjs/testing';
import { ReporterController } from './reporter.controller';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import {
  CreateReporterUseCase,
  UpdateReporterUseCase,
  ListReporterUseCase,
  FindByIdReporterUseCase,
  DeleteReporterUseCase
} from 'src/application/ag_reporter/use-cases/index.use.case';
import { FindById,FindByUuid,PaginationDto } from 'src/common/dto/index.dto';

describe('ReporterController', () => {
  let controller: ReporterController;
  let createReporterUseCase: CreateReporterUseCase;
  let listReporterUseCase: ListReporterUseCase;
  let updateReporterUseCase: UpdateReporterUseCase;
  let deleteReporterUseCase: DeleteReporterUseCase;
  let findByIdReporterUseCase: FindByIdReporterUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReporterController],
      providers: [{
        provide: CreateReporterUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: UpdateReporterUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: ListReporterUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: FindByIdReporterUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: DeleteReporterUseCase,
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

    controller = module.get<ReporterController>(ReporterController);
    createReporterUseCase = module.get<CreateReporterUseCase>(CreateReporterUseCase);
    listReporterUseCase = module.get<ListReporterUseCase>(ListReporterUseCase);
    updateReporterUseCase = module.get<UpdateReporterUseCase>(UpdateReporterUseCase);
    deleteReporterUseCase = module.get<DeleteReporterUseCase>(DeleteReporterUseCase);
    findByIdReporterUseCase = module.get<FindByIdReporterUseCase>(FindByIdReporterUseCase);
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
    it('should call CreateReporterUseCase and return result', async () => {
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
      jest.spyOn(createReporterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createReporterUseCase.execute).toHaveBeenCalledWith(dto, user);
      expect(response).toEqual(result);
    });
  });

  // describe('findAll', () => {
  //   it('should call ListReporterUseCase and return a result', async () => {
  //     const result = {
  //       status: true,
  //       message: 'Registros encontrados',
  //       data: [{ id: 1, name: 'Reporter Test' }],
  //     };
  //     jest.spyOn(listReporterUseCase, 'execute').mockResolvedValue(result);
  //     const response = await controller.findAll();
  //     expect(listReporterUseCase.execute).toHaveBeenCalledWith();
  //     expect(response).toEqual(result);
  //   });
  // });

  describe('findOne', () => {
    it('should call FindByIdReporterUseCase and return a result', async () => {
      const result = {
        status: true,
        message: 'Registro encontrado',
        data:data
      };
      jest.spyOn(findByIdReporterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findOne(id);
      expect(findByIdReporterUseCase.execute).toHaveBeenCalledWith(FindByUuid);
      expect(response).toEqual(result);
    });
  });

  describe('update', () => {
    it('should call UpdateReporterUseCase and return the result', async () => {
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
      jest.spyOn(updateReporterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.update(id, dto, req);
      expect(updateReporterUseCase.execute).toHaveBeenCalledWith(FindByUuid, dto, user);
      expect(response).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should call DeleteReporterUseCase and return the result', async () => {
      const result = { status: true, message: 'Registro eliminado' };
      jest.spyOn(deleteReporterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.remove(id, req);
      expect(deleteReporterUseCase.execute).toHaveBeenCalledWith(FindByUuid, user);
      expect(response).toEqual(result);
    });
  });
});