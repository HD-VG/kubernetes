/* eslint-disable prettier/prettier */
import { Reported } from './reported.entity';
import { CreateReportedDto, UpdateReportedDto } from 'src/presentation/dtos/ag_reported/index.dto';
import { Register } from 'src/domain/ag_register/entities/register.entity';
describe('Reported Entity', () => {
  const userId = 1;
    
  describe('constructor', () => {
    it('debería inicializar con datos parciales', () => {
      const data = { 
        name: 'test', 
        lastname: 'test', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa',
        createUserId: userId
      };
      const entity = new Reported(data);
      expect(entity.name).toBe('test');
      expect(entity.lastname).toBe('test');
      expect(entity.ci).toBe('13134679');
      expect(entity.phone).toBe('75785778');
      expect(entity.email).toBe('test@gmail.com');
      expect(entity.address).toBe('calle loa');
    });

    it('debería inicializar sin datos (valores por defecto)', () => {
      const entity = new Reported();
      expect(entity.name).toBeUndefined();
      expect(entity.lastname).toBeUndefined();
      expect(entity.ci).toBeUndefined();
      expect(entity.phone).toBeUndefined();
      expect(entity.email).toBeUndefined();
      expect(entity.address).toBeUndefined();
    });
  });

  describe('create', () => {
    it('debería crear una entidad con los valores correctos', () => {
      const dto: CreateReportedDto = { 
        name: 'prueba', 
        lastname: 'test', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa', 
      } as any;

      const entity = Reported.create(dto, userId);

      expect(entity).toBeInstanceOf(Reported);
      expect(entity.name).toBe('PRUEBA'); // en mayus
      expect(entity.lastname).toBe('TEST');
      expect(entity.ci).toBe('13134679');
      expect(entity.phone).toBe('75785778');
      expect(entity.email).toBe('test@gmail.com');
      expect(entity.address).toBe('CALLE LOA');
      expect(entity.createUserId).toBe(userId);
      expect(entity.createAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBeUndefined();
      expect(entity.deleteUserId).toBeUndefined();
    });
  });

  describe('update', () => {
    it('debería actualizar los valores de la entidad con name y coste nuevos', () => {
      const entity = new Reported({ 
        name: 'test', 
        lastname: 'test', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa',
      });

      const dto: UpdateReportedDto = { 
        name: 'nuevo nombre', 
        lastname: 'test', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa',
      } as any;

      entity.update(dto, userId);

      expect(entity.name).toBe('NUEVO NOMBRE');
      expect(entity.lastname).toBe('TEST');
      expect(entity.ci).toBe('13134679');
      expect(entity.phone).toBe('75785778');
      expect(entity.email).toBe('test@gmail.com');
      expect(entity.address).toBe('CALLE LOA');
      expect(entity.updateUserId).toBe(userId);
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener el nombre si no se proporciona en el DTO', () => {
      const entity = new Reported({ 
        name: 'OLD', 
        lastname: 'Actualizado', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa',
      });
      const dto: UpdateReportedDto = { 
        lastname: 'Actualizado', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa' } as any; // Sin name
      entity.update(dto, userId);
      expect(entity.name).toBe('OLD'); // No cambia
      expect(entity.lastname).toBe('ACTUALIZADO');
      expect(entity.ci).toBe('13134679');
      expect(entity.phone).toBe('75785778');
      expect(entity.email).toBe('test@gmail.com');
      expect(entity.address).toBe('CALLE LOA');
      expect(entity.updateAt).toBeInstanceOf(Date);
    });

    it('debería mantener el email si no se proporciona en el DTO', () => {
      const entity = new Reported({ 
        name: 'OLD', 
        lastname: 'Actualizado', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa',
      });
      const dto: UpdateReportedDto = { 
        name: 'OLD', 
        lastname: 'Actualizado', 
        ci: '13134679',
        phone: '75785778',
        address: 'calle loa'} as any; // Sin basicCoste
      entity.update(dto, userId);
      expect(entity.name).toBe('OLD'); // No cambia
      expect(entity.lastname).toBe('ACTUALIZADO');
      expect(entity.ci).toBe('13134679');
      expect(entity.phone).toBe('75785778');
      expect(entity.email).toBe('test@gmail.com');
      expect(entity.address).toBe('CALLE LOA');
      expect(entity.updateAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBe(userId);
    });
  });

  describe('delete', () => {
    it('debería asignar deleteUserId y deleteAt', () => {
      const entity = new Reported({ 
        id: 1, 
        name: 'test', 
        lastname: 'test', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa',
      });

      entity.delete(userId);

      expect(entity.deleteUserId).toBe(userId);
      expect(entity.deleteAt).toBeInstanceOf(Date);
    });
  });

  describe('getResponse', () => {
    it('debería retornar un objeto con los datos transformados', () => {
      const entity = new Reported({ 
        id: 1, 
        name: 'test', 
        lastname: 'test', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa',
        createAt: new Date('2025-01-01T10:00:00Z'),
      });

      // Mockear formatDate para no depender de su implementación real
      jest.spyOn(require('src/common/utils/date.utils'), 'formatDate')
        .mockReturnValue('2025-01-01 10:00:00');

      const response = entity.getResponse();

      expect(response).toEqual({
        id: 1, 
        name: 'test', 
        lastname: 'test', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa',
        createUserId: undefined,
        createAt: '2025-01-01 10:00:00',
        updateUserId: undefined,
        updateAt: null,
        deleteUserId: undefined,
        deleteAt:null
      });
    });
  });
});