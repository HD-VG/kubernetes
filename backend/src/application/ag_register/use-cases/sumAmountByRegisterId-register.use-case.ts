/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { IRegisterRepositoryToken } from "../tokens/register-repository.tokens";
import { IRegisterRepository } from "src/domain/ag_register/interface/register-repository.interface";
import { FindByUuid } from "src/common/dto/findByUuid.dto";

@Injectable()
export class SumAmountByRegisterIdRegisterUseCase{
    constructor(
        @Inject(IRegisterRepositoryToken)
        private readonly registerRepository: IRegisterRepository
    ){}
    async execute (registerId: FindByUuid){
        return await this.registerRepository.sumAmountByRegisterId(registerId);
    }
}