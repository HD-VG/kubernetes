/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateTransportDto, UpdateTransportDto } from 'src/presentation/dtos/cc_transport/index.dto';
import { FindById } from 'src/common/dto/findById.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { AnswerQuery } from 'src/common/dto/answer.dto';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';
import { ITransportRepositoryToken } from 'src/application/cc_transport/tokens/transport-repository.tokens';

@Injectable()
export class TransportService {
  constructor(
    @Inject('ITransportRepository')
    @Inject(ITransportRepositoryToken)
    private readonly transportRepository: ITransportRepository
  ) { }
  private async validateExistsOrThrow(id: number): Promise<AnswerQuery> {
    const entity = await this.transportRepository.findById({id});
    if (!entity) {
      return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
    }
    return entity;
  }
  async create(createTransportDto: CreateTransportDto, userId: number) {
    const findCustody = await this.transportRepository.findCustody(createTransportDto.chainOfCustody)
    if (!findCustody) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
    return await this.transportRepository.create(createTransportDto, userId);
  }

  async findAll(findById: FindById) {
    return await this.transportRepository.list(findById);
  }

  async findOne(findById: FindById) {
    return await this.transportRepository.findById(findById);
  }

  async update(
    id: number,
    updateTransportDto: UpdateTransportDto,
    userId: number,
  ) {
    await this.validateExistsOrThrow(id);
    return await this.transportRepository.update(
      id,
      updateTransportDto,
      userId,
    );
  }

  async remove(findById: FindById, userId: number) {
    await this.validateExistsOrThrow(findById.id);
    return await this.transportRepository.delete(findById, userId);
  }
}
