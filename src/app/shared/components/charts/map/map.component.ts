import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { CardComponent } from '../../layout/card/card.component';

// Add this fix for marker icons //Customize Marker
// const iconRetinaUrl = 'assets/marker-icon-2x.png';
// const iconUrl = 'assets/marker-icon.png';
// const shadowUrl = 'assets/marker-shadow.png';
// const iconDefault = L.icon({
//     iconRetinaUrl,
//     iconUrl,
//     shadowUrl,
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     tooltipAnchor: [16, -28],
//     shadowSize: [41, 41]
// });
// L.Marker.prototype.options.icon = iconDefault;

export interface MapMarker {
    lat: number;
    lng: number;
    title: string;
    popup?: string;
}

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    imports: [CardComponent]
})
export class MapComponent implements AfterViewInit {
    @Input() title: string;
    @Input() markers: MapMarker[] = [];
    @Input() center: [number, number] = [51.505, -0.09]; // Default to London
    @Input() zoom: number = 13;
    @Output() onMarkerClick = new EventEmitter<MapMarker>();

    private map!: L.Map;

    ngAfterViewInit(): void {
        this.initMap();
        this.addMarkers();
    }

    private initMap(): void {
        this.map = L.map('map').setView(this.center, this.zoom);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }

    private addMarkers(): void {
        this.markers.forEach((marker) => {
            const leafletMarker = L.marker([marker.lat, marker.lng])
                .bindPopup(marker.popup || marker.title)
                .addTo(this.map);

            leafletMarker.on('click', () => {
                this.onMarkerClick.emit(marker);
            });
        });
    }
}
