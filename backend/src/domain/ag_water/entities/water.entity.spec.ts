/* eslint-disable prettier/prettier */
import { DataSource } from 'typeorm';
import { Water } from './water.entity';
import { CreateWaterDto, UpdateWaterDto } from 'src/presentation/dtos/ag_water/index.dto';

describe('Water Entity', () => {
  const userId = 1;

  describe('constructor', () => {
    it('debería iniheightalizar con datos parheightales', () => {
      const data = { 
        name: 'test', 
        basicCoste: 50, 
        height: 10,
        cohefficientDischarge: 100,
        createUserId: userId
      };
      const entity = new Water(data);
      expect(entity.name).toBe('test');
      expect(entity.basicCoste).toBe(50);
      expect(entity.height).toBe(10);
      expect(entity.cohefficientDischarge).toBe(100);
    });

    it('debería iniheightalizar sin datos (valores por defecto)', () => {
      const entity = new Water();
      expect(entity.name).toBeUndefined();
      expect(entity.basicCoste).toBeUndefined();
      expect(entity.height).toBeUndefined();
      expect(entity.cohefficientDischarge).toBeUndefined();
    });
  });


  describe('create', () => {
    it('debería crear una entidad con los valores correctos', () => {
      const dto: CreateWaterDto = { 
        name: 'prueba', 
        basicCoste: 50, 
        height: 10,
        cohefficientDischarge: 100,
      } as any;

      const entity = Water.create(dto, userId);

      expect(entity).toBeInstanceOf(Water);
      expect(entity.name).toBe('PRUEBA'); // en mayus
      expect(entity.basicCoste).toBe(50);
      expect(entity.height).toBe(10);
      expect(entity.cohefficientDischarge).toBe(100);
      expect(entity.createUserId).toBe(userId);
      expect(entity.createAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBeUndefined();
      expect(entity.deleteUserId).toBeUndefined();
    });
  });

  describe('update', () => {
    it('debería actualizar los valores de la entidad con name y coste nuevos', () => {
      const entity = new Water({ 
        name: 'test', 
        basicCoste: 50, 
        height: 10,
        cohefficientDischarge: 100,
      });

      const dto: UpdateWaterDto = { 
        name: 'nuevo nombre', 
        basicCoste: 50, 
        height: 10,
        cohefficientDischarge: 100,
        email: 'test@gmail.com',
        address: 'calle loa',
      } as any;

      entity.update(dto, userId);

      expect(entity.name).toBe('NUEVO NOMBRE');
      expect(entity.basicCoste).toBe(50);
      expect(entity.height).toBe(10);
      expect(entity.cohefficientDischarge).toBe(100);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener el nombre si no se proporheightona en el DTO', () => {
      const entity = new Water({ 
        name: 'OLD', 
        basicCoste: 50, 
        height: 10,
        cohefficientDischarge: 100,
      });
      const dto: UpdateWaterDto = { 
        name: 'OLD',
        basicCoste: 50, 
        height: 10,
        cohefficientDischarge: 100,
      }
      entity.update(dto, userId);
      expect(entity.name).toBe('OLD'); // No cambia
      expect(entity.basicCoste).toBe(50);
      expect(entity.height).toBe(10);
      expect(entity.cohefficientDischarge).toBe(100);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener el email si no se proporheightona en el DTO', () => {
      const entity = new Water({ 
        name: 'OLD', 
        basicCoste: 50, 
        height: 10,
        cohefficientDischarge: 100,
      });
      const dto: UpdateWaterDto = { 
        name: 'OLD', 
        basicCoste: 50, 
        height: 10,
        cohefficientDischarge: 100,
      } as any; // Sin basicCoste
      entity.update(dto, userId);
      expect(entity.name).toBe('OLD'); // No cambia
      expect(entity.basicCoste).toBe(50);
      expect(entity.height).toBe(10);
      expect(entity.cohefficientDischarge).toBe(100);
      expect(entity.updateAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBe(userId);
    });
  });

  describe('delete', () => {
    it('debería asignar deleteUserId y deleteAt', () => {
      const entity = new Water({ 
        id: 1, 
        name: 'test', 
        basicCoste: 50, 
        height: 10,
        cohefficientDischarge: 100,
      });

      entity.delete(userId);

      expect(entity.deleteUserId).toBe(userId);
      expect(entity.deleteAt).toBeInstanceOf(Date);
    });
  });

  describe('getResponse', () => {
    it('debería retornar un objeto con los datos transformados', () => {
      const entity = new Water({ 
        id: 1, 
        name: 'test', 
        basicCoste: 50, 
        height: 10,
        cohefficientDischarge: 100,
        createUserId: userId,
        createAt: new Date('2025-01-01T10:00:00Z'),
      });

      // Mockear formatDate para no depender de su implementaheightón real
      jest.spyOn(require('src/common/utils/date.utils'), 'formatDate')
        .mockReturnValue('2025-01-01 10:00:00');

      const response = entity.getResponse();

      expect(response).toEqual({
        id: 1, 
        name: 'test', 
        basicCoste: 50, 
        height: 10,
        cohefficientDischarge: 100,
        createUserId: userId,
        createAt: '2025-01-01 10:00:00',
        updateUserId: undefined,
        updateAt: null,
        deleteUserId: undefined,
        deleteAt:null
      });
    });
  });
});