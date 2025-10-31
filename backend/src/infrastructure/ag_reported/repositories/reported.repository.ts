/* eslint-disable prettier/prettier */
import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { Reported } from 'src/domain/ag_reported/entities/reported.entity';
import { IsNull, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportedDto, UpdateReportedDto } from 'src/presentation/dtos/ag_reported/index.dto';
import { AnswerQuery, FindById, FindByUuid, PaginationDto } from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { IReportedRepository } from 'src/domain/ag_reported/interface/reported-repository.interface';
@Injectable()
export class ReportedRepository implements IReportedRepository {
    constructor(
        @InjectRepository(Reported)
        private readonly reportedRepository: Repository<Reported>,
    ) { }

      async list():Promise<AnswerQuery>{
        try{
          const[data,count]= await this.reportedRepository.findAndCount({
            where: {deleteAt: IsNull()},
            order: {createAt:'desc'}
          });
          const transformer = data.map((d)=>d.getResponse());
          if (count === 0){
            return{status:false, message:ResponseMessages.NO_RECORDS_FOUND};
          }
          return{
            status:true,
            message:ResponseMessages.RECORDS_FOUND,
            data: transformer,
            total:count
          };
        } catch(error){
          return{status:false, message:error.message || error};
        }
      }

    async list_pagintation(paginationDto: PaginationDto): Promise<AnswerQuery> {
        try {
            const { limit = 5, offset = 0, parameter = '' } = paginationDto;
            const [data,count] = await this.reportedRepository.findAndCount({
                where: [
                    { name: Like(`%${parameter}%`), deleteAt: IsNull() },
                    { lastname: Like(`%${parameter}%`), deleteAt: IsNull() },
                    { ci: Like(`%${parameter}%`), deleteAt: IsNull() },
                    { phone: Like(`%${parameter}%`), deleteAt: IsNull() },
                    { email: Like(`%${parameter}%`), deleteAt: IsNull() },
                    { address: Like(`%${parameter}%`), deleteAt: IsNull() }
                ],
                take: limit,
                skip: offset,
            })
            if (data) {
                return {
                    message: 'Registros encontrado',
                    status: true,
                    data: data,
                    all: count
                }
            } else {
                throw new BadRequestException("Sin datos")
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findById(viewId: FindByUuid): Promise<AnswerQuery> {
        try {
           const reported = await this.reportedRepository.findOneBy({
            uuid : viewId.uuid,
            deleteAt: IsNull(),
           });
        if(!reported){
            return {status: false, message: ResponseMessages.NO_RECORDS_FOUND};
        }
        return{
            status:true,
            message: ResponseMessages.RECORDS_FOUND,
            data: reported,
        }
        } catch (error) {
            return{status:false, message:error.message};
        }
    }
    async create(createReportedDto: CreateReportedDto, user: FindById): Promise<AnswerQuery> {
        try {
            const newreported = Reported.create(createReportedDto,user.id);
            await this.reportedRepository.save(newreported);
            return {status:true, message: ResponseMessages.RECORD_CREATED};
        } catch (error) {
            return{status:false,message:error.message || error};
        }
    }
    async update(
        updateId: FindByUuid, 
        updateReportedDto: UpdateReportedDto,
        user: FindById,
    ): Promise<AnswerQuery> {
        try {
            const data = await this.reportedRepository.findOneOrFail({
                where: {uuid: updateId.uuid},
            });
            data.update(updateReportedDto,user.id);
            await this.reportedRepository.save(data);
            return {status:true, message: ResponseMessages.RECORD_MODIFIED}
        } catch (error) {
            return {status:false, message: error.message || error};
        }
    }
    async delete(deleteId: FindByUuid, user: FindById): Promise<AnswerQuery> | null{
        try {
            console.log("su id",deleteId)
            const data = await this.reportedRepository.findOneBy({
                uuid :deleteId.uuid,
            });
            console.log("a eliminar",data)
            data.delete(user.id);
            await this.reportedRepository.save(data);
            return{status:true, message:ResponseMessages.RECORD_DELETED};
        } catch (error) {
            return{status: false, message: error.message || error};
            }
        }
}