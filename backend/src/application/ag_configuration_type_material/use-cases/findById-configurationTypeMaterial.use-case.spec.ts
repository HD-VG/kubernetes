/* eslint-disable prettier/prettier */
import { FindByConfigurationTypeMaterialUseCase } from './index.use-case';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';
import { FindByUuid } from 'src/common/dto/index.dto';

describe('FindByConfigurationTypeMaterialUseCase', () => {
  let useCase: FindByConfigurationTypeMaterialUseCase;
  let repository: IConfigurationTypeMaterialRepository;

  beforeEach(() => {
    repository = {
      findOne: jest.fn(),
    } as any;

    useCase = new FindByConfigurationTypeMaterialUseCase(repository);
  });
  const FindByUuid : FindByUuid= { uuid:"s45de5d4g5y4k8g8y" };
  it('should call repository.findOne with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registro encontrado',
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
            }],
            all: 1,
    };

    (repository.findOne as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(FindByUuid);

    expect(repository.findOne).toHaveBeenCalledWith(FindByUuid);
    expect(result).toEqual(expectedResult);
  });
});