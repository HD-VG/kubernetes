/* eslint-disable prettier/prettier */
import { Recurring } from './recurring.entity';
import { CreateRecurringDto, UpdateRecurringDto } from 'src/presentation/dtos/ag_recurring/index.dto';

describe('Recurring Entity', () => {
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
      const entity = new Recurring(data);
      expect(entity.name).toBe('test');
      expect(entity.basicCoste).toBe(1000);
    });

    it('debería inicializar sin datos (valores por defecto)', () => {
      const entity = new Recurring();
      expect(entity.name).toBeUndefined(); // No set
      expect(entity.basicCoste).toBeUndefined();
    });
  });

  describe('create', () => {
    it('debería crear una entidad con los valores correctos', () => {
      const dto: CreateRecurringDto = { 
        name: 'prueba', 
        basicCoste: sampleCoste 
      } as any;

      const entity = Recurring.create(dto, userId);

      expect(entity).toBeInstanceOf(Recurring);
      expect(entity.name).toBe('PRUEBA'); // en mayus
      expect(entity.basicCoste).toBe(sampleCoste);
      expect(entity.createUserId).toBe(userId);
      expect(entity.createAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBeUndefined();
      expect(entity.deleteUserId).toBeUndefined();
    });
  });

  describe('update', () => {
    it('debería actualizar los valores de la entidad con name y coste nuevos', () => {
      const entity = new Recurring({ 
        id: 1, 
        name: 'OLD', 
        basicCoste: 1000, 
      });

      const newCoste = 2000;
      const dto: UpdateRecurringDto = { 
        name: 'nuevo nombre', 
        basicCoste: newCoste 
      } as any;

      entity.update(dto, userId);

      expect(entity.name).toBe('NUEVO NOMBRE');
      expect(entity.basicCoste).toBe(newCoste);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener el nombre si no se proporciona en el DTO', () => {
      const entity = new Recurring({ 
        id: 1, 
        name: 'OLD', 
        basicCoste: 1000
      });
      const newCoste = 2000;
      const dto: UpdateRecurringDto = { basicCoste: newCoste } as any; // Sin name
      entity.update(dto, userId);
      expect(entity.name).toBe('OLD'); // No cambia
      expect(entity.basicCoste).toBe(newCoste);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener el coste si no se proporciona en el DTO', () => {
      const entity = new Recurring({ 
        id: 1, 
        name: 'OLD', 
        basicCoste: 1000, 
      });
      const dto: UpdateRecurringDto = { name: 'NUEVO' } as any; // Sin basicCoste
      entity.update(dto, userId);
      expect(entity.name).toBe('NUEVO');
      expect(entity.basicCoste).toBe(1000);
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });
  });

  describe('delete', () => {
    it('debería asignar deleteUserId y deleteAt', () => {
      const entity = new Recurring({ 
        id: 1, 
        name: 'ACTUAL', 
        basicCoste: 1000
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
      const entity = new Recurring({
        id: 1,
        uuid: 'TESTUUIDRecurring',
        name: 'PRUEBA',
        basicCoste: sampleCoste,
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
        uuid: 'TESTUUIDRecurring',
        name: 'PRUEBA',
        basicCoste: sampleCoste,
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