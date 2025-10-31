/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationCarsService } from './configuration_cars.service';
import { ConfigurationCars } from 'src/domain/ag_configuration_cars/entities/configuration_car.entity';
import { Register } from 'src/domain/ag_register/entities/register.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { of} from 'rxjs';
import { StoreVehicles, Vehicles } from 'src/presentation/dtos/ag_configuration_cars/index.dto';
import { AxiosResponse } from 'axios';
import { Reporter } from 'src/domain/ag_reporter/entities/reporter.entity';
import { Reported } from 'src/domain/ag_reported/entities/reported.entity';
import { ConfigurationTypeMaterial } from 'src/domain/ag_configuration_type_material/entities/configuration_type_material.entity';
import { ConfigurationUtil } from 'src/domain/ag_configuration_utils/entities/configuration_util.entity';
import { ConfigurationTypeMachine } from 'src/domain/ag_configuration_type_machine/entities/configuration_type_machine.entity';
import { ConfigurationTypeDagme } from 'src/domain/ag_configuration_type_dagme/entities/configuration_type_dagme.entity';
import { ConfigurationTypeWork } from 'src/domain/ag_configuration_type_work/entities/configuration_type_work.entity';
import { AsignationUserRol } from 'src/domain/auth_asignation_user_rol/entities/asignacion_user_rol.entity';
import { RegisterPicture } from 'src/domain/ag_register_picture/entities/register_picture.entity';

describe('ConfigurationCarsService', () => {
  let service: ConfigurationCarsService;
  let httpService: HttpService;
  let registerRepository: Repository<Register>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigurationCarsService,
        {
          provide: getRepositoryToken(ConfigurationCars),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Register),
          useClass: Repository,
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ConfigurationCarsService>(ConfigurationCarsService);
    httpService = module.get<HttpService>(HttpService);
    registerRepository = module.get<Repository<Register>>(getRepositoryToken(Register));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCarsApi', () => {
    it('should call getCarsApi and return vehicle data', async () => {
      const vehiculos: Vehicles = {
        idVehiculo: 1,
        placa: '1310 - IFE',
        marca: 'TOYOTA',
        modelo: 'VAGONETA',
        costo_base: 30,
        estado: 1,
      };
      const storeVehicles: StoreVehicles = { data: vehiculos };
      const mockResponse: AxiosResponse<StoreVehicles> = {
        data: storeVehicles,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} as any }, 
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
      const result = await service.getCarsApi();
      expect(httpService.get).toHaveBeenCalledWith(`${process.env.URL_RRHH}/vehiculos`);
      expect(result).toEqual(vehiculos);
    });
  });

  describe('getCarsByIdApi', () => {
    it('should call getCarsByIdApi and return vehicle data for a given ID', async () => {
      const vehiculos: Vehicles = {
        idVehiculo: 1,
        placa: '1310 - IFE',
        marca: 'TOYOTA',
        modelo: 'VAGONETA',
        costo_base: 30,
        estado: 1,
      };
      const storeVehicles: StoreVehicles = { data: vehiculos };
      const mockResponse: AxiosResponse<StoreVehicles> = {
        data: storeVehicles,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} as any }, 
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
      const result = await service.getCarsByIdApi(1);
      expect(httpService.get).toHaveBeenCalledWith(`${process.env.URL_RRHH}/vehiculos/1`);
      expect(result).toEqual(vehiculos);
    });
  });

  describe('ValidationRegister', () => {
    it('should call ValidationRegister and return register data', async () => {
      const register: Register = {
                    id: 1,
                    reason: 'Test Reason',
                    addressDagme: 'Test Address',
                    dateDagme: new Date('2025-09-11T10:00:00Z'),
                    timeStart: '10:00',
                    timeWater: '11:00',
                    perforation: 'Test Perforation',
                    code: 'TEST-001',
                    cite: 12345,
                    timeInit: '09:00',
                    timeEnd: '12:00',
                    drillHole: 100,
                    state: false,
                    snapshot: {},//esto no se prueba aun
                    createUserId: 1,
                    updateUserId: null,
                    deleteUserId: null,
                    createAt: new Date('2025-09-11T09:00:00Z'),
                    updateAt: null,
                    deleteAt: null,
                    //son las relaciones 
                    reporter: {id: 1,name: 'Test Reporter',} as Reporter,
                    reported: {id: 1,name: 'Test Reported',} as Reported,
                    //como son mucho a mucho son tiop array
                    configurationTypeMaterials: [{id: 1,name: 'Test Material',} as ConfigurationTypeMaterial,],
                    configurationCar: [{id: 1} as ConfigurationCars,],
                    configurationUtil: [{id: 1,name: 'Test Util',} as ConfigurationUtil,],
                    configurationTypeMachines: [{id: 1,name: 'Test Machine',} as ConfigurationTypeMachine,],
                    configurationTypeDagmes: [{id: 1,name: 'Test Dagme',} as ConfigurationTypeDagme,],
                    configurationTypeWorks: [{id: 1,name: 'Test Work',} as ConfigurationTypeWork,],
                    assignment_user: [{id: 1,} as AsignationUserRol,],
                    registerPictures: [{id: 1,pictureUrl: 'http://example.com/picture.jpg',} as RegisterPicture,],
                  } as Register;
      jest.spyOn(registerRepository, 'findOneBy').mockResolvedValue(register);
      const result = await service.ValidationRegister(1);
      expect(registerRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(register);
    });
  });
});