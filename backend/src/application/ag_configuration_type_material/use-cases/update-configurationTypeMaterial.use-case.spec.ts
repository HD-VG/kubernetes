/* eslint-disable prettier/prettier */
import { UpdateConfigurationTypeMaterialUseCase } from './index.use-case';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';
import { UpdateConfigurationTypeMaterialDto } from 'src/presentation/dtos/ag_configuration_type_material/index.dto';
import { FindById, FindByUuid } from 'src/common/dto/index.dto';
describe('UpdateConfigurationTypeMaterialUseCase', () => {
  let useCase: UpdateConfigurationTypeMaterialUseCase;
  let repository: IConfigurationTypeMaterialRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateConfigurationTypeMaterialUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  const user: FindById = { id:1 };
  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateConfigurationTypeMaterialDto = {
      register_id: 1,
      materialas: 10,
      quantity: 10,
      unit: "MaterialActualizado",
      codigo: "MaterialActualizado",
      padre: "MaterialActualizado",
      nivel: 10,
      ramas: 10,
      nombre: "MaterialActualizado",
      unidad: "MaterialActualizado",
      valMinimo: 10,
      valMaximo: 10,
      precioUs: 10,
      PrecioBs: 10,
      tipoItem: "MaterialActualizado",
      iAlmacen: "MaterialActualizado",
      cantidadD: 10,
      cantidadH: 10,
      saldoCantidad: 10,
      debeBs: 10,
      HaberBs: 10,
      SaldoCosto: 10
    };
    const expectedResult = { status: true, message: 'Registro Actualizado',
      data:[{
          id: 1,
          code: 1,
          parent: "MaterialActualizado",
          level: 10,
          branches: 10,
          name: "MaterialActualizado",
          unit: "MaterialActualizado",
          valMinimun: 10,
          valMaximun: 1,
          priceUs: 10,
          priceBs: 10,
          typeItem: "MaterialActualizado",
          iStock: "MaterialActualizado",
          quantityD: 10,
          quantityH: 10,
          balandeAmount: 10,
          quantity: 10,
          debitBs: 10,
          creditBs: 10,
          balanceCost: 10,
          unitRequested: "MaterialActualizado",
          totalCost: 10
      }]
    };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid, dto, user);

    expect(repository.update).toHaveBeenCalledWith(FindByUuid, dto, user);
    expect(result).toEqual(expectedResult);
  });
});