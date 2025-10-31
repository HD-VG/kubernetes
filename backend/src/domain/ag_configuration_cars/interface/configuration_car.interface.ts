/* eslint-disable prettier/prettier */
import {FindById, PaginationDto, AnswerQuery, FindByUuid} from 'src/common/dto/index.dto';
import { 
    CreateConfigurationCarDto, 
    UpdateConfigurationCarDto 
} from 'src/presentation/dtos/ag_configuration_cars/index.dto';

export interface IConfigurationCarsRepository {
    create(createConfigurationCarDto: CreateConfigurationCarDto, userId: FindById): Promise<AnswerQuery>
    update(updateCarId:FindByUuid, updateConfigurationCarDto: UpdateConfigurationCarDto,userId: FindById): Promise<AnswerQuery>
    findOne(viewCarId:FindByUuid): Promise<AnswerQuery>
    delete(deleteCarId:FindByUuid,userId: FindById): Promise<AnswerQuery>
    list(paginationDto: PaginationDto): Promise<AnswerQuery>
    findAllData()
    //from api
    findAllDataApi()
    findByIdDataApi(id:number)
}