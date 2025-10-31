/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sampling } from '../../../domain/cc_sampling/entities/sampling.entity'
import { ChainOfCustody } from 'src/domain/cc_custody/entities/chain_of_custody.entity'
import { IsNull, Repository } from 'typeorm';
import { CreateSamplingDto, UpdateSamplingDto, UpdateSamplingLaboratoryDto } from 'src/presentation/dtos/cc_sampling/index.dto'
import { AnswerQuery, FindById } from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { SampleCode, Coordinates } from 'src/domain/value-objects/index.vo'
import { ISamplingRepository } from 'src/domain/cc_sampling/interface/sampling-repository.interface';
@Injectable()
export class SamplingRepository implements ISamplingRepository{

    constructor(
        @InjectRepository(Sampling)
        private readonly samplingRepository: Repository<Sampling>,
        @InjectRepository(ChainOfCustody)
        private readonly chainOfCustodyRepository: Repository<ChainOfCustody>,
    ) { }

    private async findByType(type: string): Promise<number> {
        const [, count] = await this.samplingRepository.findAndCount({
            where: { typeCode: type },
        });
        return count + 1;
    }

    private async getTypeAbbreviation(type: string): Promise<string> {
        const map = {
            AGUA_TRATADA: 'AT',
            AGUA_CRUDA: 'AC',
            AGUA_RESIDUAL: 'AR',
            LODO: 'LD',
        };
        return map[type] || '';
    }

    public async create(
        createSamplingDto: CreateSamplingDto,
        userId: number
    ): Promise<AnswerQuery> {
        try {
            const chainOfCustody = await this.chainOfCustodyRepository.findOneBy({ id: createSamplingDto.chainOfCustody })
            if (!chainOfCustody) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND } }
            const typeAbbr = await this.getTypeAbbreviation(createSamplingDto.sampleCode);
            const countByType = await this.findByType(createSamplingDto.sampleCode);
            const sampleCodeVO = new SampleCode(typeAbbr, countByType);

            const coordinatesVO = new Coordinates(
                createSamplingDto.coordinatesX,
                createSamplingDto.coordinatesY,
            );

            const sampling = Sampling.create(
                {
                    ...createSamplingDto,
                    coordinatesX: coordinatesVO.x,
                    coordinatesY: coordinatesVO.y,
                },
                userId,
                sampleCodeVO.getValue(),
                chainOfCustody,
            );
            const data = await this.samplingRepository.save(sampling);
            if (data) {
                return { status: true, message: ResponseMessages.RECORD_CREATED, }
            } else { return { status: false, message: ResponseMessages.SERVER_ERROR } }
        } catch (error) {
            return { status: false, message: ResponseMessages.SERVER_ERROR }
        }
    }
    public async update(id: number, updateSamplingDto: UpdateSamplingDto, userId: number): Promise<AnswerQuery> {
        try {
            const sampling = await this.samplingRepository.findOneBy({ id });
            if (
                updateSamplingDto.coordinatesX !== undefined &&
                updateSamplingDto.coordinatesY !== undefined
            ) {
                const coordinatesVO = new Coordinates(
                    updateSamplingDto.coordinatesX,
                    updateSamplingDto.coordinatesY,
                );
                updateSamplingDto.coordinatesX = coordinatesVO.x;
                updateSamplingDto.coordinatesY = coordinatesVO.y;
            }

            if (updateSamplingDto.sampleCode) {
                const typeAbbr = await this.getTypeAbbreviation(updateSamplingDto.sampleCode);
                const countByType = await this.findByType(updateSamplingDto.sampleCode);
                const sampleCodeVO = new SampleCode(typeAbbr, countByType);
                updateSamplingDto.sampleCode = sampleCodeVO.getValue();
            }

            sampling.edit(updateSamplingDto, userId);
            await this.samplingRepository.save(sampling);
            return {
                status: true,
                message: ResponseMessages.RECORD_CREATED,
            }
        } catch (error) {
            return {
                status: false,
                message: ResponseMessages.SERVER_ERROR
            }
        }
    }
    public async updateLaboratory(id: number, updateSamplingDto: UpdateSamplingLaboratoryDto, userId: number): Promise<AnswerQuery> {
        try {
            const result = await this.samplingRepository.findOneBy({ id: id });

            if (!result) {
                return { message: ResponseMessages.NO_RECORDS_FOUND, status: false };
            }
            Object.assign(result, updateSamplingDto);
            if (updateSamplingDto.samplingAceptation !== undefined) {
                result.samplingAceptation = updateSamplingDto.samplingAceptation;
            }

            if (updateSamplingDto.samplingConditions) {
                result.samplingConditions = updateSamplingDto.samplingConditions;
            }
            result.updateUserId = userId;
            result.updateAt = new Date();
            await this.samplingRepository.save(result);

            return { message: ResponseMessages.RECORD_MODIFIED, status: true, };
        } catch (error) {
            return { message: error.message, status: false, };
        }
    }
    public async list(findById: FindById): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.samplingRepository.findAndCount({
                where: {
                    chainOfCustody: {
                        id: findById.id
                    },
                    deleteAt: IsNull(),
                },
                order: { createAt: 'DESC' },
            })
            const transform = data.map(config => config.toResponse());

            if (data) {
                return {
                    message: ResponseMessages.RECORDS_FOUND,
                    status: true,
                    data: transform,
                    all: count,
                }
            } else { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false } }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    public async findById(findById: FindById): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.samplingRepository.findAndCount({
                where: {
                    id: findById.id,
                    deleteAt: IsNull(),
                }
            })
            const transform = data.map(config => config.toResponse());
            return {
                message: ResponseMessages.RECORDS_FOUND,
                status: true,
                data: transform,
                total: count,
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }
    public async delete(
        findById: FindById,
        userId: number
    ): Promise<AnswerQuery> {
        try {
            const find = await this.samplingRepository.findOneBy({ id: findById.id });
            find.softDelete(userId);
            await this.samplingRepository.save(find);
            return { message: ResponseMessages.RECORD_DELETED, status: true }
        } catch (error) {
            return { message: error, status: false }
        }
    }
}