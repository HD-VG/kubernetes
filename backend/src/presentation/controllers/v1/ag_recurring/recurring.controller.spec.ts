import { Test, TestingModule } from '@nestjs/testing';
import { RecurringController } from './recurring.controller';
import { RecurringService } from 'src/infrastructure/ag_recurring/service/recurring.service';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import {
  CreateRecurringUseCase,
  UpdateRecurringUseCase,
  ListRecurringUseCase,
  FindByRecurringUseCase,
  FindAllDataRecurringUseCase,
  DeleteRecurringUseCase
} from 'src/application/ag_recurring/use-cases/index.use-case'
import { FindById, PaginationDto, FindByUuid } from 'src/common/dto/index.dto';
describe('RecurringController', () => {
  let controller: RecurringController;
  let createRecurringUseCase: CreateRecurringUseCase;
  let listRecurringUseCase: ListRecurringUseCase;
  let findAllDataRecurringUseCase: FindAllDataRecurringUseCase;
  let findByRecurringUseCase:FindByRecurringUseCase;
  let updateRecurringUseCase:UpdateRecurringUseCase;
  let deleteRecurringUseCase:DeleteRecurringUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecurringController],
      providers: [{
        provide: CreateRecurringUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: UpdateRecurringUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: ListRecurringUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: FindByRecurringUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: FindAllDataRecurringUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: RecurringService,
        useValue: { execute: jest.fn() }
      },
      {
        provide: DeleteRecurringUseCase,
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

    controller = module.get<RecurringController>(RecurringController);
    createRecurringUseCase = module.get<CreateRecurringUseCase>(CreateRecurringUseCase)
    listRecurringUseCase = module.get<ListRecurringUseCase>(ListRecurringUseCase);
    findAllDataRecurringUseCase = module.get<FindAllDataRecurringUseCase>(FindAllDataRecurringUseCase);
    findByRecurringUseCase = module.get<FindByRecurringUseCase>(FindByRecurringUseCase);
    updateRecurringUseCase = module.get<UpdateRecurringUseCase>(UpdateRecurringUseCase);
    deleteRecurringUseCase = module.get<DeleteRecurringUseCase>(DeleteRecurringUseCase);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const data = {
      id: 1,
      name: 'recurring',
      basicCoste: 123
    };
    const id = "s45de5d4g5y4k8g8y";
    const FindByUuid : FindByUuid= { uuid: id };
    const req = { user: { userId: 1 } };
    const user: FindById = { id: req.user.userId };
    const data1 ={
          id: 1,
          name: 'recurring',
          basicCoste: 123
        };
        const data2 ={
          id: 2,
          name: 'recurring',
          basicCoste: 123
        };
        const data3 ={
          id: 3,
          name: 'recurring',
          basicCoste: 123
        };

  describe('create', () => {
    it('should call CreateRecurringUseCase and return result', async () => {
      const dto = {
        name: 'Recurring',
        basicCoste: 100,
      };
      const result = { status: true, message: 'Registro creado' };
      jest.spyOn(createRecurringUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createRecurringUseCase.execute).toHaveBeenCalledWith(dto, user);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call ListRecurringUseCase and return a paginated result', async () => {
      const paginationDto: PaginationDto = { limit: 10, offset: 0 };
      const result = {
        status: true,
        message: 'Registros encontrados',
        data: [data],
      };
      jest.spyOn(listRecurringUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAll(paginationDto);
      expect(listRecurringUseCase.execute).toHaveBeenCalledWith(paginationDto);
      expect(response).toEqual(result);
    });
  });

  describe('findAllData', () => {
    it('should call FindAllDataRecurringUseCase and return all data', async () => {
      const result = {
        status: true,
        message: 'Todos los registros recurrentes encontrados',
        data: [data1, data2, data3],
      };
      jest.spyOn(findAllDataRecurringUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAllData();
      expect(findAllDataRecurringUseCase.execute).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should call FindByRecurringUseCase and return a single result', async () => {
      const result = {
        status: true,
        message: 'Registro recurrente encontrado',
        data:data,
      };
      jest.spyOn(findByRecurringUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findOne(id);
      expect(findByRecurringUseCase.execute).toHaveBeenCalledWith(FindByUuid);
      expect(response).toEqual(result);
    });
  });

  describe('update', () => {
    it('should call UpdateRecurringUseCase and return the result', async () => {
      const dto = {
        name: 'Recurring Actualizado',
        basicCoste: 120,
      };
      const result = { status: true, message: 'Registro actualizado' };
      jest.spyOn(updateRecurringUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.update(id, req, dto);
      expect(updateRecurringUseCase.execute).toHaveBeenCalledWith(FindByUuid, dto, user);
      expect(response).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should call DeleteRecurringUseCase and return the result', async () => {
      const result = { status: true, message: 'Registro eliminado' };

      jest.spyOn(deleteRecurringUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.remove(id, req);
      expect(deleteRecurringUseCase.execute).toHaveBeenCalledWith(FindByUuid, user);
      expect(response).toEqual(result);
    });
  });

});
