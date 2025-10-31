/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChainOfCustody } from 'src/domain/cc_custody/entities/chain_of_custody.entity';
import { IsNull, Repository } from 'typeorm';
import {
  CreateChainOfCustodyDto,
  DataClass,
  UpdateChainOfCustodyDto,
  AdminConfigurationDTO
} from 'src/presentation/dtos/cc_custody/index.dto';
import {
  AnswerQuery,
  FindById,
  GenerateReportDto,
} from 'src/common/dto/index.dto';
import { ResponseMessages } from 'src/common/enum/answers.enum';
import {
  formatDateWithoutTime,
  formatTime,
} from 'src/common/utils/date.utils';
import { Transport, ConfigurationVersion, Applicant } from 'src/domain/shared/index.entity';
import PdfPrinter from 'pdfmake';
import * as path from 'path';
import { ICustodyRepository } from 'src/domain/cc_custody/interface/custody-repository.interface';

@Injectable()
export class ChainOfCustodyRepository implements ICustodyRepository{
  constructor(
    @InjectRepository(ChainOfCustody)
    private readonly chainOfCustodyRepository: Repository<ChainOfCustody>,
    @InjectRepository(Transport)
    private readonly transportRepository: Repository<Transport>,
    @InjectRepository(Applicant)
    private readonly applicantRepository: Repository<Applicant>,
    @InjectRepository(ConfigurationVersion)
    private readonly adminConfiguration: Repository<ConfigurationVersion>,
  ) { }

  async create(
    createDto: CreateChainOfCustodyDto,
    userId: number,
  ): Promise<AnswerQuery> {
    try {
      const count = await this.getCountCustody();
      const configuration = await this.getConfiguration(createDto.configurationVersion);
      if(!configuration) { return {status: false, message: ResponseMessages.NO_CONFIGURATIONS} }
      const custody = ChainOfCustody.create(
        createDto,
        userId,
        configuration,
        count + 1,
      );
      await this.chainOfCustodyRepository.save(custody);
      return {
        status: true,
        message: ResponseMessages.RECORD_CREATED,
      };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }
  async getCountCustody() {
    const count = await this.chainOfCustodyRepository.count({
      where: { deleteAt: IsNull() },
    });
    return count
  }
  async getConfiguration(id: number) {
    const configuration = await this.adminConfiguration.findOne({
      where: { deleteAt: IsNull(), statusConfiguration: true, id: id },
      order: { createAt: 'DESC' },
    });
    return configuration;
  }
  async update(
    id: number,
    updateDto: UpdateChainOfCustodyDto,
    userId: number,
  ): Promise<AnswerQuery> {
    try {
      const custody = await this.chainOfCustodyRepository.findOneBy({ id: updateDto.id });
      custody.updateData(updateDto, userId);
      await this.chainOfCustodyRepository.save(custody);
      return { status: true, message: ResponseMessages.RECORD_MODIFIED, };
    } catch (error) {
      return { status: false, message: error.message || error };
    }
  }
  async listCustody(): Promise<AnswerQuery> {
    try {
      const [data, count] = await this.chainOfCustodyRepository.findAndCount({
        where: {
          deleteAt: IsNull(),
        },
        order: { createAt: 'DESC' },
      });
      const transform = data.map(custody => custody.toResponse());
      if (data) {
        return {
          message: ResponseMessages.RECORDS_FOUND,
          status: true,
          data: transform,
          all: count,
        };
      } else { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }; }
    } catch (error) {
      return { message: error.message, status: false, };
    }
  }
  async delete(findById: FindById, userId: number): Promise<AnswerQuery> {
    try {
      const find = await this.chainOfCustodyRepository.findOne({
        where: { id: findById.id },
        relations: ['samplings'],
      });

      if (!find) { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }; }

      if (find.samplings && find.samplings.length > 0) { return { message: 'No se puede eliminar porque tiene registros relacionados en la tabla Sampling.', status: false, }; }
      find.softDelete(userId);
      await this.chainOfCustodyRepository.save(find);
      return { message: ResponseMessages.RECORD_DELETED, status: true };
    } catch (error) {
      return { message: error.message, status: false, };
    }
  }
  async findById(findById: FindById): Promise<AnswerQuery> {
    try {
      const [find, count] = await this.chainOfCustodyRepository.findAndCount({
        where: {
          id: findById.id,
          deleteUserId: null,
        }
      });
      const transform = find.map(custody => custody.toResponse());
      if (!transform) { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }; }
      return {
        message: ResponseMessages.RECORDS_FOUND,
        status: true,
        data: transform,
      };
    } catch (error) {
      return { message: error.message, status: false, };
    }
  }
  async printChainOfCustody(findById: FindById): Promise<AnswerQuery> {
    try {
      const data = await this.chainOfCustodyRepository.find({
        relations: ['samplings'],
        where: {
          id: findById.id,
          deleteAt: IsNull(),
        },
      });

      if (data.length === 0) { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }; }

      const custody_id: number = data[0].id;
      const transport = await this.transportRepository.findOne({
        where: {
          chainOfCustody: { id: custody_id },
        },
      });
      const responseData = {
        ...data[0],
        transport,
      };

      return {
        message: ResponseMessages.RECORDS_FOUND,
        status: true,
        data: responseData,
      };
    } catch (error) {
      return { status: false, message: error.message }
    }
  }
  async getTransport(custody_id: number) {
    const transport = await this.transportRepository.findOne({
      where: {
        chainOfCustody: { id: custody_id },
      },
    });
    return transport
  }
  async getApplicant(custody_id: number) {
    const applicant = await this.applicantRepository.findOne({
      where: {
        chainOfCustody: { id: custody_id },
      },
    });
    return applicant
  }
  async printChainOfCustodyPDF(findById: GenerateReportDto) {
    try {
      const { id } = findById;
      const data_id = +id;
      const data = await this.chainOfCustodyRepository.find({
        relations: ['samplings'],
        where: {
          id: data_id,
          deleteAt: IsNull(),
        },
      });

      if (data.length === 0) {
        throw new BadRequestException('Error en el registro');
      }

      const custody_id: number = data[0].id;
      const transport = await this.getTransport(custody_id);
      const applicant = await this.getApplicant(custody_id);
      const responseData: DataClass = {
        ...data[0],
        transport,
        applicant,
      };
      return responseData;
    } catch (error) {
      throw new BadRequestException('Error en el registro');
    }
  }
  async getMaps(): Promise<AnswerQuery> {
    try {
      const data = await this.chainOfCustodyRepository.find({
        relations: ['samplings'],
        where: {
          deleteAt: IsNull(),
        },
      });

      if (data.length === 0) { return { message: ResponseMessages.NO_RECORDS_FOUND, status: false, }; }
      const responseData = await Promise.all(
        data.map(async (custody) => {
          const transport = await this.transportRepository.findOne({
            where: {
              chainOfCustody: { id: custody.id },
            },
          });

          return {
            id: custody.id,
            codeCustody: custody.codeCustody,
            laboratoryMB: custody.laboratoryMB ? 'Si' : 'No',
            laboratoryFQ: custody.laboratoryFQ ? 'Si' : 'No',
            codeThermohygrometer: custody.codeThermohygrometer,
            codeThermometerMM: custody.codeThermometerMM,
            codeThermometer: custody.codeThermometer,
            codeColorimeter: custody.codeColorimeter,
            samplings: custody.samplings
              .filter((sampling) => sampling !== null)
              .map((sampling) => ({
                id: sampling.id,
                sampleCode: sampling.sampleCode,
                description: sampling.description,
                sourceOfSupply: sampling.sourceOfSupply,
                quantity: sampling.quantity,
                sampleLocation: sampling.sampleLocation,
                samplePoint: sampling.samplePoint,
                coordinates: {
                  lat: sampling.coordinatesX,
                  lng: sampling.coordinatesY,
                },
                samplingTechnique: sampling.samplingTechnique,
                samplingTechniqueM: sampling.samplingTechniqueM,
                ciResA: sampling.ciResA,
                ciResB: sampling.ciResB,
                condAmbT: sampling.condAmbT,
                condAmbB: sampling.condAmbB,
                samplingDay: sampling.samplingDay,
                samplingTime: sampling.samplingTime,
              })),
            ...(transport
              ? {
                start_date_transport: formatDateWithoutTime(
                  transport.initDate.toString(),
                ),
                endDate_transport: formatDateWithoutTime(
                  transport.endDate.toString(),
                ),
                start_time_transport: formatTime(transport.initTime.toString()),
                endTime_transport: formatTime(transport.endTime.toString()),
                transport_responsable: transport.responsable,
              }
              : {}),
          };
        }),
      );
      return { message: ResponseMessages.RECORDS_FOUND, status: true, data: responseData, };
    } catch (error) {
      return { message: error.message || error, status: false, };
    }
  }
  /**
   * service for generate pdf using pdfMake
   * @param data
   * @returns
   */

  async generateHeaderInfo() {
    const configuration_id = await this.adminConfiguration.findOne({ where: { deleteAt: IsNull(), statusConfiguration: true }, order: { createAt: 'DESC' } })
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
    data: DataClass,
    header: AdminConfigurationDTO,
    generateReportDto: GenerateReportDto,
  ): Promise<Buffer> {
    const {
      pageSize = generateReportDto.pageSize,
      orientation = generateReportDto.orientation,
      user = generateReportDto.user,
    } = generateReportDto;
    // Tabla 1: DATOS INCIALES
    const table1 = [
      {
        table: {
          headerRows: 1,
          widths: [110, 50, 50, 121, 100, 100, 100, 120, 120], 
          body: [
            [
              {
                text: 'I. DATOS INICIALES',
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
              {
                text: `Registro N° ${data.codeCustody}`,
                colSpan: 3,
                style: 'tableHeader',
                alignment: 'center',
                fillColor: '#f2f2f2',
              },
              {},
              {},
            ],
            [
              {
                text: 'Laboratorio destino (Marcar X)',
                rowSpan: 2,
                alignment: 'center',
                style: 'tableBody',
              },
              { text: 'MB', alignment: 'center', style: 'tableBody' },
              { text: 'FQ', alignment: 'center', style: 'tableBody' },
              {
                text: 'Código Termohigrometro',
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: data.codeThermohygrometer,
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: 'Código Termómetro',
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: data.codeThermometer,
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: 'T°C° Inicial Conservador',
                rowSpan: 2,
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: data.initialConservative,
                rowSpan: 2,
                alignment: 'center',
                style: 'tableBody',
              },
            ],
            [
              {},
              {
                text: data.laboratoryMB ? 'X' : '',
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: data.laboratoryFQ ? 'X' : '',
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: 'Código Termómetro Max/Min',
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: data.codeThermometerMM,
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: 'Código Colorimetro',
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: data.codeColorimeter,
                alignment: 'center',
                style: 'tableBody',
              },
              {},
              {},
            ],
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
    // Tabla: II. TOMA DE MUESTRA y III. CONDICIONES DE RECEPCIÓN
    const table2 = {
      table: {
        headerRows: 2,
        // widths: [
        //   30, 60, 60, 30, 60, 60, 100, 40, 40, 30, 30, 30, 30, 39, 40, 60, 60,
        // ],
        widths: [
          30, 83, 75, 50, 75, 75, 100, 40, 40, 40, 40, 40, 40, 49, 40,
        ],
        body: [
          // Primera fila con encabezados grandes
          [
            {
              text: 'II. TOMA DE MUESTRA',
              colSpan: 15,
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            ...Array(14).fill({ text: '' }), // Rellenar celdas vacías
            // {
            //   text: 'III. CONDICIONES DE RECEPCIÓN',
            //   colSpan: 2,
            //   style: 'tableHeader',
            //   alignment: 'center',
            //   fillColor: '#f2f2f2',
            // },
            // { text: '' },
          ],
          // Segunda fila con encabezados secundarios
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
              text: 'T°C muestra',
              rowSpan: 2,
              style: 'tableHeader1',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {
              text: 'CI Res. (mg/L)',
              colSpan: 2,
              style: 'tableHeader1',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {}, // Celda vacía para completar colSpan
            {
              text: 'Cond. Amb.',
              colSpan: 2,
              style: 'tableHeader1',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {}, // Celda vacía para completar colSpan
            {
              text: 'Fecha',
              rowSpan: 2,
              style: 'tableHeader1',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {
              text: 'Hora',
              rowSpan: 2,
              style: 'tableHeader1',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            // {
            //   text: 'Condicion de Llegada',
            //   rowSpan: 2,
            //   style: 'tableHeader1',
            //   alignment: 'center',
            //   fillColor: '#f2f2f2',
            // },
            // {
            //   text: 'Aceptacion',
            //   rowSpan: 2,
            //   style: 'tableHeader1',
            //   alignment: 'center',
            //   fillColor: '#f2f2f2',
            // },
          ],
          // Subencabezados adicionales para ciertas columnas
          [
            {}, {}, {}, {}, {}, {}, {}, {}, {}, // Celdas vacías para columnas con rowSpan
            {
              text: 'A',
              style: 'tableHeader1',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {
              text: 'B',
              style: 'tableHeader1',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
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
            {}, {}, //{}, {},
          ],
          // Filas dinámicas con datos
          ...data.samplings.map((sample) => [
            {
              text: sample.sampleCode || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: sample.description || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: sample.sourceOfSupply || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: sample.quantity || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: sample.sampleLocation || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: sample.samplePoint || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: `${sample.coordinatesX || ''}\n${sample.coordinatesY || ''}`,
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: sample.samplingTechnique || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: sample.samplingTechniqueM || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: sample.ciResA || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: sample.ciResB || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: sample.condAmbT || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: sample.condAmbB || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: this.formatDate(sample.samplingDay.toString()) || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            {
              text: this.formatTime(sample.samplingTime.toString()) || '',
              style: 'tableBody1',
              alignment: 'center',
            },
            // {
            //   // text: '',
            //   ul: sample.samplingConditions,
            //   style: 'tableBody1',
            //   alignment: 'center',
            // },
            // {
            //   text: sample.samplingAceptation || '',
            //   style: 'tableBody1',
            //   alignment: 'center',
            // },
          ]),
        ],
      },
      layout: {
        hLineWidth: (i, node) => 1,
        vLineWidth: (i, node) => 1,
        hLineColor: (i, node) => '#e0e0e0',
        vLineColor: (i, node) => '#e0e0e0',
      },
    };
    // DATOS DE EL QUE LO REALIZO
    const table3 = [
      {
        table: {
          headerRows: 1,
          widths: [143, 175, 145, 145, 145, 145], // Proporcional para ajustar al ancho completo
          body: [
            [
              {
                text: 'Responsable Muestreo',
                alignment: 'center',
                style: 'tableHeader',
              },
              {
                text: data.transport.responsable,
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: 'Firma',
                alignment: 'center',
                style: 'tableHeader',
              },
              {
                text: '',
                alignment: 'center',
                style: 'tableBody',
              },
              {
                text: 'Resp. Recepcion/Firma',
                alignment: 'center',
                style: 'tableHeader',
              },
              {
                text: '',
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
      },
    ];
    // III. DATOS DEL SOLICITANTE
    const table4 = {
      table: {
        headerRows: 1, // Número de filas de encabezado
        widths: [120, 120, 120, 120, 100, 100, 100, 100], // Ancho de las columnas
        body: [
          [
            {
              text: 'III. DATOS DEL SOLICITANTE',
              colSpan: 8,
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              text: 'NOMBRE ENTIDAD',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {
              text: data.applicant.entityName,
              alignment: 'center',
              style: 'tableBody',
            },
            {
              text: 'DIRECCIÓN',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {
              text: data.applicant.location,
              alignment: 'center',
              style: 'tableBody',
            },
            {
              text: 'PERSONA DE CONTACTO',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {
              text: data.applicant.referencePerson,
              alignment: 'center',
              style: 'tableBody',
            },
            {
              text: 'TELÉFONO',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
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
    // IV. DATOS DEL TRANSPORTE Y CADENA DE FRIO
    const table5 = {
      table: {
        headerRows: 3, // Número de filas de encabezado
        widths: [120, 120, 120, 120, 100, 100, 100, 100], // Ancho de las columnas
        body: [
          [
            {
              text: 'IV. DATOS DEL TRANSPORTE Y CADENA DE FRIO',
              colSpan: 8,
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              text: 'Responsable',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
              rowSpan: 2
            },
            {
              text: 'Tramo Recorrido',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
              rowSpan: 2
            },
            {
              text: '°T de llegada Conservador',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
              rowSpan: 2
            },
            {
              text: '°T Max',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
              rowSpan: 2
            },
            {
              text: 'Inicio Transporte',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
              colSpan: 2
            },
            {},
            {
              text: 'Llegada Laboratorio',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
              colSpan: 2
            },
            {},
          ],
          [
            {},
            {},
            {},
            {},
            {
              text: 'Fecha',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {
              text: 'Hora',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {
              text: 'Fecha',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {
              text: 'Hora',
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
          ],
          [
            {
              text: data.transport.responsable,
              alignment: 'center',
              style: 'tableBody',
            },
            {
              text: data.transport.distanceTraveled,
              alignment: 'center',
              style: 'tableBody',
            },
            {
              text: data.transport.conservativeArrivalStretch,
              alignment: 'center',
              style: 'tableBody',
            },
            {
              text: data.transport.maximumStretch,
              alignment: 'center',
              style: 'tableBody',
            },
            {
              text: this.formatDate(data.transport.initDate.toString()),
              alignment: 'center',
              style: 'tableBody',
            },
            {
              text: this.formatTime(data.transport.initTime.toString()),
              alignment: 'center',
              style: 'tableBody',
            },
            {
              text: this.formatDate(data.transport.endDate.toString()),
              alignment: 'center',
              style: 'tableBody',
            },
            {
              text: this.formatTime(data.transport.endTime.toString()),
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
    // Tabla VI: TRABAJO NO CONFORME
    const table6 = {
      table: {
        headerRows: 3, // Número de filas de encabezado
        widths: [153, 153, 145, 149, 149, 149],
        body: [
          [
            {
              text: 'V. FIRMAS DE CONFORMIDAD',
              colSpan: 3,
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {},
            {},
            {
              text: 'VI. TRABAJO NO CONFORME',
              colSpan: 3,
              style: 'tableHeader',
              alignment: 'center',
              fillColor: '#f2f2f2',
            },
            {},
            {},
          ],
          [
            {
              text: '',
              rowSpan: 2,
              alignment: 'center',
            },
            {
              text: '',
              rowSpan: 2,
              alignment: 'center',
            },
            {
              text: 'FECHA',
              alignment: 'center',
              style: 'tableHeader',
              fillColor: '#f2f2f2',
            },
            {
              text: 'ORIGEN TNC',
              alignment: 'center',
              style: 'tableHeader',
              fillColor: '#f2f2f2',
            },
            {
              text: 'REGISTRO\n(FO-061)',
              alignment: 'center',
              style: 'tableHeader',
              fillColor: '#f2f2f2',
            },
            {
              text: 'Resp.',
              alignment: 'center',
              style: 'tableHeader',
              fillColor: '#f2f2f2',
            },
          ],
          [
            {},
            {},
            { text: data.transport.responsable, alignment: 'center', style: 'tableBody' },
            { text: data.transport.responsable, alignment: 'center', style: 'tableBody' },
            { text: data.transport.responsable, alignment: 'center', style: 'tableBody' },
            { text: data.transport.responsable, alignment: 'center', style: 'tableBody' },
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
    // Tabla VII: DESECHO
    // const table7 = {
    //   table: {
    //     headerRows: 3, // Número de filas de encabezado
    //     widths: [200, 140, 140, 140, 140, 140, 140],
    //     body: [
    //       [
    //         {
    //           text: 'VII. DESECHO',
    //           colSpan: 6,
    //           style: 'tableHeader',
    //           alignment: 'center',
    //           fillColor: '#f2f2f2',
    //         },
    //         {},
    //         {},
    //         {},
    //         {},
    //         {},
    //       ],
    //       [
    //         {
    //           text: 'Fecha',
    //           alignment: 'center',
    //           style: 'tableHeader',
    //           fillColor: '#f2f2f2',
    //         },
    //         {
    //           text: '',
    //           alignment: 'center',
    //           style: 'tableBody',
    //           fillColor: '#f2f2f2',
    //         },
    //         {
    //           text: 'Responsable',
    //           alignment: 'center',
    //           style: 'tableHeader',
    //           fillColor: '#f2f2f2',
    //         },
    //         {
    //           text: '',
    //           alignment: 'center',
    //           style: 'tableBody',
    //           fillColor: '#f2f2f2',
    //         },
    //         {
    //           text: 'Tratamiento',
    //           alignment: 'center',
    //           style: 'tableHeader',
    //           fillColor: '#f2f2f2',
    //         },
    //         {
    //           text: '',
    //           alignment: 'center',
    //           style: 'tableBody',
    //           fillColor: '#f2f2f2',
    //         },
    //       ],
    //       [
    //         {
    //           text: 'Observaciones',
    //           alignment: 'center',
    //           style: 'tableHeader',
    //           colSpan: 2,
    //           fillColor: '#f2f2f2',
    //         },
    //         {},
    //         { text: '', alignment: 'center', style: 'tableBody', colSpan: 4 },
    //         {},
    //         {},
    //         {},
    //       ],
    //     ],
    //   },
    //   layout: {
    //     hLineWidth: (i, node) => 1,
    //     vLineWidth: (i, node) => 1,
    //     hLineColor: (i, node) => '#e0e0e0',
    //     vLineColor: (i, node) => '#e0e0e0',
    //   },
    // };
    const bodyContent = [
      table1,
      table2,
      table3,
      table4,
      table5,
      table6,
      // table7,
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
