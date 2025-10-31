/* eslint-disable prettier/prettier */
import { ConfigurationTypeWork } from './configuration_type_work.entity';
import { CreateConfigurationTypeWorkDto, UpdateConfigurationTypeWorkDto } from 'src/presentation/dtos/ag_configuration_type_work/index.dto';

describe('ConfigurationTypeWork Entity', () => {
  const userId = 1;

  describe('constructor', () => {
    it('debería inicializar con datos parciales', () => {
      const data = { name: 'test', status: false };
      const entity = new ConfigurationTypeWork(data);
      expect(entity.name).toBe('test');
      expect(entity.registers).toEqual(undefined); // Inicial vacío para relaciones
    });

    it('debería inicializar sin datos (valores por defecto)', () => {
      const entity = new ConfigurationTypeWork();
      expect(entity.name).toBeUndefined(); // No set
    });
  });

  describe('create', () => {
    it('debería crear una entidad con los valores correctos', () => {
      const dto: CreateConfigurationTypeWorkDto = { name: 'prueba' } as any;

      const entity = ConfigurationTypeWork.create(dto, userId);

      expect(entity).toBeInstanceOf(ConfigurationTypeWork);
      expect(entity.name).toBe('PRUEBA'); // en mayus
      expect(entity.createUserId).toBe(userId);
      expect(entity.createAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBeUndefined();
      expect(entity.deleteUserId).toBeUndefined();
    });
  });

  describe('update', () => {
    it('debería actualizar los valores de la entidad', () => {
      const entity = new ConfigurationTypeWork({ id: 1, name: 'OLD' });

      const dto: UpdateConfigurationTypeWorkDto = { name: 'nuevo nombre' } as any;

      entity.update(dto, userId);

      expect(entity.name).toBe('NUEVO NOMBRE');
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener el nombre si no se proporciona en el DTO', () => {
      const entity = new ConfigurationTypeWork({ id: 1, name: 'OLD'});
      const dto: UpdateConfigurationTypeWorkDto = {} as any; // Sin name
      entity.update(dto, userId);
      expect(entity.name).toBe('OLD'); // No cambia
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });
  });

  describe('delete', () => {
    it('debería asignar deleteUserId y deleteAt', () => {
      const entity = new ConfigurationTypeWork({ id: 1, name: 'ACTUAL' });

      entity.delete(userId);

      expect(entity.deleteUserId).toBe(userId);
      expect(entity.deleteAt).toBeInstanceOf(Date);
    });
  });

  describe('getResponse', () => {
    it('debería retornar un objeto con los datos transformados', () => {
      const entity = new ConfigurationTypeWork({
        id: 1,
        uuid: 'TESTConfigurationTypeWorkUUID',
        name: 'PRUEBA',
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
        uuid: 'TESTConfigurationTypeWorkUUID',
        name: 'PRUEBA',
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