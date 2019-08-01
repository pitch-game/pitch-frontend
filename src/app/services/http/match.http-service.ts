import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CardQueryModel } from 'src/app/models/card/card-query-model';
import { MatchListItem } from 'src/app/models/match/match-list-item';
import { MatchResult } from 'src/app/models/match/match-result';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class MatchHttpService {

    constructor(private httpClient: HttpClient) { }

    getWithQuery(query: CardQueryModel): Promise<MatchListItem[]> {
        var params = new HttpParams().set('skip', query.skip.toString()).set('take', query.take.toString());
        return this.httpClient.get<any[]>(`${environment.apiEndpoint}/match`, { params: params }).toPromise();
    }

    get(matchId: string): Observable<MatchResult> {
        return this.httpClient.get<MatchResult>(`${environment.apiEndpoint}/match/${matchId}`);
    }

    makeSub(off: string, on: string, matchId: string) {
        return this.httpClient.post<any>(`${environment.apiEndpoint}/match/${matchId}/substitution`, { off, on }).toPromise();
    }

    lineup(matchId: string): Promise<any> {
        return this.httpClient.get<any>(`${environment.apiEndpoint}/match/${matchId}/lineup`).toPromise();
    }

    inProgress(): Promise<any> {
        return this.httpClient.get<any>(`${environment.apiEndpoint}/match/status`).toPromise();
    }

    claim(): Promise<any> {
        return this.httpClient.post<any>(`${environment.apiEndpoint}/match/claim`, null).toPromise();
    }
}