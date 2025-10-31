/* eslint-disable prettier/prettier */
import { Reporter } from './reporter.entity';
import { CreateReporterDto, UpdateReporterDto } from 'src/presentation/dtos/ag_reporter/index.dto';
import { Register } from 'src/domain/ag_register/entities/register.entity';

describe('Reporter Entity', () => {
  const userId = 1;
  class MockRegister {
    id: 1;
    reason: 'TEST_REASON';
    addressDagme: 'TEST_ADDRESS';
    timeStart: '10:00';
    timeWater: '11:00';
    perforation: 'TEST_PERF';
    code: 'TEST123';
    cite: 1;
    timeInit: '09:00';
    timeEnd: '17:00';
    drillHole: 100;
  }

  describe('relaciones', () => {
  it('debería asignar y mantener la relación OneToMany con Register', () => {
    const mockRegister1 = new Register({ reason: 'test1' });
    mockRegister1.id = 1; 

    const mockRegister2 = new Register({ reason: 'test2' });
    mockRegister2.id = 2;

    const entity = Reporter.create(
      { 
        name: 'prueba', 
        lastname: 'test', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa', 
      } as CreateReporterDto, 
      userId
    );

    // Asigna la relación
    entity.register = [mockRegister1, mockRegister2];

    expect(entity.register).toHaveLength(2);
    expect(entity.register[0].reason).toBe('test1');
    expect(entity.register[1].reason).toBe('test2');

    // Verifica que update no rompa la relación
    entity.update(
      { 
        name: 'updated' 
      } as UpdateReporterDto, 
      userId
    );

    expect(entity.name).toBe('UPDATED'); // Lógica de update
    expect(entity.register).toHaveLength(2); // Relación intacta
    expect(entity.register[0].reason).toBe('test1'); // No se toca
  });

  // it('debería inicializar la relación como array vacío en constructor', () => {
  //   const entity = new Reporter();
  //   expect(entity.register).toEqual([]); // TypeORM inicializa como [] por default en OneToMany
  // });

  // it('debería permitir agregar Registers dinámicamente sin romper getResponse', () => {
  //   const entity = new Reporter({ 
  //     name: 'test', 
  //     lastname: 'test', 
  //     ci: '13134679',
  //     phone: '75785778',
  //     email: 'test@gmail.com',
  //     address: 'calle loa',
  //     createAt: new Date('2025-01-01T10:00:00Z'),
  //   });

  //   const mockRegister = new Register({ reason: 'dynamic test' });
  //   mockRegister.id = 999;
  //   entity.register.push(mockRegister);

  //   // Mock formatDate como antes
  //   jest.spyOn(require('src/common/utils/date.utils'), 'formatDate')
  //     .mockReturnValue('2025-01-01 10:00:00');

  //   const response = entity.getResponse();
  //   // getResponse no incluye register (bien, evita serializar todo), pero verifica que no crashee
  //   expect(response.createAt).toBe('2025-01-01 10:00:00');
  //   // Opcional: si quisieras incluir, podrías testear expect(response.register).toBeUndefined(); pero no es necesario
  // });
});
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
      const entity = new Reporter(data);
      expect(entity.name).toBe('test');
      expect(entity.lastname).toBe('test');
      expect(entity.ci).toBe('13134679');
      expect(entity.phone).toBe('75785778');
      expect(entity.email).toBe('test@gmail.com');
      expect(entity.address).toBe('calle loa');
    });

    it('debería inicializar sin datos (valores por defecto)', () => {
      const entity = new Reporter();
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
      const dto: CreateReporterDto = { 
        name: 'prueba', 
        lastname: 'test', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa', 
      } as any;

      const entity = Reporter.create(dto, userId);

      expect(entity).toBeInstanceOf(Reporter);
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
      const entity = new Reporter({ 
        name: 'test', 
        lastname: 'test', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa',
      });

      const dto: UpdateReporterDto = { 
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
      const entity = new Reporter({ 
        name: 'OLD', 
        lastname: 'Actualizado', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa',
      });
      const dto: UpdateReporterDto = { 
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
      const entity = new Reporter({ 
        name: 'OLD', 
        lastname: 'Actualizado', 
        ci: '13134679',
        phone: '75785778',
        email: 'test@gmail.com',
        address: 'calle loa',
      });
      const dto: UpdateReporterDto = { 
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
      const entity = new Reporter({ 
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
      const entity = new Reporter({ 
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