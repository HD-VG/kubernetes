/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationTypeWorkController } from './configuration_type_work.controller';
import { ConfigurationTypeWorkService } from 'src/infrastructure/ag_configuration_type_work/service/configuration_type_work.service';
import {
  CreateConfigurationTypeWorkUseCase,
  UpdateConfigurationTypeWorkUseCase,
  ListConfigurationTypeWorkUseCase,
  FindByConfigurationTypeWorkUseCase,
  FindAllDataConfigurationTypeWorkUseCase,
  DeleteConfigurationTypeWorkUseCase
} from 'src/application/ag_configuration_type_work/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import {
  CreateConfigurationTypeWorkDto,
  UpdateConfigurationTypeWorkDto,
} from 'src/presentation/dtos/ag_configuration_type_work/index.dto';
import { FindById, PaginationDto, FindByUuid } from 'src/common/dto/index.dto'; 
describe('ConfigurationTypeWorkController', () => {
  let controller: ConfigurationTypeWorkController;
  let createConfigurationTypeWorkUseCase: CreateConfigurationTypeWorkUseCase;
  let updateConfigurationTypeWorkUseCase: UpdateConfigurationTypeWorkUseCase;
  let listConfigurationTypeWorkUseCase: ListConfigurationTypeWorkUseCase;
  let findByConfigurationTypeWorkUseCase: FindByConfigurationTypeWorkUseCase;
  let findAllDataConfigurationTypeWorkUseCase: FindAllDataConfigurationTypeWorkUseCase;
  let deleteConfigurationTypeWorkUseCase: DeleteConfigurationTypeWorkUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationTypeWorkController],
      providers: [
        { 
          provide: CreateConfigurationTypeWorkUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: UpdateConfigurationTypeWorkUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { provide: ListConfigurationTypeWorkUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: FindByConfigurationTypeWorkUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: FindAllDataConfigurationTypeWorkUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: ConfigurationTypeWorkService, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: DeleteConfigurationTypeWorkUseCase, 
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

    controller = module.get<ConfigurationTypeWorkController>(ConfigurationTypeWorkController);
    createConfigurationTypeWorkUseCase = module.get<CreateConfigurationTypeWorkUseCase>(CreateConfigurationTypeWorkUseCase);
    updateConfigurationTypeWorkUseCase = module.get<UpdateConfigurationTypeWorkUseCase>(UpdateConfigurationTypeWorkUseCase);
    listConfigurationTypeWorkUseCase = module.get<ListConfigurationTypeWorkUseCase>(ListConfigurationTypeWorkUseCase);
    findByConfigurationTypeWorkUseCase = module.get<FindByConfigurationTypeWorkUseCase>(FindByConfigurationTypeWorkUseCase);
    findAllDataConfigurationTypeWorkUseCase = module.get<FindAllDataConfigurationTypeWorkUseCase>(FindAllDataConfigurationTypeWorkUseCase);
    deleteConfigurationTypeWorkUseCase = module.get<DeleteConfigurationTypeWorkUseCase>(DeleteConfigurationTypeWorkUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const data = {
      id: 1,
      name: 'ConfigurationTypeWork'
    };
    const id = "s45de5d4g5y4k8g8y";
    const FindByUuid : FindByUuid= { uuid: id };
    const req = { user: { userId: 1 } };
    const user: FindById = { id: req.user.userId };
    const data1 ={
          id: 1,
          name: 'ConfigurationTypeWork'
        };
        const data2 ={
          id: 2,
          name: 'ConfigurationTypeWork'
        };
        const data3 ={
          id: 3,
          name: 'ConfigurationTypeWork'
        };
  
  describe('create', () => {
    it('should call CreateConfigurationTypeWorkUseCase and return result', async () => {
      const dto : CreateConfigurationTypeWorkDto= {
        name: 'ConfigurationTypeWork'
      };
      const req = { user: { userId: 1 } };
      const result = { status: true, message: 'Registro creado',
        data: data
      };
      jest.spyOn(createConfigurationTypeWorkUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createConfigurationTypeWorkUseCase.execute).toHaveBeenCalledWith(dto, user);
      expect(response).toEqual(result);
    });
  });

  describe( 'update', () => {
    it('should call UpdateConfigurationTypeWorkUseCase and return result', async () => {
      const dto : UpdateConfigurationTypeWorkDto= {
        name: 'ConfigurationTypeWorkActualizado'
      };
      const result = { status: true, message: 'Registro actualizado',
        data: data
      };
      jest.spyOn(updateConfigurationTypeWorkUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.update(id, req, dto);
      expect(updateConfigurationTypeWorkUseCase.execute).toHaveBeenCalledWith(FindByUuid,dto,user);
      expect(response).toEqual(result);
    });
  });

  describe( 'findOne', () => {
    it('should call FindOneConfigurationTypeWorkUseCase and return result', async () => {
      const result = { status: true, message: 'Registro encontrado',
        data: [data],
        all: 1
      };
      jest.spyOn(findByConfigurationTypeWorkUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findOne(id);
      expect(findByConfigurationTypeWorkUseCase.execute).toHaveBeenCalledWith(FindByUuid);
      expect(response).toEqual(result);
    });
  });

  describe( 'findAll', () => {
    it('should call FindAllConfigurationTypeWorkUseCase and return result', async () => {
      const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'Work',
                    rol: 'ADMIN',
                };
      const result = { status: true, message: 'Registros paginados encontrados',
        data: [{
          data1,
          data2,
          data3,
        }],
        all: 3
      };
      jest.spyOn(listConfigurationTypeWorkUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAll(pgdto);
      expect(listConfigurationTypeWorkUseCase.execute).toHaveBeenCalledWith(pgdto);
      expect(response).toEqual(result);
    });
  });

  describe( 'findAllData', () => {
    it('should call FindAllDataConfigurationTypeWorkUseCase and return result', async () => {
      const result = { status: true, message: 'Registros encontrados',
        data: [
          data1,
          data2,
          data3,
        ],
        all: 3
      };
      jest.spyOn(findAllDataConfigurationTypeWorkUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAllData();
      expect(findAllDataConfigurationTypeWorkUseCase.execute).toHaveBeenCalledWith();
      expect(response).toEqual(result);
    });
  });

  describe( 'delete', () => {
    it('should call DeleteConfigurationTypeWorkUseCase and return result', async () => {
      const result = { status: true, message: 'Registro eliminado',
        data: [
          data,
        ],
        all: 1
      };
      jest.spyOn(deleteConfigurationTypeWorkUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.remove(id, req);
      expect(deleteConfigurationTypeWorkUseCase.execute).toHaveBeenCalledWith(FindByUuid,user);
      expect(response).toEqual(result);
    });
  });
});
