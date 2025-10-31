import { Inject, Injectable } from "@nestjs/common";
import { IRegisterRepositoryToken } from "../tokens/register-repository.tokens";
import { IRegisterRepository } from "src/domain/ag_register/interface/register-repository.interface";
import { FindById, FindByUuid } from "src/common/dto/index.dto";

@Injectable()
export class DeleteRegisterUseCase{
    constructor(
        @Inject(IRegisterRepositoryToken)
        private readonly registerRepository: IRegisterRepository
    ){}

    async execute(deleteRegisterId: FindByUuid, userId:FindById){
        return await this.registerRepository.delete(deleteRegisterId,userId);
    }
}