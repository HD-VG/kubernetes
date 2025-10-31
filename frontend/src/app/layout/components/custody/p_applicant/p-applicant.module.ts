import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PApplicanttRoutingModule } from './p_applicant-routing.module';
import { PApplicantComponent } from './p-applicant.component';
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
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CustodyService } from '../service/custody.service'
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { AuthService } from 'src/app/layout/auth/service/auth.service';
import { CommonService } from 'src/app/layout/common/service/common.service';


@NgModule({
  declarations: [
    PApplicantComponent
  ],
  imports: [
          CommonModule,
          PApplicanttRoutingModule,
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
      ],
      providers: [CustodyService, AuthService, CommonService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PApplicantModule { }
