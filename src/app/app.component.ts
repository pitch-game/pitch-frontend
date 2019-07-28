import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './animations';
import { AuthService } from './services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { LayoutService } from './layout/layout.service';
import { faUsers, faFutbol, faTicketAlt, faShoppingBasket, faMoneyBill, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserHttpService } from './services/http/user.http-service';
import { MatchService } from './services/match.service';
import { MatchmakingService } from './services/matchmaking.service';
import { UserProfile } from './models/user/profile';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {

  title = 'Pitch';

  seasonsIcon = faFutbol;
  squadIcon = faUsers;
  challengesIcon = faTicketAlt;
  storeIcon = faShoppingBasket;
  marketplaceIcon = faMoneyBill;
  loadingIcon = faSpinner;

  inProgress: any;

  isLoggedIn: boolean;
  version: string;

  profile: UserProfile;

  constructor(public authService: AuthService,
    public layoutService: LayoutService,
    private router: Router,
    private userService: UserHttpService,
    public matchService: MatchService,
    public matchmakingService: MatchmakingService) {

    this.authService.isLoggedIn().subscribe(async (isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.profile = await this.userService.get();
      this.matchService.init();
    });

    this.authService.onAuthenticationCompleted.subscribe(async () => {
      this.isLoggedIn = true;
      this.profile = await this.userService.get();
      this.matchService.init();
    });

    this.version = environment.version;

    this.router.events.subscribe((event) => {
      //if(typeof(event) == NavigationEnd) { TODO
      this.layoutService.showNav = false;
      //}
    });
  }

  async ngOnInit(): Promise<void> {
    await this.matchService.init();
    await this.matchmakingService.init();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  toggleMenu() {
    this.layoutService.toggleNav();
  }

  async login() {
    this.authService.isLoggedIn().subscribe(async (loggedIn) => {
      if (loggedIn) {
        this.authService.signOut();
      } else {
        await this.authService.startAuthentication();
      }
    });
  }
}
