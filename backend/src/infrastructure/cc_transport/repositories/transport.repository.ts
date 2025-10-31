/* eslint-disable prettier/prettier */
import {
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transport } from '../../../domain/cc_transport/entities/transport.entity'
import { ChainOfCustody } from 'src/domain/cc_custody/entities/chain_of_custody.entity'
import { IsNull, Repository } from 'typeorm';
import { CreateTransportDto, UpdateTransportDto } from 'src/presentation/dtos/cc_transport/index.dto'
import { AnswerQuery, FindById } from 'src/common/dto/index.dto'
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { ITransportRepository } from 'src/domain/cc_transport/interface/transport-repository.interface';

@Injectable()
export class TransportRepository implements ITransportRepository {

    constructor(
        @InjectRepository(Transport)
        private readonly transportRepository: Repository<Transport>,
        @InjectRepository(ChainOfCustody)
        private readonly chainOfCustodyRepository: Repository<ChainOfCustody>,
    ) { }

    async findCustody(id: number): Promise<AnswerQuery> {
        try {
            const chainOfCustody = await this.chainOfCustodyRepository.findOneBy({ id: id })
            if (!chainOfCustody) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
            return { status: true, data: chainOfCustody, message: ResponseMessages.RECORDS_FOUND }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async create(createTransportDto: CreateTransportDto, userId: number): Promise<AnswerQuery> {
        try {
            const chainOfCustody = await this.findCustody(createTransportDto.chainOfCustody)
            const transport = Transport.create(createTransportDto, userId, chainOfCustody.data)
            const data = await this.transportRepository.save(transport)
            if (data) {
                return { status: true, message: ResponseMessages.RECORD_CREATED, }
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR } }

        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    async update(id: number, updateTransportDto: UpdateTransportDto, userId: number): Promise<AnswerQuery> {
        try {
            const sampling = await this.transportRepository.findOneBy({ id: id })
            sampling.update(updateTransportDto, userId)
            const data = await this.transportRepository.save(sampling);
            if (data) {
                return { status: true, message: ResponseMessages.RECORD_CREATED, }
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR } }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    async list(findById: FindById): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.transportRepository.findAndCount({
                where: {
                    chainOfCustody: {
                        id: findById.id
                    },
                    deleteAt: IsNull(),
                },
                order: { createAt: 'DESC' },
            })
            const transform = data.map(transform => transform.toResponse());
            if (data) {
                return {
                    message: ResponseMessages.RECORDS_FOUND,
                    status: true,
                    data: transform,
                    all: count,
                }
            } else { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false } }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    async findByCustodyId(id: number): Promise<Transport> {
        return this.transportRepository.findOne({
            where: {
                chainOfCustody: { id },
            },
        });
    }
    async findById(findById: FindById) {
        try {
            const [data, count] = await this.transportRepository.findAndCount({
                where: {
                    id: findById.id,
                    deleteAt: IsNull(),
                }
            })
            const transform = data.map(transform => transform.toResponse());
            return {
                message: ResponseMessages.RECORDS_FOUND,
                status: true,
                data: transform,
                all: count,
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    async delete(
        findById: FindById,
        userId: number
    ): Promise<AnswerQuery> {
        try {
            const find = await this.transportRepository.findOneBy({ id: findById.id });
            find.softDelete(userId)
            const data1 = await this.transportRepository.save(find);
            if (data1) {
                return { message: ResponseMessages.RECORD_DELETED, status: true }
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false } }
        } catch (error) {
            return { message: error.message, status: false }
        }
    }
}