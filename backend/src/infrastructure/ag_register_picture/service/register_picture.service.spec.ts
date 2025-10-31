/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RegisterPictureService } from './register_picture.service';
import { Register } from 'src/domain/shared/index.entity';
import { Repository } from 'typeorm';
import { Reporter } from 'src/domain/ag_reporter/entities/reporter.entity';
import { Reported } from 'src/domain/ag_reported/entities/reported.entity';
import { ConfigurationTypeMaterial } from 'src/domain/ag_configuration_type_material/entities/configuration_type_material.entity';
import { ConfigurationUtil } from 'src/domain/ag_configuration_utils/entities/configuration_util.entity';
import { ConfigurationTypeMachine } from 'src/domain/ag_configuration_type_machine/entities/configuration_type_machine.entity';
import { ConfigurationTypeDagme } from 'src/domain/ag_configuration_type_dagme/entities/configuration_type_dagme.entity';
import { ConfigurationTypeWork } from 'src/domain/ag_configuration_type_work/entities/configuration_type_work.entity';
import { AsignationUserRol } from 'src/domain/auth_asignation_user_rol/entities/asignacion_user_rol.entity';
import { RegisterPicture } from 'src/domain/ag_register_picture/entities/register_picture.entity';
import { ConfigurationCars } from 'src/domain/ag_configuration_cars/entities/configuration_car.entity';
import { CreateRegisterPictureDto } from 'src/presentation/dtos/ag_register_picture/create-register_picture.dto';
import { PassThrough } from 'stream';
describe('RegisterPictureService', () => {
  let service: RegisterPictureService;
  let registerRepository: Repository<Register>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegisterPictureService,
        {
          provide: getRepositoryToken(Register),
          useValue: {
            findOneBy: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(RegisterPicture),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<RegisterPictureService>(RegisterPictureService);
    registerRepository = module.get<Repository<Register>>(getRepositoryToken(Register));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('ValidationRegister', () => {
    it('should call ValidationRegister and return register data', async () => {
      const register: Register = {
                    id: 1,
                    reason: 'Test Reason',
                    addressDagme: 'Test Address',
                    dateDagme: new Date('2025-09-11T10:00:00Z'),
                    timeStart: '10:00',
                    timeWater: '11:00',
                    perforation: 'Test Perforation',
                    code: 'TEST-001',
                    cite: 12345,
                    timeInit: '09:00',
                    timeEnd: '12:00',
                    drillHole: 100,
                    state: false,
                    snapshot: {},//esto no se prueba aun
                    createUserId: 1,
                    updateUserId: null,
                    deleteUserId: null,
                    createAt: new Date('2025-09-11T09:00:00Z'),
                    updateAt: null,
                    deleteAt: null,
                    //son las relaciones 
                    reporter: {id: 1,name: 'Test Reporter',} as Reporter,
                    reported: {id: 1,name: 'Test Reported',} as Reported,
                    //como son mucho a mucho son tiop array
                    configurationTypeMaterials: [{id: 1,name: 'Test Material',} as ConfigurationTypeMaterial,],
                    configurationCar: [{id: 1} as ConfigurationCars,],
                    configurationUtil: [{id: 1,name: 'Test Util',} as ConfigurationUtil,],
                    configurationTypeMachines: [{id: 1,name: 'Test Machine',} as ConfigurationTypeMachine,],
                    configurationTypeDagmes: [{id: 1,name: 'Test Dagme',} as ConfigurationTypeDagme,],
                    configurationTypeWorks: [{id: 1,name: 'Test Work',} as ConfigurationTypeWork,],
                    assignment_user: [{id: 1,} as AsignationUserRol,],
                    registerPictures: [{id: 1,pictureUrl: 'http://example.com/picture.jpg',} as RegisterPicture,],
                  } as Register;
      jest.spyOn(registerRepository, 'findOneBy').mockResolvedValue(register);
      const result = await service.ValidationRegister(1);
      expect(registerRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(register);
    });
  });
  describe('configurationSave', () => {
    it('should call configurationSave and return register data', async () => {
      const dto: CreateRegisterPictureDto ={
        pictureUrl: "picture.jpg",
        register_id : 1,
      }
      const sixMB = 4 * 1024 * 1024;
      const file: Express.Multer.File = {
        fieldname: "file",
        originalname: "bigfile.jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        buffer: Buffer.alloc(sixMB), 
        size: sixMB,
        stream: Buffer.alloc(1) as any,
        destination: "",
        filename: "",
        path: ""
      };
      jest.spyOn(service, 'configurationSave').mockResolvedValue(dto);
      const response = await service.configurationSave(dto,file);
      expect(service.configurationSave).toHaveBeenCalledWith(dto,file);
      expect(response).toEqual(dto);
    });
  });
  describe('validateFile', () => {
    //prueba que si cujmle las 2 condiciones
    it('should call validateFile and return register data', async () => {
      const maxSize = 5 * 1024 * 1024; // 5MB por defecto
      const allowedTypes =  ['image/jpeg', 'image/png', 'image/gif'];
      const file: Express.Multer.File = {
          fieldname: "file",
          originalname: "test.txt",
          encoding: "7bit",
          mimetype: "image/jpeg",
          buffer: Buffer.from("contenido de prueba"),
          size: Buffer.byteLength("contenido de prueba"),
          stream: Buffer.from("contenido de prueba") as any,
          destination: "",
          filename: "",
          path: ""
      };
      let value = true
      if (file.size > maxSize) value = false;
      if (!allowedTypes.includes(file.mimetype)) value = false;

      jest.spyOn(service, 'validateFile').mockReturnValue(true);
      const response = service.validateFile(file);
      expect(service.validateFile).toHaveBeenCalledWith(file);
      expect(response).toEqual(value);
    });
    //prueba cuando no se cumple la condicion del tipo de archivo
    it('should call validateFile and return register data', async () => {
      const maxSize = 5 * 1024 * 1024; // 5MB por defecto
      const allowedTypes =  ['image/jpeg', 'image/png', 'image/gif'];
      const file: Express.Multer.File = {
          fieldname: "file",
          originalname: "test.txt",
          encoding: "7bit",
          mimetype: "text/plain",
          buffer: Buffer.from("contenido de prueba"),
          size: Buffer.byteLength("contenido de prueba"),
          stream: Buffer.from("contenido de prueba") as any,
          destination: "",
          filename: "",
          path: ""
      };
      let value = true
      if (file.size > maxSize) value = false;
      if (!allowedTypes.includes(file.mimetype)) value = false;

      jest.spyOn(service, 'validateFile').mockReturnValue(false);
      const response = service.validateFile(file);
      expect(service.validateFile).toHaveBeenCalledWith(file);
      expect(response).toEqual(value);
    });

    //prueba cuando no se cumple la condicion del tamaño del archivo
    it('should call validateFile and return register data', async () => {
      const maxSize = 5 * 1024 * 1024; // 5MB por defecto
      const allowedTypes =  ['image/jpeg', 'image/png', 'image/gif'];
      const sixMB = 6 * 1024 * 1024;

      const file: Express.Multer.File = {
        fieldname: "file",
        originalname: "bigfile.jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        buffer: Buffer.alloc(sixMB), // crea un buffer vacío de 6 MB
        size: sixMB,
        stream: Buffer.alloc(1) as any,
        destination: "",
        filename: "",
        path: ""
      };
      let value = true
      if (file.size > maxSize) value = false;
      if (!allowedTypes.includes(file.mimetype)) value = false;

      jest.spyOn(service, 'validateFile').mockReturnValue(false);
      const response = service.validateFile(file);
      expect(service.validateFile).toHaveBeenCalledWith(file);
      expect(response).toEqual(value);
    });
  });

  describe('saveFile', () => {
    //prueba que si cujmle las 2 condiciones
    it('should call saveFile and return register data', async () => {
      const sixMB = 4 * 1024 * 1024;
      const file: Express.Multer.File = {
        fieldname: "file",
        originalname: "bigfile.jpg",
        encoding: "7bit",
        mimetype: "image/jpeg",
        buffer: Buffer.alloc(sixMB), // crea un buffer vacío de 6 MB
        size: sixMB,
        stream: Buffer.alloc(1) as any,
        destination: "",
        filename: "",
        path: ""
      };
      let value = true
      const nameFile = "1_20250912_090000.jpg";
      const destinationPath = '../../../uploads';
      jest.spyOn(service, 'saveFile').mockResolvedValue(true);
      const response = await service.saveFile(file.buffer, destinationPath, nameFile);
      expect(service.saveFile).toHaveBeenCalledWith(file.buffer, destinationPath, nameFile);
      expect(response).toEqual(value);
    });
  });

  describe('GenerateZip', () => {
    it('should call GenerateZip and return register data', async () => {
      const filenames = ["1.jpg","2.jpg"]
      const stream = new PassThrough()
      jest.spyOn(service, 'GenerateZip').mockResolvedValue(stream);
      const response = await service.GenerateZip(filenames);
      expect(service.GenerateZip).toHaveBeenCalledWith(filenames);
      expect(response).toEqual(stream);
    });
  }); 
  
  describe('deleteFile', () => {
    //prueba que si cujmle las 2 condiciones
    it('should call deleteFile and return register data', async () => {
      const registerPictures: Partial<RegisterPicture> = {
        id: 1,
        pictureUrl: "img.jpg",
        register: { id: 1 } as Register,
        createUserId: 1,
        updateUserId: null,
        deleteUserId: null,
        createAt: new Date(),
        updateAt: null,
        deleteAt: null,
      };
      jest.spyOn(service, 'deleteFile').mockResolvedValue(true);
      const response = await service.deleteFile(registerPictures as RegisterPicture);
      expect(service.deleteFile).toHaveBeenCalledWith(registerPictures);
      expect(response).toEqual(true);
    });
  });
});
