/* eslint-disable prettier/prettier */
import { Injectable} from '@nestjs/common';
import { ConfigurationTypeWork } from 'src/domain/ag_configuration_type_work/entities/configuration_type_work.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConfigurationTypeWorkDto, UpdateConfigurationTypeWorkDto } from 'src/presentation/dtos/ag_configuration_type_work/index.dto';
import { FindById, PaginationDto, AnswerQuery, FindByUuid } from 'src/common/dto/index.dto';
import { IConfigurationTypeWorkRepository} from 'src/domain/ag_configuration_type_work/interface/configuration_type_work.interface'
import { ResponseMessages } from 'src/common/enum/answers.enum'

@Injectable()
export class ConfigurationTypeWorkRepository implements IConfigurationTypeWorkRepository{
    constructor(
        @InjectRepository(ConfigurationTypeWork)
        private readonly configurationTypeWorkRepository: Repository<ConfigurationTypeWork>,
    ) { }

    async create(createConfigurationTypeWorkDto: CreateConfigurationTypeWorkDto, userId: FindById): Promise<AnswerQuery> {
        try {
            const createWork = ConfigurationTypeWork.create(createConfigurationTypeWorkDto, userId.id)
            const resultCreateWork = await this.configurationTypeWorkRepository.save(createWork)
            if (resultCreateWork) {
                return { message: ResponseMessages.RECORD_CREATED, status: true,data: resultCreateWork.getResponse() };
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async update(updateId: FindByUuid, updateConfigurationTypeWorkDto: UpdateConfigurationTypeWorkDto,userId: FindById): Promise<AnswerQuery> {
        const updateWork = await this.configurationTypeWorkRepository.findOneBy({ uuid: updateId.uuid });
        try {
            updateWork.update(updateConfigurationTypeWorkDto, userId.id)
            const resultUpdateWork = await this.configurationTypeWorkRepository.save(updateWork);
            if (resultUpdateWork) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED, data: resultUpdateWork.getResponse()};
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async findOne(viewId: FindByUuid): Promise<AnswerQuery> {
        try {
            const data = await this.configurationTypeWorkRepository.findOneBy({ uuid: viewId.uuid });
            if (data) {
                return { status: true, message: ResponseMessages.RECORDS_FOUND, data: data.getResponse() };
            } else {
                return { status: true, message: ResponseMessages.NO_RECORDS_FOUND, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async delete(deleteId: FindByUuid, userId: FindById): Promise<AnswerQuery> {
        try {
            const deleteWork = await this.configurationTypeWorkRepository.findOneBy({ uuid: deleteId.uuid });
            if (deleteWork) {
                deleteWork.delete(userId.id); 
                const resultDeleteWork = await this.configurationTypeWorkRepository.save(deleteWork);
                return { status: true, message: ResponseMessages.RECORD_DELETED, data: resultDeleteWork.getResponse() }
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
            const [data, count] = await this.configurationTypeWorkRepository.findAndCount({
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
            const [data, count] = await this.configurationTypeWorkRepository.findAndCount({
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
