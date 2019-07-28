import { AuthService } from "src/app/services/auth/auth.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { faFutbol, faEllipsisH, faStar, faCircle, faSpinner, faGift, faMoneyCheck, faLevelUpAlt, faListUl, faTrophy } from '@fortawesome/free-solid-svg-icons';
import * as signalR from "@aspnet/signalr";
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/layout.service';
import { MatchmakingService } from 'src/app/services/matchmaking.service';
import { Observable } from 'rxjs';
import { MatchService } from 'src/app/services/match.service';
import { OnInit, Component } from '@angular/core';
import { UserHttpService } from 'src/app/services/http/user.http-service';
import { ThousandSuffixesPipe } from 'src/app/pipes/thousand-suffixes.pipe';
import { UserProfile } from 'src/app/models/user/profile';

@Component({
  selector: 'app-current-season',
  templateUrl: './current-season.page.html',
  styleUrls: ['./current-season.page.less']
})
export class CurrentSeasonPage implements OnInit {

  constructor(private http: HttpClient, private authService: AuthService,
    private router: Router, private layoutService: LayoutService,
    private matchMakingService: MatchmakingService,
    private matchService: MatchService,
    private userService: UserHttpService) { }
  response: any;

  findMatchIcon = faFutbol;
  simMatchIcon = faEllipsisH;
  starIcon = faStar;
  circleIcon = faCircle;
  loadingIcon = faSpinner;
  faGift = faGift;

  canMatchmake: boolean;
  unclaimed: boolean;
  inProgress: string;

  profile: UserProfile;

  async ngOnInit() {
    var profile = await this.userService.get();
    this.http.get<any>(`${environment.apiEndpoint}/match/status`).subscribe((result) => {
      this.unclaimed = result.hasUnclaimedRewards;
      this.inProgress = result.inProgressMatchId;
      this.canMatchmake = !(this.unclaimed || this.inProgress);
    });
  }

  claim() {
    this.unclaimed = false;
    this.http.get<boolean>(`${environment.apiEndpoint}/match/claim`).subscribe((result) => {
      this.unclaimed = result;
    });
  }

  goToMatch(){
    this.matchService.goToMatch(this.inProgress)
  }

  async matchmake(){
    await this.matchMakingService.matchmake();
  }
}
