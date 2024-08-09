// subdivision.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  , map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubdivisionService {
  private apiUrl = 'http://localhost:3000/v1/subdivisions'; 

  constructor(private http: HttpClient) {}

  getSubdivisions(): Observable<any[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        if (response && Array.isArray(response.subdivisions)) {
          return response.subdivisions;
        }
        return [];
      })
    );
  }
}