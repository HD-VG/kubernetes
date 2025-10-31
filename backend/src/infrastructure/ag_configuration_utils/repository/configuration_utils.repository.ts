/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { ConfigurationUtil } from 'src/domain/ag_configuration_utils/entities/configuration_util.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConfigurationUtilDto, UpdateConfigurationUtilDto } from 'src/presentation/dtos/ag_configuration_utils/index.dto';
import { FindById, PaginationDto, AnswerQuery, FindByUuid } from 'src/common/dto/index.dto';
import { IConfigurationUtilRepository } from 'src/domain/ag_configuration_utils/interface/configuration_utils.interface';
import { ResponseMessages } from 'src/common/enum/answers.enum'

@Injectable()
export class ConfigurationUtilRepository implements IConfigurationUtilRepository{
    constructor(
        @InjectRepository(ConfigurationUtil)
        private readonly configurationUtilRepository: Repository<ConfigurationUtil>,
    ) { }

    async create(createConfigurationUtilDto: CreateConfigurationUtilDto, userId: FindById): Promise<AnswerQuery> {
        try {
            const createUtil = ConfigurationUtil.create(createConfigurationUtilDto,userId.id)
            const resultCreateUtil = await this.configurationUtilRepository.save(createUtil)
            if (resultCreateUtil) {
                return { message: ResponseMessages.RECORD_CREATED, status: true, data: resultCreateUtil.getResponse()};
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async update(updateId: FindByUuid, updateConfigurationUtilDto: UpdateConfigurationUtilDto,userId: FindById): Promise<AnswerQuery> {
        const updateUtil = await this.configurationUtilRepository.findOneBy({ uuid: updateId.uuid });
        try {
            updateUtil.update(updateConfigurationUtilDto, userId.id)
            const resultUpdateUtil = await this.configurationUtilRepository.save(updateUtil);
            if (resultUpdateUtil) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED, data: resultUpdateUtil.getResponse()};
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async findOne(viewId: FindByUuid): Promise<AnswerQuery> {
        try {
            const data = await this.configurationUtilRepository.findOneBy({ uuid: viewId.uuid });
            if (data) {
                return { status: true, message: ResponseMessages.RECORDS_FOUND, data: data.getResponse(), };
            } else {
                return { status: true, message: ResponseMessages.NO_RECORDS_FOUND, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async delete(deleteId: FindByUuid,userId: FindById): Promise<AnswerQuery> {
        try {
            const data = await this.configurationUtilRepository.findOneBy({ uuid: deleteId.uuid });
            if (data) {
                const transform = data.delete(userId.id); 
                const resultDeleteUtil = await this.configurationUtilRepository.save(transform);
                return { status: true, message: ResponseMessages.RECORD_DELETED, data: resultDeleteUtil, }
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
            const [data, count] = await this.configurationUtilRepository.findAndCount({
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
            const [data, count] = await this.configurationUtilRepository.findAndCount({
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