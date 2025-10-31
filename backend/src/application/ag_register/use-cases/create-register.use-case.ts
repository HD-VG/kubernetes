import { Inject, Injectable } from "@nestjs/common";
import { IRegisterRepositoryToken } from "../tokens/register-repository.tokens";
import { IRegisterRepository } from "src/domain/ag_register/interface/register-repository.interface";
import { CreateRegisterDto } from "src/presentation/dtos/ag_register/create-register.dto";
import { FindById } from "src/common/dto/index.dto";
@Injectable()
export class CreateRegisterUseCase {
    constructor(
        @Inject(IRegisterRepositoryToken)
        private readonly registerRepository: IRegisterRepository,
    ){}

    async execute (createRegisterDto: CreateRegisterDto, userId: FindById){
        return this.registerRepository.create(createRegisterDto, userId);
    }
}