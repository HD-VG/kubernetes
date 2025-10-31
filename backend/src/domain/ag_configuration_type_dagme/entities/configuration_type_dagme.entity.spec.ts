/* eslint-disable prettier/prettier */
import { ConfigurationTypeDagme } from './configuration_type_dagme.entity';
import { CreateConfigurationTypeDagmeDto, UpdateConfigurationTypeDagmeDto } from 'src/presentation/dtos/ag_configuration_type_dagme/index.dto';

describe('ConfigurationTypeDagme Entity', () => {
  const userId = 1;

  describe('constructor', () => {
    it('debería inicializar con datos parciales', () => {
      const data = { name: 'test', status: false };
      const entity = new ConfigurationTypeDagme(data);
      expect(entity.name).toBe('test');
      expect(entity.status).toBe(false);
      expect(entity.registers).toEqual(undefined); // Inicial vacío para relaciones
    });

    it('debería inicializar sin datos (valores por defecto)', () => {
      const entity = new ConfigurationTypeDagme();
      expect(entity.name).toBeUndefined(); // No set
      expect(entity.status).toBeUndefined();
    });
  });

  describe('create', () => {
    it('debería crear una entidad con los valores correctos', () => {
      const dto: CreateConfigurationTypeDagmeDto = { name: 'prueba' } as any;

      const entity = ConfigurationTypeDagme.create(dto, userId);

      expect(entity).toBeInstanceOf(ConfigurationTypeDagme);
      expect(entity.name).toBe('PRUEBA'); // en mayus
      expect(entity.status).toBe(true);
      expect(entity.createUserId).toBe(userId);
      expect(entity.createAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBeUndefined();
      expect(entity.deleteUserId).toBeUndefined();
    });
  });

  describe('update', () => {
    it('debería actualizar los valores de la entidad', () => {
      const entity = new ConfigurationTypeDagme({ id: 1, name: 'OLD', status: true });

      const dto: UpdateConfigurationTypeDagmeDto = { name: 'nuevo nombre' } as any;

      entity.update(dto, userId);

      expect(entity.name).toBe('NUEVO NOMBRE');
      expect(entity.status).toBe(true);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
      expect(entity.status).toBe(true); // No cambia
    });

    it('debería mantener el nombre si no se proporciona en el DTO', () => {
      const entity = new ConfigurationTypeDagme({ id: 1, name: 'OLD', status: true });
      const dto: UpdateConfigurationTypeDagmeDto = {} as any; // Sin name
      entity.update(dto, userId);
      expect(entity.name).toBe('OLD'); // No cambia
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });
  });

  describe('delete', () => {
    it('debería asignar deleteUserId y deleteAt', () => {
      const entity = new ConfigurationTypeDagme({ id: 1, name: 'ACTUAL', status: true });

      entity.delete(userId);

      expect(entity.deleteUserId).toBe(userId);
      expect(entity.deleteAt).toBeInstanceOf(Date);
      expect(entity.status).toBe(true); // Soft delete, no cambia status
    });
  });

  describe('getResponse', () => {
    it('debería retornar un objeto con los datos transformados', () => {
      const entity = new ConfigurationTypeDagme({
        id: 1,
        uuid: 'TESTConfigurationTypeDagmeUUID',
        name: 'PRUEBA',
        status: true,
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
        uuid: 'TESTConfigurationTypeDagmeUUID',
        name: 'PRUEBA',
        status: true,
        createUserId: userId,
        createAt: '2025-01-01 10:00:00',
        updateUserId: userId,
        updateAt: '2025-01-01 10:00:00',
        deleteUserId: null,
        deleteAt: null
      });
    });
  });
});