import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustodyService } from '../../custody/service/custody.service';
import { format_date } from '../../../common/functions/index'

@Component({
    selector: 'app-report-head',
    templateUrl: './head.component.html',
    styleUrl: './head.component.scss',
    providers: [MessageService]
})
export class HeadComponent implements OnInit {
    date: Date = new Date();
    currentDate: string = ""
    currentUser: string = ""
    logoPath = 'assets/layout/images/logo elapas.png';
    logoBase64: string = "";
    constructor(
        private custodyService: CustodyService,
    ) { }
    ngOnInit() {
        this.getUser();
        this.currentDate = format_date(this.date)
        this.convertImageToBase64('assets/layout/images/logo elapas.png');
    }
    getUser() {
        this.custodyService.getUser().then(data => {
            // console.log("Head: ",data)
            this.currentUser = data.name
        })
    }
    convertImageToBase64(imagePath: string) {
        const img = new Image(); img.src = imagePath; img.crossOrigin = 'Anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = img.width; canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                this.logoBase64 = canvas.toDataURL('image/png');
            }
        };
    }
}
