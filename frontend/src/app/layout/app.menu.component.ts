import { Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit, OnChanges {
    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.layoutService.menuItems$.subscribe((items) => {
            // console.log('Menu Items:', items); // Verifica la estructura de items
            this.model = items;
        });
    }
    ngOnChanges(changes: SimpleChanges) {
        if (changes['role']) {
            this.layoutService.menuItems$.subscribe((items) => {
                // console.log('Menu Items on Role Change:', items); // Verifica en caso de cambios de rol
                this.model = items;
            });
        }
    }
}
