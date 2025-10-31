/* eslint-disable prettier/prettier */
import { UpdateCustodyUseCase } from './index-custody.use-case';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { UpdateChainOfCustodyDto } from 'src/presentation/dtos/cc_custody/update-chain_of_custody.dto';

describe('UpdateCustodyUseCase', () => {
  let useCase: UpdateCustodyUseCase;
  let repository: ICustodyRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateCustodyUseCase(repository);
  });

  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateChainOfCustodyDto = {
      id: 1,
      codeCustody: 'string',
      laboratoryMB: true,
      laboratoryFQ: false,
      codeThermohygrometer: 'TH-001',
      codeThermometerMM: 'TM-002',
      codeThermometer: 'TM-003',
      codeColorimeter: 'CL-004',
      initialConservative: 'Ice Pack',
      configurationVersion: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro actualizado' };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(1,dto, userId);

    expect(repository.update).toHaveBeenCalledWith(1,dto, userId);
    expect(result).toEqual(expectedResult);
  });
});