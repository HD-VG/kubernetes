/* eslint-disable prettier/prettier */
import { Injectable} from '@nestjs/common';
import { ResponseMessages } from 'src/common/enum/answers.enum'
import { ConfigurationTypeMachine } from 'src/domain/ag_configuration_type_machine/entities/configuration_type_machine.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConfigurationTypeMachineDto, UpdateConfigurationTypeMachineDto } from 'src/presentation/dtos/ag_configuration_type_machine/index.dto';
import { FindById, PaginationDto, AnswerQuery, FindByUuid } from 'src/common/dto/index.dto';
import { IConfigurationTypeMachineRepository } from  'src/domain/ag_configuration_type_machine/interface/configuration_type_machine.interface'
@Injectable()
export class ConfigurationTypeMachineRepository implements IConfigurationTypeMachineRepository{
    constructor(
        @InjectRepository(ConfigurationTypeMachine)
        private readonly configurationTypeMachineRepository: Repository<ConfigurationTypeMachine>,
    ) { }
    async create(createConfigurationTypeMachineDto: CreateConfigurationTypeMachineDto, userId: FindById): Promise<AnswerQuery> {
        try {
            const createMachine = ConfigurationTypeMachine.create(createConfigurationTypeMachineDto,userId.id)
            const resultCreateMachine = await this.configurationTypeMachineRepository.save(createMachine)
            if (resultCreateMachine) {
                return { message: ResponseMessages.RECORD_CREATED, status: true,data: resultCreateMachine.getResponse() };
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async update(updateId: FindByUuid, updateConfigurationTypeMachineDto: UpdateConfigurationTypeMachineDto,userId: FindById): Promise<AnswerQuery> {
        const updateMachine = await this.configurationTypeMachineRepository.findOneBy({ uuid: updateId.uuid });
        try {
            updateMachine.update(updateConfigurationTypeMachineDto, userId.id)
            const resultUpdateMachine = await this.configurationTypeMachineRepository.save(updateMachine);
            if (resultUpdateMachine) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED,data: resultUpdateMachine.getResponse(), };
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async findOne(viewId: FindByUuid): Promise<AnswerQuery> {
        try {
            const data = await this.configurationTypeMachineRepository.findOneBy({ uuid: viewId.uuid });
            if (data) {
                return { status: true, message: ResponseMessages.RECORDS_FOUND, data: data.getResponse() }
            } else {
                return { status: true, message: ResponseMessages.NO_RECORDS_FOUND, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async delete(deleteId: FindByUuid,userId: FindById): Promise<AnswerQuery> {
        try {
            const data = await this.configurationTypeMachineRepository.findOneBy({ uuid: deleteId.uuid });
            if (data) {
                const transform = data.delete(userId.id); 
                const resultDeleteMachine = await this.configurationTypeMachineRepository.save(transform);
                return { status: true, message: ResponseMessages.RECORD_DELETED, data: resultDeleteMachine, }
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
            const [data, count] = await this.configurationTypeMachineRepository.findAndCount({
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
            const [data, count] = await this.configurationTypeMachineRepository.findAndCount({
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
