import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Squad } from '../models/squad/squad';

@Injectable({
    providedIn: "root"
})
export class SquadService {
    constructor(private http: HttpClient) { }

    get(): Observable<Squad> {
        return this.http.get<Squad>(`${environment.apiEndpoint}/squad`);
    }

    put(squad: Squad): Observable<Squad> {
        return this.http.put<any>(`${environment.apiEndpoint}/squad`, squad);
    }
}
