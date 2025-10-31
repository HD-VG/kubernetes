/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ResponseMessages } from 'src/common/enum/answers.enum'
import { Recurring } from 'src/domain/ag_recurring/entities/recurring.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecurringDto, UpdateRecurringDto } from 'src/presentation/dtos/ag_recurring/index.dto';
import { FindById, PaginationDto, AnswerQuery, FindByUuid } from 'src/common/dto/index.dto';
import {IRecurringRepository} from 'src/domain/ag_recurring/interface/recurring.interface'
@Injectable()
export class RecurringRepository implements IRecurringRepository {
    constructor(
        @InjectRepository(Recurring)
        private readonly recurringRepository: Repository<Recurring>,
    ) { }

    async create(createRecurringDto: CreateRecurringDto, userId: FindById): Promise<AnswerQuery> {
        try {
            const createRecurring = Recurring.create(createRecurringDto,userId.id)
            const resultCreateRecurring = await this.recurringRepository.save(createRecurring)
            if (resultCreateRecurring) {
                return { message: ResponseMessages.RECORD_CREATED, status: true,data: resultCreateRecurring.getResponse(), };
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async update(updateId: FindByUuid, updateRecurringDto: UpdateRecurringDto,userId: FindById): Promise<AnswerQuery> {
        const updateRecurring = await this.recurringRepository.findOneBy({ uuid: updateId.uuid });
        try {
            updateRecurring.update(updateRecurringDto, userId.id)
            const resultUpdateRecurring = await this.recurringRepository.save(updateRecurring);
            if (resultUpdateRecurring) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED,data: resultUpdateRecurring.getResponse() };
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async findOne(viewId: FindByUuid): Promise<AnswerQuery> {
        try {
            const data = await this.recurringRepository.findOneBy({ uuid: viewId.uuid });
            if (data) { 
                return { status: true, message: ResponseMessages.RECORDS_FOUND, data: data.getResponse(), }
            } else {
                return { status: true, message: ResponseMessages.NO_RECORDS_FOUND, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async delete(deleteId: FindByUuid,userId: FindById): Promise<AnswerQuery> {
        try {
            const deleteRecurring = await this.recurringRepository.findOneBy({ uuid: deleteId.uuid });
            if (deleteRecurring) {
                deleteRecurring.delete(userId.id); 
                const resultDeleteRecurring = await this.recurringRepository.save(deleteRecurring);
                return { status: true, message: ResponseMessages.RECORD_DELETED, data: resultDeleteRecurring, }
            } else {
                return { status: true, message: ResponseMessages.RECORDS_DELETE, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async list(paginationDto: PaginationDto): Promise<AnswerQuery> {
        try {
            const { limit = 5, offset = 0, parameter = '' } = paginationDto;
            const [data, count] = await this.recurringRepository.findAndCount({
                select: ["id", "name", "createAt"],
                where: [
                    { name: Like(`%${parameter}%`), deleteAt: null },
                ],
                order: { createAt: 'DESC' },
                take: limit,
                skip: offset,
            })
            const transform = data.map(config => config.getResponse());
        if (data) {
                return { message: ResponseMessages.RECORDS_FOUND, status: true, data: transform, all: count, };
            } else { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async findAllData() {
        try {
            const [data, count] = await this.recurringRepository.findAndCount({
                where: [{ deleteAt: null },],
                order: { createAt: 'DESC' },
                //relations: ["ConfigurationsTypeDagme"]
            })
            const transform = data.map(config => config.getResponse());
        if (data) {
                return { message: ResponseMessages.RECORDS_FOUND, status: true, data: transform, all: count, };
            } else { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
}
