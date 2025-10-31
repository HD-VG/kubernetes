import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustodyService } from '../../custody/service/custody.service';

@Component({
    selector: 'app-report-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    providers: [MessageService]
})
export class FooterComponent implements OnInit {
    currentUser: string = ""
    currentPage: number = 1; // Página actual
    totalPages: number = 5; // Total de páginas (puede ser dinámico)
    formattedDate: string = '';

    constructor(
        private custodyService: CustodyService,
    ) { }

    ngOnInit() {
        this.getUser();
    }
    getUser() {
        this.custodyService.getUser().then(data => {
            // console.log("Footer: ", data);
            this.currentUser = data.name
        })
    }
}
