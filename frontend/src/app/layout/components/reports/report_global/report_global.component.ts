import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../service/reports.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-report-global',
    //   standalone: true,
    //   imports: [],
    templateUrl: './report_global.component.html',
    styleUrl: './report_global.component.scss',
    providers: [MessageService],
})
export class ReportGlobalComponent {

    constructor(
        private router: Router,
        private reportService: ReportService
    ) { }

    printReport(): void {
        const printContents = document.getElementById('printable-area');
        if (printContents) {
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContents.outerHTML;
            window.print();
            document.body.innerHTML = originalContents;
        } else {
            console.error('No se encontró el área imprimible.');
        }
    }
    goCustodies() {
        this.router.navigate(['/dashboard/custodies/custody']);
    }
}
