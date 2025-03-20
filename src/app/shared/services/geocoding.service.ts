import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class GeocodingService {
    private readonly NOMINATIM_API = 'https://nominatim.openstreetmap.org/search';

    constructor(private http: HttpClient) {}

    geocodeAddress(address: string): Observable<[number, number] | null> {
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
}
