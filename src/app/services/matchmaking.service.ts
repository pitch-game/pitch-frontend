import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as signalR from '@aspnet/signalr';
import { LayoutService } from '../layout/layout.service';
import { MatchService } from './match.service';
import { AuthService } from './auth/auth.service';

@Injectable({
    providedIn: "root"
})
export class MatchmakingService {

    connection: signalR.HubConnection;

    get sessionId(): string {
        return localStorage.getItem('sessionId');
    }
    set sessionId(sessionId: string) {
        if (sessionId)
            localStorage.setItem('sessionId', sessionId);
        else
            localStorage.removeItem('sessionId');
    }

    constructor(private layoutService: LayoutService, private matchService: MatchService, private authService: AuthService) {
    }

    async init() {
        if (this.sessionId) { //exiting matchmaking session
            await this.validateAndSubscribe(this.sessionId);
        }
    }

    async validateAndSubscribe(sessionId: string) {
        await this.connect();
        console.log('validate ' + sessionId);
        this.connection.send('validateAndSubscribe', sessionId).catch(err => console.log(err));
    }

    async connect() {
        //todo check if already connected
        if(this.connection) return;

        this.connection = new signalR.HubConnectionBuilder()
            //TODO get websockets working
            .withUrl(`${environment.apiEndpoint}/match/hubs/matchmaking`, { accessTokenFactory: () => this.authService.getToken(), transport: signalR.HttpTransportType.LongPolling })
            .build();

        await this.connection.start().catch(err => console.log(err));

        this.connection.on("receiveSessionId", (sessionId: string) => {
            console.log(sessionId);
            this.sessionId = sessionId;
            this.layoutService.showMatchmaking = true;
        });

        this.connection.on("matchReady", (sessionId: string) => {
            console.log(sessionId);
            this.matchService.kickOff(sessionId);
            this.connection.send('cancel', this.sessionId);
        });

        this.connection.on("cancelled", () => {
            console.log('cancelled');
            this.sessionId = null;
            this.layoutService.showMatchmaking = false;
        });
    }

    async matchmake() {
        await this.connect();
        if (this.sessionId) {
            this.connection.send('cancel', this.sessionId);
            this.sessionId = null;
            this.layoutService.showMatchmaking = false;
        }
        this.connection.send('matchmake').catch(err => console.log(err));
    }

    async cancel() {
        if (this.sessionId) {
            //await this.connect();
            this.connection.send('cancel', this.sessionId);
        }
    }
}