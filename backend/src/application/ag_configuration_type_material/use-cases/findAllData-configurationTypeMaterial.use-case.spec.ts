/* eslint-disable prettier/prettier */
import { FindAllDataConfigurationTypeMaterialUseCase } from './index.use-case';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';

describe('FindAllDataConfigurationTypeMaterialUseCase', () => {
  let useCase: FindAllDataConfigurationTypeMaterialUseCase;
  let repository: IConfigurationTypeMaterialRepository;

  beforeEach(() => {
    repository = {
      findAllData: jest.fn(),
    } as any;

    useCase = new FindAllDataConfigurationTypeMaterialUseCase(repository);
  });

  it('should call repository.findAllData with correct parameters', async () => {
    const expectedResult = { status: true, message: 'Registros encontrados',
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
            },
            {
                id: 2,
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
            all: 2,
    };

    (repository.findAllData as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(repository.findAllData).toHaveBeenCalledWith();
    expect(result).toEqual(expectedResult);
  });
});