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

    async get(): Promise<Squad> {
        return await this.http.get<Squad>(`${environment.apiEndpoint}/squad`).toPromise();
    }

    async put(squad: Squad): Promise<Squad> {
        return await this.http.put<any>(`${environment.apiEndpoint}/squad`, squad).toPromise();
    }
}
