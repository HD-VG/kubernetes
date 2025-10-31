/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationTypeDagmeController } from './configuration_type_dagme.controller';
import { ConfigurationTypeDagmeService } from 'src/infrastructure/ag_configuration_type_dagme/service/configuration_type_dagme.service';
import {
  CreateConfigurationTypeDagmeUseCase,
  UpdateConfigurationTypeDagmeUseCase,
  ListConfigurationTypeDagmeUseCase,
  FindByConfigurationTypeDagmeUseCase,
  FindAllDataConfigurationTypeDagmeUseCase,
  DeleteConfigurationTypeDagmeUseCase
} from 'src/application/ag_configuration_type_dagme/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import {
  CreateConfigurationTypeDagmeDto,
  UpdateConfigurationTypeDagmeDto,
} from 'src/presentation/dtos/ag_configuration_type_dagme/index.dto';
import { FindById, FindByUuid, PaginationDto } from 'src/common/dto/index.dto'; 
describe('ConfigurationTypeDagmeController', () => {
  let controller: ConfigurationTypeDagmeController;
  let createConfigurationTypeDagmeUseCase: CreateConfigurationTypeDagmeUseCase;
  let updateConfigurationTypeDagmeUseCase: UpdateConfigurationTypeDagmeUseCase;
  let listConfigurationTypeDagmeUseCase: ListConfigurationTypeDagmeUseCase;
  let findByConfigurationTypeDagmeUseCase: FindByConfigurationTypeDagmeUseCase;
  let findAllDataConfigurationTypeDagmeUseCase: FindAllDataConfigurationTypeDagmeUseCase;
  let deleteConfigurationTypeDagmeUseCase: DeleteConfigurationTypeDagmeUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationTypeDagmeController],
      providers: [
        { 
          provide: CreateConfigurationTypeDagmeUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: UpdateConfigurationTypeDagmeUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { provide: ListConfigurationTypeDagmeUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: FindByConfigurationTypeDagmeUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: FindAllDataConfigurationTypeDagmeUseCase, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: ConfigurationTypeDagmeService, 
          useValue: { execute: jest.fn() } 
        },
        { 
          provide: DeleteConfigurationTypeDagmeUseCase, 
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

    controller = module.get<ConfigurationTypeDagmeController>(ConfigurationTypeDagmeController);
    createConfigurationTypeDagmeUseCase = module.get<CreateConfigurationTypeDagmeUseCase>(CreateConfigurationTypeDagmeUseCase);
    updateConfigurationTypeDagmeUseCase = module.get<UpdateConfigurationTypeDagmeUseCase>(UpdateConfigurationTypeDagmeUseCase);
    listConfigurationTypeDagmeUseCase = module.get<ListConfigurationTypeDagmeUseCase>(ListConfigurationTypeDagmeUseCase);
    findByConfigurationTypeDagmeUseCase = module.get<FindByConfigurationTypeDagmeUseCase>(FindByConfigurationTypeDagmeUseCase);
    findAllDataConfigurationTypeDagmeUseCase = module.get<FindAllDataConfigurationTypeDagmeUseCase>(FindAllDataConfigurationTypeDagmeUseCase);
    deleteConfigurationTypeDagmeUseCase = module.get<DeleteConfigurationTypeDagmeUseCase>(DeleteConfigurationTypeDagmeUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const data = {
    id: 1,
    name: 'ConfigurationTypeDagme'
  };
  const id = "s45de5d4g5y4k8g8y";
  const FindByUuid : FindByUuid= { uuid: id };
  const req = { user: { userId: 1 } };
  const user: FindById = { id: req.user.userId };
  const data1 ={
        id: 1,
        name: 'ConfigurationTypeDagme'
      };
      const data2 ={
        id: 2,
        name: 'ConfigurationTypeDagme'
      };
      const data3 ={
        id: 3,
        name: 'ConfigurationTypeDagme'
      };

  describe('create', () => {
    it('should call CreateConfigurationTypeDagmeUseCase and return result', async () => {
      const dto : CreateConfigurationTypeDagmeDto= {
        name: 'ConfigurationTypeDagme'
      };
      const result = { status: true, message: 'Registro creado',
        data: data
      };
      jest.spyOn(createConfigurationTypeDagmeUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createConfigurationTypeDagmeUseCase.execute).toHaveBeenCalledWith(dto, user);
      expect(response).toEqual(result);
    });
  });

  describe( 'update', () => {
    it('should call UpdateConfigurationTypeDagmeUseCase and return result', async () => {
      const dto : UpdateConfigurationTypeDagmeDto= {
        name: 'ConfigurationTypeDagmeActualizado'
      };
      const result = { status: true, message: 'Registro actualizado',
        data: data
      };
      jest.spyOn(updateConfigurationTypeDagmeUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.update(id, req, dto);
      expect(updateConfigurationTypeDagmeUseCase.execute).toHaveBeenCalledWith(FindByUuid,dto,user);
      expect(response).toEqual(result);
    });
  });

  describe( 'findOne', () => {
    it('should call FindOneConfigurationTypeDagmeUseCase and return result', async () => {
      const result = { status: true, message: 'Registro encontrado',
        data: [data],
        all: 1
      };
      jest.spyOn(findByConfigurationTypeDagmeUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findOne(id);
      expect(findByConfigurationTypeDagmeUseCase.execute).toHaveBeenCalledWith(FindByUuid);
      expect(response).toEqual(result);
    });
  });

  describe( 'findAll', () => {
    it('should call FindAllConfigurationTypeDagmeUseCase and return result', async () => {
      const pgdto: PaginationDto = {
                    limit:10,
                    offset: 1,
                    parameter: 'dagme',
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
      jest.spyOn(listConfigurationTypeDagmeUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAll(pgdto);
      expect(listConfigurationTypeDagmeUseCase.execute).toHaveBeenCalledWith(pgdto);
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
      jest.spyOn(findAllDataConfigurationTypeDagmeUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAllData();
      expect(findAllDataConfigurationTypeDagmeUseCase.execute).toHaveBeenCalledWith();
      expect(response).toEqual(result);
    });
  });

  describe( 'delete', () => {
    it('should call DeleteConfigurationTypeDagmeUseCase and return result', async () => {
      const result = { status: true, message: 'Registro eliminado',
        data: [data],
        all: 1
      };
      jest.spyOn(deleteConfigurationTypeDagmeUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.remove(id, req);
      expect(deleteConfigurationTypeDagmeUseCase.execute).toHaveBeenCalledWith(FindByUuid,user);
      expect(response).toEqual(result);
    });
  });
});
