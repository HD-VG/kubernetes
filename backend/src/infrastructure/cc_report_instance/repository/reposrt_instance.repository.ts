/* eslint-disable prettier/prettier */
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReportInstance } from '../../../domain/cc_report_instance/entities/report_instance.entity'
import { ChainOfCustody } from 'src/domain/cc_custody/entities/chain_of_custody.entity'
import { IsNull, Repository } from 'typeorm';
import { CreateReportInstanceDto } from 'src/presentation/dtos/cc_report_instance/index.dto';
import { AnswerQuery, FindById, GenerateReportDto } from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import { IReportInstanceRepository } from 'src/domain/cc_report_instance/interface/report-instance-repository.interface';
import { ReportInstanceService } from '../services/report_instance.service';
import { IChainOfCustodySnapshot } from '../interface/screenshot.interface';
import PdfPrinter from 'pdfmake';
import * as path from 'path';
import { AdminConfigurationDTO } from 'src/presentation/dtos/cc_custody/header-info.dto';
import {
    formatDateWithoutTime,
} from 'src/common/utils/date.utils';
import { ConfigurationVersion } from 'src/domain/shared/index.entity';
@Injectable()
export class ReportInstanceRepository implements IReportInstanceRepository {

    constructor(
        @InjectRepository(ReportInstance)
        private readonly reportInstanceRepository: Repository<ReportInstance>,
        @InjectRepository(ConfigurationVersion)
        private readonly configurationVersionRepository: Repository<ConfigurationVersion>,
        @InjectRepository(ChainOfCustody)
        private readonly chainOfCustodyRepository: Repository<ChainOfCustody>,
        @Inject(forwardRef(() => ReportInstanceService))
        private readonly reportInstanceService: ReportInstanceService
    ) { }

    public async getDataScreenShot(id: number, testType?: string, waterCode?: string): Promise<IChainOfCustodySnapshot | null> {

        const chainOfCustody = await this.chainOfCustodyRepository.findOne({
            where: { id },
            relations: {
                samplings: {
                    testResults: {
                        configuration: true,
                    },
                },
                reports: {
                    template: true,
                },
                configurationVersion: true,
                applicant: true,
                transport: true,
            },
        });

        if (!chainOfCustody) return null;

        if (waterCode) {
            chainOfCustody.samplings = chainOfCustody.samplings.filter(
                s => s.sampleCode?.startsWith(waterCode) || s.typeCode?.includes(waterCode)
            );
        }

        return chainOfCustody;
    }

    async getTypeAbbreviation(type: string): Promise<string> {
        const reverseMap = {
            AT: 'AGUA_TRATADA',
            AC: 'AGUA_CRUDA',
            AR: 'AGUA_RESIDUAL',
            L: 'LODO',
        };
        return reverseMap[type] || '';
    }

    public async create(
        dto: CreateReportInstanceDto,
        userId: number
    ): Promise<AnswerQuery> {
        try {
            const custody = await this.chainOfCustodyRepository.findOne({
                where: { id: dto.chainOfCustody },
            });

            if (!custody) {
                return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
            }

            const year = this.reportInstanceService.getYear();
            const { reportCode, test_number } = await this.reportInstanceService.generateCodes(
                dto.testType as 'MB' | 'FQ' | 'BQ',
                dto.waterCode as 'AT' | 'AC' | 'AR' | 'LD',
                year
            );
            const dataCustody = await this.getDataScreenShot(dto.chainOfCustody, dto.testType, dto.waterCode);
            // const data = { dto: { codeCustody: custody.codeCustody, reportCode, waterCode_test: typeAbbreviation, reportYear: year, testType: dto.testType, testRegistrationCode: test_number, waterCode: dto.waterCode, summary: dataCustody ?? {}, statusReport: dto.statusReport ?? 'EN_PROCESO', }, custody, userId };
            // return { status: true, message: ResponseMessages.RECORD_CREATED, data: data };
            const report = ReportInstance.create(
                {
                    codeCustody: custody.codeCustody,
                    reportCode,
                    reportYear: year,
                    testType: dto.testType,
                    testRegistrationCode: test_number,
                    waterCode: dto.waterCode,
                    summary: dataCustody ?? {},
                    statusReport: dto.statusReport ?? 'EN_PROCESO',
                },
                custody,
                userId
            );

            await this.reportInstanceRepository.save(report);
            return { status: true, message: ResponseMessages.RECORD_CREATED };
        } catch (error) {
            return { status: false, message: error.message };
        }
    }
    // public async update(id: number, updateReportInstanceDto: UpdateReportInstanceDto, userId: number): Promise<AnswerQuery> {
    //     try {

    //         return {
    //             status: true,
    //             message: ResponseMessages.RECORD_CREATED,
    //         }
    //     } catch (error) {
    //         return {
    //             status: false,
    //             message: ResponseMessages.SERVER_ERROR
    //         }
    //     }
    // }

    public async list(dto: FindById): Promise<AnswerQuery> {
        try {
            const [data, count] = await this.reportInstanceRepository.findAndCount({
                where: {
                    chainOfCustody: {
                        id: dto.id
                    },
                    deleteAt: IsNull(),
                },
                order: { createAt: 'DESC' },
            })
            if (!count) {
                return { status: false, message: ResponseMessages.NO_RECORDS_FOUND };
            }
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
            const [data, count] = await this.reportInstanceRepository.findAndCount({
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
                all: count,
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
            const find = await this.reportInstanceRepository.findOneBy({ id: findById.id });
            find.softDelete(userId);
            await this.reportInstanceRepository.save(find);
            return { message: ResponseMessages.RECORD_DELETED, status: true }
        } catch (error) {
            return { message: error, status: false }
        }
    }
    async count(options: { where: any }): Promise<number> {
        return this.reportInstanceRepository.count(options);
    }
    async printReportInstancePDF(
        generateReportDto: GenerateReportDto,
    ) {
        const data = await this.reportInstanceRepository.findOneByOrFail({ id: generateReportDto.id, deleteAt: IsNull() });
        if (!data) { throw new Error(ResponseMessages.NO_RECORDS_FOUND); }
        return data;
    }
    async generateHeaderInfo(id: number) {
        const configuration_id = await this.configurationVersionRepository.findOne({ where: { deleteAt: IsNull(), id: id }, order: { createAt: 'DESC' } });
        return configuration_id;
    }
    async generateHeader(codigo: string, version: string): Promise<any> {
        return {
            columns: [
                {
                    width: '20%',
                    stack: [
                        {
                            image: path.join(
                                process.cwd(),
                                'dist/src/assets/images/logo elapas2.png',
                            ),
                            width: 80,
                            height: 40,
                        },
                    ],
                    alignment: 'left',
                },
                {
                    width: '60%',
                    stack: [
                        {
                            text: 'DIVISION CONTROL DE CALIDAD - ELAPAS',
                            style: 'headerCenter',
                        },
                        {
                            text: 'CADENA DE CUSTODIO',
                            style: 'subHeaderCenter',
                        },
                    ],
                    alignment: 'center',
                },
                {
                    width: '20%',
                    stack: [
                        {
                            text: `Codigo: ${codigo}\n\nVersión N°${version} | Página 1 de 1`,
                            style: 'headerRight',
                        },
                    ],
                    alignment: 'right',
                },
            ],
            margin: [40, 0, 40, 20],
        };
    }
    async generarPdfConHeaderAndFooter(
        report: ReportInstance,
        data: IChainOfCustodySnapshot,
        header: AdminConfigurationDTO,
        generateReportDto: GenerateReportDto,
    ): Promise<Buffer> {
        const {
            pageSize = generateReportDto.pageSize,
            orientation = generateReportDto.orientation,
            user = generateReportDto.user,
        } = generateReportDto;
        const { laboratoryFQ, laboratoryMB } = data;
        const { testType } = report;
        let typeAbbreviation = '';
        if (laboratoryFQ) { if (testType === "FQ") typeAbbreviation = 'Laboratorio Fisico Quimico'; }
        if (laboratoryMB) { if (testType === "MB") typeAbbreviation = 'Laboratorio Microbiologico'; }
        // Tabla 1: DATOS INCIALES
        const table1 = [
            {
                table: {
                    headerRows: 1,
                    widths: [145, 145, 145, 145, 145, 145],
                    body: [
                        [
                            {
                                text: `Datos Crudos - ${typeAbbreviation}`,
                                colSpan: 6,
                                style: 'tableHeader',
                                alignment: 'center',
                                fillColor: '#f2f2f2',
                            },
                            {},
                            {},
                            {},
                            {},
                            {},
                        ],
                        [
                            {
                                text: 'Control Minimo de Agua Potable',
                                colSpan: 6,
                                style: 'tableHeader',
                                alignment: 'center',
                                fillColor: '#f2f2f2',
                            },
                            {}, {}, {}, {}, {}
                        ],
                        [
                            {
                                text: 'Registro N°: ' + report.testRegistrationCode,
                                colSpan: 6,
                                style: 'tableHeader',
                                alignment: 'right',
                                fillColor: '#f2f2f2',
                            },
                            {}, {}, {}, {}, {}
                        ],
                        [
                            {
                                text: 'INFORME DE ENSAYO N°',
                                style: 'tableHeader',
                                alignment: 'left',
                                fillColor: '#f2f2f2',
                            },
                            {
                                text: report.reportCode,
                                colSpan: 5,
                                alignment: 'center',
                                style: 'tableBody',
                            }, {}, {}, {}, {}
                        ],
                        [
                            {
                                text: 'REGISTRO DE ENSAYO (FO-032) N°',
                                colSpan: 2,
                                style: 'tableHeader',
                                alignment: 'left',
                                fillColor: '#f2f2f2',
                            }, {},
                            {
                                text: report.testRegistrationCode,
                                alignment: 'center',
                                style: 'tableBody',
                            },
                            {
                                text: 'MUESTREADO POR:',
                                style: 'tableHeader',
                                alignment: 'left',
                                fillColor: '#f2f2f2',
                            },
                            {
                                text: data.transport.responsable,
                                colSpan: 2,
                                alignment: 'center',
                                style: 'tableBody',
                            }, {}
                        ],
                        [
                            {
                                text: 'REGISTRO DE CADENA DE CUSTODIO (FO-031) N°',
                                colSpan: 2,
                                style: 'tableHeader',
                                alignment: 'left',
                                fillColor: '#f2f2f2',
                            }, {},
                            {
                                text: report.testRegistrationCode,
                                alignment: 'center',
                                style: 'tableBody',
                            },
                            {
                                text: 'ANALIZADO POR:',

                                style: 'tableHeader',
                                alignment: 'left',
                                fillColor: '#f2f2f2',
                            },
                            {
                                text: data.transport.responsable,
                                colSpan: 2,
                                alignment: 'center',
                                style: 'tableBody',
                            }, {}
                        ]
                    ],
                },
                layout: {
                    hLineWidth: (i, node) => 1,
                    vLineWidth: (i, node) => 1,
                    hLineColor: (i, node) => '#e0e0e0',
                    vLineColor: (i, node) => '#e0e0e0',
                },

            },
        ];

        // Tabla II: Solicitante
        const table2 = {
            table: {
                headerRows: 1, // Número de filas de encabezado
                widths: [222, 222, 222, 222],
                body: [
                    [
                        {
                            text: 'DATOS DEL SOLICITANTE',
                            colSpan: 4,
                            style: 'tableHeader',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        }, {}, {}, {}
                    ],
                    [
                        {
                            text: 'NOMBRE DE LA ENTIDAD',
                            alignment: 'LEFT',
                            style: 'tableHeader',
                            fillColor: '#f2f2f2',
                        },
                        {
                            text: data.applicant.entityName,
                            alignment: 'center',
                            style: 'tableBody',
                        },
                        {
                            text: 'DIRECCIÖN',
                            alignment: 'left',
                            style: 'tableHeader',
                            fillColor: '#f2f2f2',
                        },
                        {
                            text: data.applicant.location,
                            alignment: 'center',
                            style: 'tableBody',
                        },
                    ],
                    [
                        { text: 'PERSONA DE CONTACTO', alignment: 'left', style: 'tableHeader', fillColor: '#f2f2f2', },
                        {
                            text: data.applicant.referencePerson,
                            alignment: 'center',
                            style: 'tableBody',
                        },
                        { text: 'TELEFONO', alignment: 'left', style: 'tableHeader', fillColor: '#f2f2f2', },
                        {
                            text: data.applicant.phone,
                            alignment: 'center',
                            style: 'tableBody',
                        },
                    ],
                ],
            },
            layout: {
                hLineWidth: (i, node) => 1,
                vLineWidth: (i, node) => 1,
                hLineColor: (i, node) => '#e0e0e0',
                vLineColor: (i, node) => '#e0e0e0',
            },
        };
        const table3 = {
            table: {
                headerRows: 1, // Número de filas de encabezado
                widths: [75, 75, 75, 75, 75, 75, 75, 75, 75, 75, 75],
                body: [
                    [
                        {
                            text: 'IDENTIFICACION DE LAS MUESTRAS',
                            colSpan: 4,
                            style: 'tableHeader',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        }, {}, {}, {},
                        {
                            text: 'DATOS DE MUESTREO',
                            colSpan: 7,
                            style: 'tableHeader',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        }, {}, {}, {}, {}, {}, {}
                    ],
                    [
                        {
                            text: 'Cód. Muestra',
                            rowSpan: 2,
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        },
                        {
                            text: 'Descripcion y Muestra',
                            rowSpan: 2,
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        },
                        {
                            text: 'Fuente de Abastecimiento',
                            rowSpan: 2,
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        },
                        {
                            text: 'Cantidad\n(ml/L)',
                            rowSpan: 2,
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        },
                        {
                            text: 'Sitio de Muestro',
                            rowSpan: 2,
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        },
                        {
                            text: 'Punto de Muestro',
                            rowSpan: 2,
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        },
                        {
                            text: 'Coord.\n(GPS)',
                            rowSpan: 2,
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        },
                        {
                            text: 'Técnica Muestreo',
                            rowSpan: 2,
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        },
                        {
                            text: 'Cond. Amb.',
                            colSpan: 2,
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        }, {},
                        {
                            text: 'Fecha/Hora',
                            rowSpan: 2,
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        },
                    ],
                    [
                        {}, {}, {}, {}, {}, {}, {}, {},
                        {
                            text: 'T°C',
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        },
                        {
                            text: 'H%',
                            style: 'tableHeader1',
                            alignment: 'center',
                            fillColor: '#f2f2f2',
                        },
                        {}
                    ],
                    ...data.samplings.map((sampling) => [
                        {
                            text: sampling.sampleCode || '',
                            style: 'tableBody1',
                            alignment: 'center',
                        },
                        {
                            text: sampling.description || '',
                            style: 'tableBody1',
                            alignment: 'center',
                        },
                        {
                            text: sampling.sourceOfSupply || '',
                            style: 'tableBody1',
                            alignment: 'center',
                        },
                        {
                            text: sampling.quantity || '',
                            style: 'tableBody1',
                            alignment: 'center',
                        },
                        {
                            text: sampling.sampleLocation || '',
                            style: 'tableBody1',
                            alignment: 'center',
                        },
                        {
                            text: sampling.samplePoint || '',
                            style: 'tableBody1',
                            alignment: 'center',
                        },
                        {
                            text: `${sampling.coordinatesX || ''}\n${sampling.coordinatesY || ''}`,
                            style: 'tableBody1',
                            alignment: 'center',
                        },
                        {
                            text: sampling.samplingTechnique || '',
                            style: 'tableBody1',
                            alignment: 'center',
                        },
                        {
                            text: sampling.ciResA || '',
                            style: 'tableBody1',
                            alignment: 'center',
                        },
                        {
                            text: sampling.ciResB || '',
                            style: 'tableBody1',
                            alignment: 'center',
                        },
                        {
                            text: `${this.formatDate(sampling.samplingDay.toString())} \n ${this.formatTime(sampling.samplingTime.toString())}` || '',
                            style: 'tableBody1',
                            alignment: 'center',
                        },
                    ]),
                ],
            },
            layout: {
                hLineWidth: (i, node) => 1,
                vLineWidth: (i, node) => 1,
                hLineColor: (i, node) => '#e0e0e0',
                vLineColor: (i, node) => '#e0e0e0',
            },
        }
        const table4 = {
            
        }
        const bodyContent = [
            table1,
            table2,
            table3,
            table4
        ];
        const docDefinition: any = {
            pageSize,
            pageOrientation: orientation,
            header: await this.generateHeader(header.codeConfiguration, header.versionConfiguration), // Header se asegura de que sea estático.
            // footer: (currentPage, pageCount) => {
            //   return {
            //     text: `Página ${currentPage} de ${pageCount}`,
            //     style: 'footer',
            //     alignment: 'center',
            //     margin: [0, 0, 0, 20],
            //   };
            // },
            footer: (currentPage, pageCount) => {
                return {
                    columns: [
                        {
                            text: `Usuario: ${user}\nFecha: ${this.formatDate(new Date().toString())} ${this.formatTime(new Date())}`, // Cambia "NombreUsuario" por el valor dinámico si es necesario
                            style: 'footer',
                            alignment: 'left',
                            margin: [20, 0, 0, 20],
                        },
                        {
                            text: `${header.messageConfiguration}\nUltima Revision: ${formatDateWithoutTime(header.createAt.toString())}`,
                            style: 'footer',
                            alignment: 'center',
                            margin: [0, 0, 0, 20],
                        },
                        {
                            text: `SISTEMAS INFORMATICOS \nPágina ${currentPage} de ${pageCount}`,
                            style: 'footer',
                            alignment: 'right',
                            margin: [0, 0, 20, 20],
                        },
                    ],
                };
            },

            content: bodyContent,
            styles: {
                headerCenter: {
                    fontSize: 16,
                    bold: true,
                    alignment: 'center',
                    color: '#000',
                },
                subHeaderCenter: {
                    fontSize: 12,
                    alignment: 'center',
                    color: '#666',
                },
                headerRight: {
                    fontSize: 10,
                    alignment: 'right',
                    color: '#666',
                },
                tableHeader: { bold: true, fontSize: 11, color: 'black' },
                tableHeader1: { bold: true, fontSize: 8, color: 'black' },
                tableBody: { fontSize: 10 },
                tableBody1: { fontSize: 7 },
                footer: { fontSize: 10, color: '#999' },
            },
        };

        const fontDescriptors = {
            Roboto: {
                normal: path.join(
                    process.cwd(),
                    'dist/src/assets/fonts/Roboto-Regular.ttf',
                ),
                bold: path.join(
                    process.cwd(),
                    'dist/src/assets/fonts/Roboto-Medium.ttf',
                ),
                italics: path.join(
                    process.cwd(),
                    'dist/src/assets/fonts/Roboto-Italic.ttf',
                ),
                bolditalics: path.join(
                    process.cwd(),
                    'dist/src/assets/fonts/Roboto-Bold.ttf',
                ),
            },
        };
        const printer = new PdfPrinter(fontDescriptors);
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const chunks: Buffer[] = [];
        return new Promise((resolve) => {
            pdfDoc.on('data', (chunk) => chunks.push(chunk));
            pdfDoc.on('end', () => {
                const result = Buffer.concat(chunks);
                resolve(result);
            });
            pdfDoc.end();
        });
    }
    /**
     * service for generate pdf using pdfMake
     * @param Formater
     * @returns
     */
    private formatDate(date: Date | string): string {
        const parsedDate = new Date(date);
        return parsedDate.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
    }
    private formatTime(date: Date | string): string {
        const parsedDate = new Date(date);
        return parsedDate.toTimeString().split(' ')[0]; // Formato: HH:mm:ss
    }
}