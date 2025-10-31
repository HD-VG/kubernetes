/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationTypeMachineController } from './configuration_type_machine.controller';
import { ConfigurationTypeMachineService } from 'src/infrastructure/ag_configuration_type_machine/service/configuration_type_machine.service';
import {
  CreateConfigurationTypeMachineUseCase,
  UpdateConfigurationTypeMachineUseCase,
  ListConfigurationTypeMachineUseCase,
  FindByConfigurationTypeMachineUseCase,
  FindAllDataConfigurationTypeMachineUseCase,
  DeleteConfigurationTypeMachineUseCase
} from 'src/application/ag_configuration_type_machine/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import {
  CreateConfigurationTypeMachineDto,
  UpdateConfigurationTypeMachineDto,
} from 'src/presentation/dtos/ag_configuration_type_machine/index.dto';
import { FindById, PaginationDto, FindByUuid } from 'src/common/dto/index.dto'; 
describe('ConfigurationTypeMachineController', () => {
  let controller: ConfigurationTypeMachineController;
  let createConfigurationTypeMachineUseCase: CreateConfigurationTypeMachineUseCase;
  let updateConfigurationTypeMachineUseCase: UpdateConfigurationTypeMachineUseCase;
  let listConfigurationTypeMachineUseCase: ListConfigurationTypeMachineUseCase;
  let findByConfigurationTypeMachineUseCase: FindByConfigurationTypeMachineUseCase;
  let findAllDataConfigurationTypeMachineUseCase: FindAllDataConfigurationTypeMachineUseCase;
  let deleteConfigurationTypeMachineUseCase: DeleteConfigurationTypeMachineUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationTypeMachineController],
      providers: [
        { 
          provide: CreateConfigurationTypeMachineUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: UpdateConfigurationTypeMachineUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { provide: ListConfigurationTypeMachineUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: FindByConfigurationTypeMachineUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: FindAllDataConfigurationTypeMachineUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: ConfigurationTypeMachineService, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: DeleteConfigurationTypeMachineUseCase, 
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

    controller = module.get<ConfigurationTypeMachineController>(ConfigurationTypeMachineController);
    createConfigurationTypeMachineUseCase = module.get<CreateConfigurationTypeMachineUseCase>(CreateConfigurationTypeMachineUseCase);
    updateConfigurationTypeMachineUseCase = module.get<UpdateConfigurationTypeMachineUseCase>(UpdateConfigurationTypeMachineUseCase);
    listConfigurationTypeMachineUseCase = module.get<ListConfigurationTypeMachineUseCase>(ListConfigurationTypeMachineUseCase);
    findByConfigurationTypeMachineUseCase = module.get<FindByConfigurationTypeMachineUseCase>(FindByConfigurationTypeMachineUseCase);
    findAllDataConfigurationTypeMachineUseCase = module.get<FindAllDataConfigurationTypeMachineUseCase>(FindAllDataConfigurationTypeMachineUseCase);
    deleteConfigurationTypeMachineUseCase = module.get<DeleteConfigurationTypeMachineUseCase>(DeleteConfigurationTypeMachineUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const data = {
    id: 1,
    name: 'ConfigurationTypeMachine',
    basicCoste : 10
  };
  const id = "s45de5d4g5y4k8g8y";
  const FindByUuid : FindByUuid= { uuid: id };
  const req = { user: { userId: 1 } };
  const user: FindById = { id: req.user.userId };
  const data1 ={
        id: 1,
        name: 'ConfigurationTypeMachine',
        basicCoste : 10
      };
      const data2 ={
        id: 2,
        name: 'ConfigurationTypeMachine',
        basicCoste : 10
      };
      const data3 ={
        id: 3,
        name: 'ConfigurationTypeMachine',
        basicCoste : 10
      };


  describe('create', () => {
    it('should call CreateConfigurationTypeMachineUseCase and return result', async () => {
      const dto : CreateConfigurationTypeMachineDto= {
        name: 'ConfigurationTypeMachine',
        basicCoste : 10
      };
      const result = { status: true, message: 'Registro creado',
        data: data
      };
      jest.spyOn(createConfigurationTypeMachineUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createConfigurationTypeMachineUseCase.execute).toHaveBeenCalledWith(dto, user);
      expect(response).toEqual(result);
    });
  });

  describe( 'update', () => {
    it('should call UpdateConfigurationTypeMachineUseCase and return result', async () => {
      const dto : UpdateConfigurationTypeMachineDto= {
        name: 'ConfigurationTypeMachineActualizado',
        basicCoste : 10
      };
      const result = { status: true, message: 'Registro actualizado',
        data: data
      };
      jest.spyOn(updateConfigurationTypeMachineUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.update(id, req, dto);
      expect(updateConfigurationTypeMachineUseCase.execute).toHaveBeenCalledWith(FindByUuid,dto,user);
      expect(response).toEqual(result);
    });
  });

  describe( 'findOne', () => {
    it('should call FindOneConfigurationTypeMachineUseCase and return result', async () => {
      const result = { status: true, message: 'Registro encontrado',
        data: [data],
        all: 1
      };
      jest.spyOn(findByConfigurationTypeMachineUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findOne(id);
      expect(findByConfigurationTypeMachineUseCase.execute).toHaveBeenCalledWith(FindByUuid);
      expect(response).toEqual(result);
    });
  });

  describe( 'findAll', () => {
    it('should call FindAllConfigurationTypeMachineUseCase and return result', async () => {
      const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'Machine',
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
      jest.spyOn(listConfigurationTypeMachineUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAll(pgdto);
      expect(listConfigurationTypeMachineUseCase.execute).toHaveBeenCalledWith(pgdto);
      expect(response).toEqual(result);
    });
  });

  describe( 'findAllData', () => {
    it('should call FindAllDataConfigurationTypeMachineUseCase and return result', async () => {
      const result = { status: true, message: 'Registros encontrados',
        data: [
          data1,
          data2,
          data3,
        ],
        all: 3
      };
      jest.spyOn(findAllDataConfigurationTypeMachineUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAllData();
      expect(findAllDataConfigurationTypeMachineUseCase.execute).toHaveBeenCalledWith();
      expect(response).toEqual(result);
    });
  });

  describe( 'delete', () => {
    it('should call DeleteConfigurationTypeMachineUseCase and return result', async () => {
      const result = { status: true, message: 'Registro eliminado',
        data: [
          data,
        ],
        all: 1
      };
      const req = { user: { userId: 1 } };
      jest.spyOn(deleteConfigurationTypeMachineUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.remove(id, req);
      expect(deleteConfigurationTypeMachineUseCase.execute).toHaveBeenCalledWith(FindByUuid,user);
      expect(response).toEqual(result);
    });
  });
});
