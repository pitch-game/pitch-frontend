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

    async makeSub(off: string, on: string, matchId: string) {
        return await this.httpClient.post<any>(`${environment.apiEndpoint}/match/substitution`, { off, on, matchId }).toPromise();
    }

    async getWithQuery(query: CardQueryModel): Promise<MatchListItem[]> {
        var params = new HttpParams().set('skip', query.skip.toString()).set('take', query.take.toString());
        return await this.httpClient.get<any[]>(`${environment.apiEndpoint}/match`, { params: params }).toPromise();
    }

    async inProgress(): Promise<any> {
        return await this.httpClient.get<any>(`${environment.apiEndpoint}/match/status`).toPromise();
    }

    async lineup(matchId: string): Promise<any> {
        return await this.httpClient.get<any>(`${environment.apiEndpoint}/match/lineup`, { params: { matchId } }).toPromise();
    }

    get(matchId: string) {
        return this.httpClient.get(`${environment.apiEndpoint}/match/${matchId}`);
    }
}