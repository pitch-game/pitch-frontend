import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Squad } from '../../models/squad/squad';

@Injectable({
    providedIn: "root"
})
export class SquadHttpService {
    constructor(private http: HttpClient) { }

    get(): Promise<Squad> {
        return this.http.get<Squad>(`${environment.apiEndpoint}/squad`).toPromise();
    }

    put(squad: Squad): Promise<Squad> {
        return this.http.put<any>(`${environment.apiEndpoint}/squad`, squad).toPromise();
    }
}
