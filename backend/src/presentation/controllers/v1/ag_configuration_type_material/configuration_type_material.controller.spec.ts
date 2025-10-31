/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationTypeMaterialController } from './configuration_type_material.controller';
import { ConfigurationTypeMaterialService } from 'src/infrastructure/ag_configuration_type_material/service/configuration_type_material.service';
import {
  CreateConfigurationTypeMaterialUseCase,
  UpdateConfigurationTypeMaterialUseCase,
  ListConfigurationTypeMaterialUseCase,
  FindByConfigurationTypeMaterialUseCase,
  FindAllDataConfigurationTypeMaterialUseCase,
  DeleteConfigurationTypeMaterialUseCase,
  GetApiMaterialUseCase,
} from 'src/application/ag_configuration_type_material/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import {
  CreateConfigurationTypeMaterialDto,
  UpdateConfigurationTypeMaterialDto,
} from 'src/presentation/dtos/ag_configuration_type_material/index.dto';
import { FindById, PaginationDto,FindByUuid } from 'src/common/dto/index.dto'; 
describe('ConfigurationTypeMaterialController', () => {
  let controller: ConfigurationTypeMaterialController;
  let createConfigurationTypeMaterialUseCase: CreateConfigurationTypeMaterialUseCase;
  let updateConfigurationTypeMaterialUseCase: UpdateConfigurationTypeMaterialUseCase;
  let listConfigurationTypeMaterialUseCase: ListConfigurationTypeMaterialUseCase;
  let findByConfigurationTypeMaterialUseCase: FindByConfigurationTypeMaterialUseCase;
  let findAllDataConfigurationTypeMaterialUseCase: FindAllDataConfigurationTypeMaterialUseCase;
  let deleteConfigurationTypeMaterialUseCase: DeleteConfigurationTypeMaterialUseCase;
  let getApiMaterialUseCase: GetApiMaterialUseCase;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationTypeMaterialController],
      providers: [
        { 
          provide: CreateConfigurationTypeMaterialUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: UpdateConfigurationTypeMaterialUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { provide: ListConfigurationTypeMaterialUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: FindByConfigurationTypeMaterialUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: FindAllDataConfigurationTypeMaterialUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: ConfigurationTypeMaterialService, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: DeleteConfigurationTypeMaterialUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: GetApiMaterialUseCase, 
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

    controller = module.get<ConfigurationTypeMaterialController>(ConfigurationTypeMaterialController);
    createConfigurationTypeMaterialUseCase = module.get<CreateConfigurationTypeMaterialUseCase>(CreateConfigurationTypeMaterialUseCase);
    updateConfigurationTypeMaterialUseCase = module.get<UpdateConfigurationTypeMaterialUseCase>(UpdateConfigurationTypeMaterialUseCase);
    listConfigurationTypeMaterialUseCase = module.get<ListConfigurationTypeMaterialUseCase>(ListConfigurationTypeMaterialUseCase);
    findByConfigurationTypeMaterialUseCase = module.get<FindByConfigurationTypeMaterialUseCase>(FindByConfigurationTypeMaterialUseCase);
    findAllDataConfigurationTypeMaterialUseCase = module.get<FindAllDataConfigurationTypeMaterialUseCase>(FindAllDataConfigurationTypeMaterialUseCase);
    deleteConfigurationTypeMaterialUseCase = module.get<DeleteConfigurationTypeMaterialUseCase>(DeleteConfigurationTypeMaterialUseCase);
    getApiMaterialUseCase = module.get<GetApiMaterialUseCase>(GetApiMaterialUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const data = {
    id: 1,
    code: 1,
    parent: "string",
    level: 10,
    branches: 10,
    name: "string",
    unit: "string",
    valMinimun: 10,
    valMaximun: 1,
    priceUs: 10,
    priceBs: 10,
    typeItem: "string",
    iStock: "string",
    quantityD: 10,
    quantityH: 10,
    balandeAmount: 10,
    quantity: 10,
    debitBs: 10,
    creditBs: 10,
    balanceCost: 10,
    unitRequested: "string",
    totalCost: 10
  };
  const id = "s45de5d4g5y4k8g8y";
  const FindByUuid : FindByUuid= { uuid: id };
  const req = { user: { userId: 1 } };
  const user: FindById = { id: req.user.userId };
  const data1 ={
                id: 1,
                code: 1,
                parent: "string",
                level: 10,
                branches: 10,
                name: "string",
                unit: "string",
                valMinimun: 10,
                valMaximun: 1,
                priceUs: 10,
                priceBs: 10,
                typeItem: "string",
                iStock: "string",
                quantityD: 10,
                quantityH: 10,
                balandeAmount: 10,
                quantity: 10,
                debitBs: 10,
                creditBs: 10,
                balanceCost: 10,
                unitRequested: "string",
                totalCost: 10
      };
  const data2 ={
                id: 2,
                code: 1,
                parent: "string",
                level: 10,
                branches: 10,
                name: "string",
                unit: "string",
                valMinimun: 10,
                valMaximun: 1,
                priceUs: 10,
                priceBs: 10,
                typeItem: "string",
                iStock: "string",
                quantityD: 10,
                quantityH: 10,
                balandeAmount: 10,
                quantity: 10,
                debitBs: 10,
                creditBs: 10,
                balanceCost: 10,
                unitRequested: "string",
                totalCost: 10
      };
  const data3 ={
                id: 3,
                code: 1,
                parent: "string",
                level: 10,
                branches: 10,
                name: "string",
                unit: "string",
                valMinimun: 10,
                valMaximun: 1,
                priceUs: 10,
                priceBs: 10,
                typeItem: "string",
                iStock: "string",
                quantityD: 10,
                quantityH: 10,
                balandeAmount: 10,
                quantity: 10,
                debitBs: 10,
                creditBs: 10,
                balanceCost: 10,
                unitRequested: "string",
                totalCost: 10
      };


  describe('create', () => {
    it('should call CreateConfigurationTypeMaterialUseCase and return result', async () => {
      const dto : CreateConfigurationTypeMaterialDto= {
          register_id: 1,
          materialas: 10,
          quantity: 10,
          unit: "string",
          codigo: "string",
          padre: "string",
          nivel: 10,
          ramas: 10,
          nombre: "string",
          unidad: "string",
          valMinimo: 10,
          valMaximo: 10,
          precioUs: 10,
          PrecioBs: 10,
          tipoItem: "string",
          iAlmacen: "string",
          cantidadD: 10,
          cantidadH: 10,
          saldoCantidad: 10,
          debeBs: 10,
          HaberBs: 10,
          SaldoCosto: 10
      };
      const result = { status: true, message: 'Registro creado',
        data: data
      };
      jest.spyOn(createConfigurationTypeMaterialUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createConfigurationTypeMaterialUseCase.execute).toHaveBeenCalledWith(dto, user);
      expect(response).toEqual(result);
    });
  });

  describe( 'update', () => {
    it('should call UpdateConfigurationTypeMaterialUseCase and return result', async () => {
      const dto : UpdateConfigurationTypeMaterialDto= {
          register_id: 1,
          materialas: 10,
          quantity: 10,
          unit: "MaterialActualizado",
          codigo: "MaterialActualizado",
          padre: "MaterialActualizado",
          nivel: 10,
          ramas: 10,
          nombre: "MaterialActualizado",
          unidad: "MaterialActualizado",
          valMinimo: 10,
          valMaximo: 10,
          precioUs: 10,
          PrecioBs: 10,
          tipoItem: "MaterialActualizado",
          iAlmacen: "MaterialActualizado",
          cantidadD: 10,
          cantidadH: 10,
          saldoCantidad: 10,
          debeBs: 10,
          HaberBs: 10,
          SaldoCosto: 10
      };
      const result = { status: true, message: 'Registro actualizado',
        data:data
      };
      jest.spyOn(updateConfigurationTypeMaterialUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.update(id, dto,req);
      expect(updateConfigurationTypeMaterialUseCase.execute).toHaveBeenCalledWith(FindByUuid,dto,user);
      expect(response).toEqual(result);
    });
  });

  describe( 'findOne', () => {
    it('should call FindOneConfigurationTypeMaterialUseCase and return result', async () => {
  
      const result = { status: true, message: 'Registro encontrado',
        data: [{
          data,
        }],
        all: 1
      };
      jest.spyOn(findByConfigurationTypeMaterialUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findOne(id);
      expect(findByConfigurationTypeMaterialUseCase.execute).toHaveBeenCalledWith(FindByUuid);
      expect(response).toEqual(result);
    });
  });

  describe( 'findAll', () => {
    it('should call FindAllConfigurationTypeMaterialUseCase and return result', async () => {
      const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'Material',
                    rol: 'ADMIN',
                };
      const result = { status: true, message: 'Registros paginados encontrados',
        data: [
          data1,
          data2,
          data3,
        ],
        all: 3
      };
      jest.spyOn(listConfigurationTypeMaterialUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAll(pgdto);
      expect(listConfigurationTypeMaterialUseCase.execute).toHaveBeenCalledWith(pgdto);
      expect(response).toEqual(result);
    });
  });

  describe( 'findAllData', () => {
    it('should call FindAllDataConfigurationTypeMaterialUseCase and return result', async () => {
      const result = { status: true, message: 'Registros encontrados',
        data: [
          data1,
          data2,
          data3,
        ],
        all: 3
      };
      jest.spyOn(findAllDataConfigurationTypeMaterialUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAllData();
      expect(findAllDataConfigurationTypeMaterialUseCase.execute).toHaveBeenCalledWith();
      expect(response).toEqual(result);
    });
  });

  describe( 'delete', () => {
    it('should call DeleteConfigurationTypeMaterialUseCase and return result', async () => {
      const result = { status: true, message: 'Registro eliminado',
        data: [
          data,
        ],
        all: 1
      };
      jest.spyOn(deleteConfigurationTypeMaterialUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.remove(id, req);
      expect(deleteConfigurationTypeMaterialUseCase.execute).toHaveBeenCalledWith(FindByUuid,user);
      expect(response).toEqual(result);
    });
  });

  describe('getByApi', () => {
  it('should call getApiMaterialUseCase and return result', async () => {
    const result = { status: true, message: 'Registro eliminado' };
    jest.spyOn(getApiMaterialUseCase, 'execute').mockResolvedValue(result);
    const response = await controller.findAllDataApi();
    expect(getApiMaterialUseCase.execute).toHaveBeenCalled();
    expect(response).toEqual(result);
  });
});

});
