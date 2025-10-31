import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CustodyService } from './../service/custody.service';
import { CommonService } from 'src/app/layout/common/service/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-p-i-ap',
    templateUrl: './p-i-ap.component.html',
    styleUrl: './p-i-ap.component.scss',
    providers: [MessageService]
})
export class PIApComponent implements OnInit {
    custody_id: number = 0;
    chainOfCustodyDialog: boolean = false;
    deleteChainOfCustodyDialog: boolean = false;
    deleteChainOfCustodyssDialog: boolean = false;
    chainOfCustodys: DataClass[] = [];
    chainOfCustody: DataClass = {};
    selectedChainOfCustodys: DataClass[] = [];
    submitted: boolean = false;
    cols: any[] = [];
    statuses: any[] = [];
    rowsPerPageOptions = [5, 10, 20];
    canCreate: boolean = false;
    canEdit: boolean = false;
    canDelete: boolean = false;
    constructor(
        private custodyService: CustodyService,
        private messageService: MessageService,
        private commonService: CommonService,
        private route: ActivatedRoute,
        private router: Router,
    ) { }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.custody_id = +id
    }
}
