import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LayoutService } from '../layout/layout.service';
import { Observable, timer, empty, BehaviorSubject, Subject } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class MatchService {

    match: any;
    sessionId: string;
    polling: boolean;

    constructor(private httpClient: HttpClient, private router: Router, private layoutService: LayoutService) {
        //todo check sessionId is still valid. Remove it if its not
    }

    init() {
        this.inProgress().subscribe((result) => {
            this.sessionId = result.inProgressMatchId;
            this.startPolling(result.inProgressMatchId);
        });
    }

    goToMatch(sessionId: string) {
        if (sessionId)
            this.router.navigate(['/match', sessionId]);
        else
            this.router.navigate(['/match', this.sessionId]);
    }

    kickOff(sessionId: string) {
        this.router.navigate(['/match', sessionId]);
        this.layoutService.showMatchmaking = false;
        this.sessionId = sessionId;
        this.startPolling(sessionId);
    }

    startPolling(sessionId: string) {
        //TODO ensure only one is running
        if (this.polling) return;
        this.polling = true;
        timer(0, 10000)
            .pipe(flatMap(() => this.httpClient.get(`${environment.apiEndpoint}/match/${sessionId}`)))
            .subscribe((result) => {
                this.match = result;
                //todo if match.IsOver then quit
            });
    }

    getWithQuery(query: CardQueryModel): Observable<any[]> {
        var params = new HttpParams().set('skip', query.skip.toString()).set('take', query.take.toString());
        return this.httpClient.get<any[]>(`${environment.apiEndpoint}/match`, { params: params });
    }

    inProgress(): Observable<any> {
        return this.httpClient.get<any>(`${environment.apiEndpoint}/match/status`);
    }
}

export class CardQueryModel {
    constructor(public skip: number, public take: number) {

    }
}

export class MatchResults {

}