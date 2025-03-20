import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export enum GeocodingVendor {
    NOMINATIM = 'nominatim',
    OPENCAGE = 'opencage'
}

@Injectable()
export class GeocodingService {
    private readonly NOMINATIM_API = 'https://nominatim.openstreetmap.org/search';
    private readonly OPENCAGE_API = 'https://api.opencagedata.com/geocode/v1/json';
    private readonly API_KEY = 'fd1909a490f64dda9eb81b18c42bd86d';

    constructor(private http: HttpClient) {}

    geocodeAddress(address: string, vendor: GeocodingVendor = GeocodingVendor.OPENCAGE): Observable<[number, number] | null> {
        return vendor === GeocodingVendor.NOMINATIM ? this.geocodeWithNominatim(address) : this.geocodeWithOpenCage(address);
    }

    private geocodeWithNominatim(address: string): Observable<[number, number] | null> {
        const params = {
            q: address,
            format: 'json',
            limit: '1'
        };

        return this.http.get<any[]>(this.NOMINATIM_API, { params }).pipe(
            map((response) => {
                if (response && response.length > 0) {
                    return [parseFloat(response[0].lat), parseFloat(response[0].lon)] as [number, number];
                }
                return null;
            })
        );
    }

    private geocodeWithOpenCage(address: string): Observable<[number, number] | null> {
        const params = {
            q: address,
            key: this.API_KEY,
            limit: '1'
        };

        return this.http.get<any>(this.OPENCAGE_API, { params }).pipe(
            map((response) => {
                if (response?.results?.length > 0) {
                    const { lat, lng } = response.results[0].geometry;
                    return [parseFloat(lat), parseFloat(lng)] as [number, number];
                }
                return null;
            })
        );
    }
}
