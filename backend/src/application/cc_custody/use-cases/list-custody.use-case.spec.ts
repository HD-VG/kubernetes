/* eslint-disable prettier/prettier */
import { ListCustodyUseCase } from 'src/application/cc_custody/use-cases/list-custody.use-case';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';

describe('ListCustodyUseCase', () => {
  let useCase: ListCustodyUseCase;
  let custodyRepository: ICustodyRepository;

  beforeEach(() => {
    custodyRepository = {
      listCustody: jest.fn(),
    } as any;

    useCase = new ListCustodyUseCase(custodyRepository);
  });

  it('should call custodyRepository.listCustody and return result', async () => {
    const expectedResult = {
      status: true,
      message: 'Cadenas de custodia listadas',
      data: [
        {
          id: 1,
          laboratoryMB: true,
          laboratoryFQ: false,
          codeThermohygrometer: 'TH-001',
          codeThermometerMM: 'TM-002',
          codeThermometer: 'TM-003',
          codeColorimeter: 'CL-004',
          initialConservative: 'Ice Pack',
          configurationVersion: 1,
        },
      ],
    };

    (custodyRepository.listCustody as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(custodyRepository.listCustody).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});