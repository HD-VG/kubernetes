/* eslint-disable prettier/prettier */
import { CreateCustodyUseCase } from 'src/application/cc_custody/use-cases/create-custody.use-case';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';
import { CreateChainOfCustodyDto } from 'src/presentation/dtos/cc_custody/create-chain_of_custody.dto';

describe('CreateCustodyUseCase', () => {
  let useCase: CreateCustodyUseCase;
  let custodyRepository: ICustodyRepository;

  beforeEach(() => {
    custodyRepository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateCustodyUseCase(custodyRepository);
  });

  it('should call custodyRepository.create with dto and userId, and return result', async () => {
    const dto: CreateChainOfCustodyDto = {
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
    const expectedResult = { status: true, message: 'Cadena de custodia creada' };

    (custodyRepository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(custodyRepository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});