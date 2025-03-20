import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, signal, input } from '@angular/core';
import * as L from 'leaflet';
import { CardComponent } from '../../layout/card/card.component';
import { firstValueFrom } from 'rxjs';
import { GeocodingService } from './services/geocoding.service.improved';

// Add this fix for marker icons //Customize Marker
// const iconRetinaUrl = 'assets/map/marker.png';
// const iconUrl = 'assets/map/marker.png';
// // const shadowUrl = 'assets/marker-shadow.png';
// const iconDefault = L.icon({
//     iconRetinaUrl,
//     iconUrl,
//     // shadowUrl,
//     iconSize: [25, 25],
//     iconAnchor: [25, 25],
//     popupAnchor: [1, -34],
//     tooltipAnchor: [16, -28],
//     shadowSize: [41, 41]
// });
// L.Marker.prototype.options.icon = iconDefault;

export interface MapMarker {
    id?: string | number;
    lat?: number;
    lng?: number;
    address?: string;
    title: string;
    popup?: string;
}

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
    imports: [CardComponent],
    providers: [GeocodingService]
})
export class MapComponent implements AfterViewInit {
    // Add default opacity constants
    private readonly DEFAULT_OPACITY = 0.75;
    private readonly DIMMED_OPACITY = 0.3;

    private selectedMarkers = signal<MapMarker[]>([]);
    title = input<string>('');
    markers = input<MapMarker[]>([]);
    private mapMarkers: MapMarker[];
    private geocodedMarkers: MapMarker[] = [];
    center = input<[number, number]>([26.8206, 30.8025]); // Default to Egypt
    zoom = input<number>(4);
    height = input<string>('400px');
    @Output() onMarkersSelect = new EventEmitter<MapMarker[]>();

    private map!: L.Map;
    private leafletMarkers: L.CircleMarker[] = [];

    isFullScreen = signal<boolean>(false);

    constructor(private geocodingService: GeocodingService) {}

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
            const selectedMarkers = this.geocodedMarkers.filter((marker) => {
                return bounds.contains([marker.lat, marker.lng]);
            });

            // Prevent zoom
            this.map.setView(this.map.getCenter(), this.map.getZoom());

            // Update marker opacities
            this.updateMarkersOpacity(selectedMarkers);

            this.onMarkersSelect.emit(selectedMarkers);
        });
    }

    private getMarkerId(marker: MapMarker, index: number): string {
        if (marker.id) return String(marker.id);
        // Generate a unique ID using coordinates and index as fallback
        return `marker_${marker.lat}_${marker.lng}_${index}`;
    }

    private selectMarkers(markers: MapMarker[]): void {
        this.selectedMarkers.set(markers);
        this.onMarkersSelect.emit(markers);
        this.leafletMarkers.forEach((leafletMarker, index) => {
            const currentMarker = this.markers()[index];
            const currentMarkerId = this.getMarkerId(currentMarker, index);
            const isSelected = markers.length === 0 || markers.some((marker) => this.getMarkerId(marker, this.markers().indexOf(marker)) === currentMarkerId);
            leafletMarker.setStyle({
                fillOpacity: isSelected ? this.DEFAULT_OPACITY : this.DIMMED_OPACITY,
                opacity: isSelected ? this.DEFAULT_OPACITY : this.DIMMED_OPACITY
            });
        });
    }

    private resetMarkersOpacity(): void {
        if (this.selectedMarkers().length === 0) return;
        this.selectMarkers([]);
    }

    private updateMarkersOpacity(selected: MapMarker[]): void {
        this.selectMarkers(selected);
    }

    private async addMarkers(): Promise<void> {
        this.leafletMarkers = []; // Clear existing markers
        this.geocodedMarkers = []; // Clear existing geocoded markers

        // First, prepare all geocoding promises
        const markersPromises = this.markers().map(async (marker, index) => {
            try {
                let lat = marker.lat;
                let lng = marker.lng;

                if (marker.address && (!lat || !lng)) {
                    const coordinates = await firstValueFrom(this.geocodingService.geocodeAddress(marker.address));
                    if (coordinates) {
                        [lat, lng] = coordinates;
                    } else {
                        throw new Error(`Could not geocode address: ${marker.address}`);
                    }
                }

                if (!lat || !lng) {
                    throw new Error('Marker missing coordinates');
                }

                const geocodedMarker = { ...marker, lat, lng, index };
                this.geocodedMarkers.push(geocodedMarker);
                return geocodedMarker;
            } catch (error) {
                console.warn(`Failed to process marker ${index}:`, error);
                return null;
            }
        });

        // Wait for all geocoding requests to complete, handling both success and failure
        const results = await Promise.allSettled(markersPromises);

        // Add markers to the map
        results.forEach((result, index) => {
            if (result.status === 'rejected') {
                console.warn(`Marker ${index} failed:`, result.reason);
                return;
            }

            const markerData = result.value;
            if (!markerData) return;

            const { lat, lng, index: markerIndex } = markerData;
            const marker = this.markers()[markerIndex];
            const markerId = this.getMarkerId(marker, markerIndex);
            const leafletMarker = L.circleMarker([lat, lng], {
                radius: 8,
                fillColor: '#0078D7',
                color: '#ffffff',
                weight: 1,
                opacity: this.DEFAULT_OPACITY,
                fillOpacity: this.DEFAULT_OPACITY
            })
                .bindPopup(marker.popup || marker.title)
                .bindTooltip(marker.popup, {
                    permanent: false,
                    direction: 'top',
                    offset: L.point(0, -10)
                })
                .addTo(this.map);

            leafletMarker.on('click', () => {
                const isAlreadySelected = this.selectedMarkers().length === 1 && this.getMarkerId(this.selectedMarkers()[0], this.markers().indexOf(this.selectedMarkers()[0])) === markerId;

                if (!isAlreadySelected) {
                    this.selectMarkers([marker]);
                }
            });

            this.leafletMarkers.push(leafletMarker);
        });
    }
}
