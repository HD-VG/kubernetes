import { Test, TestingModule } from '@nestjs/testing';
import { WaterController } from './water.controller';
import { WaterService } from 'src/infrastructure/ag_water/services/water.service';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import {
  CreateWaterUseCase,
  UpdateWaterUseCase,
  ListWaterUseCase,
  FindByWaterUseCase,
  FindAllDataWaterUseCase,
  DeleteWaterUseCase
} from 'src/application/ag_water/use-cases/index.use-case'
import { PaginationDto, FindByUuid, FindById } from 'src/common/dto/index.dto';
describe('WaterController', () => {
  let controller: WaterController;
  let createWaterUseCase: CreateWaterUseCase;
  let listWaterUseCase: ListWaterUseCase;
  let updateWaterUseCase: UpdateWaterUseCase;
  let deleteWaterUseCase: DeleteWaterUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WaterController],
      providers: [{
        provide: CreateWaterUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: UpdateWaterUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: ListWaterUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: FindByWaterUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: FindAllDataWaterUseCase,
        useValue: { execute: jest.fn() }
      },
      {
        provide: WaterService,
        useValue: { execute: jest.fn() }
      },
      {
        provide: DeleteWaterUseCase,
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

    controller = module.get<WaterController>(WaterController);
    createWaterUseCase = module.get<CreateWaterUseCase>(CreateWaterUseCase);
    listWaterUseCase = module.get<ListWaterUseCase>(ListWaterUseCase);
    updateWaterUseCase = module.get<UpdateWaterUseCase>(UpdateWaterUseCase);
    deleteWaterUseCase = module.get<DeleteWaterUseCase>(DeleteWaterUseCase);
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
    it('should call CreateWaterUseCase and return result', async () => {
      const dto = {
        name: 'Agua',
        basicCoste: 15,
        height: 5,
        cohefficientDischarge: 80
      };
      const result = { status: true, message: 'Registro creado' };
      jest.spyOn(createWaterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createWaterUseCase.execute).toHaveBeenCalledWith(dto, user);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call ListWaterUseCase and return a paginated result', async () => {
      const paginationDto: PaginationDto = { limit: 10, offset: 0 };
      const result = {
        status: true,
        message: 'Registros encontrados',
        data: [data]
      };
      jest.spyOn(listWaterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAll(paginationDto);
      expect(listWaterUseCase.execute).toHaveBeenCalledWith(paginationDto);
      expect(response).toEqual(result);
    });
  });

  describe('update', () => {
    it('should call UpdateWaterUseCase and return the result', async () => {
      const dto = {
        id: 1,
        name: 'Agua Actualizada',
        basicCoste: 15,
        height: 5,
        cohefficientDischarge: 80
      };
      const result = { status: true, message: 'Registro actualizado' };

      jest.spyOn(updateWaterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.update(id, dto, req);

      expect(updateWaterUseCase.execute).toHaveBeenCalledWith(FindByUuid, dto, user);
      expect(response).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should call DeleteWaterUseCase and return the result', async () => {
      const result = { status: true, message: 'Registro eliminado' };

      jest.spyOn(deleteWaterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.remove(id, req);

      expect(deleteWaterUseCase.execute).toHaveBeenCalledWith(FindByUuid, user);
      expect(response).toEqual(result);
    });
  });

});