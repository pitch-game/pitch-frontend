import { Injectable } from '@angular/core';
import { Card } from '../../models/card/card';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CardQueryModel } from 'src/app/models/card/card-query-model';

@Injectable({
    providedIn: "root"
})
export class CardHttpService {
    constructor(private http: HttpClient) { }

    get(id: string): Promise<Card> {
        return this.http.get<Card>(`${environment.apiEndpoint}/card/${id}`).toPromise();
    }

    getWithQuery(query: CardQueryModel): Observable<Card[]> {
        var params = new HttpParams().set('skip', query.skip.toString()).set('take', query.take.toString()).set('position', query.position);
        if (query.notIn) {
            params = params.set('notIn', query.notIn.filter(x => x).join(";"))
        }
        return this.http.get<Card[]>(`${environment.apiEndpoint}/card`, { params: params });
    }

    getMany(ids: string[]): Promise<Card[]> {
        return this.http.get<Card[]>(`${environment.apiEndpoint}/card/cards/${ids.filter(x => x).join(';')}`).toPromise();
    }
}