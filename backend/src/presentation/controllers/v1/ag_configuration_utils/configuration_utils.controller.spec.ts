/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationUtilController } from './configuration_utils.controller';
import { ConfigurationUtilService } from 'src/infrastructure/ag_configuration_utils/service/configuration_utils.service';
import {
  CreateConfigurationUtilUseCase,
  UpdateConfigurationUtilUseCase,
  ListConfigurationUtilUseCase,
  FindByConfigurationUtilUseCase,
  FindAllDataConfigurationUtilUseCase,
  DeleteConfigurationUtilUseCase
} from 'src/application/ag_configuration_utils/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import {
  CreateConfigurationUtilDto,
  UpdateConfigurationUtilDto,
} from 'src/presentation/dtos/ag_configuration_utils/index.dto';
import { FindById, PaginationDto, FindByUuid } from 'src/common/dto/index.dto';
describe('ConfigurationUtilController', () => {
  let controller: ConfigurationUtilController;
  let createConfigurationUtilUseCase: CreateConfigurationUtilUseCase;
  let updateConfigurationUtilUseCase: UpdateConfigurationUtilUseCase;
  let listConfigurationUtilUseCase: ListConfigurationUtilUseCase;
  let findByConfigurationUtilUseCase: FindByConfigurationUtilUseCase;
  let findAllDataConfigurationUtilUseCase: FindAllDataConfigurationUtilUseCase;
  let deleteConfigurationUtilUseCase: DeleteConfigurationUtilUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigurationUtilController],
      providers: [
        {
          provide: CreateConfigurationUtilUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: UpdateConfigurationUtilUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: ListConfigurationUtilUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: FindByConfigurationUtilUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: FindAllDataConfigurationUtilUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: ConfigurationUtilService,
          useValue: { execute: jest.fn() }
        },
        {
          provide: DeleteConfigurationUtilUseCase,
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

    controller = module.get<ConfigurationUtilController>(ConfigurationUtilController);
    createConfigurationUtilUseCase = module.get<CreateConfigurationUtilUseCase>(CreateConfigurationUtilUseCase);
    updateConfigurationUtilUseCase = module.get<UpdateConfigurationUtilUseCase>(UpdateConfigurationUtilUseCase);
    listConfigurationUtilUseCase = module.get<ListConfigurationUtilUseCase>(ListConfigurationUtilUseCase);
    findByConfigurationUtilUseCase = module.get<FindByConfigurationUtilUseCase>(FindByConfigurationUtilUseCase);
    findAllDataConfigurationUtilUseCase = module.get<FindAllDataConfigurationUtilUseCase>(FindAllDataConfigurationUtilUseCase);
    deleteConfigurationUtilUseCase = module.get<DeleteConfigurationUtilUseCase>(DeleteConfigurationUtilUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const data = {
      id: 1,
      name: 'ConfigurationTypeUtils'
    };
    const id = "s45de5d4g5y4k8g8y";
    const FindByUuid : FindByUuid= { uuid: id };
    const req = { user: { userId: 1 } };
    const user: FindById = { id: req.user.userId };
    const data1 ={
          id: 1,
          name: 'ConfigurationTypeUtils'
        };
        const data2 ={
          id: 2,
          name: 'ConfigurationTypeUtils'
        };
        const data3 ={
          id: 3,
          name: 'ConfigurationTypeUtils'
        };
  
  describe('create', () => {
    it('should call CreateConfigurationUtilUseCase and return result', async () => {
      const dto: CreateConfigurationUtilDto = {
        name: 'ConfigurationUtil',
        basicCosteHour: 10
      };
      const result = {
        status: true, message: 'Registro creado',
        data: {
          id: 1,
          dto,
        }
      };
      jest.spyOn(createConfigurationUtilUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto, req);
      expect(createConfigurationUtilUseCase.execute).toHaveBeenCalledWith(dto, user);
      expect(response).toEqual(result);
    });
  });

  describe('update', () => {
    it('should call UpdateConfigurationUtilUseCase and return result', async () => {
      const dto: UpdateConfigurationUtilDto = {
        name: 'ConfigurationUtilActualizado',
        basicCosteHour: 10
      };
      const result = {
        status: true, message: 'Registro actualizado',
        data: {
          id: 1,
          dto,
        }
      };
      jest.spyOn(updateConfigurationUtilUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.update(id, req, dto);
      expect(updateConfigurationUtilUseCase.execute).toHaveBeenCalledWith(FindByUuid, dto, user);
      expect(response).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should call FindOneConfigurationUtilUseCase and return result', async () => {

      const result = {
        status: true, message: 'Registro encontrado',
        data: [
          data,
        ],
        all: 1
      };
      jest.spyOn(findByConfigurationUtilUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findOne(id);
      expect(findByConfigurationUtilUseCase.execute).toHaveBeenCalledWith(FindByUuid);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call FindAllConfigurationUtilUseCase and return result', async () => {
      const pgdto: PaginationDto = {
        limit: 10,
        offset: 1,
        parameter: 'maquina',
        rol: 'admin',
      };
      const result = {
        status: true, message: 'Registros encontrados',
        data: [{
          data1,
          data2,
          data3
        }],
        all: 3
      };
      jest.spyOn(listConfigurationUtilUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAll(pgdto);
      expect(listConfigurationUtilUseCase.execute).toHaveBeenCalledWith(pgdto);
      expect(response).toEqual(result);
    });
  });

  describe('findAllData', () => {
    it('should call FindAllDataConfigurationUtilUseCase and return result', async () => {
      const result = {
        status: true, message: 'Registros encontrados',
        data: [{
          data1,
          data2,
          data3
        }],
        all: 3
      };
      jest.spyOn(findAllDataConfigurationUtilUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.findAllData();
      expect(findAllDataConfigurationUtilUseCase.execute).toHaveBeenCalledWith();
      expect(response).toEqual(result);
    });
  });

  describe('delete', () => {
    it('should call DeleteConfigurationUtilUseCase and return result', async () => {
      const result = {
        status: true, message: 'Registro eliminado',
        data: [
          data,
        ],
        all: 1
      };
      const req = { user: { userId: 1 } };
      jest.spyOn(deleteConfigurationUtilUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.remove(id, req);
      expect(deleteConfigurationUtilUseCase.execute).toHaveBeenCalledWith(FindByUuid, user);
      expect(response).toEqual(result);
    });
  });
});
