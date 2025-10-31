import { Inject, Injectable } from "@nestjs/common";
import { IRegisterRepositoryToken } from "../tokens/register-repository.tokens";
import { IRegisterRepository } from "src/domain/ag_register/interface/register-repository.interface";
import { UpdateRegisterDto } from "src/presentation/dtos/ag_register/update-register.dto";
import { FindById, FindByUuid } from "src/common/dto/index.dto";

@Injectable()
export class UpdateRegisterUseCase{
    constructor(
        @Inject(IRegisterRepositoryToken)
        private readonly registerRepository: IRegisterRepository
    ){}

    async execute (updateRegisterId:FindByUuid, updateRegisterDto:UpdateRegisterDto, userId:FindById){
        return await this.registerRepository.update(updateRegisterId, updateRegisterDto, userId);
    }
}