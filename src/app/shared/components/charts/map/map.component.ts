import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, signal, input } from '@angular/core';
import * as L from 'leaflet';
import { CardComponent } from '../../layout/card/card.component';

// Add this fix for marker icons //Customize Marker
const iconRetinaUrl = 'assets/map/marker.png';
const iconUrl = 'assets/map/marker.png';
// const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
    iconRetinaUrl,
    iconUrl,
    // shadowUrl,
    iconSize: [25, 25],
    iconAnchor: [25, 25],
    popupAnchor: [1, -34],
    tooltipAnchor: [16, -28],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

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
    title = input<string>('');
    markers = input<MapMarker[]>([]);
    center = input<[number, number]>([51.505, -0.09]); // Default to London
    zoom = input<number>(13);
    height = input<string>('400px');
    @Output() onMarkerClick = new EventEmitter<MapMarker>();

    private map!: L.Map;

    ngAfterViewInit(): void {
        this.initMap();
        this.addMarkers();
    }

    private initMap(): void {
        this.map = L.map('map').setView(this.center(), this.zoom());
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            // attribution: '© OpenStreetMap contributors'
        }).addTo(this.map);
    }

    private addMarkers(): void {
        this.markers().forEach((marker) => {
            const leafletMarker = L.marker([marker.lat, marker.lng])
                .bindPopup(marker.popup || marker.title)
                .addTo(this.map);

            leafletMarker.on('click', () => {
                this.onMarkerClick.emit(marker);
            });
        });
    }
}
