/* eslint-disable prettier/prettier */
import {
    FindById,
    PaginationDto,
    AnswerQuery,
    FindByUuid
} from 'src/common/dto/index.dto';
import { CreateRecurringDto, UpdateRecurringDto } from 'src/presentation/dtos/ag_recurring/index.dto';
export interface IRecurringRepository {
    create(createConfigurationTypeDagmeDto: CreateRecurringDto, userId: FindById): Promise<AnswerQuery>
    update(updateRecurringId: FindByUuid, updateConfigurationTypeDagmeDto: UpdateRecurringDto,userId: FindById): Promise<AnswerQuery>
    findOne(viewRecurringId: FindByUuid): Promise<AnswerQuery>
    delete(deleteRecurringId: FindByUuid,userId: FindById): Promise<AnswerQuery>
    list(paginationDto: PaginationDto): Promise<AnswerQuery>
    findAllData()
}