/* eslint-disable prettier/prettier */
import { ITestResultRepository } from './../../../domain/cc_test_result/interface/test-result-repository.interface';
import {
    Injectable
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
    CreateTestResultDto,
    ListTestResultDto,
    UpdateTestResultDto
} from 'src/presentation/dtos/cc_test_result/index.dto'
import { AnswerQuery, FindById } from 'src/common/dto/index.dto';
import { IsNull, Repository } from 'typeorm';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { ChainOfCustody, ConfigurationCalculation, ConfigurationLimit, Sampling, TestResult } from 'src/domain/shared/index.entity';
import { TestResultService } from '../services/test_result.service';
// import { IApplicantRepository } from 'src/domain/applicant/interface/applicant.interface';
import { MeasurementPair } from 'src/domain/cc_test_result/value-objects/measurementPair.value-objects';
import { TestResultFlatDto } from '../interface/list_test_result.interface'

@Injectable()
export class TestResultRepository implements ITestResultRepository {

    constructor(
        @InjectRepository(TestResult)
        private readonly testResultRepo: Repository<TestResult>,

        @InjectRepository(ConfigurationCalculation)
        private readonly configRepo: Repository<ConfigurationCalculation>,

        @InjectRepository(ConfigurationLimit)
        private readonly limitRepo: Repository<ConfigurationLimit>,

        @InjectRepository(Sampling)
        private readonly samplingRepo: Repository<Sampling>,

        @InjectRepository(ChainOfCustody)
        private readonly custodiRepo: Repository<ChainOfCustody>,


        private readonly testResultService: TestResultService
    ) { }

    async create(dto: CreateTestResultDto, userId: number): Promise<AnswerQuery> {
        try {
            const { limitId, parameterId, standardId } = this.testResultService.parseConfigurationId(dto.configuration_limit_id)
            console.log(limitId, parameterId, standardId)
            const sampling = await this.samplingRepo.findOneOrFail({ where: { id: dto.sampling_id } });
            const config = dto.configuration_id
                ? await this.configRepo.findOneOrFail({ where: { id: dto.configuration_id } })
                : null;

            const limitConfig = await this.limitRepo.findOneOrFail({ where: { id: limitId } });

            const pair = new MeasurementPair(dto.valueA, dto.valueB);
            const { result, usedFormula } = this.testResultService.calculate(pair, config);
            // const testResult = TestResult.create(
            //     dto,
            //     userId,
            //     sampling,
            //     config,
            //     pair.average,
            //     result,
            //     usedFormula,
            // );

            // await this.testResultRepo.save(testResult);
            return { status: true, message: ResponseMessages.RECORD_CREATED };
        } catch (error) {
            return { status: false, message: error.message };
        }
    }

    async listBySampling(findById: FindById): Promise<AnswerQuery> {
        try {
            const sampling = await this.samplingRepo.findOneByOrFail({ id: findById.id });
            if (!sampling) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }; }
            const [data, count] = await this.testResultRepo.findAndCount({
                where: {
                    sampling: { id: findById.id },
                    deleteAt: IsNull()
                },
                relations: ['configuration']
            });
            if (!data) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }; }
            const transform = data.map(test => test.toResponse()); console.log("Transform: ", transform)
            return {
                message: ResponseMessages.RECORDS_FOUND,
                status: true,
                data: transform,
                all: count,
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async listByCusdtody(dto: ListTestResultDto): Promise<AnswerQuery> {
        try {
            // const expectedParameters = ['Turbiedad', 'pH', 'C.E.', 'Col. Tot.'];

            const [rawData, total] = await this.custodiRepo
                .createQueryBuilder('custody')
                .leftJoinAndSelect('custody.samplings', 'sampling')
                .leftJoinAndSelect('custody.reports', 'report')
                .leftJoinAndSelect('sampling.testResults', 'testResult')
                .leftJoinAndSelect('testResult.configuration', 'configuration')
                .where('custody.id = :custodyId', { custodyId: dto.custody_id })
                .andWhere('custody.deleteAt IS NULL')
                .orderBy('custody.createAt', 'DESC')
                .getManyAndCount();

            if (!total || rawData.length === 0) {
                return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
            }

            const custody = rawData[0];
            const sampling = custody.samplings?.find(
                s => s.id === dto.sampling_id && s.deleteAt === null
            );

            if (!sampling) { return { status: false, message: 'No se encontró el muestreo solicitado para esta custodia.', }; }

            // Generar mapa de parámetros
            const resultMap = {
                'Turbiedad (NTU)': null,
                'pH': null,
                'C.E. (μS/cm)': null,
                'Cloro Res. (mg/L)': null,
            };

            sampling.testResults?.forEach(test => {
                if (resultMap.hasOwnProperty(test.parameter)) {
                    resultMap[test.parameter] = {
                        id_test: test.id,
                        parameter: test.parameter,
                        valueA: test.valueA,
                        valueB: test.valueB,
                        average: test.average ?? null,
                        result: test.result ?? null,
                        configuration: test.configuration?.instrumentUsed ?? null,
                        usedFormula: test.usedFormula ?? false,
                        createAt: test.createAt
                    };
                }
            });

            // Construir objeto plano único
            const flatResponse: TestResultFlatDto = {
                custody_id: custody.id,
                codeCustody: custody.codeCustody,
                sampling_id: sampling.id,
                sampleCode: sampling.sampleCode,
                typeCode: sampling.typeCode,
                description: sampling.description,
                sourceOfSupply: sampling.sourceOfSupply,
                samplingDay: sampling.samplingDay,
                samplingTime: sampling.samplingTime,
                samplingTechnique: sampling.samplingTechnique,
                coordinatesX: sampling.coordinatesX,
                coordinatesY: sampling.coordinatesY,
                condAmbT: sampling.condAmbT,
                condAmbB: sampling.condAmbB,

                conductividad_electrica: resultMap['C.E. (μS/cm)'],
                turbiedad: resultMap['Turbiedad (NTU)'],
                ph: resultMap['pH'],
                cloro_residual: resultMap['Cloro Res. (mg/L)'],
            };

            return {
                message: ResponseMessages.RECORDS_FOUND,
                status: true,
                data: flatResponse,
                all: 1,
            };

        } catch (error) {
            return { status: false, message: error.message };
        }
    }

    mapParamKey(param: string): string {
        const keys = {
            'C.E. (μS/cm)': 'conductividad_electrica',
            'Turbiedad (NTU)': 'turbiedad',
            'pH': 'ph',
            'Cloro Res. (mg/L)': 'cloro_residual',
        };
        return keys[param] ?? param.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    }

    async findById(findById: FindById): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.testResultRepo.findAndCount({
                where: {
                    id: findById.id,
                    deleteAt: IsNull()
                }
            });
            if (!data) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }; }
            return {
                message: ResponseMessages.RECORDS_FOUND,
                status: true,
                data: data.map(test => test.toResponse()),
                all: count,
            }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

    async update(
        id: number,
        dto: UpdateTestResultDto,
        userId: number,
    ): Promise<AnswerQuery> {
        try {
            const data = await this.testResultRepo.findOne({
                where: { id },
                relations: ['configuration'],
            });

            if (!data) {
                return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
            }

            const config = dto.configuration_id
                ? await this.configRepo.findOneOrFail({ where: { id: dto.configuration_id } })
                : null;
            const shouldRecalculate =
                dto.valueA !== undefined || dto.valueB !== undefined;

            // Aplicar cambios parciales
            // data.update(dto, userId);

            if (shouldRecalculate) {
                // Aseguramos que estén definidos ambos valores
                const pair = new MeasurementPair(
                    dto.valueA ?? data.valueA,
                    dto.valueB ?? data.valueB,
                );
                const { result, usedFormula } = this.testResultService.calculate(pair, config);
                data.parameter = dto.parameter ? dto.parameter : '';
                data.average = pair.average;
                data.result = result;
                data.usedFormula = usedFormula;
                data.configuration = config;
                data.updateUserId = userId;
                data.updateAt = new Date()
            }

            await this.testResultRepo.save(data);

            return { status: true, message: ResponseMessages.RECORD_MODIFIED };
        } catch (error) {
            return { status: false, message: error.message };
        }
    }

    async delete(findById: FindById, userId: number): Promise<AnswerQuery> {
        try {
            const data = await this.testResultRepo.findOneBy({ id: findById.id });
            if (!data) { return { status: false, message: ResponseMessages.NO_RECORDS_FOUND }; }
            data.softDelete(userId);
            await this.testResultRepo.save(data);
            return { message: ResponseMessages.RECORD_DELETED, status: true }
        } catch (error) {
            return { status: false, message: error.message }
        }
    }

}