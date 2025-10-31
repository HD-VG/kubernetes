import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationTypeDagmeRoutingModule } from './a-confTypeDagme-routing.module';
import { ConfigurationTypeDagmeComponent } from './controller/a-confTypeDagme.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfigurationTypeDagmeService } from './service/a-confTypeDagme.service';
import { AuthService } from 'src/app/layout/auth/service/auth.service';
import { CommonService } from 'src/app/layout/common/service/common.service';

@NgModule({
    declarations: [
        ConfigurationTypeDagmeComponent
    ],
    imports: [
        CommonModule,
        ConfigurationTypeDagmeRoutingModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        InputTextModule,
        DropdownModule,
        DialogModule,
        CheckboxModule,
    ],
    providers: [ConfigurationTypeDagmeService, AuthService, CommonService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConfigurationTypeDagmeModule { }