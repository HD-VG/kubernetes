/* eslint-disable prettier/prettier */
import { FindByIdCustodyUseCase } from './index-custody.use-case';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface'
import { FindById } from 'src/common/dto/findById.dto';

describe('FindByIdCustodyUseCase', () => {
  let useCase: FindByIdCustodyUseCase;
  let repository: ICustodyRepository;

  beforeEach(() => {
    repository = {
      findById: jest.fn(),
    } as any;

    useCase = new FindByIdCustodyUseCase(repository);
  });

  it('should call repository.findById with correct parameters', async () => {
    const dto: FindById = {
          id: 1,
        };
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                laboratoryMB: true,
                laboratoryFQ: false,
                codeThermohygrometer: 'TH-001',
                codeThermometerMM: 'TM-002',
                codeThermometer: 'TM-003',
                codeColorimeter: 'CL-004',
                initialConservative: 'Ice Pack',
                configurationVersion: 1,
            }],
            all: 1,
    };

    (repository.findById as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findById).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});