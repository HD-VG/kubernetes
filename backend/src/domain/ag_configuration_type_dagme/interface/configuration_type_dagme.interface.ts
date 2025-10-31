/* eslint-disable prettier/prettier */
import {
    FindById,
    PaginationDto,
    AnswerQuery,
    FindByUuid
} from 'src/common/dto/index.dto';
import { CreateConfigurationTypeDagmeDto, UpdateConfigurationTypeDagmeDto } from 'src/presentation/dtos/ag_configuration_type_dagme/index.dto';
export interface IConfigurationTypeDagmeRepository {
    create(createConfigurationTypeDagmeDto: CreateConfigurationTypeDagmeDto, userId: FindById): Promise<AnswerQuery>
    update(updateDagmeId: FindByUuid, updateConfigurationTypeDagmeDto: UpdateConfigurationTypeDagmeDto,userId: FindById): Promise<AnswerQuery>
    findOne(viewDagmeId: FindByUuid): Promise<AnswerQuery>
    delete(deleteDagmeId: FindByUuid,userId: FindById): Promise<AnswerQuery>
    list(paginationDto: PaginationDto): Promise<AnswerQuery>
    findAllData()
}