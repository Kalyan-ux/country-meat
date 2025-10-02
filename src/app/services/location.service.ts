import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

// Define an interface for the address structure
export interface LocationAddress {
  city: string;
  fullAddress: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  // Main function to get the user's address
  getUserAddress(): Observable<LocationAddress | null> {
    return this.getCurrentPosition().pipe(
      switchMap((position) => {
        if (position) {
          // If we have coordinates, get the address
          return this.reverseGeocode(
            position.coords.latitude,
            position.coords.longitude
          );
        } else {
          // Handle case where location is not available
          return of(null);
        }
      }),
      catchError((error) => {
        console.error('Error getting user address:', error);
        return of(null); // Return null on error
      })
    );
  }

  // 1. Get GPS coordinates using the browser's Geolocation API
  private getCurrentPosition(): Observable<GeolocationPosition | null> {
    return new Observable((observer) => {
      // Check if Geolocation is supported
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => {
            observer.error(error);
          }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }

  // 2. Convert coordinates to a human-readable address using Nominatim API
  private reverseGeocode(
    lat: number,
    lon: number
  ): Observable<LocationAddress> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;

    return this.http.get<any>(url).pipe(
      map((response) => {
        // Extract city and full address from the API response
        const address = response.address;
        const city =
          address.city || address.town || address.village || 'Unknown area';
        const fullAddress = response.display_name || 'Address not found';

        return { city, fullAddress };
      })
    );
  }
}
