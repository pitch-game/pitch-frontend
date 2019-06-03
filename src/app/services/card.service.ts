import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models/card/card';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class CardService {
    constructor(private http: HttpClient) { }

    get(id: string): Observable<Card> {
        return this.http.get<Card>(`${environment.apiEndpoint}/card/${id}`)
    }

    getWithQuery(query: CardQueryModel): Observable<Card[]> {
        var params = new HttpParams().set('skip', query.skip.toString()).set('take', query.take.toString()).set('position', query.position);
        if (query.notIn) {
            params = params.set('notIn', query.notIn.filter(x => x).join(";"))
        }
        return this.http.get<Card[]>(`${environment.apiEndpoint}/card`, { params: params });
    }

    getMany(ids: string[]): Observable<Card[]> {
        return this.http.get<Card[]>(`${environment.apiEndpoint}/card/cards/${ids.filter(x => x).join(';')}`);
    }
}

export class CardQueryModel {
    constructor(public skip: number = 0, public take: number = 10, public position: string = null, public notIn: string[] = null) { }
}