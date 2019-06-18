import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { slideInAnimation } from './animations';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';
import { LayoutService } from './layout/layout.service';
import { faUsers, faFutbol, faTicketAlt, faShoppingBasket, faMoneyBill, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { UserService } from './services/user.service';

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

  isLoggedIn: boolean;
  version: string;

  profile: any;

  constructor(public authService: AuthService, public layoutService: LayoutService, private router: Router, private userService: UserService) {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
      this.userService.get().subscribe((profile) => {
        this.profile = profile;
      });
    });

    this.authService.onAuthenticationCompleted.subscribe(() => {
      this.isLoggedIn = true;
      this.userService.get().subscribe((profile) => {
        this.profile = profile;
      });
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
}
