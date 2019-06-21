import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    constructor(private httpClient: HttpClient, private router: Router, private layoutService: LayoutService) {
        //todo check sessionId is still valid. Remove it if its not
    }

    goToMatch(){
        if(this.sessionId)
            this.router.navigate(['/match', this.sessionId]);
    }

    kickOff(sessionId: string) {
        this.router.navigate(['/match', sessionId]);
        this.layoutService.showMatchmaking = false;
        this.sessionId = sessionId;
        this.startPolling(sessionId);
    }

    startPolling(sessionId: string){
        timer(0, 10000)
        .pipe(flatMap(() => this.httpClient.get(`${environment.apiEndpoint}/match/${sessionId}`)))
        .subscribe((result) => {
          this.match = result;
          //todo if match.IsOver then quit
        });
    }
}

export class MatchResults {

}