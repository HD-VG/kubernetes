/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ResponseMessages } from 'src/common/enum/answers.enum'
import { ConfigurationTypeDagme } from 'src/domain/ag_configuration_type_dagme/entities/configuration_type_dagme.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConfigurationTypeDagmeDto, UpdateConfigurationTypeDagmeDto } from 'src/presentation/dtos/ag_configuration_type_dagme/index.dto';
import { FindById, PaginationDto, AnswerQuery, FindByUuid } from 'src/common/dto/index.dto';
import {IConfigurationTypeDagmeRepository} from 'src/domain/ag_configuration_type_dagme/interface/configuration_type_dagme.interface'
@Injectable()
export class ConfigurationTypeDagmeRepository implements IConfigurationTypeDagmeRepository {
    constructor(
        @InjectRepository(ConfigurationTypeDagme)
        private readonly configurationTypeDagmeRepository: Repository<ConfigurationTypeDagme>,
    ) { }

    async create(createConfigurationTypeDagmeDto: CreateConfigurationTypeDagmeDto, userId: FindById): Promise<AnswerQuery> {
        try {
            const configuration = ConfigurationTypeDagme.create(createConfigurationTypeDagmeDto,userId.id)
            const data = await this.configurationTypeDagmeRepository.save(configuration)
            if (data) {
                return { message: ResponseMessages.RECORD_CREATED, status: true,data: data.getResponse() };
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async update(updateId: FindByUuid, updateConfigurationTypeDagmeDto: UpdateConfigurationTypeDagmeDto,userId: FindById): Promise<AnswerQuery> {
        const find_configuration = await this.configurationTypeDagmeRepository.findOneBy({ uuid: updateId.uuid });
        try {
            find_configuration.update(updateConfigurationTypeDagmeDto, userId.id)
            const result = await this.configurationTypeDagmeRepository.save(find_configuration);
            if (result) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED, data: result.getResponse()};
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async findOne(findById: FindByUuid): Promise<AnswerQuery> {
        try {
            const data = await this.configurationTypeDagmeRepository.findOneBy({ uuid: findById.uuid });
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

    async delete(findById: FindByUuid,userId: FindById): Promise<AnswerQuery> {
        try {
            const data = await this.configurationTypeDagmeRepository.findOneBy({ uuid: findById.uuid });
            if (data) {
                const transform = data.delete(userId.id); 
                const result = await this.configurationTypeDagmeRepository.save(transform);
                return { status: true, message: ResponseMessages.RECORD_DELETED, data: result.getResponse(), }
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
            const [data, count] = await this.configurationTypeDagmeRepository.findAndCount({
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
            const [data, count] = await this.configurationTypeDagmeRepository.findAndCount({
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
}
