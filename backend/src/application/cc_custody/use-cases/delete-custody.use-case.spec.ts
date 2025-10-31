/* eslint-disable prettier/prettier */
import { DeleteCustodyUseCase } from './index-custody.use-case';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteCustodyUseCase', () => {
  let useCase: DeleteCustodyUseCase;
  let repository: ICustodyRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteCustodyUseCase(repository);
  });

  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
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

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});