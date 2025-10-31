import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { PermissionsModalComponent } from './check-component.component'


@NgModule({
  declarations: [
    PermissionsModalComponent
  ],
  imports: [
    CommonModule,
    CheckboxModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CheckComponentModule { }
