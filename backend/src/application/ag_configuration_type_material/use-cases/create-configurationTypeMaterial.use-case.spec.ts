/* eslint-disable prettier/prettier */
import { CreateConfigurationTypeMaterialUseCase } from './index.use-case';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';
import { CreateConfigurationTypeMaterialDto } from 'src/presentation/dtos/ag_configuration_type_material/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
describe('CreateConfigurationTypeMaterialUseCase', () => {
  let useCase: CreateConfigurationTypeMaterialUseCase;
  let repository: IConfigurationTypeMaterialRepository;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateConfigurationTypeMaterialUseCase(repository);
  });
    const user: FindById = { id:1 };

  it('should call repository.create with correct parameters', async () => {
    const dto: CreateConfigurationTypeMaterialDto = {
      register_id: 1,
      materialas: 10,
      quantity: 10,
      unit: "string",
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
    };
    const expectedResult = { status: true, message: 'Registro creado',
      data: [{
          id: 1,
          code: 1,
          parent: "string",
          level: 10,
          branches: 10,
          name: "string",
          unit: "string",
          valMinimun: 10,
          valMaximun: 1,
          priceUs: 10,
          priceBs: 10,
          typeItem: "string",
          iStock: "string",
          quantityD: 10,
          quantityH: 10,
          balandeAmount: 10,
          quantity: 10,
          debitBs: 10,
          creditBs: 10,
          balanceCost: 10,
          unitRequested: "string",
          totalCost: 10
      }]
    };

    (repository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, user);

    expect(repository.create).toHaveBeenCalledWith(dto, user);
    expect(result).toEqual(expectedResult);
  });
});