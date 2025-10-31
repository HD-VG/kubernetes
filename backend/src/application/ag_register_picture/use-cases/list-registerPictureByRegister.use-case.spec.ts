/* eslint-disable prettier/prettier */
import { ListRegisterPictureByRegisterUseCase } from './index.use-case';
import { IRegisterPictureRepository } from 'src/domain/ag_register_picture/interface/register_picture.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';
import { Response } from 'express';

describe('ListRegisterPictureByRegisterUseCase', () => {
  let useCase: ListRegisterPictureByRegisterUseCase;
  let repository: IRegisterPictureRepository;
  let mockRes: Partial<Response>;

  const FindByUuid: FindByUuid = { uuid: 's45de5d4g5y4k8g8y' };

  beforeEach(() => {
    // Mock parcial + as any
    repository = {
      listPicturesById: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      // agrega más si hay otros métodos en la interfaz
    } as any;

    mockRes = {
      setHeader: jest.fn(),
      send: jest.fn(),
    };

    useCase = new ListRegisterPictureByRegisterUseCase(repository);
  });

  it('should call repository, set correct headers, and send buffer via res.send', async () => {
    const mockBuffer = Buffer.from('fake zip content');
    (repository.listPicturesById as jest.Mock).mockResolvedValue(mockBuffer);

    await useCase.execute(mockRes as Response, FindByUuid);

    expect(repository.listPicturesById).toHaveBeenCalledWith(FindByUuid);
    expect(mockRes.setHeader).toHaveBeenCalledWith('Content-Type', 'application/pdf');
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      'Content-Disposition',
      'inline; filename="register_files_All.zip"'
    );
    expect(mockRes.send).toHaveBeenCalledWith(mockBuffer);
  });
});