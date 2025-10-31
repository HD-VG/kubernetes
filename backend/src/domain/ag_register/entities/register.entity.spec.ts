/* eslint-disable prettier/prettier */
import { Register } from './register.entity';
import { CreateRegisterDto, UpdateRegisterDto } from 'src/presentation/dtos/ag_register/index.dto'; // Ajusta la ruta si es necesario
import { SnapshotDTO } from 'src/presentation/dtos/ag_register/snapshot.dto'; // Si se usa, pero no en métodos
import { formatDate } from "src/common/utils/date.utils";

// Mocks para entidades relacionadas (simplificados)
const mockReporter = { id: 1, name: 'Test Reporter' } as any;
const mockReported = { id: 2, name: 'Test Reported' } as any;
const mockMachine = { id: 3, name: 'Test Machine' } as any;
const mockDagme = { id: 4, name: 'Test Dagme' } as any;
const mockWork = { id: 5, name: 'Test Work' } as any;
const mockUtil = { id: 6, name: 'Test Util' } as any;
const mockWorker = { id: 7, name: 'Test Worker' } as any;
const mockCar = { id: 8, name: 'Test Car' } as any; // Para OneToMany, pero no usado en create/update
const mockPicture = { id: 9, description: 'Test Picture' } as any; // No usado en métodos principales

describe('Register Entity', () => {
  const userId = 1;

  // Mock para validations
  const mockValidations = {
    validatedDtoMachine: [mockMachine],
    validatedDtoDagmes: [mockDagme],
    validatedDtoWorks: [mockWork],
    validatedDtoUtils: [mockUtil],
    validatedDtoWorker: [mockWorker],
    reported: mockReported,
    reporter: mockReporter,
  };

  const sampleDto: CreateRegisterDto = {
    reason: 'Test Reason',
    addressDagme: 'Test Address',
    dateDagme: new Date('2025-01-01'),
    timeStart: '10:00',
    timeWater: '11:00',
    perforation: 'Test Perforation',
    code: 'TEST123',
    cite: 1,
    timeInit: '09:00',
    timeEnd: '17:00',
    drillHole: 100,
    // snapshot opcional, no set en create
  } as any;

  describe('constructor', () => {
    it('debería inicializar con datos parciales', () => {
      const data = {
        reason: 'partial_reason',
        addressDagme: 'partial_address',
        reporter: mockReporter,
        configurationTypeMachines: [mockMachine],
      };
      const entity = new Register(data);
      expect(entity.reason).toBe('partial_reason');
      expect(entity.addressDagme).toBe('partial_address');
      expect(entity.reporter).toBe(mockReporter);
      expect(entity.configurationTypeMachines).toEqual([mockMachine]);
    });

    it('debería inicializar sin datos (valores por defecto)', () => {
      const entity = new Register();
      expect(entity.reason).toBeUndefined();
      expect(entity.addressDagme).toBeUndefined();
      expect(entity.reporter).toBeUndefined();
      expect(entity.configurationTypeMachines).toEqual(undefined);
    });
  });

  describe('create', () => {
    it('debería crear una entidad con los valores correctos', () => {
      const entity = Register.create(sampleDto, mockValidations, userId);

      expect(entity).toBeInstanceOf(Register);
      expect(entity.reason).toBe('Test Reason');
      expect(entity.addressDagme).toBe('Test Address');
      expect(entity.dateDagme).toEqual(new Date('2025-01-01'));
      expect(entity.timeStart).toBe('10:00');
      expect(entity.timeWater).toBe('11:00');
      expect(entity.perforation).toBe('Test Perforation');
      expect(entity.code).toBe('TEST123');
      expect(entity.cite).toBe(1);
      expect(entity.timeInit).toBe('09:00');
      expect(entity.timeEnd).toBe('17:00');
      expect(entity.drillHole).toBe(100);
      expect(entity.state).toBe(false);
      expect(entity.snapshot).toBeUndefined(); // No set
      expect(entity.configurationTypeMachines).toEqual(mockValidations.validatedDtoMachine);
      expect(entity.configurationTypeDagmes).toEqual(mockValidations.validatedDtoDagmes);
      expect(entity.configurationTypeWorks).toEqual(mockValidations.validatedDtoWorks);
      expect(entity.configurationUtil).toEqual(mockValidations.validatedDtoUtils);
      expect(entity.reported).toBe(mockValidations.reported);
      expect(entity.reporter).toBe(mockValidations.reporter);
      expect(entity.assignment_user).toEqual(mockValidations.validatedDtoWorker);
      expect(entity.createUserId).toBe(userId);
      expect(entity.createAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBeUndefined();
      expect(entity.deleteUserId).toBeUndefined();
      // Relaciones OneToMany iniciales vacías
      expect(entity.configurationTypeMaterials).toEqual(undefined);
      expect(entity.configurationCar).toEqual(undefined);
      expect(entity.registerPictures).toEqual(undefined);
    });
  });

  describe('update', () => {
    it('debería actualizar los valores de la entidad con DTO completo', () => {
      const entity = new Register({
        id: 1,
        reason: 'OLD_REASON',
        addressDagme: 'OLD_ADDRESS',
        dateDagme: new Date('2024-01-01'),
        timeStart: '08:00',
        // ... otros campos viejos
        reporter: { id: 99 } as any,
        configurationTypeMachines: [{ id: 99 }] as any,
      });

      const updateDto: UpdateRegisterDto = {
        reason: 'UPDATED_REASON',
        addressDagme: 'UPDATED_ADDRESS',
        dateDagme: new Date('2025-02-01'),
        timeStart: '12:00',
        timeWater: '13:00',
        perforation: 'UPDATED_Perforation',
        code: 'UPDATED123',
        cite: 2,
        timeInit: '11:00',
        timeEnd: '18:00',
        drillHole: 200,
      } as any;
      // Usa mismos mockValidations para simplicidad

      entity.update(updateDto, mockValidations, userId);

      expect(entity.reason).toBe('UPDATED_REASON');
      expect(entity.addressDagme).toBe('UPDATED_ADDRESS');
      expect(entity.dateDagme).toEqual(new Date('2025-02-01'));
      expect(entity.timeStart).toBe('12:00');
      expect(entity.timeWater).toBe('13:00');
      expect(entity.perforation).toBe('UPDATED_Perforation');
      expect(entity.code).toBe('UPDATED123');
      expect(entity.cite).toBe(2);
      expect(entity.timeInit).toBe('11:00');
      expect(entity.timeEnd).toBe('18:00');
      expect(entity.drillHole).toBe(200);
      expect(entity.state).toBe(false); // Se resetea
      expect(entity.configurationTypeMachines).toEqual(mockValidations.validatedDtoMachine);
      expect(entity.configurationTypeDagmes).toEqual(mockValidations.validatedDtoDagmes);
      expect(entity.configurationTypeWorks).toEqual(mockValidations.validatedDtoWorks);
      expect(entity.configurationUtil).toEqual(mockValidations.validatedDtoUtils);
      expect(entity.reported).toBe(mockValidations.reported);
      expect(entity.reporter).toBe(mockValidations.reporter);
      expect(entity.assignment_user).toEqual(mockValidations.validatedDtoWorker);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
      expect(entity.snapshot).toBeUndefined(); // No actualizado
    });
//hacer el test para datos incompletos....el dto obliga a todo
  });

  describe('delete', () => {
    it('debería asignar deleteUserId y deleteAt', () => {
      const entity = new Register({ id: 1, reason: 'TEST' });

      entity.delete(userId);

      expect(entity.deleteUserId).toBe(userId);
      expect(entity.deleteAt).toBeInstanceOf(Date);
    });
  });

  describe('list', () => {
    it('debería retornar un objeto con los datos listados, formateando createAt', () => {
      const date = new Date('2025-01-01T10:00:00Z');
      const entity = new Register({
        id: 1,
        uuid: 'TestUUIDRegister',
        reason: 'TEST_REASON',
        addressDagme: 'TEST_ADDRESS',
        timeStart: '10:00',
        timeWater: '11:00',
        perforation: 'TEST_PERF',
        code: 'TEST123',
        cite: 1,
        timeInit: '09:00',
        timeEnd: '17:00',
        drillHole: 100,
        createUserId: userId,
        createAt: date,
        updateUserId: userId,
        updateAt: date,
        deleteUserId: null,
        deleteAt: null,
      });

      // Mockear formatDate
      jest.spyOn(require('src/common/utils/date.utils'), 'formatDate')
        .mockReturnValue('2025-01-01 10:00:00');

      const response = entity.getResponse();

      expect(response).toEqual({
        id: 1,
        uuid: 'TestUUIDRegister',
        reason: 'TEST_REASON',
        addressDagme: 'TEST_ADDRESS',
        timeStart: '10:00',
        timeWater: '11:00',
        perforation: 'TEST_PERF',
        code: 'TEST123',
        cite: 1,
        timeInit: '09:00',
        timeEnd: '17:00',
        drillHole: 100,
        createUserId: userId,
        createAt: '2025-01-01 10:00:00',
        updateUserId: userId,
        updateAt: '2025-01-01 10:00:00',
        deleteUserId: null,
        deleteAt: null,
      });
    });
  });
});