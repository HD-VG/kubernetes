/* eslint-disable prettier/prettier */
import {
    FindById,
    PaginationDto,
    AnswerQuery,
    FindByUuid
} from 'src/common/dto/index.dto';
import { CreateConfigurationTypeMachineDto, UpdateConfigurationTypeMachineDto } from 'src/presentation/dtos/ag_configuration_type_machine/index.dto';
export interface IConfigurationTypeMachineRepository {
    create(createConfigurationTypeMachineDto: CreateConfigurationTypeMachineDto, userId: FindById): Promise<AnswerQuery>
    update(updateMachineId: FindByUuid, updateConfigurationTypeMachineDto: UpdateConfigurationTypeMachineDto, userId:FindById): Promise<AnswerQuery>
    findOne(viewMachineId: FindByUuid): Promise<AnswerQuery>
    delete(deleteMachineId: FindByUuid,userId : FindById): Promise<AnswerQuery>
    list(paginationDto: PaginationDto): Promise<AnswerQuery>
    findAllData()
}