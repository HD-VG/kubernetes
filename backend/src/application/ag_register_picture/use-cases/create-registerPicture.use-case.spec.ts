/* eslint-disable prettier/prettier */
import { FindById } from 'src/common/dto/findById.dto';
import { CreateRegisterPictureUseCase } from './index.use-case';
import { IRegisterPictureRepository } from 'src/domain/ag_register_picture/interface/register_picture.interface';
import { CreateRegisterPictureDto } from 'src/presentation/dtos/ag_register_picture/index.dto';

describe('CreateRegisterPictureUseCase', () => {
  let useCase: CreateRegisterPictureUseCase;
  let repository: IRegisterPictureRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateRegisterPictureUseCase(repository);
  });
  const user: FindById = { id:1 };
  it('should call repository.create with correct parameters', async () => {
    const dto: CreateRegisterPictureDto = {
      pictureUrl: "urlimagen",
      register_id: 1
    };

    // Mock del archivo Express.Multer.File simulamos una imagen
    const mockFile: Express.Multer.File = {
      fieldname: 'picture',  
      originalname: 'test-image.jpg',  
      encoding: '7bit', 
      mimetype: 'image/jpeg', 
      size: 1024, 
      buffer: Buffer.from('contenido simulado del archivo'), 
      destination: './uploads',  
      filename: 'test-image-123.jpg',  
      path: './uploads/test-image-123.jpg',  
      stream: null as any, 
    };

    const expectedResult = { 
      status: true, 
      message: 'Registro creado',
      data: [{
                id: 1,
                pictureUrl: "urlimagen",
                register_id: 1
            }],
            all: 1,
    };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, mockFile, user);

    // Verifica que se llame con los tres parámetros: dto, mockFile y user
    expect(repository.create).toHaveBeenCalledWith(dto, mockFile, user);
    expect(result).toEqual(expectedResult);
  });
});