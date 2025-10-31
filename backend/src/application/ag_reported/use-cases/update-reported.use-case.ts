import { Inject, Injectable } from "@nestjs/common";
import { IReportedRepositoryToken } from "../tokens/reported-repository.tokens";
import { IReportedRepository } from "src/domain/ag_reported/interface/reported-repository.interface";
import { UpdateReportedDto } from "src/presentation/dtos/ag_reported/update-reported.dto";
import { FindByUuid } from "src/common/dto/findByUuid.dto";
import { FindById } from "src/common/dto/findById.dto";

@Injectable()
export class UpdateReportedUseCase{
    constructor(
        @Inject(IReportedRepositoryToken)
        private readonly reportedRepository: IReportedRepository
    ){}

    async execute (updateReportedId:FindByUuid, updateReportedDto:UpdateReportedDto, userId:FindById){
        return await this.reportedRepository.update(updateReportedId, updateReportedDto, userId);
    }
}