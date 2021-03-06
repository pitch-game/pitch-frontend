import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from './layout.service';
import { Observable, timer, Subscription } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { MatchResult, Match } from '../models/match/match-result';
import { MatchHttpService } from './http/match.http-service';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
    providedIn: "root"
})
export class MatchService {

    match: Match;
    subsRemaining: number;
    matchId: string;
    unclaimed: boolean;

    timer: Observable<number>;
    pollingSubscription: Subscription;

    constructor(private router: Router, private layoutService: LayoutService, private matchHttpService: MatchHttpService, private authService: AuthService) {
        //todo check sessionId is still valid. Remove it if its not
    }

    async init() {
        let result = await this.matchHttpService.inProgress();
        this.matchId = result.inProgressMatchId;
        this.unclaimed = result.hasUnclaimedRewards;
        if (this.matchId) {
            this.startPolling(result.inProgressMatchId);
        }
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
            this.pollingSubscription = this.timer.pipe(flatMap(() =>
                this.matchHttpService.get(sessionId)))
                .subscribe((matchResult: MatchResult) => {
                    this.match = matchResult.match;
                    this.subsRemaining = matchResult.subsRemaining;

                    if (this.match.expired) {
                        //todo match ended event
                        this.pollingSubscription.unsubscribe();
                        this.matchId = null;
                    }
                });
        }
    }
}