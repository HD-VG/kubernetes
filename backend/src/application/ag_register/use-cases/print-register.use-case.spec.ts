/* eslint-disable prettier/prettier */
import { PrintRegisterUseCase } from './index.use-case';
import { IRegisterRepository } from 'src/domain/ag_register/interface/register-repository.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

describe('PrintRegisterUseCase', () => {
    let useCase: PrintRegisterUseCase;
    let repository: IRegisterRepository;

    beforeEach(() => {
        repository = {
        printRegister: jest.fn(),
        } as any;

        useCase = new PrintRegisterUseCase(repository);
    });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
    it('should call repository.printRegister with correct parameters', async () => {
        const expectedResult = { status: true, message: 'Registro encontrado',
        data: [
                {
                    id: 2,
                    reason: "actualizado",
                    addressDagme: "Av. Siempre Viva 123",
                    dateDagme: "2025-08-27T04:00:00.000Z",
                    timeStart: "08:30:00",
                    perforation: "Perforación principal",
                    code: "ABC123",
                    codeReporter: "123",
                    timeInit: "10:00:00",
                    timeEnd: "18:00:00",
                    transcurred: 555,
                    transcurred_worker: null,
                    drillHole: 5,
                    createAt: "2025-09-09T19:23:33.365Z",
                    reporter_name: "MATIAS",
                    reporter_lastname: "DAZA BARRON",
                    reporter_ci: "13326396",
                    reporter_phone: "69613005",
                    reporter_adrress: "AV. JAIME MENDOZA",
                    reported_name: "MATIAS",
                    reported_lastname: "DAZA BARRON",
                    reported_ci: "13326396",
                    reported_phone: "69613005",
                    reported_address: "EL RELOJ",
                    machine_ids: [
                    {
                        id: 1,
                        name: "MACHINE PRUEBA",
                        basicCoste: "10.00000000",
                        basicCosteYear: "0.02739726",
                        basicCosteHour: "0.00114155",
                        createUserId: 1,
                        updateUserId: null,
                        deleteUserId: null,
                        createAt: "2025-09-09T19:20:34.147Z",
                        updateAt: "2025-09-09T23:20:33.019Z",
                        deleteAt: null
                    },
                    {
                        id: 2,
                        name: "MACHINE PRUEBA",
                        basicCoste: "10.00000000",
                        basicCosteYear: "0.02739726",
                        basicCosteHour: "0.00114155",
                        createUserId: 1,
                        updateUserId: null,
                        deleteUserId: null,
                        createAt: "2025-09-09T19:20:37.352Z",
                        updateAt: "2025-09-09T23:20:36.392Z",
                        deleteAt: null
                    }
                    ],
                    dagme_ids: [
                    {
                        id: 1,
                        name: "PRUEBA DAGME 01",
                        status: true,
                        createUserId: 1,
                        updateUserId: null,
                        deleteUserId: null,
                        createAt: "2025-09-09T19:20:14.407Z",
                        updateAt: "2025-09-09T23:20:14.002Z",
                        deleteAt: null
                    },
                    {
                        id: 2,
                        name: "PRUEBA DAGME 01",
                        status: true,
                        createUserId: 1,
                        updateUserId: null,
                        deleteUserId: null,
                        createAt: "2025-09-09T19:20:18.511Z",
                        updateAt: "2025-09-09T23:20:15.981Z",
                        deleteAt: null
                    }
                    ],
                    work_ids: [
                    {
                        id: 1,
                        name: "WORK PRUEBA",
                        createUserId: 1,
                        updateUserId: null,
                        deleteUserId: null,
                        createAt: "2025-09-09T19:20:52.207Z",
                        updateAt: "2025-09-09T23:20:50.265Z",
                        deleteAt: null
                    },
                    {
                        id: 2,
                        name: "WORK PRUEBA",
                        createUserId: 1,
                        updateUserId: null,
                        deleteUserId: null,
                        createAt: "2025-09-09T19:20:55.435Z",
                        updateAt: "2025-09-09T23:20:53.663Z",
                        deleteAt: null
                    }
                    ],
                    util_ids: [
                    {
                        id: 1,
                        name: "UTILS PRUEBA",
                        basicCosteHour: "100.00000000",
                        createUserId: 1,
                        updateUserId: null,
                        deleteUserId: null,
                        createAt: "2025-09-09T19:21:10.590Z",
                        updateAt: "2025-09-09T23:21:10.226Z",
                        deleteAt: null
                    },
                    {
                        id: 2,
                        name: "UTILS PRUEBA",
                        basicCosteHour: "100.00000000",
                        createUserId: 1,
                        updateUserId: null,
                        deleteUserId: null,
                        createAt: "2025-09-09T19:21:12.676Z",
                        updateAt: "2025-09-09T23:21:10.067Z",
                        deleteAt: null
                    }
                    ],
                    assignment_userIds: [
                    {
                        id: 1,
                        userName: "Juan Carlos Vasquez Macias",
                        rolName: "administrador",
                        rolCost: 0
                    },
                    {
                        id: 2,
                        userName: "Juan Pablo Raya Romero",
                        rolName: "laboratorio",
                        rolCost: 0
                    }
                    ],
                    configurationTypeMaterials_ids: [],
                    configurationCars_ids: [],
                    coste_water: 915.4,
                    coste_workers: 10,
                    coste_car: 0,
                    coste_material: 0,
                    coste_util: 10,
                    coste_machine: 10,
                    coste_recurring: 45,
                    area: "1.9635e-5",
                    caudalHoras: "9.8960e+0",
                    volumen: "9.1538e+1",
                    costeWater: "9.1540e+2",
                    coste_total: null
                }
                ],
                all: 1,
        };

        (repository.printRegister as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(FindByUuid);

        expect(repository.printRegister).toHaveBeenCalledWith(FindByUuid);
        expect(result).toEqual(expectedResult);
    });
});