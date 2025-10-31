/* eslint-disable prettier/prettier */
import { Injectable} from "@nestjs/common";  
import { InjectRepository } from "@nestjs/typeorm";
import { AnswerQuery, FindById, PaginationDto, FindByUuid} from "src/common/dto/index.dto"; 
import { CreateConfigurationCarDto,UpdateConfigurationCarDto } from 'src/presentation/dtos/ag_configuration_cars/index.dto';
import { ConfigurationCars } from "src/domain/ag_configuration_cars/entities/configuration_car.entity";
import { IConfigurationCarsRepository } from "src/domain/ag_configuration_cars/interface/configuration_car.interface";
import { Repository, Like } from 'typeorm';
import { ConfigurationCarsService } from '../services/configuration_cars.service'
import { ResponseMessages } from 'src/common/enum/answers.enum'

Injectable()
export class ConfigurationCarsRepository implements IConfigurationCarsRepository {
    constructor(
        @InjectRepository(ConfigurationCars)
        private readonly configurationCarsRepository: Repository<ConfigurationCars>,
        private readonly configurationCarsService: ConfigurationCarsService//traemos el servicio
    ) { }

    async create(createCarDto: CreateConfigurationCarDto, userId: FindById): Promise<AnswerQuery> {
        try {
            const getCarsByIdApi = await this.configurationCarsService.getCarsByIdApi(createCarDto.car);
            const register = await this.configurationCarsService.ValidationRegister(createCarDto.register_id);
            const createCar = ConfigurationCars.create(getCarsByIdApi,createCarDto,register,userId.id)
            const data = await this.configurationCarsRepository.save(createCar)
            if (data) {
                return { message: ResponseMessages.RECORD_CREATED, status: true, data: data.getResponse(), };
            } else { 
                return { message: ResponseMessages.SERVER_ERROR, status: false, }; 
            }
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }
    async update(
        updateId: FindByUuid, 
        updateCarDto: UpdateConfigurationCarDto,
        userId: FindById,
    ): Promise<AnswerQuery> {
        const updateCar = await this.configurationCarsRepository.findOneBy({ uuid: updateId.uuid });
        const getCarsByIdApi = await this.configurationCarsService.getCarsByIdApi(updateCarDto.car);
        const register = await this.configurationCarsService.ValidationRegister(updateCarDto.register_id);
        try {
            updateCar.update(updateCarDto,getCarsByIdApi,register, userId.id)
            const result = await this.configurationCarsRepository.save(updateCar);
            if (result) {
                return { status: true, message: ResponseMessages.RECORD_MODIFIED, data: result.getResponse(), };
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR, }; }
        } catch (error) {
            return { message: error.message, status: false, }
        }
    }
    async list(paginationDto: PaginationDto): Promise<AnswerQuery> {
        try {
            const { limit = 5, offset = 0, parameter = '' } = paginationDto;
            const [data, count] = await this.configurationCarsRepository.findAndCount({
                where: [
                    { idVehiculo: Like(`%${parameter}%`), deleteAt: null },
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
    async findOne(viewId: FindByUuid): Promise<AnswerQuery> {
        try {
            const data = await this.configurationCarsRepository.findOneBy({ uuid: viewId.uuid });
            if (data) { 
                return { status: true, message: ResponseMessages.RECORDS_FOUND, data: data.getResponse(), };
            } else {
                return { status: true, message: ResponseMessages.NO_RECORDS_FOUND, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async delete(deleteId: FindByUuid, userId: FindById): Promise<AnswerQuery> {
        try {
            const deleteCar = await this.configurationCarsRepository.findOneBy({ uuid: deleteId.uuid })
            if (deleteCar) {
                deleteCar.delete(userId.id); 
                const result = await this.configurationCarsRepository.save(deleteCar);
                return { status: true, message: ResponseMessages.RECORD_DELETED, data: result.getResponse() }
            } else {
                return { status: true, message: ResponseMessages.RECORDS_DELETE, };
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    async findAllData(): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.configurationCarsRepository.findAndCount({
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
    
    async findByIdDataApi(id:number): Promise<AnswerQuery> {
        try {
            const getCarsByIdApi = await this.configurationCarsService.getCarsByIdApi(id);
            const data = getCarsByIdApi;
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data };
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }
    async findAllDataApi(): Promise<AnswerQuery> {
        try {
            const getCarsApi = await this.configurationCarsService.getCarsApi();
            const data = getCarsApi;
            return { status: true, message: ResponseMessages.RECORDS_FOUND, data };
        } catch (error) {
            return { status: false, message: error.message || error };
        }
    }
}