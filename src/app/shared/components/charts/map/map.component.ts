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
    // Add default opacity constants
    private readonly DEFAULT_OPACITY = 0.8;
    private readonly DIMMED_OPACITY = 0.2;

    private selectedMarkers = signal<MapMarker[]>([]);
    title = input<string>('');
    markers = input<MapMarker[]>([]);
    center = input<[number, number]>([26.8206, 30.8025]); // Default to Egypt
    zoom = input<number>(4);
    height = input<string>('400px');
    @Output() onMarkersSelect = new EventEmitter<MapMarker[]>();

    private map!: L.Map;
    private leafletMarkers: L.CircleMarker[] = [];

    isFullScreen = signal<boolean>(false);

    toggleFullScreen(): void {
        this.isFullScreen.set(!this.isFullScreen());
        setTimeout(() => {
            this.map.invalidateSize();
        }, 100);
    }

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

        // Add map click handler
        this.map.on('click', (e: L.LeafletMouseEvent) => {
            const clickedElement = e.originalEvent.target as HTMLElement;
            // Only reset if we clicked the map itself (not markers or popups)
            if (!clickedElement.closest('.leaflet-marker-icon') && !clickedElement.closest('.leaflet-popup')) {
                this.resetMarkersOpacity();
            }
        });

        this.map.on('boxzoomend', (e: L.LeafletEvent) => {
            const bounds = (e as any).boxZoomBounds;
            const selectedMarkers = this.markers().filter((marker) => bounds.contains([marker.lat, marker.lng]));

            // Prevent zoom
            this.map.setView(this.map.getCenter(), this.map.getZoom());

            // Update marker opacities
            this.updateMarkersOpacity(selectedMarkers);

            this.onMarkersSelect.emit(selectedMarkers);
        });
    }

    private resetMarkersOpacity(): void {
        if (this.selectedMarkers().length == 0) {
            return;
        }
        this.selectedMarkers.set([]);
        this.onMarkersSelect.emit([]);
        this.leafletMarkers.forEach((marker) => {
            marker.setStyle({
                fillOpacity: this.DEFAULT_OPACITY,
                opacity: this.DEFAULT_OPACITY
            });
        });
    }

    private updateMarkersOpacity(selected: MapMarker[]) {
        this.selectedMarkers.set(selected);
        this.leafletMarkers.forEach((leafletMarker, index) => {
            const isSelected = this.selectedMarkers().some((m) => m.lat === this.markers()[index].lat && m.lng === this.markers()[index].lng);
            leafletMarker.setStyle({
                fillOpacity: isSelected ? this.DEFAULT_OPACITY : this.DIMMED_OPACITY,
                opacity: isSelected ? this.DEFAULT_OPACITY : this.DIMMED_OPACITY
            });
        });
    }

    private addMarkers(): void {
        this.leafletMarkers = []; // Clear existing markers
        this.markers().forEach((marker) => {
            const leafletMarker = L.circleMarker([marker.lat, marker.lng], {
                radius: 8,
                fillColor: '#0078D7', // Match marker color in the image
                color: '#ffffff',
                weight: 1,
                opacity: this.DEFAULT_OPACITY,
                fillOpacity: this.DEFAULT_OPACITY
            })
                .bindPopup(marker.popup || marker.title)
                .addTo(this.map);

            leafletMarker.on('click', () => {
                this.onMarkersSelect.emit([marker]);
                this.updateMarkersOpacity([marker]);
            });

            this.leafletMarkers.push(leafletMarker);
        });
    }
}
