import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';

export enum GeocodingVendor {
    NOMINATIM = 'nominatim',
    OPENCAGE = 'opencage',
    MAPS_CO = 'maps_co'
}

@Injectable()
export class GeocodingService {
    private readonly NOMINATIM_API = 'https://nominatim.openstreetmap.org/search';
    private readonly OPENCAGE_API = 'https://api.opencagedata.com/geocode/v1/json';
    private readonly MAPS_CO_API = 'https://geocode.maps.co/search';
    private readonly OPENCAGE_API_KEY = 'fd1909a490f64dda9eb81b18c42bd86d';
    private readonly MAPS_CO_API_KEY = '67dc99d603712572173179fukfb6d16';

    private readonly GOVERNORATES = {
        Cairo: [30.0444, 31.2357],
        Alexandria: [31.2001, 29.9187],
        Luxor: [25.6872, 32.6396],
        Aswan: [24.0889, 32.8998],
        Asyut: [27.1783, 31.1859],
        Damietta: [31.4175, 31.8144],
        Fayoum: [29.3085, 30.8428],
        Mansoura: [31.0409, 31.3785],
        Sohag: [26.5567, 31.6948],
        Zagazig: [30.5873, 31.5024]
    };

    constructor(private http: HttpClient) {}

    geocodeAddress(address: string): Observable<[number, number] | null> {
        // Try to match governorate first
        const governorate = this.findGovernorate(address);
        if (governorate) {
            return of(this.GOVERNORATES[governorate]);
        }

        // Try both services simultaneously
        return forkJoin([this.geocodeWithOpenCage(address).pipe(catchError(() => of(null))), this.geocodeWithNominatim(address).pipe(catchError(() => of(null)))]).pipe(
            map(([opencageResult, nominatimResult]) => {
                const results = [opencageResult, nominatimResult].filter((r) => r !== null);
                if (results.length === 0) return null;

                // Score and select best result
                return this.selectBestResult(results as [number, number][], address);
            })
        );
    }

    private findGovernorate(address: string): string | null {
        for (const governorate of Object.keys(this.GOVERNORATES)) {
            if (address.includes(governorate)) {
                return governorate;
            }
        }
        return null;
    }

    private selectBestResult(results: [number, number][], address: string): [number, number] | null {
        // Score each result based on proximity to known governorate locations
        const scores = results.map((result) => {
            let score = 0;
            for (const [governorate, coords] of Object.entries(this.GOVERNORATES)) {
                if (address.includes(governorate)) {
                    const distance = this.calculateDistance(result as [number, number], coords as [number, number]);
                    score += distance < 50 ? 50 - distance : 0; // Higher score for closer matches
                }
            }
            return { result, score };
        });

        // Return the result with highest score, or first result if no scores
        const bestResult = scores.sort((a, b) => b.score - a.score)[0];
        return bestResult ? bestResult.result : results[0];
    }

    private calculateDistance(coord1: [number, number], coord2: [number, number]): number {
        const [lat1, lon1] = coord1;
        const [lat2, lon2] = coord2;
        const R = 6371; // Earth's radius in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
    }

    private formatAddress(address: string): string {
        // Remove unnecessary words and standardize formatting
        return address
            .replace(/Street|Road|Avenue|Boulevard/gi, 'St')
            .replace(/District|City|Town/gi, '')
            .replace(/(\d+)\s*(?:st|nd|rd|th)/gi, '$1')
            .replace(/\s+/g, ' ')
            .trim();
    }

    private geocodeWithNominatim(address: string): Observable<[number, number] | null> {
        const params = {
            q: address,
            format: 'json',
            limit: '1',
            addressdetails: '1',
            countrycodes: 'eg' // Limit to Egypt
        };

        return this.http.get<any[]>(this.NOMINATIM_API, { params }).pipe(
            delay(1000), // Add delay to respect rate limits
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
            key: this.OPENCAGE_API_KEY,
            limit: '1',
            countrycode: 'eg', // Limit to Egypt
            bounds: '22,25,32,36', // Bounding box for Egypt
            no_annotations: '1'
        };

        return this.http.get<any>(this.OPENCAGE_API, { params }).pipe(
            delay(1000), // Add delay to respect rate limits
            map((response) => {
                if (response?.results?.length > 0) {
                    const { lat, lng } = response.results[0].geometry;
                    const confidence = response.results[0].confidence;
                    if (confidence < 5) {
                        console.warn('Low confidence geocoding result:', confidence);
                        return null;
                    }
                    return [parseFloat(lat), parseFloat(lng)] as [number, number];
                }
                return null;
            })
        );
    }

    private geocodeWithMapsCo(address: string): Observable<[number, number] | null> {
        const params = {
            q: address,
            api_key: this.MAPS_CO_API_KEY
        };

        return this.http.get<any[]>(this.MAPS_CO_API, { params }).pipe(
            map((response) => {
                if (response && response.length > 0) {
                    return [parseFloat(response[0].lat), parseFloat(response[0].lon)] as [number, number];
                }
                return null;
            })
        );
    }
}
