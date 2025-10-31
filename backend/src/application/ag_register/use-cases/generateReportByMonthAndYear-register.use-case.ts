/* eslint-disable prettier/prettier */
import { Inject, Injectable } from "@nestjs/common";
import { IRegisterRepositoryToken } from "../tokens/register-repository.tokens";
import { IRegisterRepository } from "src/domain/ag_register/interface/register-repository.interface";

@Injectable()
export class GenerateReportByMonthAndYearRegisterUseCase{
    constructor(
        @Inject(IRegisterRepositoryToken)
        private readonly registerRepository: IRegisterRepository
    ){}
    async execute (month: number, year: number){
        return await this.registerRepository.generateReportByMonthAndYear(month, year);
    }
}