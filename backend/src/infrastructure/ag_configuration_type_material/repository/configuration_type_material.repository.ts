/* eslint-disable prettier/prettier */
import {  Injectable } from '@nestjs/common';
import { ConfigurationTypeMaterial } from 'src/domain/ag_configuration_type_material/entities/configuration_type_material.entity';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConfigurationTypeMaterialDto, UpdateConfigurationTypeMaterialDto } from 'src/presentation/dtos/ag_configuration_type_material/index.dto';
import { FindById, PaginationDto, AnswerQuery, FindByUuid } from 'src/common/dto/index.dto';
import { IConfigurationTypeMaterialRepository } from 'src/domain/ag_configuration_type_material/interface/configuration_type_material.interface';
import { ConfigurationTypeMaterialService } from '../service/configuration_type_material.service';
import { ResponseMessages } from 'src/common/enum/answers.enum'
@Injectable()
export class ConfigurationTypeMaterialRepository implements IConfigurationTypeMaterialRepository{
    constructor(
        @InjectRepository(ConfigurationTypeMaterial)
        private readonly configurationTypeMaterialRepository: Repository<ConfigurationTypeMaterial>,
        private readonly configurationTypeMaterialService: ConfigurationTypeMaterialService//traemos el servicio,
    ) { }

    async create(createConfigurationTypeMaterialDto: CreateConfigurationTypeMaterialDto, userId: FindById): Promise<AnswerQuery> {
        try {
            const register = await this.configurationTypeMaterialService.ValidationRegister(createConfigurationTypeMaterialDto.register_id);
            const calculation = this.configurationTypeMaterialService.calculation(createConfigurationTypeMaterialDto);
            const calculationPrecision = this.configurationTypeMaterialService.calculationPrecision(createConfigurationTypeMaterialDto, calculation);
            const createMaterial = ConfigurationTypeMaterial.create(calculationPrecision,register,userId.id)
            const resultCreateMaterial = await this.configurationTypeMaterialRepository.save(createMaterial)
            if (resultCreateMaterial) {
                return { message: ResponseMessages.RECORD_CREATED, status: true,data: resultCreateMaterial.getResponse()  };
            } else { return { message: ResponseMessages.SERVER_ERROR, status: false, }; }
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }

    async update(updateId: FindByUuid,updateMaterialDto: UpdateConfigurationTypeMaterialDto, userId:FindById): Promise<AnswerQuery> {
        const updateMaterial = await this.configurationTypeMaterialRepository.findOneBy({uuid: updateId.uuid});
        const register = await this.configurationTypeMaterialService.ValidationRegister(updateMaterialDto.register_id);
        try {
            updateMaterial.update(updateMaterialDto,register, userId.id)
            const resultUpdateMaterial = await this.configurationTypeMaterialRepository.save(updateMaterial);
            if (resultUpdateMaterial) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED, data: resultUpdateMaterial.getResponse(), };
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }

    async findOne(viewId: FindByUuid): Promise<AnswerQuery> {
        try {
            const data = await this.configurationTypeMaterialRepository.findOneBy({ uuid: viewId.uuid });
            if (data) {
                return { status: true, message: ResponseMessages.RECORDS_FOUND, data: data.getResponse(), };
            } else {
                return { status: true, message: ResponseMessages.NO_RECORDS_FOUND, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async delete(deleteId: FindByUuid, userId : FindById): Promise<AnswerQuery> {
        try {
            const deleteMaterial = await this.configurationTypeMaterialRepository.findOneBy({ uuid: deleteId.uuid });
            if (deleteMaterial) {
                deleteMaterial.delete(userId.id); 
                const resultDeleteMaterial = await this.configurationTypeMaterialRepository.save(deleteMaterial);
                return { status: true, message: ResponseMessages.RECORD_DELETED, data: resultDeleteMaterial, }
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
            const [data, count] = await this.configurationTypeMaterialRepository.findAndCount({
                select: ["id", "name", "createAt","level"],
                where: [
                    { name: Like(`%${parameter}%`), deleteAt: null },
                ],
                relations: ["register"],
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
            const [data, count] = await this.configurationTypeMaterialRepository.findAndCount({
                where: [{ deleteAt: null },],
                order: { createAt: 'DESC' },
                relations: ["register"],
            })
            const transform = data.map(config => config.getResponse());
        if (data) {
                return { message: ResponseMessages.RECORDS_FOUND, status: true, data: transform, all: count, };
            } else { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async findAllDataApi(): Promise<AnswerQuery> {
        try {
            const getMaterialsApi = await this.configurationTypeMaterialService.getMaterialsApi();
            const data = getMaterialsApi;
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data };
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }
}
