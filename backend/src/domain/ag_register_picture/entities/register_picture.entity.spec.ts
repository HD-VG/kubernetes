/* eslint-disable prettier/prettier */
import { RegisterPicture } from './register_picture.entity';
import { CreateRegisterPictureDto, UpdateRegisterPictureDto } from 'src/presentation/dtos/ag_register_picture/index.dto';

describe('RegisterPicture Entity', () => {
  const userId = 1;
  const sampleCoste = 8760;

  describe('constructor', () => {
    it('debería inicializar con datos parciales', () => {
      const data = { 
        pictureUrl: 'img/img.jpg',
        register: undefined,
        createUserId: userId
      };
      const entity = new RegisterPicture(data);
      expect(entity.pictureUrl).toBe('img/img.jpg');
      expect(entity.register).toBe(undefined);
    });

    it('debería inicializar sin datos (valores por defecto)', () => {
      const entity = new RegisterPicture();
      expect(entity.pictureUrl).toBeUndefined(); // No set
      expect(entity.register).toBeUndefined();
    });
  });

  describe('create', () => {
    it('debería crear una entidad con los valores correctos', () => {
      const dto: CreateRegisterPictureDto = { 
        pictureUrl: 'img/img.jpg', 
      } as any;
      const register = { }

      const entity = RegisterPicture.create(dto, register,userId);

      expect(entity).toBeInstanceOf(RegisterPicture);
      expect(entity.pictureUrl).toBe('img/img.jpg'); // en mayus
      expect(entity.register).toBe(register);
      expect(entity.createUserId).toBe(userId);
      expect(entity.createAt).toBeInstanceOf(Date);
      expect(entity.updateUserId).toBeUndefined();
      expect(entity.deleteUserId).toBeUndefined();
    });
  });

  describe('delete', () => {
    it('debería asignar deleteUserId y deleteAt', () => {
      const entity = new RegisterPicture({ 
        id: 1, 
        pictureUrl: 'img/img.jpg', 
        register: undefined
      });

      entity.delete(userId);

      expect(entity.deleteUserId).toBe(userId);
      expect(entity.deleteAt).toBeInstanceOf(Date);
    });
  });

  describe('getResponse', () => {
    it('debería retornar un objeto con los datos transformados', () => {
      const entity = new RegisterPicture({
        id: 1,
        pictureUrl: 'img/img.jpg',
        createUserId: userId,
        createAt: new Date('2025-01-01T10:00:00Z'),
      });

      // Mockear formatDate para no depender de su implementación real
      jest.spyOn(require('src/common/utils/date.utils'), 'formatDate')
        .mockReturnValue('2025-01-01 10:00:00');

      const response = entity.getResponse();

      expect(response).toEqual({
        id: 1,
        pictureUrl: 'img/img.jpg',
        register: null,//es null por la relacion
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