import { Test, TestingModule } from '@nestjs/testing';
import { RegisterPictureController } from './register_picture.controller';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import { 
  CreateRegisterPictureUseCase,
  ListRegisterPictureByRegisterUseCase,
  DeleteRegisterPictureUseCase 
} from 'src/application/ag_register_picture/use-cases/index.use-case';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';
import { RegisterPictureService } from 'src/infrastructure/ag_register_picture/service/register_picture.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Readable } from 'stream';

describe('RegisterPictureController', () => {
  let controller: RegisterPictureController;
  let createRegisterPictureUseCase: CreateRegisterPictureUseCase;
  let listRegisterPictureByRegisterUseCase: ListRegisterPictureByRegisterUseCase;
  let deleteRegisterPictureUseCase: DeleteRegisterPictureUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterPictureController],
      providers: [
        {
          provide: RegisterPictureService,
          useValue: { execute: jest.fn() }
        },
        {
          provide: CreateRegisterPictureUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: ListRegisterPictureByRegisterUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: DeleteRegisterPictureUseCase,
          useValue: { execute: jest.fn() }
        },
        {
          provide: JwtStrategy,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            verify: jest.fn(),
            sign: jest.fn(),
          },
        },
        {
          provide: Reflector,
          useValue: { get: jest.fn() }
        },
        {
          provide: IAuthRepositoryToken,
          useValue: { findUserRoles: jest.fn() }
        },
        {
          provide: AuthService,
          useValue: { validateUser: jest.fn() }
        },
        {
          provide: RolesGuard, useClass: RolesGuard
        },
      ],
    })
    .overrideInterceptor(FileInterceptor('file'))
    .useValue({ intercept: (context, next) => next.handle() })
    .compile();

    controller = module.get<RegisterPictureController>(RegisterPictureController);
    createRegisterPictureUseCase = module.get<CreateRegisterPictureUseCase>(CreateRegisterPictureUseCase);
    listRegisterPictureByRegisterUseCase = module.get<ListRegisterPictureByRegisterUseCase>(ListRegisterPictureByRegisterUseCase);
    deleteRegisterPictureUseCase = module.get<DeleteRegisterPictureUseCase>(DeleteRegisterPictureUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const id = "s45de5d4g5y4k8g8y";
  const FindByUuid : FindByUuid= { uuid: id };
  const req = { user: { userId: 1 } };
  const user: FindById = { id: req.user.userId };

  describe('create', () => {
    it('should call CreateRegisterPictureUseCase and return result', async () => {
      const dto = { 
        register_id: 1,
        pictureUrl: 'carpeta/1',
      };

      const file = { buffer: Buffer.from('test') } as Express.Multer.File;
      const result = { status: true, message: 'Registro creado' };
      jest.spyOn(createRegisterPictureUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(file, dto, req);
      expect(createRegisterPictureUseCase.execute).toHaveBeenCalledWith(dto, file, user);
      expect(response).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should call DeleteRegisterPictureUseCase and return the result', async () => {
        const result = { status: true, message: 'Registro eliminado' };
        const findById: FindById = { id: Number(id) };
        jest.spyOn(deleteRegisterPictureUseCase, 'execute').mockResolvedValue(result);
        const response = await controller.remove(id, req);
        expect(deleteRegisterPictureUseCase.execute).toHaveBeenCalledWith(FindByUuid, user);
        expect(response).toEqual(result);
    });
  });

describe('listFile', () => {
  it('should call listregisterPictureByRegisterUseCase and pipe the stream to response', async () => {
    const mockStream = new Readable();
    mockStream.push(null);
    mockStream.pipe = jest.fn().mockReturnThis();

    const res = {
      setHeader: jest.fn(),
    };

    // Usa spyOn para mockear el método execute
    const executeSpy = jest.spyOn(listRegisterPictureByRegisterUseCase, 'execute');
    executeSpy.mockImplementation((response: any) => {
      response.setHeader('Content-Type', 'application/zip');
      response.setHeader(
        'Content-Disposition',
        'attachment; filename="register_files_All.zip"'
      );
      mockStream.pipe(response);
      return Promise.resolve(); // porque es async
    });

    await controller.listFile(res as any, id);

    expect(executeSpy).toHaveBeenCalledWith(res, FindByUuid);
    expect(res.setHeader).toHaveBeenCalledWith('Content-Type', 'application/zip');
    expect(res.setHeader).toHaveBeenCalledWith(
      'Content-Disposition',
      'attachment; filename="register_files_All.zip"'
    );
    expect(mockStream.pipe).toHaveBeenCalledWith(res);
  });
});
});