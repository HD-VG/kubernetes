/* eslint-disable prettier/prettier */
import { DeleteTransportUseCase } from './index-transport.use-case';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';
import { FindById } from 'src/common/dto/findById.dto';

describe('DeleteTransportUseCase', () => {
  let useCase: DeleteTransportUseCase;
  let repository: ITransportRepository;

  beforeEach(() => {
    repository = {
      delete: jest.fn(),
    } as any;

    useCase = new DeleteTransportUseCase(repository);
  });

  it('should call repository.delete with correct parameters', async () => {
    const dto: FindById = {
      id: 1,
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro eliminado',
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
                chainOfCustody: 1,
            }],
            all: 1,
    };

    (repository.delete as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(repository.delete).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});