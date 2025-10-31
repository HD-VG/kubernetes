/* eslint-disable prettier/prettier */
import { ListTransportUseCase } from 'src/application/cc_transport/use-cases/list-transport.use-case';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';
import { FindById } from 'src/common/dto/index.dto';

describe('ListTransportUseCase', () => {
  let useCase: ListTransportUseCase;
  let transportRepository: ITransportRepository;

  beforeEach(() => {
    transportRepository = {
      list: jest.fn(),
    } as any;

    useCase = new ListTransportUseCase(transportRepository);
  });

  it('should call transportRepository.list with FindById dto and return result', async () => {
    const dto: FindById = { id: 1 };
    const expectedResult = {
      status: true,
      message: 'Transportes listados',
      data: [
        {
          id: 1,
          responsable: 'Juan Pérez',
          distanceTraveled: '15 km',
          initTime: '08:00',
          endTime: '09:30',
        },
      ],
    };

    (transportRepository.list as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(transportRepository.list).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});