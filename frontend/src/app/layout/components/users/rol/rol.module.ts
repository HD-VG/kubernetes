import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolRoutingModule } from './rol-routing.module';
import { FormsModule } from '@angular/forms';
import { RolComponent } from './rol.component';
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
import { UserRolService } from '../service/user.service'
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from 'src/app/layout/auth/service/auth.service';
import { CommonService } from 'src/app/layout/common/service/common.service';

@NgModule({
    declarations: [
        RolComponent
    ],
	imports: [
		CommonModule,
		RolRoutingModule,
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
        CheckboxModule
	],
    providers: [UserRolService, AuthService, CommonService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RolModule { }
