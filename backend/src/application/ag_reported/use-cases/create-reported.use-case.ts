import { Inject, Injectable } from "@nestjs/common";
import { IReportedRepositoryToken } from "../tokens/reported-repository.tokens";
import { IReportedRepository } from "src/domain/ag_reported/interface/reported-repository.interface";
import { CreateReportedDto } from "src/presentation/dtos/ag_reported/create-reported.dto";
import { FindById } from "src/common/dto/findById.dto";

@Injectable()
export class CreateReportedUseCase {
    constructor(
        @Inject(IReportedRepositoryToken)
        private readonly reportedRepository: IReportedRepository,
    ) {}

    async execute (createReportedDto: CreateReportedDto, userId:FindById){
        return this.reportedRepository.create(createReportedDto, userId);
    }
}