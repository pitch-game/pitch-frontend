

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Card } from 'src/app/models/card/card';

@Injectable()
export class StoreHttpService {
    constructor(private http: HttpClient) { }

    //todo split to http service
    openPack(id: string) {
        return this.http.get<Card>(`${environment.apiEndpoint}/store/packs/open/` + id);
    }

    getPacks(){
        return this.http.get<any[]>(`${environment.apiEndpoint}/store/packs`);
    }
}