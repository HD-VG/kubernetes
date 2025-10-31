/* eslint-disable prettier/prettier */
import {
    FindById,
    PaginationDto,
    AnswerQuery,
    FindByUuid
} from 'src/common/dto/index.dto';
import { CreateConfigurationTypeWorkDto, UpdateConfigurationTypeWorkDto } from 'src/presentation/dtos/ag_configuration_type_work/index.dto';
export interface IConfigurationTypeWorkRepository {
    create(createConfigurationTypeWorkDto: CreateConfigurationTypeWorkDto, userId: FindById): Promise<AnswerQuery>
    update(updateWorkId: FindByUuid, updateConfigurationTypeWorkDto: UpdateConfigurationTypeWorkDto, userId: FindById): Promise<AnswerQuery>
    findOne(viewWorkId: FindByUuid): Promise<AnswerQuery>
    delete(deleteWorkId: FindByUuid,userId: FindById): Promise<AnswerQuery>
    list(paginationDto: PaginationDto): Promise<AnswerQuery>
    findAllData();
}