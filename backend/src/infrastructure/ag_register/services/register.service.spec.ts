/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RegisterService } from './register.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  ConfigurationTypeMachine,
  ConfigurationTypeDagme,
  ConfigurationTypeWork,
  ConfigurationUtil,
  Reported,
  Reporter,
  Water,
  Recurring,
  AsignationUserRol,
  ConfigurationTypeMaterial,
  ConfigurationCars,
} from 'src/domain/shared/index.entity';
import { Register } from 'src/domain/ag_register/entities/register.entity';
import { Repository } from 'typeorm';

describe('RegisterService', () => {
  let service: RegisterService;
  let configTypeMachineRepo: Repository<ConfigurationTypeMachine>;
  let configTypeDagmeRepo: Repository<ConfigurationTypeDagme>;
  let configTypeWorkRepo: Repository<ConfigurationTypeWork>;
  let configUtilRepo: Repository<ConfigurationUtil>;
  let reportedRepo: Repository<Reported>;
  let reporterRepo: Repository<Reporter>;
  let waterRepo: Repository<Water>;
  let recurringRepo: Repository<Recurring>;
  let asignationUserRolRepo: Repository<AsignationUserRol>;
  let configTypeMaterialRepo: Repository<ConfigurationTypeMaterial>;
  let configCarsRepo: Repository<ConfigurationCars>;

  const mockDto = {
    configurationTypeDagmes: [{ id: 1 }],
    configurationTypeWorks: [{ id: 1 }],
    configurationUtil: [{ id: 1 }],
    configurationTypeMachines: [{ id: 1 }],
    workerAssigment: [{ id: 1 }],
    reporter: 1,
    reported: 1,
  };

  const mockEntity = { id: 1, name: 'Test' };

  const mockRegister: Partial<Register> = {
    id: 1,
    reason: 'Test Reason',
    addressDagme: 'Test Address',
    dateDagme: new Date(),
    timeStart: '10:00',
    timeWater: '00:30',
    perforation: 'Test Perforation',
    code: 'TEST-001',
    cite: 123,
    timeInit: '10:00',
    timeEnd: '11:00',
    drillHole: 100, 
    createAt: new Date(),
    reporter: { 
      id: 1, 
      name: 'Reporter', 
      lastname: 'Last', 
      ci: '123', 
      phone: '123', 
      address: 'Addr',
      codeReporter: 'REP001' 
    } as Reporter,
    reported: { 
      id: 1, 
      name: 'Reported', 
      lastname: 'Last', 
      ci: '123', 
      phone: '123', 
      address: 'Addr' 
    } as Reported,
    configurationTypeDagmes: [{ id: 1, name: 'Test Dagme' } as ConfigurationTypeDagme],
    configurationTypeWorks: [{ id: 1, name: 'Test Work' } as ConfigurationTypeWork],
    configurationUtil: [{ id: 1, name: 'Test Util', basicCosteHour: 5 } as ConfigurationUtil], // Agregado para cálculos
    configurationTypeMachines: [{ id: 1, name: 'Test Machine', basicCosteHour: 10 } as ConfigurationTypeMachine], // Agregado para cálculos
    assignment_user: [{ id: 1 } as AsignationUserRol],
  };

  const mockAsignationUserRol: Partial<AsignationUserRol> = {
    id: 1,
    user: { id: 1, name: 'Test User' } as any,
    rol: { id: 1, name: 'Test Rol', monthlyBasic: 2400 } as any,
  };

  const mockConfigCar: Partial<ConfigurationCars> = {
    id: 1,
    time: '01:00',
    basicCoste: 15,
  };

  const mockAssignmentUserFormatted = {
    id: 1,
    userName: 'Test User',
    rolName: 'Test Rol',
    rolCost: 10, 
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterService,
        {
          provide: getRepositoryToken(ConfigurationTypeMachine),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ConfigurationTypeDagme),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ConfigurationTypeWork),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ConfigurationUtil),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Reported),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Reporter),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Water),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Recurring),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(AsignationUserRol),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ConfigurationTypeMaterial),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ConfigurationCars),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RegisterService>(RegisterService);
    configTypeMachineRepo = module.get<Repository<ConfigurationTypeMachine>>(getRepositoryToken(ConfigurationTypeMachine));
    configTypeDagmeRepo = module.get<Repository<ConfigurationTypeDagme>>(getRepositoryToken(ConfigurationTypeDagme));
    configTypeWorkRepo = module.get<Repository<ConfigurationTypeWork>>(getRepositoryToken(ConfigurationTypeWork));
    configUtilRepo = module.get<Repository<ConfigurationUtil>>(getRepositoryToken(ConfigurationUtil));
    reportedRepo = module.get<Repository<Reported>>(getRepositoryToken(Reported));
    reporterRepo = module.get<Repository<Reporter>>(getRepositoryToken(Reporter));
    waterRepo = module.get<Repository<Water>>(getRepositoryToken(Water));
    recurringRepo = module.get<Repository<Recurring>>(getRepositoryToken(Recurring));
    asignationUserRolRepo = module.get<Repository<AsignationUserRol>>(getRepositoryToken(AsignationUserRol));
    configTypeMaterialRepo = module.get<Repository<ConfigurationTypeMaterial>>(getRepositoryToken(ConfigurationTypeMaterial));
    configCarsRepo = module.get<Repository<ConfigurationCars>>(getRepositoryToken(ConfigurationCars));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('ValidationTableRelationalsDagmes', () => {
    it('should validate and return dagmes if provided', async () => {
      jest.spyOn(configTypeDagmeRepo, 'findBy').mockResolvedValue([mockEntity as ConfigurationTypeDagme]);
      const result = await service.ValidationTableRelationalsDagmes(mockDto);
      expect(configTypeDagmeRepo.findBy).toHaveBeenCalledWith(expect.objectContaining({ id: expect.any(Object) })); // Coincide con In([1])
      expect(result).toEqual([mockEntity]);
      expect(mockDto.configurationTypeDagmes).toEqual([mockEntity]);
    });
  });

  describe('ValidationTableRelationalsWorks', () => {
    it('should validate and return works if provided', async () => {
      jest.spyOn(configTypeWorkRepo, 'findBy').mockResolvedValue([mockEntity as ConfigurationTypeWork]);
      const result = await service.ValidationTableRelationalsWorks(mockDto);
      expect(configTypeWorkRepo.findBy).toHaveBeenCalledWith(expect.objectContaining({ id: expect.any(Object) }));
      expect(result).toEqual([mockEntity]);
    });
  });

  describe('ValidationTableRelationalsUtils', () => {
    it('should validate and return utils if provided', async () => {
      jest.spyOn(configUtilRepo, 'findBy').mockResolvedValue([mockEntity as ConfigurationUtil]);
      const result = await service.ValidationTableRelationalsUtils(mockDto);
      expect(configUtilRepo.findBy).toHaveBeenCalledWith(expect.objectContaining({ id: expect.any(Object) }));
      expect(result).toEqual([mockEntity]);
    });
  });

  describe('ValidationTableRelationalsMachines', () => {
    it('should validate and return machines if provided', async () => {
      jest.spyOn(configTypeMachineRepo, 'findBy').mockResolvedValue([mockEntity as ConfigurationTypeMachine]);
      const result = await service.ValidationTableRelationalsMachines(mockDto);
      expect(configTypeMachineRepo.findBy).toHaveBeenCalledWith(expect.objectContaining({ id: expect.any(Object) }));
      expect(result).toEqual([mockEntity]);
    });
  });

  describe('ValidationTableRelationalsAsignationUserRol', () => {
    it('should validate and return workers if provided', async () => {
      jest.spyOn(asignationUserRolRepo, 'findBy').mockResolvedValue([mockAsignationUserRol as AsignationUserRol]);
      const result = await service.ValidationTableRelationalsAsignationUserRol(mockDto);
      expect(asignationUserRolRepo.findBy).toHaveBeenCalledWith(expect.objectContaining({ id: expect.any(Object) }));
      // expect(mockDto.assignment_user).toEqual([mockAsignationUserRol]); // Comentado: Causa TS error, usa 'result' en su lugar
      expect(result).toEqual([mockAsignationUserRol]); // Verifica el retorno directo
    });
  });

  describe('ValidationReported', () => {
    it('should find and return reported', async () => {
      jest.spyOn(reportedRepo, 'findOneBy').mockResolvedValue(mockEntity as Reported);
      const result = await service.ValidationReported(mockDto);
      expect(reportedRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockEntity);
    });
  });

  describe('ValidationReporter', () => {
    it('should find and return reporter', async () => {
      jest.spyOn(reporterRepo, 'findOneBy').mockResolvedValue(mockEntity as Reporter);
      const result = await service.ValidationReporter(mockDto);
      expect(reporterRepo.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(mockEntity);
    });
  });

    describe('groupValidation', () => {
  it('should resolve ids into entities', async () => {
    const rawDto = {
      reporter: 1,
      reported: 2,
      configurationTypeMachines: [{ id: 6 }],
      configurationTypeWorks: [{ id: 7 }],
      configurationTypeDagmes: [{ id: 8 }],
      configurationUtil: [{ id: 9 }],
      assignment_user: [],
    };

    jest.spyOn(reporterRepo, 'findOneBy').mockResolvedValue({ id: 1 } as Reporter);
    jest.spyOn(reportedRepo, 'findOneBy').mockResolvedValue({ id: 2 } as Reported);
    jest.spyOn(configTypeMachineRepo, 'findBy').mockResolvedValue([{ id: 6 }] as ConfigurationTypeMachine[]);
    jest.spyOn(configTypeWorkRepo, 'findBy').mockResolvedValue([{ id: 7 }] as ConfigurationTypeWork[]);
    jest.spyOn(configTypeDagmeRepo, 'findBy').mockResolvedValue([{ id: 8 }] as ConfigurationTypeDagme[]);
    jest.spyOn(configUtilRepo, 'findBy').mockResolvedValue([{ id: 9 }] as ConfigurationUtil[]);
    jest.spyOn(asignationUserRolRepo, 'findBy').mockResolvedValue([] as AsignationUserRol[]);

    const response = await service.groupValidation(rawDto);

    expect(response).toEqual({
      reporter: { id: 1 },
      reported: { id: 2 },
      machine: [{ id: 6 }],
      works: [{ id: 7 }],
      dagmes: [{ id: 8 }],
      utils: [{ id: 9 }],
      worker: [],
    });
  });
});


  describe('getWater', () => {
    it('should find and return latest water', async () => {
      jest.spyOn(waterRepo, 'findOne').mockResolvedValue(mockEntity as Water);
      const result = await service.getWater();
      expect(waterRepo.findOne).toHaveBeenCalledWith(expect.objectContaining({ 
        where: expect.objectContaining({ deleteAt: expect.any(Object) }), 
        order: { createAt: 'DESC' } 
      }));
      expect(result).toEqual(mockEntity);
    });
  });

  describe('getRecurring', () => {
    it('should find and return all recurring', async () => {
      jest.spyOn(recurringRepo, 'find').mockResolvedValue([mockEntity as Recurring]);
      const result = await service.getRecurring();
      expect(recurringRepo.find).toHaveBeenCalledWith(expect.objectContaining({ 
        where: expect.objectContaining({ deleteAt: expect.any(Object) }) 
      }));
      expect(result).toEqual([mockEntity]);
    });
  });

  describe('extractUtilsIds', () => {
    it('should extract and return utils', async () => {
      jest.spyOn(configUtilRepo, 'find').mockResolvedValue([mockEntity as ConfigurationUtil]);
      const result = await service.extractUtilsIds(mockRegister as Register);
      expect(configUtilRepo.find).toHaveBeenCalledWith(expect.objectContaining({ 
        where: expect.objectContaining({ 
          id: expect.any(Object), 
          deleteAt: expect.any(Object) 
        }) 
      }));
      expect(result).toEqual([mockEntity]);
    });
  });

  describe('extractDagmeIds', () => {
    it('should extract and return dagmes', async () => {
      jest.spyOn(configTypeDagmeRepo, 'find').mockResolvedValue([mockEntity as ConfigurationTypeDagme]);
      const result = await service.extractDagmeIds(mockRegister as Register);
      expect(configTypeDagmeRepo.find).toHaveBeenCalledWith(expect.objectContaining({ 
        where: expect.objectContaining({ 
          id: expect.any(Object), 
          deleteAt: expect.any(Object) 
        }) 
      }));
      expect(result).toEqual([mockEntity]);
    });
  });

  describe('extractWorkIds', () => {
    it('should extract and return works', async () => {
      jest.spyOn(configTypeWorkRepo, 'find').mockResolvedValue([mockEntity as ConfigurationTypeWork]);
      const result = await service.extractWorkIds(mockRegister as Register);
      expect(configTypeWorkRepo.find).toHaveBeenCalledWith(expect.objectContaining({ 
        where: expect.objectContaining({ 
          id: expect.any(Object), 
          deleteAt: expect.any(Object) 
        }) 
      }));
      expect(result).toEqual([mockEntity]);
    });
  });

  describe('extracMaterials', () => {
    it('should extract and return materials', async () => {
      jest.spyOn(configTypeMaterialRepo, 'find').mockResolvedValue([mockEntity as ConfigurationTypeMaterial]);
      const result = await service.extracMaterials(1);
      expect(configTypeMaterialRepo.find).toHaveBeenCalledWith(expect.objectContaining({ 
        where: expect.objectContaining({ 
          register: { id: 1 }, 
          deleteAt: expect.any(Object) 
        }) 
      }));
      expect(result).toEqual([mockEntity]);
    });
  });

  describe('extracCars', () => {
    it('should extract and return cars', async () => {
      jest.spyOn(configCarsRepo, 'find').mockResolvedValue([mockConfigCar as ConfigurationCars]);
      const result = await service.extracCars(1);
      expect(configCarsRepo.find).toHaveBeenCalledWith(expect.objectContaining({ 
        where: expect.objectContaining({ 
          register: { id: 1 }, 
          deleteAt: expect.any(Object) 
        }) 
      }));
      expect(result).toEqual([mockConfigCar]);
    });
  });

  describe('extractAssignmentUserIds', () => {
    it('should extract and return formatted assignment users', async () => {
      jest.spyOn(asignationUserRolRepo, 'find').mockResolvedValue([mockAsignationUserRol as AsignationUserRol]);
      const result = await service.extractAssignmentUserIds(mockRegister as Register);
      expect(asignationUserRolRepo.find).toHaveBeenCalledWith(expect.objectContaining({ 
        where: expect.objectContaining({ 
          id: expect.any(Object), 
          deleteAt: expect.any(Object) 
        }), 
        relations: ['user', 'rol'] 
      }));
      expect(result).toEqual([mockAssignmentUserFormatted]);
    });
  });

  describe('extractMachineIds', () => {
    it('should extract and return machines', async () => {
      jest.spyOn(configTypeMachineRepo, 'find').mockResolvedValue([mockEntity as ConfigurationTypeMachine]);
      const result = await service.extractMachineIds(mockRegister as Register);
      expect(configTypeMachineRepo.find).toHaveBeenCalledWith(expect.objectContaining({ 
        where: expect.objectContaining({ 
          id: expect.any(Object), 
          deleteAt: expect.any(Object) 
        }) 
      }));
      expect(result).toEqual([mockEntity]);
    });
  });

  describe('getMonthNameInSpanish', () => {
    it('should return Spanish month name', () => {
      const result = service.getMonthNameInSpanish(1);
      expect(result).toBe('Enero');
    });
  });

  describe('calcularTimeCars', () => {
    it('should convert time string to hours', () => {
      const result = service.calcularTimeCars('02:30');
      expect(result).toBe(2.5);
    });
  });

  describe('convertirATotalMinutos', () => {
    it('should convert time string to total minutes', () => {
      const result = service.convertirATotalMinutos('02:30');
      expect(result).toBe(150);
    });
  });

  describe('calculate_time', () => {
    it('should calculate absolute difference in minutes', () => {
      const result = service.calculate_time('10:00', '11:30');
      expect(result).toBe(90);
    });
  });

  describe('getSnapshot', () => {
    it('should return formatted snapshot', async () => {
      jest.spyOn(service, 'extractMachineIds').mockResolvedValue([mockEntity as ConfigurationTypeMachine]);
      jest.spyOn(service, 'extractDagmeIds').mockResolvedValue([mockEntity as ConfigurationTypeDagme]);
      jest.spyOn(service, 'extractWorkIds').mockResolvedValue([mockEntity as ConfigurationTypeWork]);
      jest.spyOn(service, 'extractUtilsIds').mockResolvedValue([mockEntity as ConfigurationUtil]);
      jest.spyOn(service, 'extractAssignmentUserIds').mockResolvedValue([mockAssignmentUserFormatted]);
      jest.spyOn(service, 'extracMaterials').mockResolvedValue([mockEntity as ConfigurationTypeMaterial]);
      jest.spyOn(service, 'extracCars').mockResolvedValue([mockConfigCar as ConfigurationCars]);
      jest.spyOn(service, 'getWater').mockResolvedValue(mockEntity as Water);
      jest.spyOn(service, 'getRecurring').mockResolvedValue([mockEntity as Recurring]);

      const result = await service.getSnapshot(mockRegister as Register);
      expect(result.id).toBe(1);
      expect(result.machine_ids).toEqual([mockEntity]);
      expect(result.assignment_userIds).toEqual([mockAssignmentUserFormatted]);
    });
  });

  describe('roundToNearest', () => {
    it('should round to nearest 0.10', () => {
      const result = service.roundToNearest(1.05);
      expect(result).toBe(1.1);
    });
  });
  describe('resolveEntities', () => {
    const mockDto = { configurationUtil: [{ id: 1 }, { id: 2 }] };
    const mockEntities = [
      { id: 1, name: 'Util 1' },
      { id: 2, name: 'Util 2' },
    ];

    it('should return empty array if no items provided', async () => {
      const dto = { configurationUtil: [] };
      const result = await service.resolveEntities(dto, 'configurationUtil', configUtilRepo);
      expect(result).toEqual([]);
    });

    it('should resolve entities using findBy when overwrite is true', async () => {
      jest.spyOn(configUtilRepo, 'findBy').mockResolvedValue(mockEntities as ConfigurationUtil[]);
      const dto = { ...mockDto };

      const result = await service.resolveEntities(dto, 'configurationUtil', configUtilRepo, { overwrite: true });

      expect(configUtilRepo.findBy).toHaveBeenCalledWith(expect.objectContaining({ id: expect.any(Object) }));
      expect(result).toEqual(mockEntities);
      expect(dto.configurationUtil).toEqual(mockEntities); // Se sobreescribe
    });

    it('should resolve entities using find with soft delete check', async () => {
      jest.spyOn(configUtilRepo, 'find').mockResolvedValue(mockEntities as ConfigurationUtil[]);
      const dto = { ...mockDto };

      const result = await service.resolveEntities(dto, 'configurationUtil', configUtilRepo, { withSoftDeleteCheck: true });

      expect(configUtilRepo.find).toHaveBeenCalledWith(expect.objectContaining({
        where: expect.objectContaining({
          id: expect.any(Object),
          deleteAt: expect.any(Object),
        }),
      }));
      expect(result).toEqual(mockEntities);
    });

    it('should not overwrite dto when overwrite is false', async () => {
      jest.spyOn(configUtilRepo, 'findBy').mockResolvedValue(mockEntities as ConfigurationUtil[]);
      const dto = { ...mockDto };

      const result = await service.resolveEntities(dto, 'configurationUtil', configUtilRepo);

      expect(result).toEqual(mockEntities);
      expect(dto.configurationUtil).toEqual([{ id: 1 }, { id: 2 }]); // no cambia
    });

    it('should map entities when mapper is provided', async () => {
      jest.spyOn(configUtilRepo, 'findBy').mockResolvedValue(mockEntities as ConfigurationUtil[]);
      const dto = { ...mockDto };

      const result = await service.resolveEntities(dto, 'configurationUtil', configUtilRepo, {
        mapper: (e) => ({ ...e, extra: 'mapped' }),
      });

      expect(result).toEqual([
        { id: 1, name: 'Util 1', extra: 'mapped' },
        { id: 2, name: 'Util 2', extra: 'mapped' },
      ]);
    });
  });


  describe('printResumen', () => {
    it('should print resumen with safe calculations', async () => {
      const mockWater: Partial<Water> = { height: 1, cohefficientDischarge: 1, basicCoste: 1 };
      const mockRecurring: Partial<Recurring>[] = [{ basicCoste: 10 }];
      const mockResult = [mockRegister as Register];

      jest.spyOn(service, 'getWater').mockResolvedValue(mockWater as Water);
      jest.spyOn(service, 'getRecurring').mockResolvedValue(mockRecurring as Recurring[]);
      jest.spyOn(service, 'extractMachineIds').mockResolvedValue([{ basicCosteHour: 10 } as ConfigurationTypeMachine]);
      jest.spyOn(service, 'extractUtilsIds').mockResolvedValue([{ basicCosteHour: 5 } as ConfigurationUtil]);
      jest.spyOn(service, 'extracMaterials').mockResolvedValue([{ totalCost: 20 } as ConfigurationTypeMaterial]);
      jest.spyOn(service, 'extracCars').mockResolvedValue([{ time: '01:00', basicCoste: 15 } as ConfigurationCars]);
      jest.spyOn(service, 'extractAssignmentUserIds').mockResolvedValue([mockAssignmentUserFormatted]);

      const result = await service.printResumen(mockRegister as Register, mockResult);
      expect(result.totalCost).toBeGreaterThan(0);
      expect(Array.isArray(result.formattedData)).toBe(true);
      expect(result.formattedData[0].registerTotalCost).toBeGreaterThan(0);
    });
  });

  describe('calculateCosts', () => {
  const mockRegister = { id: 1, drillHole: 2000 } as Register;
  const mockWater = { height: 10, cohefficientDischarge: 5, basicCoste: 2 } as Water;
  const mockRecurring = [{ basicCoste: 50 }] as Recurring[];

  beforeEach(() => {
    jest.spyOn(service, 'extractMachineIds').mockResolvedValue([{ basicCosteHour: 100 }] as any);
    jest.spyOn(service, 'extractUtilsIds').mockResolvedValue([{ basicCosteHour: 50 }] as any);
    jest.spyOn(service, 'extracMaterials').mockResolvedValue([{ totalCost: 200 }] as any);
    jest.spyOn(service, 'extracCars').mockResolvedValue([{ basicCoste: 20, time: '01:00' }] as any);
    jest.spyOn(service, 'extractAssignmentUserIds').mockResolvedValue([{ rolCost: 10 }] as any);
    jest.spyOn(service, 'roundToNearest').mockImplementation((val) => Math.round(val));
    jest.spyOn(service, 'calcularTimeCars').mockReturnValue(1);
  });

  it('should calculate all costs correctly and return totals', async () => {
    const result = await service['calculateCosts'](mockRegister, mockWater, mockRecurring, 120, 60);

    expect(result).toHaveProperty('machineCost');
    expect(result).toHaveProperty('utilCost');
    expect(result).toHaveProperty('materialCost');
    expect(result).toHaveProperty('carCost');
    expect(result).toHaveProperty('assignmentUserCost');
    expect(result).toHaveProperty('recurringCost');
    expect(result).toHaveProperty('waterCost');
    expect(result).toHaveProperty('totalCost');

    expect(result.totalCost).toBeGreaterThan(0);
  });
});

describe('getBaseRegisterData', () => {
  const mockRegister = {
    id: 1,
    reason: 'Test reason',
    addressDagme: 'Test address',
    dateDagme: new Date(),
    timeStart: '08:00',
    timeWater: '09:00',
    perforation: 'Test perf',
    code: 'CODE-1',
    cite: 123,
    timeInit: '08:00',
    timeEnd: '10:00',
    drillHole: 2000,
    createAt: new Date(),
    reporter: { codeReporter: 'REP001', name: 'Juan', lastname: 'Perez', ci: '123', phone: '999', address: 'Dir1' },
    reported: { name: 'Ana', lastname: 'Lopez', ci: '456', phone: '888', address: 'Dir2' }
  } as any;

  beforeEach(() => {
    jest.spyOn(service, 'extractMachineIds').mockResolvedValue([]);
    jest.spyOn(service, 'extractDagmeIds').mockResolvedValue([]);
    jest.spyOn(service, 'extractWorkIds').mockResolvedValue([]);
    jest.spyOn(service, 'extractUtilsIds').mockResolvedValue([]);
    jest.spyOn(service, 'extractAssignmentUserIds').mockResolvedValue([]);
    jest.spyOn(service, 'extracMaterials').mockResolvedValue([]);
    jest.spyOn(service, 'extracCars').mockResolvedValue([]);
    jest.spyOn(service, 'getWater').mockResolvedValue({} as Water);
    jest.spyOn(service, 'getRecurring').mockResolvedValue([]);
    jest.spyOn(service, 'calculate_time').mockReturnValue(120);
    jest.spyOn(service, 'convertirATotalMinutos').mockReturnValue(60);
  });

  it('should build base register data with extracted ids', async () => {
    const result = await service['getBaseRegisterData'](mockRegister);
    expect(result).toHaveProperty('id', 1);
    expect(result).toHaveProperty('reason', 'Test reason');
    expect(result).toHaveProperty('reporter_name', 'Juan');
    expect(result).toHaveProperty('reported_name', 'Ana');
  });
});

describe('printRegister', () => {
  const mockRegister = { id: 1, drillHole: 2000, timeInit: '08:00', timeEnd: '10:00', timeWater: '09:00' } as any;
  const mockWater = { height: 10, cohefficientDischarge: 5, basicCoste: 2 } as Water;
  const mockRecurring = [] as Recurring[];

  beforeEach(() => {
    jest.spyOn(service, 'calculate_time').mockReturnValue(120);
    jest.spyOn(service, 'convertirATotalMinutos').mockReturnValue(60);
    jest.spyOn(service, 'calculateCosts').mockResolvedValue({
      machineCost: 1, utilCost: 2, materialCost: 3, carCost: 4, assignmentUserCost: 5,
      recurringCost: 6, waterCost: 7, totalCost: 28
    });
    jest.spyOn(service, 'getBaseRegisterData').mockResolvedValue({ base: true } as any);
  });

  it('should return formatted data when result is not empty', async () => {
    const response = await service.printRegister(mockRegister, mockWater, mockRecurring, [mockRegister]);
    expect(response.status).toBe(true);
    expect(response.data[0]).toHaveProperty('coste_total');
  });

  it('should return "Datos no encontrados" when result is empty', async () => {
    const response = await service.printRegister(mockRegister, mockWater, mockRecurring, []);
    expect(response.message).toBe('Datos no encontrados');
  });
});

describe('sumAmountsByMonth', () => {
  const mockRegister = { id: 1, createAt: new Date('2025-09-01'), timeInit: '08:00', timeEnd: '10:00', timeWater: '09:00', drillHole: 2000 } as any;

  beforeEach(() => {
    jest.spyOn(service, 'calculate_time').mockReturnValue(120);
    jest.spyOn(service, 'convertirATotalMinutos').mockReturnValue(60);
    jest.spyOn(service, 'calculateCosts').mockResolvedValue({ totalCost: 100 } as any);
    jest.spyOn(service, 'getWater').mockResolvedValue({} as Water);
    jest.spyOn(service, 'getRecurring').mockResolvedValue([]);
    jest.spyOn(service, 'getMonthNameInSpanish').mockReturnValue('Septiembre');
  });

  it('should sum totals by month and year', async () => {
    const result = await service.sumAmountsByMonth([mockRegister]);
    expect(result[0]).toEqual(expect.objectContaining({ month: 'Septiembre', year: 2025, total: 100 }));
  });
});

describe('sumAmountByRegisterId', () => {
  const mockRegister = {
    id: 1,
    timeInit: '08:00',
    timeEnd: '10:00',
    timeWater: '09:00',
    snapshot: { id: 1, dagme_ids: [{ name: 'Dagme1' }] }
  } as any;

  beforeEach(() => {
    jest.spyOn(service, 'calculate_time').mockReturnValue(120);
    jest.spyOn(service, 'convertirATotalMinutos').mockReturnValue(60);
    jest.spyOn(service, 'calculateCosts').mockResolvedValue({ carCost: 1, materialCost: 2, assignmentUserCost: 3, utilCost: 4, machineCost: 5, recurringCost: 6, waterCost: 7, totalCost: 28 } as any);
    jest.spyOn(service, 'getWater').mockResolvedValue({} as Water);
    jest.spyOn(service, 'getRecurring').mockResolvedValue([]);
  });

  it('should return null if snapshot is invalid', async () => {
    const result = await service.sumAmountByRegisterId({ snapshot: null } as any);
    expect(result).toBeNull();
  });

  it('should return costs and snapshot data when valid', async () => {
    const result = await service.sumAmountByRegisterId(mockRegister);
    expect(result).toHaveProperty('totalDamageCost');
    expect(result.dagmes_name).toContain('Dagme1');
  });
});

describe('generateReportByMonthAndYear', () => {
  const mockRegister = { id: 1, addressDagme: 'Test', reason: 'Reason', reported: { name: 'A', lastname: 'B' }, createAt: new Date(), timeInit: '08:00', timeEnd: '10:00', timeWater: '09:00', code: 'C1', cite: 123 } as any;

  beforeEach(() => {
    jest.spyOn(service, 'calculate_time').mockReturnValue(120);
    jest.spyOn(service, 'convertirATotalMinutos').mockReturnValue(60);
    jest.spyOn(service, 'calculateCosts').mockResolvedValue({ totalCost: 99 } as any);
    jest.spyOn(service, 'getWater').mockResolvedValue({} as Water);
    jest.spyOn(service, 'getRecurring').mockResolvedValue([]);
  });

  it('should generate report data with costs', async () => {
    const result = await service.generateReportByMonthAndYear([mockRegister]);
    expect(result[0]).toEqual(expect.objectContaining({ totalCost: 99, cite: 123 }));
  });
});
});