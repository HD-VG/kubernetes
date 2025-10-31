/* eslint-disable prettier/prettier */
import { ConfigurationTypeMachine } from './configuration_type_machine.entity';
import { CreateConfigurationTypeMachineDto, UpdateConfigurationTypeMachineDto } from 'src/presentation/dtos/ag_configuration_type_machine/index.dto';

describe('ConfigurationTypeMachine Entity', () => {
  const userId = 1;
  const sampleCoste = 8760;

  describe('constructor', () => {
    it('debería inicializar con datos parciales', () => {
      const data = { 
        name: 'test', 
        basicCoste: 1000, 
        basicCosteYear: 2.74, 
        basicCosteHour: 0.114, 
        status: false 
      };
      const entity = new ConfigurationTypeMachine(data);
      expect(entity.name).toBe('test');
      expect(entity.basicCoste).toBe(1000);
      expect(entity.basicCosteYear).toBe(2.74);
      expect(entity.basicCosteHour).toBe(0.114);
      expect(entity.registers).toEqual(undefined); // Inicial vacío para relaciones
    });

    it('debería inicializar sin datos (valores por defecto)', () => {
      const entity = new ConfigurationTypeMachine();
      expect(entity.name).toBeUndefined(); // No set
      expect(entity.basicCoste).toBeUndefined();
      expect(entity.basicCosteYear).toBeUndefined();
      expect(entity.basicCosteHour).toBeUndefined();
    });
  });

  describe('create', () => {
    it('debería crear una entidad con los valores correctos', () => {
      const dto: CreateConfigurationTypeMachineDto = { 
        name: 'prueba', 
        basicCoste: sampleCoste 
      } as any;

      const entity = ConfigurationTypeMachine.create(dto, userId);

      expect(entity).toBeInstanceOf(ConfigurationTypeMachine);
      expect(entity.name).toBe('PRUEBA'); // en mayus
      expect(entity.basicCoste).toBe(sampleCoste);
      expect(entity.basicCosteYear).toBeCloseTo(sampleCoste / 365); // Aprox 24
      expect(entity.basicCosteHour).toBeCloseTo((sampleCoste / 365) / 24); // Aprox 1
      expect(entity.createUserId).toBe(userId);
      expect(entity.createAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBeUndefined();
      expect(entity.deleteUserId).toBeUndefined();
    });
  });

  describe('update', () => {
    it('debería actualizar los valores de la entidad con name y coste nuevos', () => {
      const entity = new ConfigurationTypeMachine({ 
        id: 1, 
        name: 'OLD', 
        basicCoste: 1000, 
        basicCosteYear: 1000 / 365, 
        basicCosteHour: (1000 / 365) / 24 
      });

      const newCoste = 2000;
      const dto: UpdateConfigurationTypeMachineDto = { 
        name: 'nuevo nombre', 
        basicCoste: newCoste 
      } as any;

      entity.update(dto, userId);

      expect(entity.name).toBe('NUEVO NOMBRE');
      expect(entity.basicCoste).toBe(newCoste);
      expect(entity.basicCosteYear).toBeCloseTo(newCoste / 365);
      expect(entity.basicCosteHour).toBeCloseTo((newCoste / 365) / 24);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener el nombre si no se proporciona en el DTO', () => {
      const entity = new ConfigurationTypeMachine({ 
        id: 1, 
        name: 'OLD', 
        basicCoste: 1000, 
        basicCosteYear: 1000 / 365, 
        basicCosteHour: (1000 / 365) / 24 
      });
      const newCoste = 2000;
      const dto: UpdateConfigurationTypeMachineDto = { basicCoste: newCoste } as any; // Sin name
      entity.update(dto, userId);
      expect(entity.name).toBe('OLD'); // No cambia
      expect(entity.basicCoste).toBe(newCoste);
      expect(entity.basicCosteYear).toBeCloseTo(newCoste / 365);
      expect(entity.basicCosteHour).toBeCloseTo((newCoste / 365) / 24);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener el coste si no se proporciona en el DTO (y recalcular basado en el viejo)', () => {
      const entity = new ConfigurationTypeMachine({ 
        id: 1, 
        name: 'OLD', 
        basicCoste: 1000, 
        basicCosteYear: 1000 / 365, 
        basicCosteHour: (1000 / 365) / 24 
      });
      const dto: UpdateConfigurationTypeMachineDto = { name: 'NUEVO' } as any; // Sin basicCoste
      entity.update(dto, userId);
      expect(entity.name).toBe('NUEVO');
      expect(entity.basicCoste).toBe(1000); // No cambia
      expect(entity.basicCosteYear).toBeCloseTo(1000 / 365); // Recalculado del viejo
      expect(entity.basicCosteHour).toBeCloseTo((1000 / 365) / 24);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });
  });

  describe('delete', () => {
    it('debería asignar deleteUserId y deleteAt', () => {
      const entity = new ConfigurationTypeMachine({ 
        id: 1, 
        name: 'ACTUAL', 
        basicCoste: 1000, 
        basicCosteYear: 1000 / 365, 
        basicCosteHour: (1000 / 365) / 24 
      });

      entity.delete(userId);

      expect(entity.deleteUserId).toBe(userId);
      expect(entity.deleteAt).toBeInstanceOf(Date);
    });
  });

  describe('getResponse', () => {
    it('debería retornar un objeto con los datos transformados', () => {
      const sampleYear = sampleCoste / 365;
      const sampleHour = sampleYear / 24;
      const entity = new ConfigurationTypeMachine({
        id: 1,
        uuid: 'testUUID',
        name: 'PRUEBA',
        basicCoste: sampleCoste,
        basicCosteYear: sampleYear,
        basicCosteHour: sampleHour,
        createUserId: userId,
        createAt: new Date('2025-01-01T10:00:00Z'),
        updateUserId: userId,
        updateAt: new Date('2025-01-01T10:00:00Z'),
        deleteUserId: null,
        deleteAt: null,
      });

      // Mockear formatDate para no depender de su implementación real
      jest.spyOn(require('src/common/utils/date.utils'), 'formatDate')
        .mockReturnValue('2025-01-01 10:00:00');

      const response = entity.getResponse();

      expect(response).toEqual({
        id: 1,
        uuid: 'testUUID',
        name: 'PRUEBA',
        basicCoste: sampleCoste,
        basicCosteHour: sampleHour,
        basicCosteYear: sampleYear,
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