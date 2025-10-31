import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PSamplingLaboratoryRoutingModule } from './p_sampling_laboratory-routing.module';
import { PSamplingLaboratoryComponent } from './p-sampling-laboratory.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustodyService } from '../service/custody.service'
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { AuthService } from 'src/app/layout/auth/service/auth.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
    declarations: [
        PSamplingLaboratoryComponent
    ],
    imports: [
        CommonModule,
        PSamplingLaboratoryRoutingModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
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
        MultiSelectModule,
    ],
    providers: [CustodyService, AuthService, CommonService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SamplingLaboratoryModule { }
