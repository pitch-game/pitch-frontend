import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LayoutService } from '../layout/layout.service';
import { Observable, timer, empty, BehaviorSubject, Subject, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { MatchResult, Match } from '../models/match/match-result';

@Injectable({
    providedIn: "root"
})
export class MatchService {

    match: Match;
    subsRemaining: number;
    matchId: string;

    timer: Observable<number>;
    pollingSubscription: Subscription;

    constructor(private httpClient: HttpClient, private router: Router, private layoutService: LayoutService) {
        //todo check sessionId is still valid. Remove it if its not
    }

    init() {
        this.inProgress().subscribe((result) => {
            this.matchId = result.inProgressMatchId;
            if (this.matchId) {
                this.startPolling(result.inProgressMatchId);
            }
        });
    }

    goToMatch(sessionId: string) {
        if (sessionId)
            this.router.navigate(['/match', sessionId]);
        else
            this.router.navigate(['/match', this.matchId]);
    }

    kickOff(sessionId: string) {
        this.router.navigate(['/match', sessionId]);
        this.layoutService.showMatchmaking = false;
        this.matchId = sessionId;
        this.startPolling(sessionId);
    }

    startPolling(sessionId: string) {
        if (!this.timer)
            this.timer = timer(0, 10000);

        if (!this.pollingSubscription) {
            this.pollingSubscription = this.timer.pipe(flatMap(() => this.httpClient.get(`${environment.apiEndpoint}/match/${sessionId}`)))
                .subscribe((matchResult: MatchResult) => {
                    this.match = matchResult.match;
                    this.subsRemaining = matchResult.subsRemaining;

                    if (this.match.expired) {
                        this.pollingSubscription.unsubscribe();
                        this.matchId = null;
                    }
                });
        }
    }

    makeSub(off: string, on: string){
        return this.httpClient.post<any>(`${environment.apiEndpoint}/match/substitution`, {off, on, matchId: this.matchId});
    }

    getWithQuery(query: CardQueryModel): Observable<any[]> {
        var params = new HttpParams().set('skip', query.skip.toString()).set('take', query.take.toString());
        return this.httpClient.get<any[]>(`${environment.apiEndpoint}/match`, { params: params });
    }

    inProgress(): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiEndpoint}/match/status`);
    }

    lineup(matchId: string): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiEndpoint}/match/lineup`, {params: { matchId }});        
    }
}

export class CardQueryModel {
    constructor(public skip: number, public take: number) {

    }
}

export class MatchResults {

}