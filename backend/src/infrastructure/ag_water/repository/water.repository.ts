/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ResponseMessages } from 'src/common/enum/answers.enum'
import { Water } from 'src/domain/ag_water/entities/water.entity';
import { IsNull, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWaterDto, UpdateWaterDto } from 'src/presentation/dtos/ag_water/index.dto';
import { AnswerQuery, FindById, PaginationDto } from 'src/common/dto/index.dto';
import { IWaterRepository } from 'src/domain/ag_water/interface/water.interface';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';

@Injectable()
export class WaterRepository implements IWaterRepository {
    constructor(
        @InjectRepository(Water)
        private readonly WaterRepository: Repository<Water>,
    ) { }
    async create(createWaterDto: CreateWaterDto, userId: FindById): Promise<AnswerQuery> {
        try {
            const configuration = Water.create(createWaterDto,userId.id)
            const data = await this.WaterRepository.save(configuration)
            if (data) {
                return { message: ResponseMessages.RECORD_CREATED, status: true, };
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async update(updateWaterId: FindByUuid, updateWaterDto: UpdateWaterDto,userId: FindById): Promise<AnswerQuery> {
        const find_configuration = await this.WaterRepository.findOneBy({ uuid: updateWaterId.uuid });
        try {
            find_configuration.update(updateWaterDto, userId.id)
            const result = await this.WaterRepository.save(find_configuration);
            if (result) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED, };
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async findOne(viewId: FindByUuid): Promise<AnswerQuery> {
        try {
            const data = await this.WaterRepository.findOneBy({ uuid: viewId.uuid });
            if (data) {
                const transform = data.getResponse(); 
                return { status: true, message: ResponseMessages.RECORDS_FOUND, data: transform, }
            } else {
                return { status: true, message: ResponseMessages.NO_RECORDS_FOUND, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async delete(deleteId: FindByUuid,userId: FindById): Promise<AnswerQuery> {
        try {
            const data = await this.WaterRepository.findOneBy({ uuid: deleteId.uuid });
            if (data) {
                const transform = data.delete(userId.id); 
                const result = await this.WaterRepository.save(transform);
                return { status: true, message: ResponseMessages.RECORD_DELETED, data: result, }
            } else {
                return { status: true, message: ResponseMessages.NO_RECORDS_FOUND, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async list(paginationDto: PaginationDto): Promise<AnswerQuery> {
        try {
            const { limit = 5, offset = 0, parameter = '' } = paginationDto;
            const [data, count] = await this.WaterRepository.findAndCount({
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
            const [data, count] = await this.WaterRepository.findAndCount({
                where: [{ deleteAt: null },],
                order: { createAt: 'DESC' },
            })
            const transform = data.map(config => config.getResponse());
        if (data) {
                return { message: ResponseMessages.RECORDS_FOUND, status: true, data: transform, all: count, };
            } else { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async findByName(name: string): Promise<AnswerQuery> {
        try {
            const data = await this.WaterRepository.findOneBy({ name });
            if (data) {
                const transform = data.getResponse(); 
                return { status: true, message: ResponseMessages.RECORDS_FOUND, data: transform, }
            } else {
                return { status: true, message: ResponseMessages.NO_RECORDS_FOUND, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async findLastCoste() {
        try {
            const data = await this.WaterRepository.findOne({ 
                where: { deleteAt: IsNull() },
                order: { createAt: 'DESC' }, });
            if (data) {
                const transform = data.getResponse(); 
                return { status: true, message: ResponseMessages.RECORDS_FOUND, data: transform, }
            } else {
                return { status: true, message: ResponseMessages.NO_RECORDS_FOUND, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    
}