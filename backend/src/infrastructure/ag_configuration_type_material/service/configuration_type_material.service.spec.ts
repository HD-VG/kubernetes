/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigurationTypeMaterialService } from './configuration_type_material.service';
import { ConfigurationTypeMaterial } from 'src/domain/ag_configuration_type_material/entities/configuration_type_material.entity';
import { Register } from 'src/domain/ag_register/entities/register.entity'; 
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigurationTypeMaterialRepository } from '../repository/configuration_type_material.repository';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { StoreMaterials, Materials} from 'src/presentation/dtos/ag_configuration_type_material/getApiMaterials.dto';
import { AxiosResponse } from 'axios';
import { Reporter } from 'src/domain/ag_reporter/entities/reporter.entity';
import { Reported } from 'src/domain/ag_reported/entities/reported.entity';
import { ConfigurationCars } from 'src/domain/ag_configuration_cars/entities/configuration_car.entity';
import { ConfigurationUtil } from 'src/domain/ag_configuration_utils/entities/configuration_util.entity';
import { ConfigurationTypeMachine } from 'src/domain/ag_configuration_type_machine/entities/configuration_type_machine.entity';
import { ConfigurationTypeDagme } from 'src/domain/ag_configuration_type_dagme/entities/configuration_type_dagme.entity';
import { ConfigurationTypeWork } from 'src/domain/ag_configuration_type_work/entities/configuration_type_work.entity';
import { AsignationUserRol } from 'src/domain/auth_asignation_user_rol/entities/asignacion_user_rol.entity';
import { RegisterPicture } from 'src/domain/ag_register_picture/entities/register_picture.entity';

describe('ConfigurationTypeMaterialService', () => {
  let service: ConfigurationTypeMaterialService;
  let httpService: HttpService;
  let registerRepository: Repository<Register>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigurationTypeMaterialService,
        ConfigurationTypeMaterialRepository,
        {
          provide: getRepositoryToken(ConfigurationTypeMaterial),
          useClass: Repository, 
        },
        {
          provide: getRepositoryToken(Register),
          useClass: Repository, 
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() => of({ data: {} })),
            post: jest.fn(() => of({ data: {} })),
          },
        },
      ],
    }).compile();

    service = module.get<ConfigurationTypeMaterialService>(ConfigurationTypeMaterialService);
    httpService = module.get<HttpService>(HttpService);
    registerRepository = module.get<Repository<Register>>(getRepositoryToken(Register));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('getMaterialsApi', () => {
    it('should call getMaterialsApi and return vehicle data', async () => {
      const materiales: Materials = {
          codigo: "string",
          padre: "string",
          nivel: 1,
          ramas: 1,
          nombre: "string",
          unidad: "string",
          valMinimo: 1,
          valMaximo: 1,
          precioUs: 1,
          PrecioBs: 1,
          tipoItem: "string",
          iAlmacen: "string",
          cantidadD: 1,
          cantidadH: 1,
          saldoCantidad: 1,
          debeBs: 1,
          HaberBs: 1,
          SaldoCosto: 1
      };
      const storeMateriales: StoreMaterials = { data: materiales };
      const mockResponse: AxiosResponse<StoreMaterials> = {
        data: storeMateriales,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: { headers: {} as any }, 
      };

      jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));
      const result = await service.getMaterialsApi();
      expect(httpService.get).toHaveBeenCalledWith(`${process.env.URL_ELAPAS_POSEIDON}/datos`);
      expect(result).toEqual(materiales);
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


  describe('calculation', () => {
    it('should calculate cost correctly for valid inputs', () => {
      const dto: any = {
        SaldoCosto: 100,
        saldoCantidad: 10,
        quantity: 5,
        valMinimo: 0,
        valMaximo: 0,
        precioUs: 0,
        PrecioBs: 0,
        debeBs: 0,
        HaberBs: 0,
      };

      const result = service.calculation(dto);
      // solucion hecha a mano ((100/10)*5)+((100/10)*0.2)=(10*5)+(10*0.2)=50+2=52
      expect(result).toBe(52);
    });
  });

  describe('limitPrecision', () => {
    it('should round number to specified scale', () => {
      const value = 123.45678912345;
      const result = service.limitPrecision(value, 12, 8);
      // Redondeo a 8 decimales: 123.45678912
      expect(result).toBeCloseTo(123.45678912, 8);
    });

    it('should truncate integer part if it exceeds precision', () => {
      const value = 12345678.12345678; // Parte entera (8 dígitos) excede precisión (12-8=4)
      const result = service.limitPrecision(value, 12, 8);
      // Máxima parte entera permitida: 9999 (4 dígitos)
      expect(result).toBe(9999); // Trunca a 9999.00000000
    });

    it('should return null or undefined values unchanged', () => {
      expect(service.limitPrecision(null, 12, 8)).toBeNull();
      expect(service.limitPrecision(undefined, 12, 8)).toBeUndefined();
    });

    it('should handle zero correctly', () => {
      const result = service.limitPrecision(0, 12, 8);
      expect(result).toBe(0);
    });
  });

  describe('calculationPrecision', () => {
    it('should apply limitPrecision to all numeric properties', () => {
      const dto: any = {
        SaldoCosto: 123.45678912345,
        saldoCantidad: 10,
        quantity: 5,
        valMinimo: 123.45678912345,
        valMaximo: 234.56789123456,
        precioUs: 345.67891234567,
        PrecioBs: 456.78912345678,
        debeBs: 567.89123456789,
        HaberBs: 678.91234567891,
      };
      const calculation = 52.12345678912345;

      const result = service.calculationPrecision(dto, calculation);

      expect(result.valMinimo).toBeCloseTo(123.45678912, 8);
      expect(result.valMaximo).toBeCloseTo(234.56789123, 8);
      expect(result.precioUs).toBeCloseTo(345.67891235, 8);
      expect(result.PrecioBs).toBeCloseTo(456.78912346, 8);
      expect(result.debeBs).toBeCloseTo(567.89123457, 8);
      expect(result.HaberBs).toBeCloseTo(678.91234568, 8);
      expect(result.SaldoCosto).toBeCloseTo(52.12345679, 8);
    });

    it('should handle null values in DTO properties', () => {
      const dto: any = {
        SaldoCosto: 123.45678912345,
        saldoCantidad: 10,
        quantity: 5,
        valMinimo: null,
        valMaximo: null,
        precioUs: null,
        PrecioBs: null,
        debeBs: null,
        HaberBs: null,
      };
      const calculation = 52.12345678912345;

      const result = service.calculationPrecision(dto, calculation);

      expect(result.valMinimo).toBeNull();
      expect(result.valMaximo).toBeNull();
      expect(result.precioUs).toBeNull();
      expect(result.PrecioBs).toBeNull();
      expect(result.debeBs).toBeNull();
      expect(result.HaberBs).toBeNull();
      expect(result.SaldoCosto).toBeCloseTo(52.12345679, 8);
    });

    it('should truncate values exceeding precision', () => {
      const dto: any = {
        SaldoCosto: 12345678.12345678,
        saldoCantidad: 10,
        quantity: 5,
        valMinimo: 12345678.12345678,
        valMaximo: 23456789.23456789,
        precioUs: 34567890.34567890,
        PrecioBs: 45678901.45678901,
        debeBs: 56789012.56789012,
        HaberBs: 67890123.67890123,
      };
      const calculation = 12345678.12345678;

      const result = service.calculationPrecision(dto, calculation);

      expect(result.valMinimo).toBe(9999);
      expect(result.valMaximo).toBe(9999);
      expect(result.precioUs).toBe(9999);
      expect(result.PrecioBs).toBe(9999);
      expect(result.debeBs).toBe(9999);
      expect(result.HaberBs).toBe(9999);
      expect(result.SaldoCosto).toBe(9999);
    });
  });
});