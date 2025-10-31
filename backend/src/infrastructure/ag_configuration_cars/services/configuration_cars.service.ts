/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { StoreVehicles} from 'src/presentation/dtos/ag_configuration_cars/index.dto';
import { lastValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';
import { Register } from 'src/domain/shared/index.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
dotenv.config();
@Injectable()
export class ConfigurationCarsService {
    constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>
    ) {}
    async getCarsApi(){
        const response: AxiosResponse<StoreVehicles> = await lastValueFrom(
            this.httpService.get<StoreVehicles>(`${process.env.URL_RRHH}/vehiculos`),
        );
        return response.data.data;
    }

    async getCarsByIdApi(id: number){
        const response: AxiosResponse<StoreVehicles> = await lastValueFrom(
            this.httpService.get<StoreVehicles>(`${process.env.URL_RRHH}/vehiculos/${id}`),
        )
        return response.data.data;
    }
    async ValidationRegister(id:number) {
        const register = await this.registerRepository.findOneBy({id});
        return register;
    }
}
