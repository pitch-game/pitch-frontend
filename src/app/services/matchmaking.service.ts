import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class MatchmakingService {

    constructor(private httpClient: HttpClient) {

    }

    get() {
        return localStorage.getItem('sessionId');
    }

    set(sessionId: string) {
        localStorage.setItem('sessionId', sessionId)
    }

    remove(){
        localStorage.removeItem('sessionId');
    }

    cancel() {
        return this.httpClient.get(`${environment.apiEndpoint}/match/matchmaking/cancel/${this.get()}`).subscribe(() => {
            localStorage.removeItem('sessionId');
        });
    }

    validate(){
        return this.httpClient.get<any>(`${environment.apiEndpoint}/match/matchmaking/validate/${this.get()}`);
    }
}