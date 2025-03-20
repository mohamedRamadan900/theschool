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
    center = input<[number, number]>([26.8206, 30.8025]); // Default to Egypt
    zoom = input<number>(4);
    height = input<string>('400px');
    @Output() onMarkerClick = new EventEmitter<MapMarker>();

    private map!: L.Map;

    ngAfterViewInit(): void {
        this.initMap();
        this.addMarkers();
    }

    private initMap(): void {
        this.map = L.map('map').setView(this.center(), this.zoom());
        const tileLayers = {
            default: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors'
            }),
            streets: L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
                maxZoom: 18,
                attribution: '© OpenStreetMap contributors'
            }),
            light: L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
                maxZoom: 20,
                attribution: '© Stadia Maps, © OpenMapTiles, © OpenStreetMap contributors'
            }),
            topo: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
                maxZoom: 17,
                attribution: '© OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
            })
        };

        // Use the streets layer as the default:
        tileLayers.light.addTo(this.map);
    }

    private addMarkers(): void {
        this.markers().forEach((marker) => {
            const leafletMarker = L.circleMarker([marker.lat, marker.lng], {
                radius: 8,
                fillColor: '#0078D7', // Match marker color in the image
                color: '#ffffff',
                weight: 1,
                opacity: .5,
                fillOpacity: 0.8
            })
                .bindPopup(marker.popup || marker.title)
                .addTo(this.map);

            leafletMarker.on('click', () => {
                this.onMarkerClick.emit(marker);
            });
        });
    }
}
