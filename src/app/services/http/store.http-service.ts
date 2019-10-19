import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Card } from 'src/app/models/card/card';
import { Observable } from 'rxjs';

@Injectable()
export class StoreHttpService {
    constructor(private http: HttpClient) { }

    openPack(id: string): Promise<Card> {
        return this.http.get<Card>(`${environment.apiEndpoint}/store/packs/open/` + id).toPromise();
    }

    getPacks(): Observable<any> {
        return this.http.get<any[]>(`${environment.apiEndpoint}/store/packs`);
    }
}