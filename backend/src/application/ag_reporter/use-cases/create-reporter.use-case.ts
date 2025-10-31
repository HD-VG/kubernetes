import { Inject, Injectable } from "@nestjs/common";
import { IReporterRepositoryToken } from "../tokens/reporter-repository.tokens";
import { IReporterRepository } from "src/domain/ag_reporter/interface/reporter-repository.interface";
import { CreateReporterDto } from "src/presentation/dtos/ag_reporter/create-reporter.dto";
import { FindById } from "src/common/dto/findById.dto";

@Injectable()
export class CreateReporterUseCase {
    constructor(
        @Inject(IReporterRepositoryToken)
        private readonly reporterRepository: IReporterRepository,
    ) {}

    async execute (createReporterDto: CreateReporterDto, userId:FindById){
        return this.reporterRepository.create(createReporterDto, userId);
    }
}