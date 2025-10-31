/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { HttpService } from '@nestjs/axios';
import { StoreMaterials} from 'src/presentation/dtos/ag_configuration_type_material/getApiMaterials.dto';
import { lastValueFrom } from 'rxjs';
import * as dotenv from 'dotenv';
import { Register } from 'src/domain/shared/index.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateConfigurationTypeMaterialDto } from 'src/presentation/dtos/ag_configuration_type_material/create-configuration_type_material.dto';
dotenv.config();
@Injectable()
export class ConfigurationTypeMaterialService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Register)
    private readonly registerRepository: Repository<Register>,
  ) {}
  
    async getMaterialsApi(){
        const response: AxiosResponse<StoreMaterials> = await lastValueFrom(
            this.httpService.get<StoreMaterials>(`${process.env.URL_ELAPAS_POSEIDON}/datos`),
        );
        return response.data.data;
    }

    async ValidationRegister(id:number) {
        const register = await this.registerRepository.findOneBy({id});
        console.log("enviamos este register",register);
        return register;
    }

    calculation(createConfigurationTypeMaterialDto:CreateConfigurationTypeMaterialDto){
      const cost_total = ((createConfigurationTypeMaterialDto.SaldoCosto / createConfigurationTypeMaterialDto.saldoCantidad) * createConfigurationTypeMaterialDto.quantity) + ((createConfigurationTypeMaterialDto.SaldoCosto / createConfigurationTypeMaterialDto.saldoCantidad) * 0.2);
      const cost = isNaN(cost_total) ? 0 : cost_total;
      return cost;
    }

    limitPrecision = (value: number, precision: number, scale: number) => {
          if (value === null || value === undefined) return value;
          const multiplier = Math.pow(10, scale);
          const roundedValue = Math.round(value * multiplier) / multiplier;
          const [integerPart] = roundedValue.toString().split('.');
          if (integerPart.length > precision - scale) {
              const maxIntegerValue = Math.pow(10, precision - scale) - 1;
              return Math.trunc(maxIntegerValue * multiplier) / multiplier;
          }
          console.log(roundedValue);
          return roundedValue;
      };
    calculationPrecision(createConfigurationTypeMaterialDto:CreateConfigurationTypeMaterialDto,calculation){
        createConfigurationTypeMaterialDto.valMinimo = this.limitPrecision(createConfigurationTypeMaterialDto.valMinimo, 12, 8);
        createConfigurationTypeMaterialDto.valMaximo = this.limitPrecision(createConfigurationTypeMaterialDto.valMaximo, 12, 8);
        createConfigurationTypeMaterialDto.precioUs = this.limitPrecision(createConfigurationTypeMaterialDto.precioUs, 12, 8);
        createConfigurationTypeMaterialDto.PrecioBs = this.limitPrecision(createConfigurationTypeMaterialDto.PrecioBs, 12, 8);
        createConfigurationTypeMaterialDto.debeBs = this.limitPrecision(createConfigurationTypeMaterialDto.debeBs, 12, 8);
        createConfigurationTypeMaterialDto.HaberBs= this.limitPrecision(createConfigurationTypeMaterialDto.HaberBs, 12, 8);
        createConfigurationTypeMaterialDto.SaldoCosto = this.limitPrecision(calculation, 12, 8);
      return createConfigurationTypeMaterialDto;
    }
}
