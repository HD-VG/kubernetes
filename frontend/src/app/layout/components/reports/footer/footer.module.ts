import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { ReportService } from '../service/reports.service'

@NgModule({
    declarations: [FooterComponent],
    exports: [FooterComponent],
    imports: [CommonModule],
    providers: [ReportService]
})
export class FooterModule { }
