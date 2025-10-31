/* eslint-disable prettier/prettier */
import { GetSnapshotRegisterUseCase } from './index.use-case';
import { IRegisterRepository } from 'src/domain/ag_register/interface/register-repository.interface';
import { SnapshotDTO } from 'src/presentation/dtos/ag_register/snapshot.dto'; 

describe('GetSnapshotRegisterUseCase', () => {
    let useCase: GetSnapshotRegisterUseCase;
    let repository: IRegisterRepository;

    beforeEach(() => {
        repository = {
            getSnapshot: jest.fn(),
        } as any;

        useCase = new GetSnapshotRegisterUseCase(repository);
    });

    it('should call repository.getSnapshot with correct parameters', async () => {
        const id: number = 1;

        const snapshot: SnapshotDTO = {
            id: 10,
            reason: "Reporte de prueba",
            addressDagme: "Av. Bolívar #123",
            dateDagme: new Date("2025-09-09"),
            timeStart: "08:00:00",
            timeWater: "09:00:00",
            perforation: "Perforación inicial",
            code: "DAGME-001",
            cite: 1001,
            codeReporter: "RPT-001",
            timeInit: "10:00:00",
            timeEnd: "15:00:00",
            transcurred: 300,
            transcurred_worker: 280,
            drillHole: 3,
            createAt: new Date("2025-09-09"),
            reporter_name: "Juan",
            reporter_lastname: "Pérez",
            reporter_ci: "1234567",
            reporter_phone: "70012345",
            reporter_adrress: "Zona Central",
            reported_name: "Pedro",
            reported_lastname: "López",
            reported_ci: "9876543",
            reported_phone: "70123456",
            reported_address: "Av. Las Américas",
            machine_ids: [
                { id: 1, 
                    name: "Excavadora", 
                    basicCoste: 500, 
                    basicCosteYear: 6000, 
                    basicCosteHour: 50, 
                    createUserId: 1, 
                    updateUserId: 1, 
                    deleteUserId: 0, 
                    createAt: new Date(), 
                    updateAt: new Date(), 
                    deleteAt: null }
            ],
            dagme_ids: [
                { id: 1, 
                    name: "Dagme Tipo A", 
                    status: true, 
                    createUserId: 1, 
                    updateUserId: 1, 
                    deleteUserId: 0, 
                    createAt: new Date(), 
                    updateAt: new Date(), 
                    deleteAt: null }
            ],
            work_ids: [
                { id: 1, 
                    name: "Trabajo de perforación", 
                    createUserId: 1, 
                    updateUserId: 1, 
                    deleteUserId: 0, 
                    createAt: new Date(), 
                    updateAt: new Date(), 
                    deleteAt: null }
            ],
            util_ids: [
                { id: 1, 
                    name: "Trabajo de perforación",
                    basicCosteHour: 20, 
                    createUserId: 1, 
                    updateUserId: 1, 
                    deleteUserId: 0, 
                    createAt: new Date(), 
                    updateAt: new Date(), 
                    deleteAt: null }
            ],
            assignment_userIds: [
                { id: 1, 
                    userName: "operador1", 
                    rolName: "Supervisor", 
                    rolCost: 100 }
            ],
            configurationTypeMaterials_ids: [
                { id: 1, 
                    code: "M-001", 
                    parent: "root", 
                    level: 1, 
                    branches: 0, 
                    name: "Cemento", 
                    unit: "kg", 
                    valMinimun: 10, 
                    valMaximun: 100, 
                    priceUs: 5, 
                    priceBs: 35, 
                    typeItem: "material", 
                    iStock: "Y", 
                    quantityD: 50, quantityH: 0, balandeAmount: 50, debitBs: 0, creditBs: 0, balanceCost: 1750, unitRequested: "kg", quantity: 50, totalCost: 1750, createUserId: 1, updateUserId: 1, deleteUserId: 0, createAt: new Date(), updateAt: new Date(), deleteAt: null }
            ],
            configurationCars_ids: [
                { id: 1, 
                    idVehiculo: "V-001", 
                    licensePlate: "XYZ-789", 
                    make: "Toyota", 
                    model: "Hilux", 
                    basicCoste: 100, 
                    estado: 1, 
                    time: "02:00:00", 
                    createUserId: 1, 
                    updateUserId: 1, 
                    deleteUserId: 0, 
                    createAt: new Date(), 
                    updateAt: new Date(), 
                    deleteAt: null }
            ],
            coste_water: { id: 1, 
                name: "Agua Potable", 
                basicCoste: 2, height: 10, 
                cohefficientDischarge: 5, 
                createUserId: 1, 
                updateUserId: 1, 
                deleteUserId: 0, 
                createAt: new Date(), 
                updateAt: new Date(), 
                deleteAt: null },
            coste_recurring: [
                { id: 1, 
                    name: "Costo recurrente 1", 
                    basicCoste: 200, 
                    createUserId: 1, 
                    updateUserId: 1, 
                    deleteUserId: 0, 
                    createAt: new Date(), 
                    updateAt: new Date(), 
                    deleteAt: null }
            ]
        };

        const expectedResult = { 
            status: true, 
            message: 'Registro encontrado',
            data: [ snapshot ],
            all: 1
        };

        (repository.getSnapshot as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute(id);

        expect(repository.getSnapshot).toHaveBeenCalledWith(id);
        expect(result).toEqual(expectedResult);
    });
});
