import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './animations';
import { AuthService } from './auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { LayoutService } from './services/layout.service';
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
export class AppComponent {

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
  username: string;

  links = [
    { name: 'Quick Match', icon: 'sports_soccer' }
  ];

  teamLinks = [
    { name: 'Squad', icon: 'group' },
    { name: 'Club', icon: 'work' },
    { name: 'Performance', icon: 'show_chart' }
  ]

  constructor(public authService: AuthService,
    public layoutService: LayoutService,
    private router: Router,
    private userService: UserHttpService,
    public matchService: MatchService,
    public matchmakingService: MatchmakingService) {

    this.authService.isLoggedIn().subscribe(async (isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      if (!isLoggedIn) return;
      this.profile = await this.userService.get();
      await this.matchService.init();
      await this.matchmakingService.init();
    });

    this.authService.getUserData().subscribe((user) => {
      if (!user) return;
      this.username = user.name;
    });

    this.version = environment.version;

    this.router.events.subscribe((event) => {
      //if(typeof(event) == NavigationEnd) { TODO
      this.layoutService.showNav = false;
      //}
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  toggleMenu() {
    this.layoutService.toggleNav();
  }

  login() {
    this.authService.startAuthentication();
  }

  signOut() {
    this.authService.signOut();
  }
}
