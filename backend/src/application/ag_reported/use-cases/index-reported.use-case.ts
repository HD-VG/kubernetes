import { Inject, Injectable } from "@nestjs/common";
import { IReportedRepositoryToken } from "../tokens/reported-repository.tokens";
import { IReportedRepository } from "src/domain/ag_reported/interface/reported-repository.interface";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Injectable()
export class IndexReportedUseCase{
    constructor(
        @Inject(IReportedRepositoryToken)
        private readonly reportedRepository: IReportedRepository
    ){}

    async execute(paginationDto: PaginationDto){
        return await this.reportedRepository.list_pagintation(paginationDto);
    }
}
