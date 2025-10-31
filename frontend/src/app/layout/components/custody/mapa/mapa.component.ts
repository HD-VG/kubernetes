import { Component, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import * as L from 'leaflet';
import { CustodyService } from '../service/custody.service';
import { DataMaps } from 'src/app/layout/api/maps.interface';
import { Sampling } from 'src/app/layout/api/sampling.interface';

delete (L.Icon.Default.prototype as any)._getIconUrl; // Elimina la ruta por defecto
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

@Component({
    selector: 'app-custody-mapa',
    templateUrl: './mapa.component.html',
    styleUrl: './mapa.component.scss',
    providers: [MessageService]
})
export class MapaComponent implements AfterViewInit {
    private map: any;
    private markers: L.Marker[] = [];
    samplePoints: DataMaps = {};
    samplingMapsDialog: boolean = false;
    submitted: boolean = false;
    sampling_day: string = '';
    sampling_time: string = '';
    sample_code: string = '';
    description: string = '';
    source_of_supply: string = '';
    quantity: number = 0;
    sample_location: string = '';
    sample_point: string = '';
    coordinatesX: string = '';
    coordinatesY: string = '';
    sampling_technique: string = '';
    sampling_technique_m: string = '';
    ci_res_a: number = 0;
    ci_res_b: number = 0;
    cond_amb_t: number = 0;
    cond_amb_h: number = 0;

    private initMap(): void {
        this.map = L.map('map', {
            center: [-19.046730827659864, -65.24963548572603],
            zoom: 16
        });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            minZoom: 3,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        tiles.addTo(this.map);
    }
    private async loadMarkers(): Promise<void> {
        const data = await this.custodyService.getMaps();
        if (!data) {
            console.error("No hay puntos de muestra disponibles");
            return;
        }
        data.forEach((point) => {
            if (point.samplings) {
                point.samplings.forEach(sampling => {
                    const lat = parseFloat(sampling.coordinates?.lat || '0');
                    const lng = parseFloat(sampling.coordinates?.lng || '0');
                    if (!isNaN(lat) && !isNaN(lng)) {
                        const marker = L.marker([lat, lng])
                            .addTo(this.map)
                            .bindPopup(
                                `<b>Codigo de Estudio: </b>${sampling.sample_code}<br>
                                <b>Descripcion: </b>${sampling.description}<br>
                                <b>Fuente de Abastecimiento: </b>${sampling.source_of_supply}<br>
                                <b>Cantidad: </b>${sampling.quantity} ml/L<br>
                                <b>Ubicacion del muestreo: </b>${sampling.sample_location}</br>
                                <button pButton pRipple label="Información" icon="pi pi-eye" class="p-button-info mr-2" id="go-to-info-${sampling.id}" class="popup-button">
                                        Ver Detalles
                                </button>`
                            );
                        this.markers.push(marker);
                        marker.on('popupopen', () => {
                            const button = document.getElementById(`go-to-info-${sampling.id}`);
                            if (button) {
                                button.addEventListener('click', () => {
                                    this.goToDetails(sampling.id);
                                });
                            }
                        });
                    }
                });
            }
        });
    }

    constructor(
        private router: Router,
        private custodyService: CustodyService,
    ) { }

    ngAfterViewInit(): void {
        this.initMap();
        this.loadMarkers();
    }
    @HostListener('window:resize', ['$event'])
    onResize(): void {
        if (this.map) {
            this.map.invalidateSize();
        }
    }
    goToCustody() {
        this.router.navigate(['/dashboard/custodies/custody'])
    }
    goToDetails(id: number): void {
        // console.log('id', id);
        this.submitted = false;

        // Llamar al servicio para obtener los detalles
        this.custodyService.getSamplingById(id).then(sampling => {
            this.sampling_day = sampling[0].sampling_day || '';
            this.sampling_time = sampling[0].sampling_time || '';
            this.sample_code = sampling[0].sample_code || '';
            this.description = sampling[0].description || '';
            this.source_of_supply = sampling[0].source_of_supply || '';
            this.quantity = sampling[0].quantity || 0;
            this.sample_location = sampling[0].sample_location || '';
            this.sample_point = sampling[0].sample_point || '';
            this.coordinatesX = sampling[0].coordinatesX || '';
            this.coordinatesY = sampling[0].coordinatesY || '';
            this.sampling_technique = sampling[0].sampling_technique || '';
            this.sampling_technique_m = sampling[0].sampling_technique_m || '';
            this.ci_res_a = sampling[0].ci_res_a || 0;
            this.ci_res_b = sampling[0].ci_res_b || 0;
            this.cond_amb_t = sampling[0].cond_amb_t || 0;
            this.cond_amb_h = sampling[0].cond_amb_h || 0;
            this.samplingMapsDialog = true;
        }).catch(error => {
            console.error('Error al obtener detalles del muestreo:', error);
        });
    }

    hideDialog() {
        this.samplingMapsDialog = false;
        this.submitted = false;
    }
}
