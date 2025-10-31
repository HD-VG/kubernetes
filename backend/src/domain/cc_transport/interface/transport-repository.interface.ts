/* eslint-disable prettier/prettier */
import { FindById, AnswerQuery } from 'src/common/dto/index.dto';
import {
    CreateTransportDto,
    UpdateTransportDto
} from 'src/presentation/dtos/cc_transport/index.dto';
import { Transport } from '../entities/transport.entity';

export interface ITransportRepository {
    create(dto: CreateTransportDto, user: number): Promise<AnswerQuery | null>;
    update(id: number, dto: UpdateTransportDto, user: number): Promise<AnswerQuery | null>;
    list(dto: FindById): Promise<AnswerQuery | null>;
    findByCustodyId(id: number): Promise<Transport | null>;
    findCustody(id: number): Promise<AnswerQuery | null>;
    findById(dto: FindById): Promise<AnswerQuery | null>;
    delete(dto: FindById, user: number): Promise<AnswerQuery | null>;
}