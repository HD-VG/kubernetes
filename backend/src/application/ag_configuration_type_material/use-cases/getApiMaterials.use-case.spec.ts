/* eslint-disable prettier/prettier */
import { GetApiMaterialUseCase } from './index.use-case';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';
import { Materials } from 'src/presentation/dtos/ag_configuration_type_material/index.dto';
describe('GetApiMaterialUseCase', () => {
    let useCase: GetApiMaterialUseCase;
    let repository: IConfigurationTypeMaterialRepository;

    beforeEach(() => {
        repository = {
        findAllDataApi: jest.fn(),
        } as any;

        useCase = new GetApiMaterialUseCase(repository);
    });

    it('should call repository.findAllDataApi with correct parameters', async () => {
        const data1: Materials = {
            codigo: "string",
            padre: "string",
            nivel: 10,
            ramas: 10,
            nombre: "string",
            unidad: "string",
            valMinimo: 10,
            valMaximo: 10,
            precioUs: 10,
            PrecioBs: 10,
            tipoItem: "string",
            iAlmacen: "string",
            cantidadD: 10,
            cantidadH: 10,
            saldoCantidad: 10,
            debeBs: 10,
            HaberBs: 10,
            SaldoCosto: 10
        }
        const data2: Materials = {
            codigo: "string",
            padre: "string",
            nivel: 10,
            ramas: 10,
            nombre: "string",
            unidad: "string",
            valMinimo: 10,
            valMaximo: 10,
            precioUs: 10,
            PrecioBs: 10,
            tipoItem: "string",
            iAlmacen: "string",
            cantidadD: 10,
            cantidadH: 10,
            saldoCantidad: 10,
            debeBs: 10,
            HaberBs: 10,
            SaldoCosto: 10
        }
        const expectedResult = { status: true, message: 'Registros encontrados de la URL',
        data: [{
                    data1
                },
                {
                    data2
                }],
                all: 2,
        };

        (repository.findAllDataApi as jest.Mock).mockResolvedValue(expectedResult);

        const result = await useCase.execute();

        expect(repository.findAllDataApi).toHaveBeenCalledWith();
        expect(result).toEqual(expectedResult);
    });
});