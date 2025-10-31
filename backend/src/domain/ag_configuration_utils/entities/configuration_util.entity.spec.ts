/* eslint-disable prettier/prettier */
import { ConfigurationUtil } from './configuration_util.entity';
import { CreateConfigurationUtilDto, UpdateConfigurationUtilDto } from 'src/presentation/dtos/ag_configuration_utils/index.dto';

describe('ConfigurationUtil Entity', () => {
  const userId = 1;
  const sampleCoste = 3000; 

  describe('constructor', () => {
    it('debería inicializar con datos parciales', () => {
      const data = { 
        name: 'test', 
        basicCosteHour: sampleCoste, 
        status: false 
      };
      const entity = new ConfigurationUtil(data);
      expect(entity.name).toBe('test');
      expect(entity.basicCosteHour).toBe(sampleCoste);
      expect(entity.registers).toEqual(undefined); 
    });

    it('debería inicializar sin datos (valores por defecto)', () => {
      const entity = new ConfigurationUtil();
      expect(entity.name).toBeUndefined(); 
      expect(entity.basicCosteHour).toBeUndefined();
    });
  });

  describe('create', () => {
    it('debería crear una entidad con los valores correctos', () => {
      const dto: CreateConfigurationUtilDto = { 
        name: 'prueba', 
        basicCosteHour: 3000
      } as any;

      const entity = ConfigurationUtil.create(dto, userId);

      expect(entity).toBeInstanceOf(ConfigurationUtil);
      expect(entity.name).toBe('PRUEBA'); // en mayus
      expect(entity.basicCosteHour).toBe(sampleCoste); 
      expect(entity.createUserId).toBe(userId);
      expect(entity.createAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBeUndefined();
      expect(entity.deleteUserId).toBeUndefined();
    });
  });

  describe('update', () => {
    it('debería actualizar los valores de la entidad con name y coste nuevos', () => {
      const entity = new ConfigurationUtil({ 
        id: 1, 
        name: 'OLD',
        basicCosteHour: sampleCoste 
      });

      const newCoste = 2000;
      const dto: UpdateConfigurationUtilDto = { 
        name: 'nuevo nombre', 
        basicCosteHour: newCoste 
      } as any;

      entity.update(dto, userId);

      expect(entity.name).toBe('NUEVO NOMBRE');
      expect(entity.basicCosteHour).toBe(newCoste);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener el nombre si no se proporciona en el DTO', () => {
      const entity = new ConfigurationUtil({ 
        id: 1, 
        name: 'OLD', 
        basicCosteHour: 3000
      });
      const newCoste = 2000;
      const dto: UpdateConfigurationUtilDto = { basicCosteHour: newCoste } as any; 
      entity.update(dto, userId);
      expect(entity.name).toBe('OLD'); 
      expect(entity.basicCosteHour).toBe(newCoste);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener el coste si no se proporciona en el DTO (y recalcular basado en el viejo)', () => {
      const entity = new ConfigurationUtil({ 
        id: 1, 
        name: 'OLD',  
        basicCosteHour: sampleCoste
      });
      const dto: UpdateConfigurationUtilDto = { name: 'NUEVO' } as any;
      entity.update(dto, userId);
      expect(entity.name).toBe('NUEVO');
      expect(entity.basicCosteHour).toBeCloseTo(sampleCoste);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });
  });

  describe('delete', () => {
    it('debería asignar deleteUserId y deleteAt', () => {
      const entity = new ConfigurationUtil({ 
        id: 1, 
        name: 'ACTUAL', 
        basicCosteHour: sampleCoste
      });

      entity.delete(userId);

      expect(entity.deleteUserId).toBe(userId);
      expect(entity.deleteAt).toBeInstanceOf(Date);
    });
  });

  describe('getResponse', () => {
    it('debería retornar un objeto con los datos transformados', () => {
      const entity = new ConfigurationUtil({
        id: 1,
        uuid: 'TESTConfigurationUtilentityUUID',
        name: 'PRUEBA',
        basicCosteHour: sampleCoste,
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
        uuid: 'TESTConfigurationUtilentityUUID',
        name: 'PRUEBA',
        basicCosteHour: sampleCoste,
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