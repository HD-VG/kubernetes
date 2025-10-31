/* eslint-disable prettier/prettier */
import {
    FindById,
    PaginationDto,
    AnswerQuery,
    FindByUuid
} from 'src/common/dto/index.dto';
import { CreateConfigurationTypeMaterialDto, UpdateConfigurationTypeMaterialDto } from 'src/presentation/dtos/ag_configuration_type_material/index.dto';
export interface IConfigurationTypeMaterialRepository {
    create(createConfigurationTypeMaterialDto: CreateConfigurationTypeMaterialDto, userId: FindById): Promise<AnswerQuery>
    update(updateMaterialId: FindByUuid, updateConfigurationTypeMaterialDto: UpdateConfigurationTypeMaterialDto, userId:FindById): Promise<AnswerQuery>
    findOne(viewMaterialId: FindByUuid): Promise<AnswerQuery>
    delete(deleteMaterialId: FindByUuid,userId : FindById): Promise<AnswerQuery>
    list(paginationDto: PaginationDto): Promise<AnswerQuery>
    findAllData()
    //from api
    findAllDataApi()
}