/* eslint-disable prettier/prettier */
import { CreateTransportUseCase } from 'src/application/cc_transport/use-cases/create-transport.use-case';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';
import { CreateTransportDto } from 'src/presentation/dtos/cc_transport/index.dto';

describe('CreateTransportUseCase', () => {
  let useCase: CreateTransportUseCase;
  let transportRepository: ITransportRepository;

  beforeEach(() => {
    transportRepository = {
      create: jest.fn(),
    } as any;

    useCase = new CreateTransportUseCase(transportRepository);
  });

  it('should call transportRepository.create with dto and userId, and return result', async () => {
    const dto: CreateTransportDto = {
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
    const expectedResult = { status: true, message: 'Transporte registrado' };

    (transportRepository.create as jest.Mock).mockResolvedValue(expectedResult);

    const result = await useCase.execute(dto, userId);

    expect(transportRepository.create).toHaveBeenCalledWith(dto, userId);
    expect(result).toEqual(expectedResult);
  });
});