import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { faFutbol, faEllipsisH, faStar, faCircle, faSpinner, faGift, faMoneyCheck, faLevelUpAlt, faListUl, faTrophy } from '@fortawesome/free-solid-svg-icons';
import * as signalR from "@aspnet/signalr";
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/layout.service';
import { MatchmakingService } from 'src/app/services/matchmaking.service';
import { Observable } from 'rxjs';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: "app-seasons",
  templateUrl: "./seasons.page.html",
  styleUrls: ["./seasons.page.less"]
})
export class SeasonsComponent implements OnInit {
  constructor(private http: HttpClient, private authService: AuthService,
     private router: Router, private layoutService: LayoutService,
     private matchMakingService: MatchmakingService,
     private matchService: MatchService) { }
  response: any;

  findMatchIcon = faFutbol;
  simMatchIcon = faEllipsisH;
  starIcon = faStar;
  circleIcon = faCircle;
  loadingIcon = faSpinner;
  faGift = faGift;
  listIcon = faListUl;
  cupIcon = faTrophy;

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

  unclaimed: boolean;
  inProgress: boolean;

  async ngOnInit() {
    let sessionId = this.matchMakingService.get();
    if (sessionId) {
      await this.matchMakingService.validate().subscribe(async (result) => { //todo make async
        if (result.valid) {
          this.setStatus('Finding a match...');
          await this.establishConnection();
        } else {
          this.matchMakingService.remove();
          this.sessionId = null;
        }
      });
    }

    this.http.get<any>(`${environment.apiEndpoint}/match/unclaimed`).subscribe((result) => {
      this.unclaimed = result.hasUnclaimed;
    });
  }

  async establishConnection() {
    this.connection = new signalR.HubConnectionBuilder()
      //TODO get websockets working
      .withUrl(`${environment.apiEndpoint}/match/hubs/matchmaking`, { accessTokenFactory: () => this.authService.getToken(), transport: signalR.HttpTransportType.LongPolling })
      .build();

    await this.connection.start().catch(err => console.log(err));

    this.connection.on("receiveSessionId", (sessionId: string) => {
      console.log(sessionId);
      this.sessionId = sessionId;
      this.matchMakingService.set(sessionId);
    });

    this.connection.on("matchReady", (sessionId: string) => {
      console.log(sessionId);

      this.showStatus = false;
      this.sessionId = null;
      this.connection.send('cancel', [this.sessionId]);

      this.matchService.kickOff(sessionId);
    });
  }

  async matchmake() {
    //if already matchmaking
    if (this.sessionId || this.matchMakingService.get()) {
      this.matchMakingService.cancel();
      this.sessionId = null;
      this.showStatus = false;
      return;
    }

    if (!this.connection) {
      this.setStatus('Establishing connection...');
      await this.establishConnection();
    }

    this.setStatus('Finding a match...');
    this.layoutService.showMatchmaking = true;
    if (this.sessionId) {
      this.connection.send('cancel', [this.sessionId]);
      this.sessionId = null;
    }
    this.connection.send('matchmake').catch(err => console.log(err));
  }

  claim(){
    this.unclaimed = false;
    this.http.get<boolean>(`${environment.apiEndpoint}/match/claim`).subscribe((result) => {
      this.unclaimed = result;
    });
  }

  setStatus(message: string) {
    this.showStatus = true;
    this.statusMessage = message;
  }
}