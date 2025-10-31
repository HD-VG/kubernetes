/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import {
    CreateConfigurationUexpDto,
    UpdateConfigurationUexpDto,
} from 'src/presentation/dtos/cc_configuration_uexp/index.dto';
import {
    AnswerQuery,
    FindById,
} from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { ConfigurationUexp } from 'src/domain/cc_configuration_uexp/entities/configuration_uexp.entity';
import { IConfigurationUexpRepository } from 'src/domain/cc_configuration_uexp/interface/cc_configuration_uexp.interface';

@Injectable()
export class ConfigurationUexpRepository implements IConfigurationUexpRepository {
    constructor(
        @InjectRepository(ConfigurationUexp)
        private readonly configurationUexpRepository: Repository<ConfigurationUexp>,
    ) { }
    async create(
        CreateConfigurationUexpDto: CreateConfigurationUexpDto,
        id: number,
    ): Promise<AnswerQuery> {
        try {
            const configurationUexp = ConfigurationUexp.create(CreateConfigurationUexpDto, id)
            const response = await this.configurationUexpRepository.save(configurationUexp);
            if (response) {
                return { message: ResponseMessages.RECORD_CREATED, status: true, };
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async update(
        id: number,
        updateConfigurationUexpDto: UpdateConfigurationUexpDto,
        userId: number
    ): Promise<AnswerQuery> {
        try {
            const find = await this.configurationUexpRepository.findOneBy({ id: updateConfigurationUexpDto.id });
            find.update(updateConfigurationUexpDto, userId)
            const result = await this.configurationUexpRepository.save(find);
            if (result) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED, };
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async findById(findById: FindById): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.configurationUexpRepository.findAndCount({ where: { id: findById.id } })
            if (!data) return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }
            const transform = data.map(config => config.toResponse());
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data: transform, total: count}
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    async list(): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.configurationUexpRepository.findAndCount({
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
            const find = await this.configurationUexpRepository.findOne({ where: { id: findById.id } });
            find.solfDelete(userId);
            await this.configurationUexpRepository.save(find);
            return { message: ResponseMessages.RECORD_DELETED, status: true, };
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
}