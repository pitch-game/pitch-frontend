import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CardQueryModel } from 'src/app/models/card/card-query-model';
import { MatchListItem } from 'src/app/models/match/match-list-item';

@Injectable({
    providedIn: "root"
})
export class MatchHttpService {

    constructor(private httpClient: HttpClient) { }

    makeSub(off: string, on: string, matchId: string) {
        return this.httpClient.post<any>(`${environment.apiEndpoint}/match/substitution`, { off, on, matchId }).toPromise();
    }

    getWithQuery(query: CardQueryModel): Promise<MatchListItem[]> {
        var params = new HttpParams().set('skip', query.skip.toString()).set('take', query.take.toString());
        return this.httpClient.get<any[]>(`${environment.apiEndpoint}/match`, { params: params }).toPromise();
    }

    inProgress(): Promise<any> {
        return this.httpClient.get<any>(`${environment.apiEndpoint}/match/status`).toPromise();
    }

    lineup(matchId: string): Promise<any> {
        return this.httpClient.get<any>(`${environment.apiEndpoint}/match/lineup`, { params: { matchId } }).toPromise();
    }

    get(matchId: string) {
        return this.httpClient.get(`${environment.apiEndpoint}/match/${matchId}`);
    }

    claim(): Promise<any> {
        return this.httpClient.get<boolean>(`${environment.apiEndpoint}/match/claim`).toPromise(); //TODO this isn't doing what it was meant to
    }
}