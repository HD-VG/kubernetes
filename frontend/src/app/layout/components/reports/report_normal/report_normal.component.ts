import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportService } from '../service/reports.service';
import { DataClass } from 'src/app/layout/api/printChainOfCustody.interface';
import { format_date } from '../../../common/functions/index';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
    selector: 'app-report-normal',
    templateUrl: './report_normal.component.html',
    styleUrl: './report_normal.component.scss',
    providers: [MessageService],
})
export class ReportNormalComponent implements OnInit {
    custody_id: number = 0;
    data: DataClass = {};
    logoPath = 'assets/layout/images/logo elapas.png';
    logoBase64: string = '';
    date: Date = new Date();
    currentDate: string = '';
    currentUser: string = '';
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private reportService: ReportService
    ) { }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.custody_id = +id;
        this.convertImageToBase64('assets/layout/images/logo elapas.png');
        this.currentDate = format_date(this.date);
        this.getInfo();
        this.getUser();
    }
    convertImageToBase64(imagePath: string) {
        const img = new Image();
        img.src = imagePath;
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                this.logoBase64 = canvas.toDataURL('image/png');
            }
        };
    }
    printReport(): void {
        const printContents = document.getElementById('printable-area');
        if (printContents) {
            const styles = Array.from(document.styleSheets)
                .map((styleSheet) => {
                    try {
                        return Array.from(styleSheet.cssRules)
                            .map((rule) => rule.cssText)
                            .join('\n');
                    } catch (e) {
                        console.warn(
                            'No se pudieron leer algunas reglas de estilo.',
                            e
                        );
                        return '';
                    }
                })
                .join('\n');

            const printWindow = window.open('', '_blank');
            if (printWindow) {
                printWindow.document.write(`
                <html>
                    <head>
                        <title>Imprimir Reporte</title>
                        <style>
                            ${styles} /* Copiamos los estilos del documento actual */
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                            }
                            @page {
                                size: 13in 8.5in; /* Tamaño papel oficio en horizontal */
                                margin: 10mm; /* Márgenes ajustados */
                                counter-increment: page;
                            }
                            body {
                                margin: 0;
                            }
                            table {
                                width: 100%; /* Aseguramos que las tablas ocupen todo el ancho */
                                border-collapse: collapse; /* Bordes combinados */
                            }
                            th, td {
                                border: 1px solid #000;
                                padding: 5px;
                                text-align: left;
                            }
                            #printable-area {
                                width: 100%;
                                margin: 0 auto;
                            }
                            .p-button {
                                display: none;
                            }
                            img {
                                max-width: 100%; /* Aseguramos que las imágenes no se desborden */
                                height: auto;
                            }
                            .header {
                                display: table-header-group;
                                position: fixed;
                                top: 0;
                                left: 0;
                                right: 0;
                            }
                            .footer {
                                display: table-footer-group;
                                position: fixed;
                                bottom: 0;
                                left: 0;
                                right: 0;
                            }
                            .page-number:after {
                                content: "Página " counter(page);
                            }
                            .content {
                                margin-top: 60mm; /* Ajustar según el tamaño del header */
                                margin-bottom: 30mm; /* Ajustar según el tamaño del footer */
                            }
                        </style>
                        <script>
                            window.onload = function() {
                                var totalPages = Math.ceil(document.body.scrollHeight / window.innerHeight);
                                var pageNumberElements = document.querySelectorAll('.page-number');
                                for (var i = 0; i < pageNumberElements.length; i++) {
                                    pageNumberElements[i].innerText = "Página " + (i + 1) + " de " + totalPages;
                                }
                            };
                        </script>
                    </head>
                    <body>${printContents.outerHTML}</body>
                </html>
            `);

                printWindow.document.close();
                printWindow.focus();

                const images = printWindow.document.images;
                const imagePromises = Array.from(images).map((img) => {
                    return new Promise((resolve, reject) => {
                        img.onload = resolve;
                        img.onerror = reject;
                    });
                });

                Promise.all(imagePromises)
                    .then(() => {
                        printWindow.print();
                        printWindow.close();
                    })
                    .catch((err) => {
                        console.error('Error al cargar imágenes:', err);
                        printWindow.print();
                        printWindow.close();
                    });
            }
        } else {
            console.error('No se encontró el área imprimible.');
        }
    }
    addContent(doc: jsPDF) {
        const margin = 10;
        let y = 50;
        const pageWidth = doc.internal.pageSize.width;
        this.addHeader(doc, 1, 1);
        // Tabla I. DATOS INICIALES
        autoTable(doc, {
            head: [
                [
                    {
                        content: 'I. DATOS INICIALES',
                        colSpan: 6,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Registro N°',
                        colSpan: 3,
                        styles: { halign: 'center' },
                    },
                ],
            ],
            body: [
                [
                    {
                        content: 'Laboratorio destino (Marcar X)',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    { content: 'MB', styles: { halign: 'center' } },
                    { content: 'FQ', styles: { halign: 'center' } },
                    {
                        content: 'Código Termohigrometro',
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.data.code_thermohygrometer,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Código Termómetro',
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.data.code_thermometer,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'T°C° Inicial Conservador',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.data.initial_conservative,
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                ],
                [
                    {
                        content: this.data.laboratoryMB ? 'X' : '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.data.laboratoryFQ ? 'X' : '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Código Termómetro Max/Min',
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.data.code_thermometer_m_m,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Código Colorimetro',
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.data.code_colorimeter,
                        styles: { halign: 'center' },
                    },
                ],
            ],
            startY: y,
            theme: 'grid',
            styles: { fontSize: 10 },
            margin: { left: margin, right: margin },
            tableWidth: pageWidth - 2 * margin,
            columnStyles: {
                0: { cellWidth: 30 },
                1: { cellWidth: 15 },
                2: { cellWidth: 15 },
                3: { cellWidth: 50 },
                4: { cellWidth: 40 },
                5: { cellWidth: 40 },
                6: { cellWidth: 40 },
                7: { cellWidth: 40 },
                8: { cellWidth: 40 },
            },
        });
        y = (doc as any).lastAutoTable.finalY + 10;
        // Tabla II. TOMA DE MUESTRA y III. CONDICIONES DE RECEPCIÖN
        autoTable(doc, {
            head: [
                [
                    {
                        content: 'II. TOMA DE MUESTRA',
                        colSpan: 15,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'III. CONDICIONES DE RECEPCIÖN',
                        colSpan: 2,
                        styles: { halign: 'center' },
                    },
                ],
                [
                    {
                        content: 'Cód. Muestra',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Descripcion y Muestra\n(Tipo y Codigo)',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Fuente de Abastecimiento',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Cantidad\n(ml/L)',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Sitio de Muestro',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Punto de Muestro',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Coord.\n(GPS)',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Técnica Mustreo',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'T°C muestra',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'CI Res. (mg/L)\nA',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'CI Res. (mg/L)\nB',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Cond. Amb.\nT°C',
                        styles: { halign: 'center' },
                    },
                    { content: 'Cond. Amb.\nH%', styles: { halign: 'center' } },
                    {
                        content: 'Fecha',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Hora',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Condicion de Llegada',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Aceptacion',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                ],
                [
                    { content: 'A', styles: { halign: 'center' } },
                    { content: 'B', styles: { halign: 'center' } },
                    { content: 'T°C', styles: { halign: 'center' } },
                    { content: 'H%', styles: { halign: 'center' } },
                ],
            ],
            body: this.data.samplings.map((sample) => [
                { content: sample.sample_code, styles: { halign: 'center' } },
                { content: sample.description, styles: { halign: 'center' } },
                {
                    content: sample.source_of_supply,
                    styles: { halign: 'center' },
                },
                { content: sample.quantity, styles: { halign: 'center' } },
                {
                    content: sample.sample_location,
                    styles: { halign: 'center' },
                },
                { content: sample.sample_point, styles: { halign: 'center' } },
                {
                    content: `${sample.coordinatesX}\n${sample.coordinatesY}`,
                    styles: { halign: 'center' },
                },
                {
                    content: sample.sampling_technique,
                    styles: { halign: 'center' },
                },
                {
                    content: sample.sampling_technique_m,
                    styles: { halign: 'center' },
                },
                { content: sample.ci_res_a, styles: { halign: 'center' } },
                { content: sample.ci_res_b, styles: { halign: 'center' } },
                { content: sample.cond_amb_t, styles: { halign: 'center' } },
                { content: sample.cond_amb_h, styles: { halign: 'center' } },
                {
                    content: this.formatDate(sample.sampling_day),
                    styles: { halign: 'center' },
                },
                {
                    content: this.formatTime(sample.sampling_time),
                    styles: { halign: 'center' },
                },
                { content: '--', styles: { halign: 'center' } },
                { content: '--', styles: { halign: 'center' } },
            ]),
            startY: y,
            theme: 'grid',
            styles: { fontSize: 10 },
            margin: { left: margin, right: margin },
            tableWidth: pageWidth - 2 * margin,
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 30 },
                2: { cellWidth: 30 },
                3: { cellWidth: 10 },
                4: { cellWidth: 20 },
                5: { cellWidth: 20 },
                6: { cellWidth: 20 },
                7: { cellWidth: 20 },
                8: { cellWidth: 20 },
                9: { cellWidth: 15 },
                10: { cellWidth: 15 },
                11: { cellWidth: 15 },
                12: { cellWidth: 15 },
                13: { cellWidth: 10 },
                14: { cellWidth: 10 },
                15: { cellWidth: 25 },
                16: { cellWidth: 25 },
            },
        });
        y = (doc as any).lastAutoTable.finalY + 10;
        // Tabla IV. TRANSPORTE
        autoTable(doc, {
            body: [
                [
                    {
                        content: 'Responsable Muestreo',
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.data.transport.responsable,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Firma',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Resp. Recepcion/Firma',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                ],
            ],
            startY: y,
            theme: 'grid',
            styles: { fontSize: 10 },
            margin: { left: margin, right: margin },
            tableWidth: pageWidth - 2 * margin,
            columnStyles: {
                0: { cellWidth: 50 },
                1: { cellWidth: 50 },
                2: { cellWidth: 50 },
                3: { cellWidth: 50 },
                4: { cellWidth: 50 },
                5: { cellWidth: 60 },
            },
        });
        y = (doc as any).lastAutoTable.finalY + 10;
        // IV. TABLA TRANSPORTE
        autoTable(doc, {
            head: [
                [
                    {
                        content: 'IV. TRANSPORTE',
                        colSpan: 8,
                        styles: { halign: 'center' },
                    },
                ],
            ],
            body: [
                [
                    {
                        content: 'Responsable',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Tramo Recorrido',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: '°T de llegada Conservador',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: '°T Max',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Inicio Transporte',
                        colSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Llegada Laboratorio',
                        colSpan: 2,
                        styles: { halign: 'center' },
                    },
                ],
                [
                    {
                        content: 'Fecha',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Hora',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Fecha',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Hora',
                        styles: { halign: 'center' },
                    },
                ],
                [
                    {
                        content: this.data.transport.responsable,
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.data.transport.distance_traveled,
                        styles: { halign: 'center' },
                    },
                    {
                        content:
                            this.data.transport.conservative_arrival_stretch,
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.data.transport.maximum_stretch,
                    },
                    {
                        content: this.formatDate(
                            this.data.transport.init_date.toString()
                        ),
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.formatTime(
                            this.data.transport.init_time.toString()
                        ),
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.formatDate(
                            this.data.transport.end_date.toString()
                        ),
                        styles: { halign: 'center' },
                    },
                    {
                        content: this.formatTime(
                            this.data.transport.end_time.toString()
                        ),
                        styles: { halign: 'center' },
                    },
                ],
            ],
            startY: y,
            theme: 'grid',
            styles: { fontSize: 10 },
            margin: { left: margin, right: margin },
            tableWidth: pageWidth - 2 * margin,
            columnStyles: {
                0: { cellWidth: 70 },
                1: { cellWidth: 40 },
                2: { cellWidth: 40 },
                3: { cellWidth: 40 },
                4: { cellWidth: 30 },
                5: { cellWidth: 30 },
                6: { cellWidth: 30 },
                7: { cellWidth: 30 },
            },
        });
        y = (doc as any).lastAutoTable.finalY + 10;
        // V. TABLA PROCESO ANALITICO
        autoTable(doc, {
            head: [
                [
                    {
                        content: 'V. PROCESO ANALITICO',
                        colSpan: 7,
                        styles: { halign: 'center' },
                    },
                    {
                        content:
                            'VI. TRABAJO NO CONFORME (DURANTE TODA LA CADENA DE CUSTODIA)',
                        colSpan: 6,
                        styles: { halign: 'center' },
                    },
                ],
            ],
            body: [
                [
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Cumplimiento de procedimientos/registros',
                        colSpan: 6,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Cod. Muestra',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Descripcion de TNC',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Análisis de Causas',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Corecciones',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Aceptación',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Resp.',
                        styles: { halign: 'center' },
                    },
                ],
                [
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Cadena de Frio',
                        colSpan: 6,
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                ],
                [
                    {
                        content: 'BLANCO DE VIAJERO',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Resultados',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Aceptado',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Rechazado',
                        styles: { halign: 'center' },
                    },
                ],
                [
                    {
                        content: 'BLANCO DE CAMPO',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Aceptado',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Rechazado',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'VII. DESECHO',
                        colSpan: 6,
                        styles: { halign: 'center' },
                    },
                ],
                [
                    {
                        content: 'Observaciones',
                        rowSpan: 2,
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        rowSpan: 2,
                        colSpan: 6,
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Fecha',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Responsable',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Tratamiento',
                        styles: { halign: 'center' },
                    },
                    {
                        content: 'Quimico / Termico',
                        styles: { halign: 'center' },
                    },
                ],
                [
                    {
                        content: 'Observaciones',
                        styles: { halign: 'center' },
                    },
                    {
                        content: '',
                        colSpan: 5,
                        styles: { halign: 'center' },
                    },
                ],
            ],
            startY: y,
            theme: 'grid',
            styles: { fontSize: 10 },
            margin: { left: margin, right: margin },
            tableWidth: pageWidth - 2 * margin,
            columnStyles: {
                0: { cellWidth: 40 },
                1: { cellWidth: 20 },
                2: { cellWidth: 10 },
                3: { cellWidth: 10 },
                4: { cellWidth: 20 },
                5: { cellWidth: 10 },
                6: { cellWidth: 30 },
                7: { cellWidth: 28 },
                8: { cellWidth: 30 },
                9: { cellWidth: 28 },
                10: { cellWidth: 28 },
                11: { cellWidth: 28 },
                12: { cellWidth: 28 },
            },
        });
        y = (doc as any).lastAutoTable.finalY + 10;
    }
    generatePdf() {
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: [216, 330],
        });

        const marginTop = 10;
        const marginBottom = 20;
        const pageHeight = doc.internal.pageSize.height;
        const usableHeight = pageHeight - marginTop - marginBottom;

        let cursorY = marginTop;
        const lineHeight = 10;
        const totalPagesExp = '{total_pages_count_string}';

        // Función para añadir footer
        const addFooter = (page: number) => {
            const footerText = `Página ${page} de ${totalPagesExp}`;
            doc.setFontSize(10);
            doc.text(footerText, 216 / 2, pageHeight - 10, { align: 'center' });
        };

        // Contenido del documento
        this.addContent(doc);

        // Footer
        // const totalPages = doc.internal.getNumberOfPages();
        // for (let i = 1; i <= totalPages; i++) {
        //     doc.setPage(i);
        //     addFooter(i);
        // }

        doc.save('reporte.pdf');
    }
    addHeader(doc: jsPDF, page: number, totalPages: number) {
        const pageWidth = doc.internal.pageSize.width;
        const margin = 10;

        doc.addImage(this.logoBase64, 'PNG', margin, 10, 30, 30);
        doc.setFontSize(18);
        doc.text('ELAPAS', pageWidth / 2, 20, { align: 'center' });
        doc.setFontSize(12);
        doc.text('Reporte del Sistema', pageWidth / 2, 30, { align: 'center' });
        doc.setFontSize(10);
        doc.text('Fecha: ' + this.currentDate, pageWidth - margin, 20, {
            align: 'right',
        });
        doc.text(`Usuario: ${this.currentUser}`, pageWidth - margin, 25, {
            align: 'right',
        });
        doc.text(`Página ${page} de ${totalPages}`, pageWidth - margin, 30, {
            align: 'right',
        });
    }

    // addContent(doc: jsPDF) {
    //     const text =
    //         `loren`;
    //     const lineHeight = 10;
    //     const margin = 10;
    //     const maxLinesPerPage = Math.floor(
    //         (doc.internal.pageSize.height - margin * 3) / lineHeight
    //     );
    //     let line = 0;
    //     let page = 1;
    //     const totalPages = Math.ceil(300 / maxLinesPerPage);
    //     for (let i = 0; i < 300; i++) {
    //         if (line === maxLinesPerPage) {
    //             doc.addPage();
    //             page++;
    //             this.addHeader(doc, page, totalPages);
    //             line = 0;
    //         }
    //         if (i === 0) {
    //             this.addHeader(doc, page, totalPages);
    //         }
    //         doc.text(text, margin, margin + line * lineHeight + 40);
    //         line++;
    //     }
    //     for (let i = 1; i <= totalPages; i++) {
    //         doc.setPage(i);
    //         // this.addFooter(doc, i, totalPages);
    //     }
    // }
    getInfo() {
        this.reportService.getReport(this.custody_id).then((res) => {
            this.data = res;
            console.log(this.data);
        });
    }
    goCustodies() {
        this.router.navigate(['/dashboard/custodies/custody']);
    }
    formatDate(date: Date | string): string {
        const parsedDate = new Date(date);
        return parsedDate.toISOString().split('T')[0]; // Formato: YYYY-MM-DD
    }
    formatTime(date: Date | string): string {
        const parsedDate = new Date(date);
        return parsedDate.toTimeString().split(' ')[0]; // Formato: HH:mm:ss
    }
    getUser() {
        this.reportService.getUser().then((data) => {
            // console.log("Footer: ", data);
            this.currentUser = data.name;
        });
    }
    generatePdfBackend() {
        this.reportService.getPdf('División de Control de Calidad - Cadena de Custodia', 'LEGAL', 'landscape', `${this.custody_id}`, this.currentUser).subscribe((response: Blob) => {
            const blob = new Blob([response], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'Reporte_control_de_calidad.pdf';
            link.click();
            window.URL.revokeObjectURL(url)
        });
    }
}
