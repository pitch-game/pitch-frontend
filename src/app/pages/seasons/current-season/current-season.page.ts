
import { faFutbol, faEllipsisH, faStar, faCircle, faSpinner, faGift, faMoneyCheck, faLevelUpAlt, faListUl, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { MatchmakingService } from 'src/app/services/matchmaking.service';
import { MatchService } from 'src/app/services/match.service';
import { OnInit, Component } from '@angular/core';
import { UserProfile } from 'src/app/models/user/profile';
import { MatchHttpService } from 'src/app/services/http/match.http-service';

@Component({
  selector: 'app-current-season',
  templateUrl: './current-season.page.html',
  styleUrls: ['./current-season.page.less']
})
export class CurrentSeasonPage implements OnInit {

  constructor(private matchMakingService: MatchmakingService,
    private matchService: MatchService,
    private matchHttpService: MatchHttpService) { }
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
    await this.init();
  }

  async init() {
    let result = await this.matchHttpService.inProgress();
    this.unclaimed = result.hasUnclaimedRewards;
    this.inProgress = result.inProgressMatchId;
    this.canMatchmake = !(this.unclaimed || this.inProgress);
  }

  async claim() {
    await this.matchHttpService.claim();
    await this.init();
  }

  goToMatch() {
    this.matchService.goToMatch(this.inProgress)
  }

  async matchmake() {
    await this.matchMakingService.matchmake();
  }
}
