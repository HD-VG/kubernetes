/* eslint-disable prettier/prettier */
import { ToListLimitUseCase } from 'src/application/cc_configuration_limit/use-cases/to-list.use.case';
import { ILimitRepository } from 'src/domain/cc_configuration_limit/interface/limit-repository.interface';

describe('ToListLimitUseCase', () => {
  let useCase: ToListLimitUseCase;
  let limitRepository: ILimitRepository;

  beforeEach(() => {
    limitRepository = {
      toConfiguration: jest.fn(),
    } as any;

    useCase = new ToListLimitUseCase(limitRepository);
  });

  it('should call limitRepository.toConfiguration and return result', async () => {
    const expectedResult = {
      status: true,
      message: 'Configuration limits listed',
      data: [{ id: '1_1_1', value: 'Estandar de Calidad - Agua Cruda - TEST' }],
    };

    (limitRepository.toConfiguration as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute();

    expect(limitRepository.toConfiguration).toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });
});