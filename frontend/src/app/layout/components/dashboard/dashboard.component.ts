import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
// import { Product } from '../../api/product';
// import { ProductService } from '../../service/product.service';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    providers: [MessageService]
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];
    logoPath = 'assets/layout/images/logo login.png';
    logoBase64: string = "";
    subscription!: Subscription;
    constructor() {
    }

    ngOnInit() {
        this.convertImageToBase64('assets/layout/images/logo login.png');
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

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
