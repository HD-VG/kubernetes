/* eslint-disable prettier/prettier */
import {
    FindById,
    PaginationDto,
    AnswerQuery,
    FindByUuid
} from 'src/common/dto/index.dto';
import { CreateConfigurationUtilDto, UpdateConfigurationUtilDto } from 'src/presentation/dtos/ag_configuration_utils/index.dto';
export interface IConfigurationUtilRepository {
    create(createConfigurationTypeWorkDto: CreateConfigurationUtilDto, userId: FindById): Promise<AnswerQuery>
    update(updateUtilId: FindByUuid, updateConfigurationTypeWorkDto: UpdateConfigurationUtilDto, userId: FindById): Promise<AnswerQuery>
    findOne(viewUtilId: FindByUuid): Promise<AnswerQuery>
    delete(deleteUtilId: FindByUuid,userId: FindById): Promise<AnswerQuery>
    list(paginationDto: PaginationDto): Promise<AnswerQuery>
    findAllData();
}