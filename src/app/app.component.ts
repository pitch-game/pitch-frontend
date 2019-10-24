import { Component, ViewChild} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './animations';
import { AuthService } from './auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { LayoutService } from './services/layout.service';
import { UserHttpService } from './services/http/user.http-service';
import { MatchService } from './services/match.service';
import { MatchmakingService } from './services/matchmaking.service';
import { UserProfile } from './models/user/profile';
import { MatchHttpService } from './services/http/match.http-service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { PackService } from './services/pack.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ],
  providers:  [ PackService ]
})
export class AppComponent {
  title = 'Pitch';
  version: string;

  isLoggedIn: boolean;
  profile: UserProfile;
  username$: Observable<string>;

  @ViewChild('drawer', null) drawer: any;

  links = [
    { name: 'Quick Match', icon: 'sports_soccer' }
  ];

  teamLinks = [
    { name: 'Squad', icon: 'group', route: '/squad/active' },
    { name: 'Club', icon: 'work', route: '/squad/club' },
    { name: 'History', icon: 'show_chart', route: '/seasons/history' }
  ]

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result: BreakpointState) => result.matches));

  constructor(public authService: AuthService,
    public layoutService: LayoutService,
    private router: Router,
    private userService: UserHttpService,
    public matchService: MatchService,
    private matchHttpService: MatchHttpService,
    public matchmakingService: MatchmakingService,
    private breakpointObserver: BreakpointObserver,
    public packService: PackService) {

    this.authService.isLoggedIn().subscribe(async (isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (!isLoggedIn) return;

      this.profile = await this.userService.get();
      this.username$ = this.authService.getUserData().pipe(map((result) => result.name));

      await this.matchService.init();
      await this.matchmakingService.init();
      await this.packService.init();
    });

    router.events.pipe(
      withLatestFrom(this.isHandset$),
      filter(([a, b]) => b && a instanceof NavigationEnd)
    ).subscribe(_ => this.drawer.close())

    this.version = environment.version;
  }

  openPack() {
    this.packService.openPack();
  }

  async claimMatchRewards() {
    await this.matchHttpService.claim();
    await this.matchService.init();
  }

  login() {
    this.authService.startAuthentication();
  }

  signOut() {
    this.authService.signOut();
  }
}
