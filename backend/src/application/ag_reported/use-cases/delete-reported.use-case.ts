import { Inject, Injectable } from "@nestjs/common";
import { IReportedRepositoryToken } from "../tokens/reported-repository.tokens";
import { IReportedRepository } from "src/domain/ag_reported/interface/reported-repository.interface";
import { FindById } from "src/common/dto/findById.dto";
import { FindByUuid } from "src/common/dto/findByUuid.dto";

@Injectable()
export class DeleteReportedUseCase{
    constructor(
        @Inject(IReportedRepositoryToken)
        private readonly reportedRepository: IReportedRepository
    ){}

    async execute(deleteReportedId: FindByUuid, userId:FindById){
        console.log("su id ", deleteReportedId)
        return await this.reportedRepository.delete(deleteReportedId,userId);
    }
}