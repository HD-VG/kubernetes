/* eslint-disable prettier/prettier */
import { FindTransportUseCase } from './index-transport.use-case';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';

describe('FindTransportUseCase', () => {
  let useCase: FindTransportUseCase;
  let repository: ITransportRepository;

  beforeEach(() => {
    repository = {
      findByCustodyId: jest.fn(),
    } as any;

    useCase = new FindTransportUseCase(repository);
  });

  it('should call repository.findByCustodyId with correct parameters', async () => {
    const dto= 1;
    const expectedResult = { status: true, message: 'Registro encontrado',
      data: [{
                id: 1,
                responsable: 'Juan Pérez',
                distanceTraveled: '15 km',
                conservativeArrivalStretch: '10 km',
                maximumStretch: '20 km',
                initDate: new Date('2025-09-09'),
                endDate: new Date('2025-09-09'),
                initTime: '08:00',
                endTime: '09:30',
                chainOfCustody: 1,//por el id
            }],
            all: 1,
    };

    (repository.findByCustodyId as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto);

    expect(repository.findByCustodyId).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResult);
  });
});