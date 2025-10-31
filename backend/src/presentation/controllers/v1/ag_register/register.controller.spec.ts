import { Test, TestingModule } from '@nestjs/testing';
import { RegisterController } from './register.controller';
import {
  CreateRegisterUseCase,
  DeleteRegisterUseCase,
  FindByIdRegisterUseCase,
  ListRegisterUseCase,
  UpdateRegisterUseCase,
  ChangeStateRegisterUseCase,
  GenerateReportByMonthAndYearRegisterUseCase,
  PrintResumenRegisterUseCase,
  SumAmountByRegisterIdRegisterUseCase,
  SumAmountsByMonthRegisterUseCase,
  PrintRegisterUseCase,
} from 'src/application/ag_register/use-cases/index.use-case';
import { JwtStrategy } from 'src/infrastructure/auth/guards/jwt-strategy.guard';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/infrastructure/auth/guards/index.guard';
import { Reflector } from '@nestjs/core';
import { AuthService } from 'src/infrastructure/auth/services/auth.service';
import { IAuthRepositoryToken } from 'src/application/auth/tokens/auth-repository.token';
import { FindById, PaginationDto, FindByUuid } from 'src/common/dto/index.dto';
import { LetterDto } from 'src/presentation/dtos/ag_register/letter.dto';

const data = {
    id: 1,
    name: 'ConfigurationTypeDagme'
  };
  const id = "s45de5d4g5y4k8g8y";
  const findByUuid : FindByUuid= { uuid: id };
  const req = { user: { userId: 1 } };
  const user: FindById = { id: req.user.userId };
  const data1 ={
        id: 1,
        name: 'ConfigurationTypeDagme'
      };
      const data2 ={
        id: 2,
        name: 'ConfigurationTypeDagme'
      };
      const data3 ={
        id: 3,
        name: 'ConfigurationTypeDagme'
      };

describe('RegisterController', () => {
  let controller: RegisterController;
  let createRegisterUseCase: CreateRegisterUseCase;
  let updateRegisterUseCase: UpdateRegisterUseCase;
  let deleteRegisterUseCase: DeleteRegisterUseCase;
  let listRegisterUserCase: ListRegisterUseCase;
  let findByIdRegisterUseCase: FindByIdRegisterUseCase;
  let changeStateRegisterUseCase: ChangeStateRegisterUseCase;
  let generateReportByMonthAndYearRegisterUseCase: GenerateReportByMonthAndYearRegisterUseCase;
  let printResumenRegisterUseCase: PrintResumenRegisterUseCase;
  let sumAmountByRegisterIdRegisterUseCase: SumAmountByRegisterIdRegisterUseCase;
  let sumAmountsByMonthRegisterUseCase: SumAmountsByMonthRegisterUseCase;
  let printRegisterUseCase: PrintRegisterUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegisterController],
      providers: [
        { provide: CreateRegisterUseCase, useValue: { execute: jest.fn() } },
        { provide: UpdateRegisterUseCase, useValue: { execute: jest.fn() } },
        { provide: DeleteRegisterUseCase, useValue: { execute: jest.fn() } },
        { provide: ListRegisterUseCase, useValue: { execute: jest.fn() } },
        { provide: FindByIdRegisterUseCase, useValue: { execute: jest.fn() } },
        { provide: ChangeStateRegisterUseCase, useValue: { execute: jest.fn() } },
        { provide: GenerateReportByMonthAndYearRegisterUseCase, useValue: { execute: jest.fn() } },
        { provide: PrintResumenRegisterUseCase, useValue: { execute: jest.fn() } },
        { provide: SumAmountByRegisterIdRegisterUseCase, useValue: { execute: jest.fn() } },
        { provide: SumAmountsByMonthRegisterUseCase, useValue: { execute: jest.fn() } },
        { provide: PrintRegisterUseCase, useValue: { execute: jest.fn() } },
        { provide: JwtStrategy, useValue: {} },
        { provide: JwtService, useValue: { verify: jest.fn(), sign: jest.fn() } },
        { provide: Reflector, useValue: { get: jest.fn() } },
        { provide: IAuthRepositoryToken, useValue: { findUserRoles: jest.fn() } },
        { provide: AuthService, useValue: { validateUser: jest.fn() } },
        { provide: RolesGuard, useClass: RolesGuard },
      ],
    }).compile();

    controller = module.get<RegisterController>(RegisterController);
    createRegisterUseCase = module.get<CreateRegisterUseCase>(CreateRegisterUseCase);
    updateRegisterUseCase = module.get<UpdateRegisterUseCase>(UpdateRegisterUseCase);
    deleteRegisterUseCase = module.get<DeleteRegisterUseCase>(DeleteRegisterUseCase);
    listRegisterUserCase = module.get<ListRegisterUseCase>(ListRegisterUseCase);
    findByIdRegisterUseCase = module.get<FindByIdRegisterUseCase>(FindByIdRegisterUseCase);
    changeStateRegisterUseCase = module.get<ChangeStateRegisterUseCase>(ChangeStateRegisterUseCase);
    generateReportByMonthAndYearRegisterUseCase = module.get<GenerateReportByMonthAndYearRegisterUseCase>(GenerateReportByMonthAndYearRegisterUseCase);
    printResumenRegisterUseCase = module.get<PrintResumenRegisterUseCase>(PrintResumenRegisterUseCase);
    sumAmountByRegisterIdRegisterUseCase = module.get<SumAmountByRegisterIdRegisterUseCase>(SumAmountByRegisterIdRegisterUseCase);
    sumAmountsByMonthRegisterUseCase = module.get<SumAmountsByMonthRegisterUseCase>(SumAmountsByMonthRegisterUseCase);
    printRegisterUseCase = module.get<PrintRegisterUseCase>(PrintRegisterUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call CreateRegisterUseCase and return the result', async () => {
      const dto = { nro_tramite: '123' };
      const result = { status: true, message: 'Registro creado' };
      jest.spyOn(createRegisterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.create(dto as any, req);
      expect(createRegisterUseCase.execute).toHaveBeenCalledWith(dto, user);
      expect(response).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should call ListRegisterUseCase and returnthe result', async () => {
      const answerQueryResult = {
        status: true,
        message: 'Registros obtenidoscorrectamente',
        data: [data],
      };
      jest.spyOn(listRegisterUserCase, 'execute').mockResolvedValue(answerQueryResult);
      const response = await controller.findAll();
      expect(listRegisterUserCase.execute).toHaveBeenCalled();
      expect(response).toEqual(answerQueryResult);
    });
  });

  describe('findOne', () => {
    it('should call FindByIdRegisterUseCase and return the result', async () => {
      const answerQueryResult = {
        status: true,
        message: 'Registro obtenido correctamente',
        data: { 
          id: 1, 
          nro_tramite: '123' 
        },
      };
      jest.spyOn(findByIdRegisterUseCase, 'execute').mockResolvedValue(answerQueryResult);
      const response = await controller.findOne(id);
      expect(findByIdRegisterUseCase.execute).toHaveBeenCalledWith(findByUuid);
      expect(response).toEqual(answerQueryResult);
    });
  });

  describe('update', () => {
    it('should call UpdateRegisterUseCase and return the result', async () => {
      const dto = { nro_tramite: '456' };
      const result = { status: true, message: 'Registro actualizado' };
      jest.spyOn(updateRegisterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.update(id, dto as any, req);
      expect(updateRegisterUseCase.execute).toHaveBeenCalledWith(findByUuid, dto, user);
      expect(response).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should call DeleteRegisterUseCase and return the result', async () => {
      const result = { status: true, message: 'Registro eliminado' };
      jest.spyOn(deleteRegisterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.remove(id, req);
      expect(deleteRegisterUseCase.execute).toHaveBeenCalledWith(findByUuid, user);
      expect(response).toEqual(result);
    });
  });

  describe('changeState', () => {
    it('should call ChangeStateRegisterUseCase and return the result', async () => {
      const result = { status: true, message: 'Estado cambiado' };
      jest.spyOn(changeStateRegisterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.changeState(id);
      expect(changeStateRegisterUseCase.execute).toHaveBeenCalledWith(findByUuid);
      expect(response).toEqual(result);
    });
  });

  describe('printRegister', () => {
    it('should call PrintRegisterUseCase and return the result', async () => {
      const result = { file: 'some_base64_string' };
      jest.spyOn(printRegisterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.printRegister(id);
      expect(printRegisterUseCase.execute).toHaveBeenCalledWith(findByUuid);
      expect(response).toEqual(result);
    });
  });

  describe('getDashboard', () => {
    it('should call SumAmountsByMonthRegisterUseCase and return the result', async () => {
      const result = [{ month: '2023-01', total: 1000 }];
      jest.spyOn(sumAmountsByMonthRegisterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.getDashboard();
      expect(sumAmountsByMonthRegisterUseCase.execute).toHaveBeenCalled();
      expect(response).toEqual(result);
    });
  });

  describe('generateReportByMonthAndYear', () => {
    it('should call GenerateReportByMonthAndYearRegisterUseCase and return the result', async () => {
      const month = 1;
      const year = 2023;
      const result = { file: 'some_base64_string' };
      jest.spyOn(generateReportByMonthAndYearRegisterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.generateReportByMonthAndYear(month, year);
      expect(generateReportByMonthAndYearRegisterUseCase.execute).toHaveBeenCalledWith(month, year);
      expect(response).toEqual(result);
    });
  });

  describe('getLetter', () => {
    it('should call SumAmountByRegisterIdRegisterUseCase with correct parameters', async () => {
      const findById: FindById = { id: 1 };
      const result: LetterDto = {
        registerId: 1,
        reporterName: "MATIAS",
        reporterLastname: "DAZA BARRON",
        reportedName: "MATIAS",
        reportedLastname: "DAZA BARRON",
        date: new Date("2025-08-27T04:00:00.000Z"),
        time: "08:30:00",
        code: "ABC123",
        cite: 456,
        codeReporter: "123",
        perforation: "Perforación principal",
        drillHole: 5,
        direction: "Av. Siempre Viva 123",
        reason: "actualizado",
        dagmes_name: "",
        carCoste: 765,
        costerMaterials: 0,
        workersCoste: 0,
        utilsCoste: 0,
        machineCoste: 0,
        recurringCoste: 45,
        waterCoste: 915.4,
        totalDamageCost: 0
      };
      jest.spyOn(sumAmountByRegisterIdRegisterUseCase, 'execute').mockResolvedValue(result);
      const response = await controller.getLetter(id);
      expect(sumAmountByRegisterIdRegisterUseCase.execute).toHaveBeenCalledWith(findByUuid);
      expect(response).toEqual(result);
    });
  });

  describe('printResumen', () => {
    it('should call PrintResumenRegisterUseCase and return the result', async () => {
      const answerQueryResult = {
        status: true,
        message: 'exito',
        data: [{ id: 1, nro_tramite: '123' }],
        total: 1,
      };
      jest.spyOn(printResumenRegisterUseCase, 'execute').mockResolvedValue(answerQueryResult);
      const response = await controller.printResumen(id);
      expect(printResumenRegisterUseCase.execute).toHaveBeenCalledWith(findByUuid);
      expect(response).toEqual(answerQueryResult);
    });
  });
});