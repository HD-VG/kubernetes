import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportNormalRoutingModule } from './report_normal-routing.module';
import { HeadModule } from '../head/head.module';
import { FooterModule } from '../footer/footer.module';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { ReportService } from 'src/app/layout/components/reports/service/reports.service'
import { AuthService } from 'src/app/layout/auth/service/auth.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { ReportNormalComponent } from './report_normal.component';


@NgModule({
    declarations: [
        ReportNormalComponent
    ],
    imports: [
        CommonModule,
        ReportNormalRoutingModule,
        HeadModule,
        FooterModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        CheckboxModule,
        CalendarModule,
    ],
    providers: [ReportService, AuthService, CommonService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportNormalModule { }
