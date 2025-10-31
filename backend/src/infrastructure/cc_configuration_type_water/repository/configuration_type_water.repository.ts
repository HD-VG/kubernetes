/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
    CreateTypeWaterDto,
    UpdateTypeWaterDto,
} from 'src/presentation/dtos/cc_configuration_type_water/index.dto';
import {
    AnswerQuery,
    FindById,
} from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { ConfigurationTypeWater } from 'src/domain/cc_configuration_type_water/entities/type_water.entity';
import { IConfigurationTypeWaterRepository } from 'src/domain/cc_configuration_type_water/interface/cc_configuration_type_water.interface';

@Injectable()
export class ConfigurationTypeWaterRepository implements IConfigurationTypeWaterRepository {
    constructor(
        @InjectRepository(ConfigurationTypeWater)
        private readonly configurationTypeWaterRepository: Repository<ConfigurationTypeWater>,
    ) { }
    async create(
        createTypeWaterDto: CreateTypeWaterDto,
        id: number,
    ): Promise<AnswerQuery> {
        try {
            const configurationTypeWater = ConfigurationTypeWater.create(createTypeWaterDto, id)
            const response = await this.configurationTypeWaterRepository.save(configurationTypeWater);
            if (response) {
                return { message: ResponseMessages.RECORD_CREATED, status: true, };
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async update(
        id: number,
        UpdateTypeWaterDto: UpdateTypeWaterDto,
        userId: number
    ): Promise<AnswerQuery> {
        try {
            const find = await this.configurationTypeWaterRepository.findOneBy({ id: UpdateTypeWaterDto.id });
            find.update(UpdateTypeWaterDto, userId)
            const result = await this.configurationTypeWaterRepository.save(find);
            if (result) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED, };
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async findById(findById: FindById): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.configurationTypeWaterRepository.findAndCount({ where: { id: findById.id } })
            if (!data) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
            const transform = data.map(config => config.toResponse());
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data: transform, total: count}
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    async list(): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.configurationTypeWaterRepository.findAndCount({
                where: {
                    deleteAt: IsNull(),
                },
                order: { createAt: 'DESC' },
            });
            const transform = data.map(config => config.toResponse());
            if (data) {
                return { message: ResponseMessages.RECORDS_FOUND, status: true, data: transform, total: count, };
            } else { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async delete(findById: FindById, userId: number): Promise<AnswerQuery> {
        try {
            const find = await this.configurationTypeWaterRepository.findOne({ where: { id: findById.id } });
            find.solfDelete(userId);
            await this.configurationTypeWaterRepository.save(find);
            return { message: ResponseMessages.RECORD_DELETED, status: true, };
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
}