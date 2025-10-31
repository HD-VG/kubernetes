import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadComponent } from './head.component';
import { CustodyService } from '../../custody/service/custody.service'

@NgModule({
    declarations: [HeadComponent],
    exports: [HeadComponent],
    imports: [CommonModule],
    providers: [CustodyService]
})
export class HeadModule { }
