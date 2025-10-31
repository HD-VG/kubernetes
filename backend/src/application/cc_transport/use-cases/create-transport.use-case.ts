/* eslint-disable prettier/prettier */
import { Injectable, Inject } from '@nestjs/common';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';
import { CreateTransportDto } from 'src/presentation/dtos/cc_transport/index.dto';
import { ITransportRepositoryToken } from '../tokens/transport-repository.tokens';

@Injectable()
export class CreateTransportUseCase {
  constructor(
    @Inject(ITransportRepositoryToken)
    private readonly transportRepository: ITransportRepository,
  ) {}

  async execute(dto: CreateTransportDto, userId: number) {
    return await this.transportRepository.create(dto, userId);
  }
}
