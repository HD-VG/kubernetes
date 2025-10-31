import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationCarsController } from './configuration_cars.controller';
import { ConfigurationCarsService } from 'src/infrastructure/ag_configuration_cars/services/configuration_cars.service';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import {
  CreateConfigurationCarsUseCase,
  UpdateConfigurationCarsUseCase,
  ListConfigurationCarsUseCase,
  FindByConfigurationCarsUseCase,
  FindAllDataConfigurationCarsUseCase,
  DeleteConfigurationCarsUseCase,
  GetApiCarsUseCase,
  GetApiByIdCarsUseCase,
} from 'src/application/ag_configuration_cars/use-cases/index.use-case'
import { FindById, PaginationDto, FindByUuid } from 'src/common/dto/index.dto';

describe('ConfigurationCarsController', () => {
  let controller: ConfigurationCarsController;
  let createConfigurationCarsUseCase: CreateConfigurationCarsUseCase;
  let listConfigurationCarsUseCase: ListConfigurationCarsUseCase;
  let updateConfigurationCarsUseCase: UpdateConfigurationCarsUseCase;
  let deleteConfigurationCarsUseCase: DeleteConfigurationCarsUseCase;
  let findAllDataConfigurationCarsUseCase: FindAllDataConfigurationCarsUseCase;
  let findByConfigurationCarsUseCase: FindByConfigurationCarsUseCase;
  let getApiCarsUseCase: GetApiCarsUseCase;
  let getApiByIdCarsUseCase: GetApiByIdCarsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationCarsController],
      providers: [
        {
          provide: CreateConfigurationCarsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: UpdateConfigurationCarsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: ListConfigurationCarsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: FindByConfigurationCarsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: FindAllDataConfigurationCarsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: GetApiByIdCarsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: GetApiCarsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: ConfigurationCarsService,
          useValue: { execute: jest.fn() }
        },
        {
          provide: DeleteConfigurationCarsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: GetApiCarsUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: GetApiByIdCarsUseCase,
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
        },
      ],
    }).compile();

    controller = module.get<ConfigurationCarsController>(ConfigurationCarsController);
    createConfigurationCarsUseCase = module.get<CreateConfigurationCarsUseCase>(CreateConfigurationCarsUseCase);
    listConfigurationCarsUseCase = module.get<ListConfigurationCarsUseCase>(ListConfigurationCarsUseCase);
    updateConfigurationCarsUseCase = module.get<UpdateConfigurationCarsUseCase>(UpdateConfigurationCarsUseCase);
    deleteConfigurationCarsUseCase = module.get<DeleteConfigurationCarsUseCase>(DeleteConfigurationCarsUseCase);
    findAllDataConfigurationCarsUseCase = module.get<FindAllDataConfigurationCarsUseCase>(FindAllDataConfigurationCarsUseCase);
    findByConfigurationCarsUseCase = module.get<FindByConfigurationCarsUseCase>(FindByConfigurationCarsUseCase);
    getApiCarsUseCase = module.get<GetApiCarsUseCase>(GetApiCarsUseCase);
    getApiByIdCarsUseCase = module.get<GetApiByIdCarsUseCase>(GetApiByIdCarsUseCase);
    });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  const data = {
    id: 1,
    idVehiculo: "ABC123",
    licensePlate: "XYZ789",
    make: "Toyota",
    model: "Corolla",
    basicCoste: 2020,
    estado: 1,
    time: "2023-10-10T10:00:00Z",
  };
  const id = "s45de5d4g5y4k8g8y";
  const FindByUuid : FindByUuid= { uuid: id };
  const req = { user: { userId: 1 } };
  const user: FindById = { id: req.user.userId };
  const data1 ={
        id: 1,
        idVehiculo: "ABC123",
        licensePlate: "XYZ789",
        make: "Toyota",
        model: "Corolla",
        basicCoste: 2020,
        estado: 1,
        time: "2023-10-10T10:00:00Z",
      };
      const data2 ={
        id: 2,
        idVehiculo: "ABC123",
        licensePlate: "XYZ789",
        make: "Toyota",
        model: "Corolla",
        basicCoste: 2020,
        estado: 1,
        time: "2023-10-10T10:00:00Z",
      };
      const data3 ={
        id: 3,
        idVehiculo: "ABC123",
        licensePlate: "XYZ789",
        make: "Toyota",
        model: "Corolla",
        basicCoste: 2020,
        estado: 1,
        time: "2023-10-10T10:00:00Z",
      };

  describe('create', () => {
  it('should call CreateConfigurationCarsUseCase and return result', async () => {
    const dto = { register_id: 1, car: 1, time: '10:00:00' };
    const result = { status: true, message: 'Registro creado' };

    jest.spyOn(createConfigurationCarsUseCase, 'execute').mockResolvedValue(result);

    const response = await controller.create(dto, req);

    expect(createConfigurationCarsUseCase.execute).toHaveBeenCalledWith(dto, user);
    expect(response).toEqual(result);
  });
});


  describe('findAll', () => {
    it('should call ListConfigurationCarsUseCase and return a paginated result', async () => {
      const paginationDto: PaginationDto = { limit: 10, offset: 0 };
      const result = {
        status: true,
        message: 'Registros encontrados',
        data: [{ id: 1, name: 'Carro Test' }]
      };
      jest.spyOn(listConfigurationCarsUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAll(paginationDto);
      expect(listConfigurationCarsUseCase.execute).toHaveBeenCalledWith(paginationDto);
      expect(response).toEqual(result);
    });
  });

describe('update', () => {
  it('should call UpdateConfigurationCarsUseCase and return the result', async () => {

    const dto = {
      register_id: 1,
      car: 456,
      time: '11:00:00',
    };
    const result = { status: true, message: 'Registro actualizado' };

    jest.spyOn(updateConfigurationCarsUseCase, 'execute').mockResolvedValue(result);

    const response = await controller.update(id, req, dto);
    expect(updateConfigurationCarsUseCase.execute).toHaveBeenCalledWith(FindByUuid,dto,user);
    expect(response).toEqual(result);
  });
});


  describe('remove', () => {
    it('should call DeleteConfigurationCarsUseCase and return the result', async () => {
      const result = { status: true, message: 'Registro eliminado' };

      jest.spyOn(deleteConfigurationCarsUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.remove(id, req);

      expect(deleteConfigurationCarsUseCase.execute).toHaveBeenCalledWith(FindByUuid,user);
      expect(response).toEqual(result);
    });
  });

  describe('findAllCars', () => {
    it('should call GetApiCarsUseCase and return the result', async () => {
      const result = { status: true, message: 'autos', data: [] };
      jest.spyOn(getApiCarsUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAllCars();
      expect(getApiCarsUseCase.execute).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('findIdCars', () => {
    it('should call GetApiByIdCarsUseCase and return the result', async () => {
      const id = 1;
      const result = { status: true, message: 'Autos', data: {} };
      jest.spyOn(getApiByIdCarsUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findIdCars(id);
      expect(getApiByIdCarsUseCase.execute).toHaveBeenCalledWith(id);
      expect(response).toEqual(result);
    });
  });

  describe( 'findOne', () => {
    it('should call FindOneConfigurationTypeDagmeUseCase and return result', async () => {
      const result = { status: true, message: 'Registro encontrado',
        data: [data],
        all: 1
      };
      jest.spyOn(findByConfigurationCarsUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findOne(id);
      expect(findByConfigurationCarsUseCase.execute).toHaveBeenCalledWith(FindByUuid);
      expect(response).toEqual(result);
    });
  });

  describe( 'findAllData', () => {
    it('should call FindAllDataConfigurationTypeDagmeUseCase and return result', async () => {
      
      const result = { status: true, message: 'Registros encontrados',
        data: [
          data1,
          data2,
          data3,
        ],
        all: 3
      };
      jest.spyOn(findAllDataConfigurationCarsUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAllData();
      expect(findAllDataConfigurationCarsUseCase.execute).toHaveBeenCalledWith();
      expect(response).toEqual(result);
    });
  });
});