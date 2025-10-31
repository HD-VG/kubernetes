/* eslint-disable prettier/prettier */
import {
    FindById,
    PaginationDto,
    AnswerQuery
} from 'src/common/dto/index.dto';
import { FindByUuid } from 'src/common/dto/findByUuid.dto';
import { CreateWaterDto, UpdateWaterDto } from 'src/presentation/dtos/ag_water/index.dto';
export interface IWaterRepository {
    create(createWaterDto: CreateWaterDto, userId: FindById): Promise<AnswerQuery>
    update(updateWaterId: FindByUuid, updateWaterDto: UpdateWaterDto,userId: FindById): Promise<AnswerQuery>
    findOne(viewWaterId: FindByUuid): Promise<AnswerQuery>
    delete(deleteWaterId: FindByUuid,userId: FindById): Promise<AnswerQuery>
    list(paginationDto: PaginationDto): Promise<AnswerQuery>
    findAllData()
}