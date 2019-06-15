import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { faFutbol, faEllipsisH, faStar, faCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as signalR from "@aspnet/signalr";
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/layout.service';

@Component({
  selector: "app-seasons",
  templateUrl: "./seasons.page.html",
  styleUrls: ["./seasons.page.less"]
})
export class SeasonsComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService, private router: Router, private layoutService: LayoutService) { }
  response: any;

  findMatchIcon = faFutbol;
  simMatchIcon = faEllipsisH;
  starIcon = faStar;
  circleIcon = faCircle;
  loadingIcon = faSpinner;

  connection: signalR.HubConnection;

  private _sessionId: string;
  get sessionId(): string {
    return this._sessionId;
  }
  set sessionId(sessionId: string) {
    if (sessionId)
      localStorage.setItem('sessionId', sessionId);
    else
      localStorage.removeItem('sessionId');
    this._sessionId = sessionId;
  }

  showStatus: boolean;
  statusMessage: string;

  async ngOnInit() {
    let sessionId = localStorage.getItem('sessionId');
    if (sessionId) {
      this.setStatus('Finding a match...');
      await this.establishConnection();
    }
  }

  async establishConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      //TODO get websockets working
      .withUrl(`${environment.apiEndpoint}/match/hubs/matchmaking`, { accessTokenFactory: () => this.authService.getToken(), transport: signalR.HttpTransportType.LongPolling })
      .build();

    await this.connection.start().catch(err => console.log(err));

    this.connection.on("receiveSessionId", (sessionId: string) => {
      this.sessionId = sessionId;
    });

    this.connection.on("matchReady", (sessionId: string) => {
      this.layoutService.showMatchmaking = false;
      this.showStatus = false;
      this.sessionId = null;
      this.router.navigate(['/match', sessionId]);
    });
  }

  async matchmake() {
    this.setStatus('Establishing connection...');
    await this.establishConnection();

    this.setStatus('Finding a match...');
    this.layoutService.showMatchmaking = true;
    if (this.sessionId) {
      this.connection.send('cancel', [this.sessionId]);
      this.sessionId = null;
    }
    this.connection.send('matchmake').catch(err => console.log(err));
  }

  setStatus(message: string) {
    this.showStatus = true;
    this.statusMessage = message;
  }
}
