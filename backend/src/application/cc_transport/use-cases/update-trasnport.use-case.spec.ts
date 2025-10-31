/* eslint-disable prettier/prettier */
import { UpdateTransportUseCase } from './update-trasnport.use-case';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';
import { UpdateTransportDto } from 'src/presentation/dtos/cc_transport/index.dto';

describe('UpdateTransportUseCase', () => {
  let useCase: UpdateTransportUseCase;
  let repository: ITransportRepository;

  beforeEach(() => {
    repository = {
      update: jest.fn(),
    } as any;

    useCase = new UpdateTransportUseCase(repository);
  });

  it('should call repository.update with correct parameters', async () => {
    const dto: UpdateTransportDto = {
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
    };
    const userId = 1;
    const expectedResult = { status: true, message: 'Registro actualizado' };

    (repository.update as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(1,dto, userId);

    expect(repository.update).toHaveBeenCalledWith(1,dto, userId);
    expect(result).toEqual(expectedResult);
  });
});